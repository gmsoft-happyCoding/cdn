/**
 * 2021-03-02 增加无外观签名
 * 2021-05-26 增加在线打开URL文件
 * 2021-06-19 修改在线打开URL文件
 * 2021-06-24 增加获取签名个数
 * 2021-06-25 增加批量和骑缝章 撤章功能
 * 2021-06-30 旧的印章支持撤销
 * 2021-07-06 IE下增加关闭的接口
 * 2022-10-13 删去放缩时重复获取签名域信息
 * 2022-11-03 增加了对外暴露跳转到指定页面和获取当前页的接口
 * 2023-04-18 支持整份文档旋转显示和签章（签章需客户端支持）
 * 2023-06-15 优化界面与流程；支持大文件签章
 * 2023-07-11 支持开发商定义外部按钮，调用组件签章接口；支持文件已有的印章能撤销
 * */
function blockUIConfig(blockUIConfigText) {
  return {
    message: '<h5 style="margin: 0;">' + blockUIConfigText + "</h5>",
    css: {
      border: "2px solid black",
      borderColor: "#A8CFEB",
      height: "40px",
      lineHeight: "40px",
    },
    overlayCSS: {
      backgroundColor: "#A8CFEB",
      opacity: "0.4",
    },
    fadeIn: 0,
  };
}
var NetcaUtils = (function () {
  "use strict";
  var that = {};

  /**判断当前是否手动盖章界面*/
  that.isUserManualSignUI = function () {
    if ($(".netcasignpdf").length) {
      return true;
    }
    return false;
  };

  /**转换成pdf.js能直接解析的Uint8Array类型*/
  that.convertDataURIToBinary = function (dataURI) {
    var raw = window.atob(dataURI);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i) & 0xff;
    }
    return array;
  };

  /**Uint8Array转为base64*/
  that.arrayBufferToBase64 = function (arrayBuffer) {
    // 每次处理的块大小
    const chunkSize = 1024 * 1024 * 10; // 50MB
    let uint8Array = new Uint8Array(arrayBuffer);
    const totalChunks = Math.ceil(uint8Array.byteLength / chunkSize);
    let base64String = [];
    for (let i = 0; i < totalChunks; i++) {
      const chunk = uint8Array.subarray(i * chunkSize, (i + 1) * chunkSize);
      base64String.push(that.chunkedBtoa(chunk));
    }
    return base64String;
  };

  that.chunkedBtoa = function (chunk) {
    var CHUNK_SIZE = 1000;
    var encoded = "";
    for (var i = 0; i < chunk.length; i += CHUNK_SIZE) {
      var subChunk = chunk.slice(i, i + CHUNK_SIZE);
      encoded += String.fromCharCode.apply(null, subChunk);
    }
    return btoa(encoded);
  };

  /**获取现在的时间*/
  that.getNowFormatDate = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + "年" + month + "月" + strDate + "日";
    return currentdate;
  };
  return that;
})();

var NetcaSignAPI = (function () {
  "use strict";
  var that = {
    streamId: null, // 文件的streamId
    VerifyInfos: [], //验证信息
    cloudKeyInfo: {}, // 用户云密钥信息
  };
  var click_x = null;
  var click_y = null;
  var sealImage_halfWidth = null;
  var sealImage_halfheight = null;
  var sealImageSrc = null;
  var certEncode = null;
  var originImage_width = null;
  var originImage_height = null;
  var tagObj = {
    width: "", // 签章图片宽度
    height: "", // 签章图片高度
  };
  var timeStamp = {
    tsaUrl: "", // 时间戳地址
    tsaUsr: "", // 时间戳服务对应用户名
    tsaPwd: "", // 时间戳服务对应用户的密码
    tsaHashAlgo: "", // 时间戳hash算法
  };
  var revInfoIncludeFlag = false; // 是否包含吊销信息
  var isVerifyRevoke = null; // 是否获取吊销信息
  var isOnlineverifyrevoke = null; // 是否开启在线验证吊销信息
  var isVerifyOpen = false; //初次进入页面，是否开启在线自动验证文档有效性
  var isVerifyOpenWithOpenBtn = false; //使用打开按钮时，是否开启在线自动验证文档有效性
  var verifyLevel = 2; //验证级别 2 默认验证签名证书。不验证证书是否作废
  var signFields = []; //签名域信息
  var filedFlag = false; //判断是否为刚签完的章
  var zoom = false; //缩放
  var completedStreamId; // 已签数据流信息
  var unfinishedStreamId; // 未完成数据流信息
  var bigFileSize = 20; //大文件
  var writeLength = 1; //写入文件大小
  var operation = 1; // 1: 自动打开文档后验证  2：签名后验证  3：手动点击验证
  var isShowDeleteBtn = false; //打开文档有印章时显示撤章按钮
  var addVerifyInfoLen = []; //此处为新增签名的个数集合
  var revokeSealModel = 1; //撤销签章的模式，1：只能撤本次签的 2：不能撤

  var freeSealParams = [];
  var freeLength = 0;
  var base64StringLength = 0;
  var getSignatureField_state = true;
  var hasDescribeSignatureField = null; // 是否完成签名域描绘
  var signatureVerifierUndoPDF = true; // 防止多次连续点击删除按钮

  var saveChartletArray = []; // 顾名思义 保存贴图数组 用来存保存时需要传输的信息
  var chartletNum = 0;

  that.getChartletNum = function () {
    return chartletNum;
  };

  that.setChartletNum = function (newNum) {
    chartletNum = newNum;
  };

  that.getSaveChartletArray = function () {
    return saveChartletArray;
  };

  that.setSaveChartletArray = function (newSaveChartletArray) {
    saveChartletArray = newSaveChartletArray;
  };

  that.getFileStreamId = function () {
    return unfinishedStreamId;
  };

  that.getCertEncode = function () {
    return certEncode;
  };

  that.setCertEncode = function (newCertEncode) {
    certEncode = newCertEncode;
  };

  that.initUI = function () {
    if (NetcaUtils.isUserManualSignUI()) {
      // 签章绑定事件
      that.bindSignFn("netcasign");
      that.bindSignFn("connect");
      that.bindSignFn("batchsign");
      that.bindSignFn("pagingsign");
      that.bindSignFn("draggablesign");
      that.bindSignFn("keywordsign");

      // 显示签章菜单背景色
      that.transBackground("netcasign");
      that.transBackground("batchsign");
      that.transBackground("pagingsign");
      that.transBackground("draggablesign");
      that.transBackground("keywordsign");

      // toorbar 签章按钮
      $("#sign").click(function (event) {
        if (!getSignatureField_state) {
          return;
        }
        if ($("#sign").text().trim() === "取消") {
          document.getElementById("viewer").onclick = null;
          $("#netcasignedDataVerify").css("display", "none");
          $("#viewerContainer").css({ "margin-top": "0px" });
          $(document).unbind("mousedown");
          $(document).unbind("mousemove");
          $("#freeBtnOK").css("display", "none");
          $("#freeBtnNO").css("display", "none");
          $(".netcainvalidClose").css("display", "inline-block");
          // $(".vSealBox").remove();
          // $(".vSealBoxDelete").remove();
          // $(".vSeal").remove();
          freeSealParams = [];
          that.hideSignImage();
          $("#viewer").unbind("click");
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          return;
        }
        if ($(".netcasignmenu").css("display") === "none") {
          $(".netcasignmenu").css("display", "block");
          // 因为 .netcasignmenu 的 left 是定值，在隐藏了其他按钮的情况会导致定位不准确
          // 此处重新计算“签章”按钮的位置，用这个值设置 .netcasignmenu 的 left
          var left = event.target.getBoundingClientRect().left - 12; // 给 12px 的调整像素
          $(".netcasignmenu").css("left", left + "px");
        } else {
          $(".netcasignmenu").css("display", "none");
        }
      });

      // 签章菜单  hover
      for (var k = 0; k < $(".netcasignmemuitem").length; k++) {
        (function (k) {
          $(".netcasignmemuitem")
            .eq(k)
            .hover(
              function () {
                $(this).children("ul").css("display", "block");
                $(this).css("background", "#DBECFF");
              },
              function () {
                $(this).children("ul").css("display", "none");
                $(this).css("background", "#fff");
              },
            );
        })(k);
      }

      /**选中option，缩放pdf*/
      document
        .getElementById("scaleSelect")
        .addEventListener("change", that.zoomPDF);
      //绑定事件
      document.getElementById("verify").addEventListener("click", function () {
        if (saveChartletArray.length > 0) {
          layer.msg("尚有未保存的签名，请保存后再进行验签", { icon: 3 });
          return;
        }
        if (!getSignatureField_state) {
          return;
        }
        operation = 3; // 3：手动点击验证
        that.hideSignImage(); // 隐藏鼠标选定的印章
        document.getElementById("viewer").onclick = null;
        $(document).unbind("mousedown");
        $(document).unbind("mousemove");
        $("#freeBtnOK").css("display", "none");
        $("#freeBtnNO").css("display", "none");
        $(".netcainvalidClose").css("display", "inline-block");
        $(".vSealBox").remove();
        $(".vSealBoxDelete").remove();
        $(".vSeal").remove();
        freeSealParams = [];
        $.blockUI(blockUIConfig("验证签名中，请稍等..."));
        that.signedDataVerify("", "", verifyLevel, unfinishedStreamId);
      });

      // 打印按钮绑定函数
      document.getElementById("print").addEventListener("click", that.printPDF);
      // 关闭按钮绑定函数-关闭并将pdf文件上移
      document
        .getElementById("netcainvalidClose")
        .addEventListener("click", function () {
          that.closeSignedDataVerifyInfo("netcainvalidClose");
        });
      // 关闭按钮绑定函数-仅关闭验证框
      document
        .getElementById("netcaclose2")
        .addEventListener("click", function () {
          that.closeSignedDataVerifyInfo("netcaclose2");
        });

      document
        .getElementById("netcainvalidBtn")
        .addEventListener("click", that.displaySignedDataVerifyInfo);
      // 放大按钮
      document.getElementById("zoomIn").addEventListener("click", that.zoomPDF);
      // 缩小按钮
      document
        .getElementById("zoomOut")
        .addEventListener("click", that.zoomPDF);
      // 关闭文件按钮绑定函数
      document
        .getElementById("closeFile")
        .addEventListener("click", that.closeFile);

      // 旋转按钮
      document
        .getElementById("leftBtn")
        .addEventListener("click", that.onRotateLeft);
      document
        .getElementById("rightBtn")
        .addEventListener("click", that.onRotateRight);

      //保存按钮 特供重庆大家项目
      document
        .getElementById("netcasave")
        .addEventListener("click", that.onSave);

      // 控件显示
      $("#netcasignpdf").css("display", "block");
      $("#NetcaReaderAx").css("display", "none");

      //打开按钮
      $('#openFile input[type="file"]').on("change", function (ev) {
        if ($("#freeBtnOK").css("display") == "inline-block") {
          that.hideSignImage();
          document.getElementById("viewer").onclick = null;
          $("#netcasignedDataVerify").css("display", "none");
          $("#viewerContainer").css({ "margin-top": "0px" });
          $(document).unbind("mousedown");
          $(document).unbind("mousemove");
          $("#freeBtnOK").css("display", "none");
          $("#freeBtnNO").css("display", "none");
          $(".netcainvalidClose").css("display", "inline-block");
          $(".vSealBox").remove();
          $(".vSealBoxDelete").remove();
          $(".vSeal").remove();
          freeSealParams = [];
        }
        saveChartletArray = [];
        debounce(reChartlrt)();
        var file = ev.target.files[0];
        event.target.value = "";
        that.openFile(file);
      });
    }
    // 让页面在刷新后不使用用户上次滚动的位置、旋转角度等偏好，可能会对用户使用体验有影响
    // @see https://github.com/mozilla/pdf.js/issues/11114
    globalPDFViewerApplication.preferences.set("viewOnLoad", 1);
  };
  // 缩放PDF 缩放时，重绘签名域
  that.zoomPDF = debounce(reChartlrt);
  /**修改签章模式 */
  that.revokeSealModel = function (model) {
    revokeSealModel = model;
  };
  /**获取证书列表*/
  that.getCertList = function (e) {
    if ($(".netcasignmenu").css("display") === "block") {
      $(".netcasignmenu").css("display", "none");
    }
    var clickTargetId = e.target.parentNode.parentNode.getAttribute("id"); // 员工 机构 法人
    var clickTargetClass = e.target.getAttribute("class"); // 普通  批量 骑缝章 切换用户 自由签章 关键字签章
    // 签章0 批量签章1 骑缝章2 切换用户3 自由签章4 关键字签章5  普通签章0 员工签章1 机构签章2 法人签章3
    var signObj = that.signFn(clickTargetId, clickTargetClass);
    $.blockUI(blockUIConfig("正在获取印章中，请稍等..."));
    that.selectSealSigntureInfoWithDispaly(signObj);
    // if (clickTargetId) {
    //   // yst
    //   that.selectSealSigntureInfoWithDispaly(signObj);
    // } else {
    //   // netca
    //   that.isInsertKey(signObj);
    // }
  };

  function debounce(fn) {
    var delay = 100;
    var time = null;
    return function () {
      if (saveChartletArray.length === 0) {
        $(".vSeal").remove();
        $(".vSealBox").remove();
        $(".vSealBoxDelete").remove();
        return;
      }
      $.blockUI(blockUIConfig("正在重绘印章中，请稍等..."));
      $(".vSeal").remove();
      $(".vSealBox").remove();
      $(".vSealBoxDelete").remove();
      if (time !== null) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        fn.call(this);
      }, delay);
    };
  }

  function reChartlrt() {
    var newscale = NetcaSignAPI.getScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var K = scale / newscale;
    var viewer_width = $("#viewer").width();
    if (saveChartletArray.length > 0) {
      for (var i = 0; i < saveChartletArray.length; i++) {
        var obj = saveChartletArray[i];
        // 找到这个章所在页，然后算宽度
        var page_width = $("#viewer .page")
          .eq(obj.pageNum - 1)
          .width();
        var page_height = $("#viewer .page").eq(obj.pageNum - 1)[0].offsetTop;
        // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
        if (page_width < viewer_width) {
          var blank_left = (viewer_width - page_width) / 2;
        } else {
          var blank_left = 9;
        }
        // 很明显这里是算坐标和宽高的 这个K 是一个比例，与当前缩放程度有关
        var x = obj.xPos / K + blank_left;
        var y = obj.yPos / K + 9 + page_height;
        var w = obj.width / K;
        var h = obj.height / K;
        // 这是每个章的唯一标识哦
        var chartletNum = obj.id;
        // 把删除按钮、外面的box、图片放进去
        $("#viewerContainer").append(
          ' <img class="vSeal" id="vSeal' +
            chartletNum +
            '" src="data:image/PNG;base64,' +
            obj.sealImageEncode +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            x +
            "px;top:" +
            y +
            'px;opacity: 0.5;"></img>',
        );
        $("#viewerContainer").append(
          ' <div class="vSealBox" id="vSealBox' +
            chartletNum +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            (x - 4) +
            "px;top:" +
            (y - 4) +
            'px;"></div>',
        );
        $("#viewerContainer").append(
          "" +
            '<img class="vSealBoxDelete" id="vSealBoxDelete' +
            chartletNum +
            '" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
            'style="position:absolute;top:' +
            (y - 19) +
            "px;left:" +
            (x + w - 19) +
            'px;z-index:1000;">' +
            "",
        );
        var deleteClick = function (event) {
          event.stopPropagation();
          event.cancelBubble = false;
          var index = event.target.id.substring(14);
          // 界面上删去该贴图
          $("#vSeal" + index).remove();
          $("#vSealBox" + index).remove();
          $("#vSealBoxDelete" + index).remove();
          // 逻辑上删去该贴图
          for (var k = 0; k < saveChartletArray.length; k++) {
            if (saveChartletArray[k].id > Number(index)) {
              saveChartletArray[k - 1] = saveChartletArray[k];
            }
          }
          saveChartletArray.length -= 1;
        };
        document
          .querySelector("#vSealBoxDelete" + chartletNum)
          .addEventListener("click", deleteClick);
      }
    }
    $.unblockUI();
  }

  that.onSave = function () {
    if (saveChartletArray.length > 0) {
      $.blockUI(blockUIConfig("正在保存中，请稍后..."));
      var params = {
        srcFile: "", //源pdf文件
        srcBytes: "", //源Pdf文件的Base64编码
        srcStreamId: unfinishedStreamId,
        destFile: "", //目标pdf文件
        certEncode: certEncode, //签名证书Base64编码
        selMode: 1, //操作模式
        signFieldText: "", //签名域显示的文字
        revInfoIncludeFlag: revInfoIncludeFlag, //是否包含吊销信息
        sealImageEncode: saveChartletArray[0].sealImageEncode,
        SignDisposables: saveChartletArray,
        //时间戳对象
        Tsa: {
          tsaUrl: timeStamp.tsaUrl, //时间戳地址
          tsaUsr: timeStamp.tsaUsr, //时间戳服务对应用户名
          tsaPwd: timeStamp.tsaPwd, //时间戳服务对应用户的密码
          tsaHashAlgo: timeStamp.tsaHashAlgo, //时间戳使用的hash算法，例如”sha-1”，”sha-256”等
        },
        synVerify: true, //签完名之后同步验证文档
        synGetSignFiled: true, //签完名之后同步获取签名域
        level: verifyLevel, //验证级别
        isReturnStreamId: true, //使用流标识返回结果
        useCloudKeySignSeal: false, // 是否使用云密钥签章，false：不需要 true：需要
        // merge:_merge,
        // mergeSealId:_mergeId,
      };

      // if(_type === 2){
      //     //无外观签名
      //     params.sealImageEncode = null;
      //     params.SignPosition =
      //     {
      //         pageNum:-1,
      //         xPos:0,
      //         yPos:0,
      //         width:0,
      //         height:0
      //     };
      //     params.visible = false;
      // }

      $("#sign").html(
        '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
      );

      NetcaPKI.SignatureCreatorPdfSignSealFieldOrPositionEx(params)
        .Then(function (res) {
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );

          // 签章成功后读流
          var destFileEncode = "";
          var destFile = new Uint8Array();
          // 读流，需要拿一个流id去读
          var read = function (streamId, res) {
            var params = {
              streamId: streamId,
              length: 4 * 1024 * 1024,
            };
            if (!res.hasMoreData) {
              that.SignatureCreatorCallBack(destFile);
              return;
            }
            NetcaPKI.readStream(params)
              .Then(function (res) {
                var data = res.data;
                data = NetcaUtils.convertDataURIToBinary(data);
                var dest = new Uint8Array(
                  data.byteLength + destFile.byteLength,
                );
                dest.set(destFile);
                dest.set(data, destFile.byteLength);
                destFile = dest;
                read(res.destFileStream.streamId, res);
              })
              .Catch(function (res) {
                that.SignatureCreatorFailedCallBack(res);
              });
          };

          // 使用签完名文件的流ID
          read(res.destFileStream.streamId, { hasMoreData: true });
        })
        .Catch(function (res) {
          $.unblockUI();
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          that.SignatureCreatorFailedCallBack(res);
        });
    } else {
      layer.msg("请先进行签章后再点击保存按钮。");
    }
  };

  that.signFn = function (targetId, targetClass) {
    var _type, _key;
    switch (targetId) {
      // 员工签章
      case "netcastaff":
        _type = 1;
        break;
      // 机构签章
      case "netcaorganization":
        _type = 2;
        break;
      // 法人签章
      case "netcalegalperson":
        _type = 3;
        break;
      // 普通签章
      default:
        _type = 0;
        break;
    }
    switch (targetClass) {
      // 签章
      case "netcasign":
        _key = 0;
        break;
      // 批量签章
      case "batchsign":
        _key = 1;
        break;
      // 骑缝章
      case "pagingsign":
        _key = 2;
        break;
      // 切换用户
      case "connect":
        _key = 3;
        break;
      // 自由签章
      case "draggablesign":
        _key = 4;
        break;
      // 关键字签章
      case "keywordsign":
        _key = 5;
        break;
    }
    if (_key === 0 || _key === 3) {
      // 普通签章
      return {
        signMenu: _type,
        signType: _key,
        batchSignParams: null,
        acrosspageSignParams: null,
      };
    } else if (_key === 1 || _key === 2) {
      // 批量签章  骑缝章
      return {
        signMenu: _type,
        signType: _key,
        batchSignParams: {
          // 批量签章参数
          startPageNum: 1, //开始页码
          endPageNum: globalPDFViewerApplication.pagesCount, //结束页码，-1表示最后一页
        },
        acrosspageSignParams: {
          // 骑缝章参数
          startPageNum: 1, //开始页码
          endPageNum: globalPDFViewerApplication.pagesCount, //结束页码，-1表示最后一页
        },
      };
    } else if (_key === 4) {
      // 自由签章
      return {
        signMenu: _type,
        signType: _key,
        batchSignParams: null,
        acrosspageSignParams: null,
      };
    } else if (_key === 5) {
      // 关键字签章
      return {
        signMenu: _type,
        signType: _key,
        keywordSignParams: {
          keyword: "",
          index: "",
          startPageNum: 1,
          endPageNum: globalPDFViewerApplication.pagesCount,
          offsetX: "",
          offsetY: "",
        },
      };
    }
  };
  // 绑定签章按钮初始化功能事件
  that.bindSignFn = function (name) {
    var eleName = document.getElementsByClassName(name);
    for (var i = 0; i < eleName.length; i++) {
      (function (i) {
        document
          .getElementsByClassName(name)
          [i].addEventListener("click", that.getCertList);
      })(i);
    }
  };
  // 先判断是否插入key
  that.isInsertKey = function (signObj) {
    var params = {};
    NetcaPKI.isInsertKey(params)
      .Then(function (res) {
        if (res.insertCount > 0) {
          that.InsertCallBack(signObj);
        } else {
          that.UnInsertCallBack(res);
        }
      })
      .Catch(function (res) {
        that.UnInsertCallBack(res);
      });
  };
  that.InsertCallBack = function (signObj) {
    that.selectSealSigntureInfoWithDispaly(signObj);
  };
  that.UnInsertCallBack = function (res, index) {
    $.unblockUI();
    if (!res.insertCount) {
      alert("找不到签名证书，请检查设备是否连接正确");
    }
  };

  // 点击签章按钮，弹出证书选择框
  that.selectSealSigntureInfoWithDispaly = function (signObj) {
    var params = {
      // clsid: '6C0104A6-C4A1-4A93-A8BF-D029F5A46604', // 公共资源
      clsid: "001DE133-9BD7-4ACE-BF4D-AE14D689C061",
      signMenu: signObj.signMenu,
      signType: signObj.signType,
      batchSignParams: signObj.batchSignParams,
      acrosspageSignParams: signObj.acrosspageSignParams,
      keywordSignParams: signObj.keywordSignParams,
    };
    // 印章带时间戳
    if (NetcaPDFSeal.getSealWithDate()) {
      params.backGroundText = NetcaUtils.getNowFormatDate();
    }

    NetcaPKI.SelectSealSigntureInfoWithDispaly(params)
      .Then(function (res) {
        $.unblockUI();
        NetcaSignAPI.selectSealSigntureInfoWithDispalySuccessCallBack(
          res,
          signObj,
        );
      })
      .Catch(function (res) {
        $.unblockUI();
        NetcaSignAPI.selectSealSigntureInfoWithDispalyFailCallBack(res);
      });
  };

  that.selectSealSigntureInfoWithDispalySuccessCallBack = function (
    res,
    signObj,
  ) {
    $("#sign").html(
      '<img src="ui/images/icon/but_signature.png" alt=""><br>取消',
    );

    certEncode = res.cert; //证书编码
    tagObj.width = res.width; //印章宽度
    tagObj.height = res.height; //印章高度
    sealImageSrc = res.picture; //印章编码

    // 批量||骑缝章
    if (signObj.acrosspageSignParams || signObj.batchSignParams) {
      signObj.acrosspageSignParams.startPageNum =
        res.acrosspageSignParams.startPageNum; // 骑缝章
      signObj.acrosspageSignParams.endPageNum =
        res.acrosspageSignParams.endPageNum;
      signObj.batchSignParams.startPageNum = res.batchSignParams.startPageNum; // 批量
      signObj.batchSignParams.endPageNum = res.batchSignParams.endPageNum;
      signObj.batchSignParams.pageType = res.batchSignParams.pageType;
    }

    // 关键字签章
    if (signObj.keywordSignParams) {
      signObj.keywordSignParams.keyword = res.KeywordSignParams.keyword; //关键字
      signObj.keywordSignParams.index = res.KeywordSignParams.index; //关键字索引
      signObj.keywordSignParams.startPageNum =
        res.KeywordSignParams.startPageNum; //PDF文档的开始页码
      signObj.keywordSignParams.endPageNum = res.KeywordSignParams.endPageNum; //PDF文档的结束页码
      signObj.keywordSignParams.offsetX = res.KeywordSignParams.offsetX; //水平偏移量
      signObj.keywordSignParams.offsetY = res.KeywordSignParams.offsetY; //水平偏移量
      signObj.keywordSignParams.width = tagObj.width; //签名域矩形的宽度
      signObj.keywordSignParams.height = tagObj.height; //签名域矩形的高度
      signObj.keywordSignParams.picture = res.picture;
      $.blockUI(blockUIConfig("正在盖章中，请稍等..."));
      // if (!signObj.keywordSignParams.keyword) {
      //     alert('关键字不能为空');
      //     $.unblockUI();
      //     return false;
      // }

      // 关键字签章
      that.seal_SealKeyWord(signObj);
      return false;
    }

    // 无外观签名
    if (res.type === 2) {
      alert("该模式不支持无外观签章");
      return;
    }

    //设置图片大小
    that.setSignImageSize();

    if (signObj.signType === 4) {
      // 自由签章模式
      freeSealParams = [];
      $("#netcasignedDataVerify").css("display", "block");
      $("#viewerContainer").css({ "margin-top": "47px" });
      $(".netcainvalidInfo").text("正在进行自由签章...");
      $(".netcainvalidIcon img").attr("src", "");
      $(".netcainvalidBtn").css("display", "none");
      $(".netcainvalidClose").css("display", "none");
      $("#freeBtnOK").css("display", "inline-block");
      $("#freeBtnNO").css("display", "inline-block");
      that.signImageFreeMoveEvent(signObj, res);
      return;
    }

    // 如果当前还处于签章状态，则取消所有签章状态
    if ($("#freeBtnOK").css("display") == "inline-block") {
      that.hideSignImage();
      document.getElementById("viewer").onclick = null;
      $("#netcasignedDataVerify").css("display", "none");
      $("#viewerContainer").css({ "margin-top": "0px" });
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
      $("#freeBtnOK").css("display", "none");
      $("#freeBtnNO").css("display", "none");
      $(".netcainvalidClose").css("display", "inline-block");
      $(".vSealBox").remove();
      $(".vSealBoxDelete").remove();
      $(".vSeal").remove();
      freeSealParams = [];
    }

    //单签
    that.signImageMoveEvent(signObj, res);
  };

  that.selectSealSigntureInfoWithDispalyFailCallBack = function (res) {
    if (res.msg == "用户取消了操作") {
      return;
    }
    if (res.msg == "PIN码验证失败") {
      return;
    }
    alert(res.msg);
  };

  that.isLoading = function (msg) {
    var loading = layer.msg(msg || "请稍等...", {
      icon: 16,
      shade: 0.1,
    });
    return loading;
  };

  /**
     设置跟随鼠标移动的图片大小
     图像的像素宽度为 originImage_width，水平分辨率为 72 点/英寸
     如果调用此方法在分辨率为 96 点/英寸的设备上绘制该图像，则所呈现图像的像素宽度就是： (originImage_width/72)*96
     * */
  that.setSignImageSize = function (imageObj) {
    var val = that.getScale(); //缩放比例
    var scale = 0.75; //当前缩放比例
    if (imageObj) {
      $("#NetcaSignMoveImage").width(imageObj.width);
      $("#NetcaSignMoveImage").height(imageObj.height);
      $("#NetcaSignMoveImage").attr(
        "src",
        "data:image/PNG;base64," + imageObj.sealImageEncode,
      );
    } else {
      $("#NetcaSignMoveImage").width(tagObj.width);
      $("#NetcaSignMoveImage").height(tagObj.height);
      $("#NetcaSignMoveImage").attr(
        "src",
        "data:image/PNG;base64," + sealImageSrc,
      );
    }

    originImage_width = $("#NetcaSignMoveImage").width();
    var w = (originImage_width * val) / scale;
    $(".NetcaSignMoveDiv").width(w);

    originImage_height = $("#NetcaSignMoveImage").height();
    var h = (originImage_height * val) / scale;
    $(".NetcaSignMoveDiv").height(h);

    $("#NetcaSignMoveImage").css({
      width: "100%",
      height: "100%",
    });

    sealImage_halfWidth = parseInt($(".NetcaSignMoveDiv").width()) / 2;
    sealImage_halfheight = parseInt($(".NetcaSignMoveDiv").height()) / 2;
  };
  /**鼠标移动签章图片事件--普通签章形态 mousemove*/
  that.signImageMoveEvent = function (signObj, res) {
    $(document).mousemove(function (event) {
      var ev = event || window.event;
      /**position left和top 设置鼠标位于图片中央*/
      $(".NetcaSignMoveDiv").css({
        display: "block",
        left: ev.clientX - sealImage_halfWidth + "px",
        top: ev.clientY - sealImage_halfheight + "px",
      });
    });

    $(document).mousedown(function (event) {
      // that.addChartlet(signObj, type)
    });

    $(document).mouseup(function () {
      that.netcaPDFClickEvent(
        signObj,
        res,
        event.clientX - sealImage_halfWidth,
        event.clientY - sealImage_halfheight - 70,
        sealImage_halfWidth * 2,
        sealImage_halfheight * 2,
      );
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
      $(document).unbind("mouseup");
    });

    /**点击右键  取消签章*/
    $(document).bind("contextmenu", function () {
      $("#sign").html(
        '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
      );
      that.hideSignImage();
      $("#viewer").unbind("click");
      return false;
    });
  };

  /**鼠标移动签章图片事件--自由签章形态 mousemove*/
  that.signImageFreeMoveEvent = function (signObj, res) {
    $(document).mousemove(function (event) {
      var ev = event || window.event;
      /**position left和top 设置鼠标位于图片中央*/
      $(".NetcaSignMoveDiv").css({
        display: "block",
        left: ev.clientX - sealImage_halfWidth + "px",
        top: ev.clientY - sealImage_halfheight + "px",
      });
    });

    $(document).mousedown(function (event) {
      that.addFreeSeal(
        signObj,
        res,
        event.clientX - sealImage_halfWidth,
        event.clientY - sealImage_halfheight - 117,
        sealImage_halfWidth * 2,
        sealImage_halfheight * 2,
      );
    });

    /**点击右键  取消签章*/
    $(document).bind("contextmenu", function () {
      that.hideSignImage();
      document.getElementById("viewer").onclick = null;
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
      return false;
    });
  };

  that.addFreeSeal = function (signObj, res, x, y, w, h) {
    var pdfviewer = document.getElementById("netcasignpdf");
    var pdfviewerL = pdfviewer.offsetLeft;
    var pdfviewerT = pdfviewer.offsetTop;

    var pageNum = globalPDFViewerApplication.page; //当前页码
    // 前n-1页 高度
    var _height = 0;
    if (pageNum > 1) {
      _height = that.addHeight(pageNum);
    }
    document.getElementById("viewer").onclick = function (e) {
      /**鼠标点击的位置，相对于文档的左边缘/上边缘*/
      var client_x = e.clientX;
      var client_y = e.clientY;

      var viewer_width = $("#viewer").width();
      var blank_top = $("#toolbarViewer").height() + 9;
      var pdfscrollTop = $("#viewerContainer").scrollTop(); //文档滚动高度

      //验证提示信息的高度
      if ($("#netcasignedDataVerify").css("display") === "block") {
        blank_top = blank_top + $("#netcasignedDataVerify").outerHeight();
      }

      var clicky_temp = client_y - blank_top + pdfscrollTop - pdfviewerT;
      click_y = clicky_temp - _height;

      var page_width = $("#viewer .page")
        .eq(pageNum - 1)
        .width();
      var blank_left = (viewer_width - page_width) / 2;
      var clickx_temp = client_x - pdfviewerL;
      click_x = clickx_temp - blank_left;

      //假如显示第1页，签第2页的位置
      var currentPageHeight = that.addHeight(pageNum + 1);
      if (currentPageHeight < clicky_temp) {
        pageNum = pageNum + 1;
        that.calculateCurrentHeightAgain(
          pageNum,
          clickx_temp,
          clicky_temp,
          viewer_width,
        );
      }

      // 假如显示第2页，签第1页页尾位置
      if (click_y < 0) {
        //计算负数  重算高度  宽度
        pageNum = pageNum - 1;
        that.calculateCurrentHeightAgain(
          pageNum,
          clickx_temp,
          clicky_temp,
          viewer_width,
        );
      }

      /**每次点击只触发一次签章 超出文档左右界线不能点击签章*/
      if (click_x > 0 && viewer_width - click_x - blank_left >= blank_left) {
        $(".vSealBox").remove();
        $(".vSealBoxDelete").remove();
        $("#viewerContainer").append(
          ' <div class="vSealBox" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            (x - 4) +
            "px;top:" +
            (y + pdfscrollTop - 4) +
            'px;"></div>',
        );
        $("#viewerContainer").append(
          "" +
            '<img class="vSealBoxDelete" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
            'style="position:absolute;top:' +
            (y + pdfscrollTop - 19) +
            "px;left:" +
            (x + w - 19) +
            'px;z-index:1000;">' +
            "",
        );
        var deleteClick = function (event) {
          event.stopPropagation();
          event.cancelBubble = false;
          $(".vSeal:last").remove();
          $(".vSealBox").remove();
          $(".vSealBoxDelete").remove();
          freeSealParams.pop();
          if (freeSealParams.length > 0) {
            var pdfscrollTop = $("#viewerContainer").scrollTop(); //文档滚动高度
            var temp = freeSealParams[freeSealParams.length - 1];
            $("#viewerContainer").append(
              ' <div class="vSealBox" style="position:absolute;z-index:99;width:' +
                temp.w +
                "px;height:" +
                temp.h +
                "px;left:" +
                (temp.x - 4) +
                "px;top:" +
                (temp.y - 4) +
                'px;"></div>',
            );
            $("#viewerContainer").append(
              "" +
                '<img class="vSealBoxDelete" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
                'style="position:absolute;top:' +
                (temp.y - 19) +
                "px;left:" +
                (temp.x + temp.w - 19) +
                'px;z-index:1000;">' +
                "",
            );
            document
              .querySelector(".vSealBoxDelete")
              .addEventListener("click", deleteClick);
          } else {
            that.hideSignImage();
            document.getElementById("viewer").onclick = null;
            $("#netcasignedDataVerify").css("display", "none");
            $("#viewerContainer").css({ "margin-top": "0px" });
            $(document).unbind("mousedown");
            $(document).unbind("mousemove");
            $("#freeBtnOK").css("display", "none");
            $("#freeBtnNO").css("display", "none");
            $(".netcainvalidClose").css("display", "inline-block");
            $(".vSealBox").remove();
            $(".vSealBoxDelete").remove();
            $(".vSeal").remove();
            freeSealParams = [];
            $("#sign").html(
              '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
            );
          }
        };
        document
          .querySelector(".vSealBoxDelete")
          .addEventListener("click", deleteClick);
        $("#viewerContainer").append(
          ' <img class="vSeal" src="data:image/PNG;base64,' +
            res.picture +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            x +
            "px;top:" +
            (y + $("#viewerContainer").scrollTop()) +
            'px;opacity: 0.5;"></img>',
        );
        freeSealParams.push({
          click_x: click_x,
          click_y: click_y,
          type: res.type,
          pageNum: pageNum,
          x: x,
          y: y + $("#viewerContainer").scrollTop(),
          w: w,
          h: h,
        });
      } else {
        that.hideSignImage();
        alert("不在签章范围内");
      }
    };
  };

  // 字节流方式打开文件
  that.openPDF = function (base64Val, callback, openWay) {
    // 1: 自动打开文档后验证
    operation = 1;
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    var Bytes = NetcaUtils.convertDataURIToBinary(base64Val);
    // 渲染入口
    globalPDFViewerApplication.open(Bytes);
    $.unblockUI();
    // 创建文件流
    var params = { srcBytes: [base64Val] };
    that.createStreamCallBack(Bytes.length, params, "plain", openWay);
    // 重新打开时  删除旧的streamId,保存新的streamId
    if (unfinishedStreamId) {
      that.destoryStreamCallBack(unfinishedStreamId);
    }
    unfinishedStreamId = completedStreamId;
    if (callback !== undefined) {
      callback();
    }
  };
  // url方式打开文档
  that.openPDFUrl = function (urlparams, callback) {
    operation = 1;
    var params = {
      url: urlparams.url,
      path: "",
      proxy: "",
    };
    if (
      urlparams.cookie &&
      urlparams.cookie !== "" &&
      urlparams.cookie !== null
    ) {
      params.cookie = urlparams.cookie;
    }
    $.blockUI(blockUIConfig("正在读取文件中，请稍后..."));
    NetcaPKI.download(params)
      .Then(function (destFileStream) {
        that.readStreamDownloadCallBack(destFileStream, callback);
      })
      .Catch(function (res) {
        alert("下载数据失败：" + res.msg);
        $.unblockUI();
      });
  };
  that.readStreamDownloadCallBack = function (downloadRes, callback) {
    downloadRes.destFileEncode = [];
    var _writeLength = writeLength * 1024 * 1024;
    // 小于20M 直接全部返回； 大于20M 分段返回
    if (downloadRes.destFileStream.streamLen < _writeLength) {
      _writeLength = downloadRes.destFileStream.streamLen;
    }
    var params = {
      streamId: downloadRes.destFileStream.streamId,
      length: _writeLength,
    };
    NetcaPKI.readStreamWithNetca(params)
      .Then(function (res) {
        that.readStreamWithDownload(res, downloadRes, callback);
      })
      .Catch(function (res) {
        alert(res.msg);
        $.unblockUI();
      });
  };
  // 下载完读取数据
  that.readStreamWithDownload = function (res, downloadRes, callback) {
    downloadRes.destFileEncode.push(res.data);
    if (!res.hasMoreData) {
      that.openPDFUrlCallBack(downloadRes, callback);
      return;
    }
    var _writeLength = writeLength * 1024 * 1024;
    // 小于20M 直接全部返回； 大于20M 分段返回
    if (res.destFileStream.streamLen < _writeLength) {
      _writeLength = res.destFileStream.streamLen;
    }
    var params = {
      streamId: res.destFileStream.streamId,
      length: _writeLength,
    };

    NetcaPKI.readStreamWithNetca(params)
      .Then(function (res) {
        that.readStreamWithDownload(res, downloadRes, callback);
      })
      .Catch(function (res) {
        alert(res.msg);
        $.unblockUI();
      });
  };
  that.openPDFUrlCallBack = function (res, callback) {
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    // 分段转换base64为arrayBuffer
    var byteArr = [];
    var totalLength = 0;
    let offset = 0;
    for (let index = 0; index < res.destFileEncode.length; index++) {
      var Bytes = NetcaUtils.convertDataURIToBinary(res.destFileEncode[index]);
      byteArr.push(Bytes);
      totalLength += Bytes.length;
    }
    var combinedUint8Array = new Uint8Array(totalLength);
    for (let index = 0; index < byteArr.length; index++) {
      combinedUint8Array.set(byteArr[index], offset);
      offset += byteArr[index].length;
    }
    // 打开文件
    globalPDFViewerApplication.open(combinedUint8Array);
    // 重新打开时  删除旧的streamId,保存新的streamId
    if (unfinishedStreamId) {
      that.destoryStreamCallBack(unfinishedStreamId);
    }
    that.getSealConfigInfo(verifyLevel, res.destFileStream.streamId);
    unfinishedStreamId = res.destFileStream.streamId;
    that.setStreamId(unfinishedStreamId);
    if (callback !== undefined) {
      callback();
    }
  };

  // 打开按钮
  that.openFile = function (file) {
    if (!file) {
      return false;
    }
    if (file.name.substring(file.name.lastIndexOf(".") + 1) !== "pdf") {
      layer.msg("不支持打开非pdf文件", { icon: 2 });
      return false;
    }
    // 签名域信息置空
    signFields = [];
    // 1: 自动打开文档后验证
    operation = 1;
    // 验签信息置空
    that.VerifyInfos = [];
    // 删除上一次绘制的签名域
    if ($(".netcafieldInfo").length) {
      $(".netcafieldInfo").remove();
    }
    $("#netcasignedDataVerify").css("display", "none");
    $("#netcaDisplaySignedDataVerify").css("display", "none");
    $("#viewerContainer").css({ "margin-top": "0" });
    // 打开按钮，文档加载时是否自动验证文档有效性
    isVerifyOpen = isVerifyOpenWithOpenBtn;
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    // 读取文件
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
      globalPDFViewerApplication.open(reader.result);
      // 加个定时器为了知道什么时候文件加载完成
      var interval = setInterval(function () {
        if (globalPDFViewerApplication.pdfDocument == null) {
          console.info("Loading...");
        } else {
          $.unblockUI();
          clearInterval(interval);
          NetcaPDFSeal.getSignPDFBytes(function (data) {
            var params = {
              srcBytes: NetcaUtils.arrayBufferToBase64(data), // 源Pdf文件的Base64编码
            };
            // if(document.getElementById("button_merge").name!=""){
            //     NetcaPKI.initMergeSeal(params)
            //         .Then(function (res) {
            //             document.getElementById("mergeInfos").value = '';
            //             document.getElementById("button_merge").name = res.id;
            //             var result = "初始化合并模式成功，业务id为：" + res.id;
            //         })
            //         .Catch(function (res) {
            //             alert(res.msg);
            //         })
            // }
            // 创建流
            that.createStreamCallBack(data.length, params, "plain");
          });
        }
      }, 500);
    };
  };
  //高度累加,计算纵坐标
  that.addHeight = function (n) {
    var result = 0;
    while (n >= 2) {
      var _height =
        $("#viewer .page")
          .eq(n - 2)
          .height() + 11;
      result += _height;
      n--;
    }
    return result;
  };
  // viewer点击事件
  that.netcaPDFClickEvent = function (signObj, res, x, y, w, h) {
    // var pdfviewer = document.getElementById('netcasignpdf');
    // var pdfviewerL = pdfviewer.offsetLeft;
    // var pdfviewerT = pdfviewer.offsetTop;

    // var flag = 2;
    // var pageNum = globalPDFViewerApplication.page;//当前页码
    // // 前n-1页 高度
    // var _height = 0;
    // if(pageNum > 1){
    //     _height = that.addHeight(pageNum);
    // }
    // $('#viewer').click(function(e){
    //     flag--;
    //     /**鼠标点击的位置，相对于文档的左边缘/上边缘*/
    //     var client_x = e.clientX;
    //     var client_y = e.clientY;

    //     var viewer_width = $('#viewer').width();
    //     var blank_top = $('#toolbarViewer').height() + 9;
    //     var pdfscrollTop = $('#viewerContainer').scrollTop(); //文档滚动高度

    //     //验证提示信息的高度
    //     if($('#netcasignedDataVerify').css('display') === 'block'){
    //         blank_top = blank_top + $('#netcasignedDataVerify').outerHeight();
    //     }

    //     var clicky_temp = client_y - blank_top + pdfscrollTop - pdfviewerT;
    //     click_y = clicky_temp - _height;
    //     // 大文件打开时只显示当前页，所以没有多个page
    //     var page_width = 0;
    //     if ($('#viewer .page').length > 1) {
    //         page_width = $('#viewer .page').eq(pageNum-1).width();
    //     } else {
    //         page_width = $('#viewer .page').eq(0).width();
    //     }
    //     var blank_left = (viewer_width - page_width) / 2;
    //     var clickx_temp =  client_x - pdfviewerL;
    //     click_x = clickx_temp - blank_left;

    //     //假如显示第1页，签第2页的位置
    //     var currentPageHeight = that.addHeight(pageNum + 1);
    //     if(currentPageHeight < clicky_temp){
    //         pageNum = pageNum + 1;
    //         that.calculateCurrentHeightAgain(pageNum, clickx_temp, clicky_temp, viewer_width);
    //     }

    //     // 假如显示第2页，签第1页页尾位置
    //     if(click_y<0){
    //         //计算负数  重算高度  宽度
    //         pageNum = pageNum -1;
    //         that.calculateCurrentHeightAgain(pageNum, clickx_temp, clicky_temp, viewer_width);
    //     }

    //     if(flag>0){
    //         /**每次点击只触发一次签章 超出文档左右界线不能点击签章*/
    //         if(click_x>0 && (viewer_width - click_x - blank_left) >= blank_left){
    //             $.blockUI(blockUIConfig('正在盖章中，请稍等...'));
    //             if(signObj.signType === 1 || signObj.signType === 2) {
    //                 // 批量签章  骑缝章
    //                 that.seal_signatureCreatorBatchOrAcrossPage(signObj, pageNum, type);
    //                 return false;
    //             }else {
    //                 // 签章函数
    //                 that.seal_SignSealPosition(signObj, pageNum, type);
    //                 return false;
    //             }
    //         } else {
    //             that.hideSignImage();
    //             $("#sign").html('<img src="ui/images/icon/but_signature.png" alt=""><br>签章');
    //             alert('不在签章范围内');
    //         }
    //     }
    // })
    var pdfviewer = document.getElementById("netcasignpdf");
    var pdfviewerL = pdfviewer.offsetLeft;
    var pdfviewerT = pdfviewer.offsetTop;
    var flag = 2;
    var pageNum = globalPDFViewerApplication.page; //当前页码
    // 前n-1页 高度
    var _height = 0;
    if (pageNum > 1) {
      _height = that.addHeight(pageNum);
    }
    $("#viewer").click(function (e) {
      flag--;
      /**鼠标点击的位置，相对于文档的左边缘/上边缘*/
      var client_x = e.clientX;
      var client_y = e.clientY;
      // 拿了页面宽度
      var viewer_width = $("#viewer").width();
      // 拿了上方空白 +9 是固定向上抬高9px
      var blank_top = $("#toolbarViewer").height() + 9;
      // 文档滚动高度
      var pdfscrollTop = $("#viewerContainer").scrollTop();
      var pdfscrollLeft = $("#viewerContainer").scrollLeft();

      // 如果有验证提示信息，上方的高度要加上提示信息框的高度
      if ($("#netcasignedDataVerify").css("display") === "block") {
        blank_top = blank_top + $("#netcasignedDataVerify").outerHeight();
      }
      // 算一下x和y的坐标值
      var clicky_temp = client_y - blank_top + pdfscrollTop - pdfviewerT;
      click_y = clicky_temp - _height;
      var page_width = $("#viewer .page")
        .eq(pageNum - 1)
        .width();
      var blank_left = (viewer_width - page_width) / 2;
      var clickx_temp = client_x + pdfscrollLeft - pdfviewerL;
      if (viewer_width > page_width) {
        click_x = clickx_temp - blank_left;
      } else {
        click_x = clickx_temp - 9;
      }

      //假如显示第1页，签第2页页头的位置
      var currentPageHeight = that.addHeight(pageNum + 1);
      if (currentPageHeight < clicky_temp) {
        pageNum = pageNum + 1;
        that.calculateCurrentHeightAgain(
          pageNum,
          clickx_temp,
          clicky_temp,
          viewer_width,
        );
      }

      // 假如显示第2页，签第1页页尾位置
      if (click_y < 0) {
        //计算负数  重算高度  宽度
        pageNum = pageNum - 1;
        that.calculateCurrentHeightAgain(
          pageNum,
          clickx_temp,
          clicky_temp,
          viewer_width,
        );
      }

      if (flag > 0) {
        /**每次点击只触发一次签章 超出文档左右界线不能点击签章*/
        if (
          (click_x > 0 && viewer_width - click_x - blank_left >= blank_left) ||
          viewer_width <
            $("#viewer .page")
              .eq(pageNum - 1)
              .width()
        ) {
          $("#viewerContainer").append(
            "" +
              '<img class="vSealBoxDelete" id="vSealBoxDelete' +
              chartletNum +
              '" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
              'style="position:absolute;top:' +
              (y + pdfscrollTop - 19) +
              "px;left:" +
              (x + w + pdfscrollLeft - 19) +
              'px;z-index:1000;">' +
              "",
          );
          $("#viewerContainer").append(
            ' <div class="vSealBox" id="vSealBox' +
              chartletNum +
              '" style="position:absolute;z-index:999;width:' +
              w +
              "px;height:" +
              h +
              "px;left:" +
              (x + pdfscrollLeft - 4) +
              "px;top:" +
              (y + pdfscrollTop - 4) +
              'px;"></div>',
          );

          // /**
          //  *
          //  * 删除贴图逻辑，先从id里找到这是第几号贴图，然后根据号码把这个贴图从数组中删除
          //  *
          //  */
          // var deleteClick = function (event) {
          //     event.stopPropagation();
          //     event.cancelBubble = false;
          //     var index = event.target.id.substring(14)
          //     // 界面上删去该贴图
          //     $("#vSeal" + index).remove();
          //     $("#vSealBox" + index).remove();
          //     $("#vSealBoxDelete" + index).remove();

          //     // 逻辑上删去该贴图
          //     for (var k = 0; k < saveChartletArray.length; k++) {
          //         if (saveChartletArray[k].id > Number(index)) {
          //             saveChartletArray[k - 1] = saveChartletArray[k]
          //         }
          //     }

          //     saveChartletArray.length -= 1;
          // }

          // document.querySelector('#vSealBoxDelete' + chartletNum).addEventListener('click', deleteClick)
          // $('#viewerContainer').append(' <img class="vSeal" id="vSeal' + chartletNum + '" src="data:image/PNG;base64,' + res.picture + '" style="position:absolute;z-index:99;width:' + w + 'px;height:' + h + 'px;left:' + (x+ pdfscrollLeft) + 'px;top:' + (y + $('#viewerContainer').scrollTop()) + 'px;opacity: 0.5;"></img>');
          // 算一下如果要传给底层需要怎么处理
          var newscale = that.getScale(); //缩放比例
          var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
          saveChartletArray.push({
            id: chartletNum,
            pageNum: pageNum,
            xPos: parseInt(
              (scale / newscale) * (click_x - sealImage_halfWidth),
            ),
            yPos: parseInt(
              (scale / newscale) * (click_y - sealImage_halfheight + 4),
            ),
            width: parseInt(originImage_width), //签名域/签章的宽度
            height: parseInt(originImage_height), //签名域/签章的高度
            sealImageEncode: sealImageSrc,
          });
          chartletNum++;
          debounce(reChartlrt)();
          that.hideSignImage();
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
        } else {
          that.hideSignImage();
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          alert("不在签章范围内");
          return;
        }
      }
    });
  };

  // 以当前页码为
  that.calculateCurrentHeightAgain = function (
    pageNum,
    clickx_temp,
    clicky_temp,
    viewer_width,
  ) {
    var _height;
    if (pageNum > 1) {
      _height = that.addHeight(pageNum);
    } else {
      _height = 0;
    }
    click_y = clicky_temp - _height;

    var page_width = $("#viewer .page")
      .eq(pageNum - 1)
      .width();
    var blank_left = (viewer_width - page_width) / 2;
    click_x = clickx_temp - blank_left;
  };

  that.freeSeal = function () {
    if (freeLength == 0) {
      $.blockUI(blockUIConfig("提交签名中，请稍等..."));
    }
    var newscale = that.getScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var _xPos = parseInt(
      (scale / newscale) *
        (freeSealParams[freeLength].click_x - sealImage_halfWidth),
    ); //签名域/签章左下角的水平向右方向坐标
    var _yPos = parseInt(
      (scale / newscale) *
        (freeSealParams[freeLength].click_y - sealImage_halfheight),
    ); //签名域/签章左下角的垂直向上方向坐标

    var params = {
      srcFile: "", //源pdf文件
      srcBytes: "", //源Pdf文件的Base64编码
      srcStreamId: unfinishedStreamId,
      destFile: "", //目标pdf文件
      certEncode: certEncode, //签名证书Base64编码
      selMode: 1, //操作模式
      signFieldText: "", //签名域显示的文字
      sealImageEncode: sealImageSrc, //签章图片Base64编码
      revInfoIncludeFlag: revInfoIncludeFlag, //是否包含吊销信息
      //签名位置对象
      SignPosition: {
        pageNum: freeSealParams[freeLength].pageNum, //PDF文档的页码
        xPos: _xPos, //签名域/签章左下角的水平向右方向坐标
        yPos: _yPos, //签名域/签章左下角的垂直向上方向坐标
        width: parseInt(originImage_width), //签名域/签章的宽度
        height: parseInt(originImage_height), //签名域/签章的高度
      },
      //时间戳对象
      Tsa: {
        tsaUrl: timeStamp.tsaUrl, //时间戳地址
        tsaUsr: timeStamp.tsaUsr, //时间戳服务对应用户名
        tsaPwd: timeStamp.tsaPwd, //时间戳服务对应用户的密码
        tsaHashAlgo: timeStamp.tsaHashAlgo, //时间戳使用的hash算法，例如”sha-1”，”sha-256”等
      },
      synVerify: true, //签完名之后同步验证文档
      synGetSignFiled: true, //签完名之后同步获取签名域
      level: verifyLevel, //验证级别
      isReturnStreamId: true, //使用流标识返回结果
    };

    if (freeSealParams[freeLength].type === 2) {
      //无外观签名
      params.sealImageEncode = null;
      params.SignPosition = {
        pageNum: -1,
        xPos: 0,
        yPos: 0,
        width: 0,
        height: 0,
      };
      params.visible = false;
    }

    // 调用签章接口，在完全完成签章之前，递归进行此函数
    NetcaPKI.SignatureCreatorPdfSignSealFieldOrPosition(params)
      .Then(function (res) {
        if (freeLength === freeSealParams.length - 1) {
          that.hideSignImage();
          document.getElementById("viewer").onclick = null;
          $(document).unbind("mousedown");
          $(document).unbind("mousemove");
          $("#netcasignedDataVerify").css("display", "none");
          $("#viewerContainer").css({ "margin-top": "0px" });
          $(".netcainvalidBtn").css("display", "none");
          $("#freeBtnOK").css("display", "none");
          $("#freeBtnNO").css("display", "none");
          $(".netcainvalidClose").css("display", "inline-block");
          $("img").remove(".vSeal");
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          that.SignatureCreatorSuccessCallBack(res);
          filedFlag = true; //开启刚签完的章能撤章
          freeLength = 0;
        } else {
          addVerifyInfoLen.push(1);
          NetcaPDFSeal.SetPDFBytes = res.destFileEncode;
          unfinishedStreamId = res.destFileStream.streamId;
          that.VerifyInfos = res.VerifyInfos;
          freeLength++;
          that.freeSeal();
        }
        // isShowDeleteBtn = false;
      })
      .Catch(function (res) {
        that.SignatureCreatorFailedCallBack(res);
      });
  };
  $("#freeBtnOK").click(function () {
    if (freeSealParams.length == 0) {
      alert("请添加自由签章外观");
      return;
    }
    that.hideSignImage();
    document.getElementById("viewer").onclick = null;
    $("#netcasignedDataVerify").css("display", "none");
    $("#viewerContainer").css({ "margin-top": "0px" });
    $(document).unbind("mousedown");
    $(document).unbind("mousemove");
    $("#freeBtnOK").css("display", "none");
    $("#freeBtnNO").css("display", "none");
    $(".netcainvalidClose").css("display", "inline-block");
    $(".vSealBox").remove();
    $(".vSealBoxDelete").remove();
    $(".vSeal").remove();
    that.freeSeal();
  });
  $("#freeBtnNO").click(function () {
    that.hideSignImage();
    $("#sign").html(
      '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
    );
    document.getElementById("viewer").onclick = null;
    $("#netcasignedDataVerify").css("display", "none");
    $("#viewerContainer").css({ "margin-top": "0px" });
    $(document).unbind("mousedown");
    $(document).unbind("mousemove");
    $("#freeBtnOK").css("display", "none");
    $("#freeBtnNO").css("display", "none");
    $(".netcainvalidClose").css("display", "inline-block");
    $(".vSealBox").remove();
    $(".vSealBoxDelete").remove();
    $(".vSeal").remove();
    freeSealParams = [];
  });

  that.seal_SignSealPosition = function (signObj, _pageNum, _type) {
    var newscale = that.getScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var _xPos =
      parseInt((scale / newscale) * (click_x - sealImage_halfWidth)) ||
      signObj.signPositionParams.xPos; //签名域/签章左下角的水平向右方向坐标
    var _yPos =
      parseInt((scale / newscale) * (click_y - sealImage_halfheight)) ||
      signObj.signPositionParams.yPos; //签名域/签章左下角的垂直向上方向坐标
    var _rotation = isNaN(globalPDFViewerApplication.pdfViewer.pagesRotation)
      ? 0
      : globalPDFViewerApplication.pdfViewer.pagesRotation;

    // var _merge = document.getElementById("button_merge").name==""?false:true;
    // var _mergeId = document.getElementById("button_merge").name;
    var params = {
      srcFile: "", //源pdf文件
      srcBytes: "", //源Pdf文件的Base64编码
      srcStreamId: unfinishedStreamId,
      destFile: "", //目标pdf文件
      certEncode: signObj.certEncode || certEncode, //签名证书Base64编码
      sealImageEncode: signObj.sealImageEncode || sealImageSrc, //签章图片Base64编码
      selMode: 1, //操作模式
      signFieldText: "", //签名域显示的文字
      revInfoIncludeFlag: revInfoIncludeFlag, //是否包含吊销信息
      //签名位置对象
      SignPosition: {
        pageNum: _pageNum, //PDF文档的页码
        xPos: _xPos, //签名域/签章左下角的水平向右方向坐标
        yPos: _yPos, //签名域/签章左下角的垂直向上方向坐标
        width: parseInt(originImage_width) || signObj.signPositionParams.width, //签名域/签章的宽度
        height:
          parseInt(originImage_height) || signObj.signPositionParams.height, //签名域/签章的高度
      },
      //时间戳对象
      Tsa: {
        tsaUrl: timeStamp.tsaUrl, //时间戳地址
        tsaUsr: timeStamp.tsaUsr, //时间戳服务对应用户名
        tsaPwd: timeStamp.tsaPwd, //时间戳服务对应用户的密码
        tsaHashAlgo: timeStamp.tsaHashAlgo, //时间戳使用的hash算法，例如”sha-1”，”sha-256”等
      },
      synVerify: true, //签完名之后同步验证文档
      synGetSignFiled: true, //签完名之后同步获取签名域
      level: verifyLevel, //验证级别
      isReturnStreamId: true, //使用流标识返回结果
      useCloudKeySignSeal: NetcaPDFSeal.signMode === 2, // 是否使用云密钥签章，false：不需要 true：需要
      // merge:_merge,
      // mergeSealId:_mergeId,
      rotation: _rotation,
    };

    if (_type === 2) {
      //无外观签名
      params.sealImageEncode = null;
      params.SignPosition = {
        pageNum: -1,
        xPos: 0,
        yPos: 0,
        width: 0,
        height: 0,
      };
      params.visible = false;
    }

    $("#sign").html(
      '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
    );
  };

  /**关键字签章*/
  that.seal_SealKeyWord = function (signObj, _pageNum, _type) {
    // var _merge = document.getElementById("button_merge").name==""?false:true;
    // var _mergeId = document.getElementById("button_merge").name;
    //Tsa对象说明
    // var Tsa = {
    //     tsaUrl: timeStamp.tsaUrl,      //时间戳地址
    //     tsaUsr: timeStamp.tsaUsr,       //时间戳服务对应用户名
    //     tsaPwd: timeStamp.tsaPwd,        //时间戳服务对应用户的密码
    //     tsaHashAlgo: timeStamp.tsaHashAlgo
    // };
    // //sealKeyWord对象说明
    // var sealKeyWord = {
    //     keyWord: signObj.keywordSignParams.keyword,                  //关键字
    //     startPage: signObj.keywordSignParams.startPageNum,       //PDF文档的开始页码
    //     endPage:signObj.keywordSignParams.endPageNum,           //PDF文档的结束页码
    //     keyWordIndex: signObj.keywordSignParams.index,        //关键字索引
    //     width: signObj.keywordSignParams.width,               //签名域矩形的宽度
    //     height: signObj.keywordSignParams.height,             //签名域矩形的高度
    //     offsetX: signObj.keywordSignParams.offsetX,                  //水平偏移量
    //     offsetY: signObj.keywordSignParams.offsetY                   //垂直偏移量
    // };
    // var params = {
    //     srcStreamId : unfinishedStreamId,                 //目标pdf文件
    //     certEncode : signObj.certEncode || certEncode,                //签名证书Base64编码
    //     sealImageEncode : signObj.sealImageEncode || sealImageSrc,                      //签章图片Base64编码
    //     selMode: 1, // 选择操作模式，有两种：进行签名操作（0）和进行签章操作（1）
    //     revInfoIncludeFlag : revInfoIncludeFlag,//是否包含吊销信息
    //     SealKeyWord: sealKeyWord,                                //sealKeyWord对象说明
    //     Tsa: Tsa,                                             //Tsa对象说明
    //     level: verifyLevel, //验证级别
    //     isReturnStreamId: true,  //使用流标识返回结果
    //     synVerify: true,
    //     synGetSignFiled: true, //签完名之后同步获取签名域
    //     useCloudKeySignSeal: NetcaPDFSeal.signMode === 2, // 是否使用云密钥签章，false：不需要 true：需要
    //     // merge:_merge,
    //     // mergeSealId:_mergeId

    // };
    // NetcaPKI.SignatureCreatorSignSealEx(params)
    //     .Then(function(res){
    //         // filedFlag = true;//开启刚签完的章能撤章
    //         // isShowDeleteBtn = false;
    //         $("#sign").html('<img src="ui/images/icon/but_signature.png" alt=""><br>签章');
    //         // NetcaSignAPI.SignatureCreatorSuccessCallBack(res)
    //     })
    //     .Catch(function(res){
    //         $("#sign").html('<img src="ui/images/icon/but_signature.png" alt=""><br>签章');
    //         NetcaSignAPI.SignatureCreatorFailedCallBack(res)
    //     })
    var newscale = that.getScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var K = scale / newscale;
    var pdfviewer = document.getElementById("netcasignpdf");
    var pdfviewerL = pdfviewer.offsetLeft;
    var pdfviewerT = pdfviewer.offsetTop;
    // 拿了页面宽度
    var viewer_width = $("#viewer").width();
    // 拿了上方空白 +9 是固定向上抬高9px
    var blank_top = $("#toolbarViewer").height() + 9;
    // 文档滚动高度
    var pdfscrollTop = $("#viewerContainer").scrollTop();
    // 如果有验证提示信息，上方的高度要加上提示信息框的高度
    if ($("#netcasignedDataVerify").css("display") === "block") {
      blank_top = blank_top + $("#netcasignedDataVerify").outerHeight();
    }

    var w = signObj.keywordSignParams.width / K;
    var h = signObj.keywordSignParams.height / K;
    var x;
    var y;
    NetcaPKI.getKeyWord({
      srcStreamId: unfinishedStreamId,
      keyword: signObj.keywordSignParams.keyword,
    })
      .Then(function (res) {
        if (!res.pages) {
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          layer.msg("找不到输入的关键字");
          return;
        }

        for (var i = 0; i < res.pages.length; i++) {
          if (
            res.pages[i].pageNum < signObj.keywordSignParams.startPageNum ||
            (res.pages[i].pageNum > signObj.keywordSignParams.endPageNum &&
              signObj.keywordSignParams.endPageNum != -1)
          ) {
            for (var j = i + 1; j < res.pages.length; j++) {
              res.pages[j - 1] = res.pages[j];
            }
            res.pages.length -= 1;
            i--;
          }
        }

        if (!res.pages) {
          $("#sign").html(
            '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
          );
          layer.msg("该页码范围找不到输入的关键字");
          return;
        }

        if (signObj.keywordSignParams.index == 1) {
          // 找到这个章所在页，然后算宽度
          var page_width = $("#viewer .page")
            .eq(res.pages[0].pageNum - 1)
            .width();
          var page_height = $("#viewer .page").eq(res.pages[0].pageNum - 1)[0]
            .offsetTop;
          // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
          if (viewer_width > page_width) {
            var blank_left = (viewer_width - page_width) / 2;
          } else {
            var blank_left = 9;
          }
          var blank_left = (viewer_width - page_width) / 2;
          if (signObj.keywordSignParams.offsetX) {
            res.pages[0].keywords[0].x += signObj.keywordSignParams.offsetX;
          }
          if (signObj.keywordSignParams.offsetY) {
            res.pages[0].keywords[0].y += signObj.keywordSignParams.offsetY;
          }

          res.pages[0].keywords[0].y -= signObj.keywordSignParams.height / 2;

          x = res.pages[0].keywords[0].x / K + blank_left;
          y = res.pages[0].keywords[0].y / K + 9 + page_height;
          // $('#viewerContainer').append(' <img class="vSeal" id="vSeal' + chartletNum + '" src="data:image/PNG;base64,' + signObj.keywordSignParams.picture + '" style="position:absolute;z-index:99;width:' + w + 'px;height:' + h + 'px;left:' + x + 'px;top:' + (y) + 'px;opacity: 0.5;"></img>');
          // $('#viewerContainer').append(' <div class="vSealBox" id="vSealBox' + chartletNum + '" style="position:absolute;z-index:99;width:' + w + 'px;height:' + h + 'px;left:' + (x - 4) + 'px;top:' + (y - 4) + 'px;"></div>');
          // $('#viewerContainer').append('' +
          //     '<img class="vSealBoxDelete" id="vSealBoxDelete' + chartletNum + '" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
          //     'style="position:absolute;top:' + (y - 19) + 'px;left:' + (x + w - 19) + 'px;z-index:1000;">' +
          //     '');
          saveChartletArray.push({
            id: chartletNum,
            pageNum: res.pages[0].pageNum,
            xPos: res.pages[0].keywords[0].x,
            yPos: res.pages[0].keywords[0].y,
            width: signObj.keywordSignParams.width, //签名域/签章的宽度
            height: signObj.keywordSignParams.height, //签名域/签章的高度
            sealImageEncode: signObj.keywordSignParams.picture,
          });
          // var deleteClick = function (event) {
          //     event.stopPropagation();
          //     event.cancelBubble = false;
          //     var index = event.target.id.substring(14)

          //     // 界面上删去该贴图
          //     $("#vSeal" + index).remove();
          //     $("#vSealBox" + index).remove();
          //     $("#vSealBoxDelete" + index).remove();

          //     // 逻辑上删去该贴图
          //     for (var k = 0; k < saveChartletArray.length; k++) {
          //         if (saveChartletArray[k].id > Number(index)) {

          //             saveChartletArray[k - 1] = saveChartletArray[k]
          //         }
          //     }

          //     saveChartletArray.length -= 1;
          // }

          // document.querySelector('#vSealBoxDelete' + chartletNum).addEventListener('click', deleteClick)
          chartletNum++;
          debounce(reChartlrt)();
        } else if (signObj.keywordSignParams.index == -1) {
          var length = res.pages.length - 1;
          var length2 = res.pages[length].keywords.length - 1;
          // 找到这个章所在页，然后算宽度
          var page_width = $("#viewer .page")
            .eq(res.pages[length].pageNum - 1)
            .width();
          var page_height = $("#viewer .page").eq(
            res.pages[length].pageNum - 1,
          )[0].offsetTop;
          // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
          if (viewer_width > page_width) {
            var blank_left = (viewer_width - page_width) / 2;
          } else {
            var blank_left = 9;
          }
          if (signObj.keywordSignParams.offsetX) {
            res.pages[length].keywords[length2].x +=
              signObj.keywordSignParams.offsetX;
          }
          if (signObj.keywordSignParams.offsetY) {
            res.pages[length].keywords[length2].y +=
              signObj.keywordSignParams.offsetY;
          }
          res.pages[length].keywords[length2].y -=
            signObj.keywordSignParams.height / 2;
          x = res.pages[length].keywords[length2].x / K + blank_left;
          y = res.pages[length].keywords[length2].y / K + 9 + page_height;

          saveChartletArray.push({
            id: chartletNum,
            pageNum: res.pages[length].pageNum,
            xPos: res.pages[length].keywords[length2].x,
            yPos: res.pages[length].keywords[length2].y,
            width: signObj.keywordSignParams.width, //签名域/签章的宽度
            height: signObj.keywordSignParams.height, //签名域/签章的高度
            sealImageEncode: signObj.keywordSignParams.picture,
          });

          chartletNum++;
          debounce(reChartlrt)();
        } else if (signObj.keywordSignParams.index == 0) {
          var flag = false;
          for (var i = 0; i < res.pages.length; i++) {
            var page_width = $("#viewer .page")
              .eq(res.pages[i].pageNum - 1)
              .width();
            var page_height = $("#viewer .page").eq(res.pages[i].pageNum - 1)[0]
              .offsetTop;
            // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
            if (viewer_width > page_width) {
              var blank_left = (viewer_width - page_width) / 2;
            } else {
              var blank_left = 9;
            }
            for (var j = 0; j < res.pages[i].keywords.length; j++) {
              if (signObj.keywordSignParams.offsetX) {
                res.pages[i].keywords[j].x += signObj.keywordSignParams.offsetX;
              }
              if (signObj.keywordSignParams.offsetY) {
                res.pages[i].keywords[j].y += signObj.keywordSignParams.offsetY;
              }
              res.pages[i].keywords[j].y -=
                signObj.keywordSignParams.height / 2;
              x = res.pages[i].keywords[j].x / K + blank_left;
              y = res.pages[i].keywords[j].y / K + 9 + page_height;

              saveChartletArray.push({
                id: chartletNum,
                pageNum: res.pages[i].pageNum,
                xPos: res.pages[i].keywords[j].x,
                yPos: res.pages[i].keywords[j].y,
                width: signObj.keywordSignParams.width, //签名域/签章的宽度
                height: signObj.keywordSignParams.height, //签名域/签章的高度
                sealImageEncode: signObj.keywordSignParams.picture,
              });
              flag = true;

              chartletNum++;
            }
          }
          debounce(reChartlrt)();
          if (flag === false) {
            layer.msg("该页码范围找不到输入的关键字");
          }
        }
        $("#sign").html(
          '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
        );
      })
      .Catch(function (res) {
        NetcaPKI.readStream({ streamId: unfinishedStreamId })
          .Then(function (res) {})
          .Catch(function (res) {});

        $("#sign").html(
          '<img src="ui/images/icon/but_signature.png" alt=""><br>签章',
        );
        alert("获取关键字信息失败:" + res.msg);
      });
    $.unblockUI();
  };

  // 递归读流
  that.SignatureCreatorSuccessReadStreamUpdateCallBack = function (
    res,
    signSuccessRes,
    index,
  ) {
    completedStreamId = res.destFileStream.streamId;
    signSuccessRes.destFileEncode.push(res.data);
    if (!res.hasMoreData) {
      that.SignatureCreatorCallBack(
        signSuccessRes,
        res.destFileStream.streamId,
      );
      return;
    }
    // 读10M
    var params = {
      streamId: res.destFileStream.streamId,
      length: writeLength * 1024 * 1024,
    };
    NetcaPKI.readStream(params)
      .Then(function (res) {
        that.SignatureCreatorSuccessReadStreamUpdateCallBack(
          res,
          signSuccessRes,
        );
      })
      .Catch(function (res) {
        that.SignatureCreatorFailedCallBack(res, index);
      });
  };

  // 签章成功后读流
  that.SignatureCreatorSuccessReadStreamCallBack = function (signSuccessRes) {
    that.setStreamId(signSuccessRes.destFileStream.streamId);
    completedStreamId = signSuccessRes.destFileStream.streamId;
    signSuccessRes.destFileEncode = [];
    var params = {
      streamId: signSuccessRes.destFileStream.streamId,
      length: writeLength * 1024 * 1024,
    };

    NetcaPKI.readStream(params)
      .Then(function (res) {
        that.SignatureCreatorSuccessReadStreamUpdateCallBack(
          res,
          signSuccessRes,
        );
      })
      .Catch(function (res) {
        that.SignatureCreatorFailedCallBack(res);
      });
  };

  // 签章成功回调
  that.SignatureCreatorSuccessCallBack = function (res) {
    // 多文件打开模式,sealFileId存streamId,更新左侧导航列表对应文件的签章状态
    if (NetcaPDFSeal.mode == 2) {
      var pdfIndex = $("#leftNav ul li").index($("#leftNav ul li.actived")[0]); // 记录当前选中的pdf的索引
      NetcaPDFSeal.multiplePDFUrlData[pdfIndex].sealFileId = res.destFileStream
        ? res.destFileStream.streamId
        : null;
      NetcaPDFSeal.multiplePDFUrlData[pdfIndex].hasSign = true;

      var _$signStatus = $("#leftNav ul li").eq(pdfIndex).find(".sign-status");
      if (!_$signStatus.hasClass("actived")) {
        _$signStatus.addClass("actived");
      }
    }
    // 签章成功后读流
    that.SignatureCreatorSuccessReadStreamCallBack(res);
  };

  // 签章成功回调
  that.SignatureCreatorCallBack = function (uint8Array) {
    function chunkedBtoa(chunk) {
      var CHUNK_SIZE = 1000;
      var encoded = "";
      for (var i = 0; i < chunk.length; i += CHUNK_SIZE) {
        var subChunk = chunk.slice(i, i + CHUNK_SIZE);
        encoded += String.fromCharCode.apply(null, subChunk);
      }
      return btoa(encoded);
    }
    // 每次处理的块大小
    const chunkSize = 1024 * 1024 * 500; // 500MB
    const totalChunks = Math.ceil(uint8Array.byteLength / chunkSize);
    let base64String = [];
    for (let i = 0; i < totalChunks; i++) {
      const chunk = uint8Array.subarray(i * chunkSize, (i + 1) * chunkSize);
      base64String.push(chunkedBtoa(chunk));
    }

    $.unblockUI();
    layer.msg("签名/章成功", { icon: 1 });
    if (that.signCallbackEvent != null) {
      that.signCallbackEvent(
        JSON.stringify({
          status: 0,
          msg: "签名成功",
          result: base64String,
        }),
      );
    }
  };

  that.getSignatureCount = function () {
    return that.VerifyInfos.length;
  };

  //创建数据流
  that.createStreamCallBack = function (
    len,
    signParams,
    saveType,
    openWay,
    obj,
  ) {
    $("#netcasignedDataVerify").css("display", "block");
    $(".netcainvalidIcon img").css("display", "none");
    $(".netcasignedDataVerify_r").css("display", "none");
    $(".netcainvalidInfo").text("正在载入文件，请等待，不要进行签章");
    var params = {
      length: len,
      type: 2, // 1:内存流 2：文件
    };
    NetcaPKI.createStream(params)
      .Then(function (res) {
        unfinishedStreamId = res.streamId;
        that.setStreamId(unfinishedStreamId);
        that.writeStreamCallBack(res, signParams, len, saveType, openWay, obj);
      })
      .Catch(function (res) {
        $("#netcasignedDataVerify").css("display", "none");
        $("#viewerContainer").css({ "margin-top": "0" });
        alert(res.msg);
        $.unblockUI();
      });
  };

  // 写入数据流
  that.writeStreamCallBack = function (
    res,
    signParams,
    len,
    saveType,
    openWay,
    obj,
  ) {
    if (res.streamWritePos >= len) {
      if (!obj) {
        // 传入base64打开文件，多一步获取文件配置信息
        if (openWay === "openPDFBytes") {
          that.getSealConfigInfo(verifyLevel, res.streamId);
        } else {
          that.signedDataVerify("", "", verifyLevel, res.streamId);
        }
      } else {
        var interval = setInterval(function () {
          if (globalPDFViewerApplication.pdfDocument == null) {
            console.info("Loading...");
          } else {
            $.unblockUI();
            if ($("#viewer .page").length > 0) {
              console.info("Load Success...");
              clearInterval(interval);
              that.describeSignatureField(); //描绘签名域
              var timer = setInterval(function () {
                if (hasDescribeSignatureField) {
                  clearInterval(timer);
                  that.createRevokeEvent(obj.res.id, obj.streamId); //撤章事件
                }
              }, 10);
            }
          }
        }, 500);
      }

      base64StringLength = 0;
      $("#netcasignedDataVerify").css("display", "none");
      return;
    }
    var params = {
      streamId: res.streamId,
      data: signParams.srcBytes[base64StringLength],
      saveType: saveType,
    };
    NetcaPKI.writeStream(params)
      .Then(function (res) {
        base64StringLength++;
        that.writeStreamCallBack(res, signParams, len, saveType, openWay, obj);
      })
      .Catch(function (res) {
        // 请求有错，下方提示语隐藏
        $("#netcasignedDataVerify").css("display", "none");
        $("#viewerContainer").css({ "margin-top": "0" });
        alert(res.msg);
        $.unblockUI();
      });
  };
  that.readStreamUpdateCallBack = function (res) {
    NetcaPDFSeal.SetPDFBytes += res.data;
  };
  // 销毁数据流
  that.destoryStreamCallBack = function (id) {
    var params = {
      streamId: id,
    };
    NetcaPKI.destoryStream(params)
      .Then(function (res) {})
      .Catch(function (res) {
        alert(res.msg);
      });
  };
  //  大文件 与 小文件 处理方式划分
  that.isBigFile = function () {
    return true;
  };

  // 签章失败回调
  that.SignatureCreatorFailedCallBack = function (res) {
    that.hideSignImage();
    alert("签名/章失败 " + res.msg);
    JSON.parse;
    if (that.signCallbackEvent != null) {
      that.signCallbackEvent(
        JSON.stringify({
          status: -1,
          msg: "签名失败",
        }),
      );
    }
    $.unblockUI();
  };
  /**
   * 隐藏签章图片
   * */
  that.hideSignImage = function () {
    $(".NetcaSignMoveDiv").css({ display: "none" });
  };
  /**
   * 重置状态：关闭layer、签章图片隐藏、展示最新pdf
   * */
  that.resetOriginalState = function (res, streamId) {
    var page = globalPDFViewerApplication.page;
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    // 分段转换base64为arrayBuffer
    var byteArr = [];
    var totalLength = 0;
    let offset = 0;
    for (let index = 0; index < res.destFileEncode.length; index++) {
      var Bytes = NetcaUtils.convertDataURIToBinary(res.destFileEncode[index]);
      byteArr.push(Bytes);
      totalLength += Bytes.length;
    }
    var combinedUint8Array = new Uint8Array(totalLength);
    for (let index = 0; index < byteArr.length; index++) {
      combinedUint8Array.set(byteArr[index], offset);
      offset += byteArr[index].length;
    }
    // 打开文件
    globalPDFViewerApplication.open(combinedUint8Array);
    // 重新打开时  删除旧的streamId,保存新的streamId
    if (unfinishedStreamId) {
      that.destoryStreamCallBack(unfinishedStreamId);
    }
    unfinishedStreamId = completedStreamId;
    var interval = setInterval(function () {
      if (globalPDFViewerApplication.pdfDocument == null) {
        console.info("Loading...");
      } else {
        $.unblockUI();
        if ($("#viewer .page").length > 0) {
          console.info("Load Success...");
          clearInterval(interval);
          that.describeSignatureField(); //描绘签名域
          var timer = setInterval(function () {
            if (hasDescribeSignatureField) {
              clearInterval(timer);
              globalPDFViewerApplication.pdfLinkService.goToPage(page);
            }
          }, 10);
        }
      }
    }, 100);
    $("#NetcaSignMoveImage").attr("src", "");
    that.hideSignImage();
  };
  //获取页面缩放比例
  that.getScale = function () {
    var scale = Number($("#scaleSelect").val()); //缩放比例
    /*
           ctrl+鼠标缩放页面时，缩放倍数不是option中预设的，获取到的scale会是0；
           通过globalPDFViewerApplication.getCurrentScale()拿到当前的scale
       * */
    var currentScale = globalPDFViewerApplication.getCurrentScale();
    scale = scale ? scale : currentScale;
    return scale;
  };

  /**
   * signatureVerifierVerifyPDF PDF签名文档进行验证
   * */
  that.signedDataVerify = function (_srcFile, _srcBytes, _level, streamId) {
    $.unblockUI();
  };

  that.displaySignedDataVerifyTip = function (info) {
    if (NetcaPDFSeal.hiddenVerificationSignaturePrompt) {
      $("#netcasignedDataVerify").css("display", "none");
      $("#viewerContainer").css({ "margin-top": "0px" });
      return false;
    }
    if (info.length) {
      if ($("#netcasignedDataVerify").css("display") === "none") {
        $("#netcasignedDataVerify").css({
          display: "inline-block",
        });
      }
      var status = NetcaPDFSeal.getVerifySignSuccessFlag(info); //根据verifyResult 1成功 2不确定  3失败
      if (status === 0) {
        //失败
        $(".netcainvalidInfo").text(
          '至少一个签名验证失败，请点击右方 "详细信息" 查询签名的详细验证信息。',
        );
        $(".netcainvalidIcon img").attr(
          "src",
          "ui/images/icon/certicon_invalid.png",
        );
      } else if (status === 1) {
        //成功
        $(".netcainvalidInfo").text(
          '签名验证成功，请点击右方 "详细信息" 查询签名的详细验证信息。',
        );
        $(".netcainvalidIcon img").attr(
          "src",
          "ui/images/icon/certicon_valid.png",
        );
      } else {
        //-1 不确定

        $(".netcainvalidInfo").text(
          '文档内容自签名以来未被篡改，但至少有一个签名的证书验证不通过。请点击右方 "详细信息" 查询签名的详细验证信息。',
        );
        $(".netcainvalidIcon img").attr(
          "src",
          "ui/images/icon/certicon_known.png",
        );
      }
      if ($("#netcainvalidBtn").css("display") === "none") {
        $("#netcainvalidBtn").css({
          display: "inline-block",
        });
      }
      if ($("#netcaDisplaySignedDataVerify").css("display") === "block") {
        $("#netcaDisplaySignedDataVerify").css({ top: "117px", height: "84%" });
      }
      $(".netcainvalidIcon img").css("display", "inline-block");
      $("#viewerContainer").css({ "margin-top": "47px" });
    } else {
      that.notFoundSignature();
    }
  };

  // 本文档找不到可验证的签名
  that.notFoundSignature = function () {
    $(".netcainvalidIcon img").attr("src", "");
    $("#netcasignedDataVerify").css("display", "block");
    $("#netcainvalidBtn").css("display", "none");
    $("#netcaDisplaySignedDataVerify").css("display", "none");
    $(".netcasignedDataVerify_r").css("display", "block");
    $("#viewerContainer").css({ "margin-top": "47px" });
    that.VerifyInfos = [];
  };
  /**
   * 动态生成 签名验证 具体信息
   * */
  that.createSignedDataVerifyInfo = function () {
    var icon = "";
    var htmlDOM = "";
    //清空节点内容
    $("div").remove(".netcasignDetail");
    for (var i = 0; i < that.VerifyInfos.length; i++) {
      (function (i) {
        // verifyResult  确定签名状态
        if (that.VerifyInfos[i].verifyResult === 3) {
          icon = "icon_invalid";
          that.VerifyInfos[i].status1 = "签名无效";
        } else if (that.VerifyInfos[i].verifyResult === 2) {
          icon = "icon_know";
          that.VerifyInfos[i].status1 = "签名不确定";
        } else if (that.VerifyInfos[i].verifyResult === 1) {
          icon = "icon_valid";
          that.VerifyInfos[i].status1 = "签名有效";
        }
        // 验证文档的有效性
        if (that.VerifyInfos[i].fileIntegrityVerfiy === 1) {
          that.VerifyInfos[i].moreInfo = "文档未被更改或损坏";
          // 签名证书的路径构建
          if (that.VerifyInfos[i].signCertPathBuild === 1) {
          } else if (that.VerifyInfos[i].signCertPathBuild === 0) {
            that.VerifyInfos[i].signCertPathBuildText = "签名证书链未构建";
          } else {
            //-1
            that.VerifyInfos[i].signCertPathBuildText = "签名证书链不完整";
          }
          // 从配置信息‘验证’，确定是否验证吊销信息
          if (isVerifyRevoke) {
            // 如果签名本身存在吊销信息
            if (that.VerifyInfos[i].hasRevoke) {
              that.VerifyInfos[i].isVerifyRevokeText =
                "已嵌入吊销信息(" + that.VerifyInfos[i].revokeStatus + ")";
            } else {
              // 如果不存在，进一步确定是否开启在线验证吊销信息
              if (isOnlineverifyrevoke) {
                that.VerifyInfos[i].isVerifyRevokeText =
                  "在线验证吊销(" + that.VerifyInfos[i].revokeStatus + ")";
              } else {
                that.VerifyInfos[i].isVerifyRevokeText = "未执行吊销检查";
              }
            }
          }
          // 是否验证时间戳
          if (that.VerifyInfos[i].hasTsa) {
            that.VerifyInfos[i].hasTsaText = that.VerifyInfos[i].isTsaValid
              ? "已嵌入时间戳(有效)"
              : "已嵌入时间戳(无效)";
            if (!that.VerifyInfos[i].isTsaValid) {
              if (that.VerifyInfos[i].tsaCertPathBuild === 0) {
                that.VerifyInfos[i].tsaCertPathBuildText = "时间戳证书链未构建";
              } else if (that.VerifyInfos[i].tsaCertPathBuild === -1) {
                that.VerifyInfos[i].tsaCertPathBuildText = "时间戳证书链不完整";
              }
            }
          }
        } else if (that.VerifyInfos[i].fileIntegrityVerfiy === 0) {
          that.VerifyInfos[i].moreInfo = "文档完整性未验证";
        } else {
          that.VerifyInfos[i].moreInfo = "文件自签名后被更改或损坏";
        }

        htmlDOM +=
          '<div class="netcasignDetail" name=' +
          that.VerifyInfos[i].fieldName +
          ">\n" +
          '     <span class="btn_fold"><img class="btn_fold_img" src="ui/images/icon/btn_unfold.png"></span>\n' +
          '    <span class="netcasubjectCN"><span><img src="ui/images/icon/' +
          icon +
          '.png" alt=""></span>' +
          that.VerifyInfos[i].signerName +
          "</span>\n" +
          '    <div class="netcasignContent">\n' +
          '        <div class="netcasignTip"><span>' +
          that.VerifyInfos[i].status1 +
          '</span> <input type="button" value="详细" class="netcadetailBtn"><input type="hidden" value="' +
          that.VerifyInfos[i].certEncode +
          '" class="netcahiddenBtn"></div>\n' +
          '        <div class="netcasignTime">\n' +
          "            <p>" +
          that.VerifyInfos[i].moreInfo +
          "</p>\n" +
          "            <p>域名:" +
          that.VerifyInfos[i].fieldName +
          "</p>\n" +
          "            <p><span> 签名时间:</span><span> " +
          that.VerifyInfos[i].signDate +
          "</span></p>\n" +
          '            <p class="signCertPathBuildText">' +
          that.VerifyInfos[i].signCertPathBuildText +
          "</p>\n" +
          '            <p class="hasTsa"><span> ' +
          that.VerifyInfos[i].hasTsaText +
          "</span></br><span>" +
          that.VerifyInfos[i].tsaDate +
          "</span></p>\n" +
          '            <p class="hasTsaCertPathBuildText">' +
          that.VerifyInfos[i].tsaCertPathBuildText +
          "</p>\n" +
          '            <p class="isVerifyRevokeText">' +
          that.VerifyInfos[i].isVerifyRevokeText +
          "</p>\n" +
          "        </div>\n" +
          "    </div>\n" +
          "</div>";
      })(i);
    }
    $(".netcasignInfo").append(htmlDOM);
    var len = $(".hasTsa").length;
    for (var j = 0; j < len; j++) {
      if (that.VerifyInfos[j].hasTsa === false) {
        $(".hasTsa").eq(j).css({ display: "none" });
      }
      if (!that.VerifyInfos[j].tsaCertPathBuildText) {
        $(".hasTsaCertPathBuildText").eq(j).css({ display: "none" });
      }
      if (!that.VerifyInfos[j].signCertPathBuildText) {
        $(".signCertPathBuildText").eq(j).css({ display: "none" });
      }
      if (!that.VerifyInfos[j].isVerifyRevokeText) {
        $(".isVerifyRevokeText").eq(j).css({ display: "none" });
      }
    }

    that.selectCertField(); // 选中签名状态中的某一个签名信息，显示选中的签名域
    htmlDOM = null;
    len = null;
  };
  that.displayCert = function () {
    var arr = document.getElementsByClassName("netcadetailBtn");
    var arr1 = document.getElementsByClassName("netcahiddenBtn");
    var DeviceOutputId = document.getElementById("DeviceOutputId");
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i;
      var _arr = arr[i];
      _arr.onclick = function () {
        DeviceOutputId.value = arr1[this.index].value;
        that.uIDisplayCert(DeviceOutputId.value);
        _arr = null;
      };
    }
  };
  that.uIDisplayCert = function (val) {
    var certEncode = val;
    var selectType = "Device";
    var selectCondition = "InValidity='True' && CertType='Signature'";

    var params = {
      cert: {
        encode: certEncode,
        type: selectType,
        condition: selectCondition,
      },
    };
    NetcaPKI.displayCert(params)
      .Then(function (res) {})
      .Catch(function (res) {
        alert(res.msg);
      });
  };
  /**
   * 签名状态 切换显示
   * */
  that.displayInfoFeild = function () {
    var btn_fold = document.getElementsByClassName("btn_fold");
    for (var i = 0; i < btn_fold.length; i++) {
      btn_fold[i].index = i;
      var _btn_fold = btn_fold[i];
      _btn_fold.onclick = function () {
        if ($(".netcasignTime").eq(this.index).css("display") === "none") {
          $(".netcasignTime").eq(this.index).css({ display: "block" });
          $(".btn_fold_img")
            .eq(this.index)
            .attr("src", "ui/images/icon/btn_fold.png");
        } else {
          $(".netcasignTime").eq(this.index).css({ display: "none" });
          $(".btn_fold_img")
            .eq(this.index)
            .attr("src", "ui/images/icon/btn_unfold.png");
        }
        _btn_fold = null;
      };
    }
  };
  /**
   * 获取签章客户端的配置信息
   * */
  that.getSealConfigInfo = function (verifyLevel, streamId) {
    $(".netcainvalidInfo").text("正在获取配置信息，请稍等...");
    var params = {
      // clsid: "6C0104A6-C4A1-4A93-A8BF-D029F5A46604" // 公共资源
      clsid: "001DE133-9BD7-4ACE-BF4D-AE14D689C061",
    };
    NetcaPKI.getSealConfigInfo(params)
      .Then(function (res) {
        that.getSealConfigInfoSuccessCallBack(res, verifyLevel, streamId);
      })
      .Catch(function (res) {
        that.getSealConfigInfoFailCallBack(res);
      });
  };
  that.getSealConfigInfoSuccessCallBack = function (
    res,
    verifyLevel,
    streamId,
  ) {
    isVerifyRevoke = res.verify.isVerifyRevoke; //是否验证签名时签名证书的吊销状态
    isOnlineverifyrevoke = isVerifyRevoke; //是否在线获取吊销信息
    verifyLevel = res.verify.verifySignLevel; //验证签名的级别 3：验证签名和证书，并且验证签名证书的吊销状态；但不验证CA证书是否吊销

    revInfoIncludeFlag = res.sign.isRevokeInclude; //签名时是否嵌入吊销状态
    //签名时是否嵌入时间戳
    var isTsaInclude = res.sign.isTsaInclude;
    if (isTsaInclude) {
      for (var i = 0; i < res.timeStamp.length; i++) {
        (function (i) {
          if (res.timeStamp[i].checked) {
            timeStamp.tsaUrl = res.timeStamp[i].url;
          }
        })(i);
      }
    }

    // 打开文档时是否自动验证签名
    isVerifyOpen = res.verify.isVerifyOpen;
    isVerifyOpenWithOpenBtn = res.verify.isVerifyOpen;

    // 验证签名
    that.signedDataVerify("", "", verifyLevel, streamId);
  };
  that.getSealConfigInfoFailCallBack = function (res) {
    alert("获取电子签章客户端配置信息失败：" + res.msg);
    $("#netcasignedDataVerify").css("display", "none");
    $("#viewerContainer").css({ "margin-top": "0" });
    $.unblockUI();
  };
  /***
   * 获取PDF文档的签名域信息
   * */
  that.getSignatureFieldInfo = function (streamId) {
    // 获取之前初始化储存的签名域信息
    signFields = [];
    // 删除上一次绘制的签名域
    if ($(".netcafieldInfo").length) {
      $(".netcafieldInfo").remove();
    }
    var params = {
      srcFile: "",
      srcBytes: "",
      srcStreamId: streamId,
    };
    NetcaPKI.getSignatureFieldInfo(params)
      .Then(function (res) {
        that.getSignatureFieldInfoSuccessCallBack(res, streamId);
      })
      .Catch(function (res) {
        alert("获取签名域信息失败:" + res.msg);
      });
  };

  that.getSignatureFieldInfoSuccessCallBack = function (res, streamId) {
    signFields = res.signFields; //签名域信息
    if (signFields !== null && signFields.length) {
      isShowDeleteBtn = true; //打开文档有印章时，显示撤销按钮
    }
    that.describeSignatureField(); //描绘签名域
    var timer = setInterval(function () {
      if (hasDescribeSignatureField) {
        clearInterval(timer);
        that.createRevokeEvent("", streamId); //撤章事件
      }
    }, 10);

    if (!signFields) {
      $("#netcasignedDataVerify").css("display", "none");
      return;
    }

    // 缩放pdf，只获取签名域，不需要重新验证
    if (zoom) {
      zoom = false;
      return;
    }
  };

  window.addEventListener("resize", debounce(reChartlrt));

  // 描绘签名域
  that.describeSignatureField = function () {
    //根据事件循环，创建宏任务使pdf渲染先进行，再渲染签名域
    //删除签名域信息
    if ($(".netcafieldInfo").length) {
      $(".netcafieldInfo").remove();
    }
    // //获取外层盒子宽度
    // var viewer_width = $('#viewer').width();
    // //获取缩放比例
    // var newscale = that.getScale();
    // //获取缩放比例
    // var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    // //定义页面宽度高度
    // var page_width;
    // var page_height;
    // //定义空白边框宽度
    // var _brank;
    // // 旋转角度
    // var rotateDegree = globalPDFViewerApplication.pdfViewer.pagesRotation;
    // if (isNaN(rotateDegree)) {
    //     rotateDegree = 0;
    // }
    // //如果签名域信息不为空
    // if (signFields) {
    //     //遍例签名域信息
    //     for (var i = 0; i < signFields.length; i++) {
    //         //闭包解决i取值不正确的问题
    //         (function (i) {
    //             //计算签名域所在页面宽度
    //             page_width = $('#viewer').find('.page').eq(signFields[i].pageNumber - 1).width();
    //             page_height = $('#viewer').find('.page').eq(signFields[i].pageNumber - 1).height();
    //             //计算签名域所在页面周边空白宽度
    //             _brank = (viewer_width - page_width) / 2;
    //             var temp = 0;
    //             //计算缩放变换后的签名域宽高
    //             var width = signFields[i].width * newscale / scale;
    //             var height = signFields[i].height * newscale / scale;
    //             // 如果是旋转了，则需要变换宽高
    //             if ((rotateDegree / 90) % 2 !== 0) {
    //                 temp = width;
    //                 width = height;
    //                 height = temp;
    //             }
    //             //计算签名域所在位置,-4指的是向左偏移边框的4px +5指的是先向下偏移外层边框的9px，再向上偏移边框的4px
    //             var x = signFields[i].xPos * newscale / scale - 4;
    //             // var y = page_height - signFields[i].yPos * newscale / scale - height + 5;
    //             var y = signFields[i].yPos * newscale / scale + 5;
    //             // 以下的位置偏移量根据实际效果进行调整的，并没有特殊含义
    //             if (rotateDegree === 90) {
    //                 temp = page_width - width - y;
    //                 y = x + 8;
    //                 x = temp + 1;
    //             } else if (rotateDegree === 180) {
    //                 x = page_width - x - width - 8;
    //                 y = page_height - y - height + 10;
    //             } else if (rotateDegree === 270) {
    //                 temp = page_height - height - x;
    //                 x = y - 9;
    //                 y = temp + 1;
    //             }

    //             //如果不止一页，高度还要加上之前的页面的高度
    //             if (signFields[i].pageNumber > 1) {
    //                 var _height = that.addHeight(signFields[i].pageNumber);
    //                 y = _height + y;
    //             }
    //             // pdf的宽度小于屏幕宽度，图片选中框的left才需要加上左边空隙内容
    //             if (_brank >= 0) {
    //                 x = x + _brank ;
    //             }
    //             // 如果pdf的宽度大于屏幕宽度，则要修正外层边框添加的9px，向右偏移9px
    //             else{
    //                 x = x + 9
    //             }
    //             // 签名域绘制
    //             $('#viewerContainer').append(' <div class="netcafieldInfo" name=' + signFields[i].name + ' style="position:absolute;z-index:99;width:' + width + 'px;height:' + height + 'px;left:' + x + 'px;top:' + y + 'px;"></div>');
    //             if (width === 0) {
    //                 $('.netcafieldInfo').eq(i).css({ "display": "none" })
    //             }
    //         })(i);
    //     }
    //     that.selectSignatureField(); //选中签名域 显示签名状态中的某一个的签名信息
    //     hasDescribeSignatureField = true;
    // } else {
    //     // $('#netcasignedDataVerify').css('display', 'none');
    //     // $('#viewerContainer').css({ "margin-top": "0" });
    //     // $('#netcaDisplaySignedDataVerify').css('display', 'none');
    // }
  };

  // 创建撤销按钮
  that.createRevokeEvent = function (_id, streamId) {
    // 判断是否能获取到文档内容
    // 如果能获取到文档内容且页数大于0
    if (
      globalPDFViewerApplication.pdfDocument != null &&
      $("#viewer .page").length > 0
    ) {
      // 获取章信息数组总长度
      var len = $(".netcafieldInfo").length;
      // 遍历每一个新增的章
      if (addVerifyInfoLen.length > 0 && revokeSealModel === 1) {
        // 获取新增的章的数量，只有这些章才能撤销
        var addLen = addVerifyInfoLen[addVerifyInfoLen.length - 1];
        // 遍历所有能撤销的章，打上标记
        for (var index = 1; index <= addLen; index++) {
          (function (index, _id, streamId) {
            $(".netcafieldInfo")
              .eq(len - index)
              .append(
                "" +
                  '<img class="btn_discard" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
                  'style="position:absolute;top:-15px;right:-15px;z-index:1000;display: none;">' +
                  "",
              );
            // 除了能撤的章之外其他的撤章按钮都隐藏掉
            $(".netcafieldInfo")
              .eq(len - index)
              .hover(
                function () {
                  $(this).children(".btn_discard").css({ display: "block" });
                },
                function () {
                  $(this).children(".btn_discard").css({ display: "none" });
                },
              );
          })(index, _id, streamId);
        }
      }
      hasDescribeSignatureField = null;
    }

    // 文档本来有的印章或不是最新的印章
    if (isShowDeleteBtn) {
      that.showNextDeleteBtn(streamId);
    }
  };
  that.showNextDeleteBtn = function (streamId) {
    // 如果还有新增的章
    if (addVerifyInfoLen.length > 0 && revokeSealModel === 1) {
      // 获取新增的章的数量
      var addLen = addVerifyInfoLen[addVerifyInfoLen.length - 1];
      // 获取现有的章的数量
      var len = signFields.length;
      // 显示这些章的删除按钮
      for (var k = 0; k < addLen; k++) {
        (function (k) {
          that.showDeleteBtn(len - k - 1, streamId);
        })(k);
      }
    }
    isShowDeleteBtn = true;
    if (signFields !== null && signFields.length) {
      var len = signFields.length;
      if (len < 1) {
        return;
      } else {
        //不应用reason的值判断是否属于同一批章
        that.showDeleteBtn(len - 1, streamId);
        return false;
      }
      if (signFields[len - 1].reason == undefined) {
        // 最后一个元素没有reason属性，说明是普通签章或旧驱动签出来的章，只显示最后一个元素有撤章按钮
        that.showDeleteBtn(len - 1, streamId);
      } else {
        // 最后一个元素有reason属性，说明最后一次签名\章是批量签章或者骑缝章，会有多个撤销按钮
        var reason = signFields[len - 1].reason;
        for (var k = 0; k < signFields.length; k++) {
          // 如果当前签名域存在reason 并且reason值跟最后一个是相等的  则显示撤章按钮
          if (signFields[k].reason === reason) {
            that.showDeleteBtn(k, streamId);
          }
        }
      }
    }
  };

  // 已知第k个印章可以撤销，展示该印章的撤销按钮并绑定撤销事件
  that.showDeleteBtn = function (k, streamId) {
    $(".netcafieldInfo")
      .eq(k)
      .append(
        "" +
          '<img class="btn_discard" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
          'style="position:absolute;top:-15px;right:-15px;z-index:1000;display: none;">' +
          "",
      );
    $(".netcafieldInfo")
      .eq(k)
      .hover(
        function () {
          $(this).children(".btn_discard").css({ display: "block" });
        },
        function () {
          $(this).children(".btn_discard").css({ display: "none" });
        },
      );
  };

  that.undoPDF = function (_id, _isReturnStreamId) {
    layer.confirm(
      "是否需要撤销选定的签章？",
      {
        btn: ["是", "否"], //按钮
      },
      function (index) {
        layer.close(index);
        var params = {
          id: -1,
          isReturnStreamId: _isReturnStreamId,
        };
        NetcaPKI.undoPDF(params)
          .Then(function (res) {
            if (res.destFileEncode == null || res.destFileEncode.length == 0) {
              that.signatureVerifierUndoPDFReadStreamCallBack(res);
              return;
            }
          })
          .Catch(function (res) {
            alert("撤销签名/章失败：" + res.msg);
            if (that.UndoCallbackEvent != null) {
              that.UndoCallbackEvent(
                JSON.stringify({
                  status: -1,
                  msg: res.msg,
                }),
              );
            }
          });
      },
      function () {},
    );
  };
  that.signatureVerifierUndoPDF = function (
    _signBytes,
    _index,
    _streamId,
    _isReturnStreamId,
  ) {
    layer.confirm(
      "是否需要撤销选定的签章？",
      {
        btn: ["是", "否"], //按钮
      },
      function (index) {
        layer.close(index);
        var params = {
          signFile: "",
          signBytes: _signBytes,
          index: _index,
          srcStreamId: _streamId,
          isReturnStreamId: _isReturnStreamId,
        };

        NetcaPKI.signatureVerifierUndoPDF(params)
          .Then(function (res) {
            that.signatureVerifierUndoPDFReadStreamCallBack(res);
            if (that.UndoCallbackEvent != null) {
              that.UndoCallbackEvent(
                JSON.stringify({
                  status: 0,
                  msg: "撤章成功",
                }),
              );
            }
          })
          .Catch(function (res) {
            alert("撤销签名/章失败：" + res.msg);
            if (that.UndoCallbackEvent != null) {
              that.UndoCallbackEvent(
                JSON.stringify({
                  status: -1,
                  msg: res.msg,
                }),
              );
            }
          });
        signatureVerifierUndoPDF = true;
      },
      function () {
        signatureVerifierUndoPDF = true;
      },
    );
  };
  that.revokeSignatureSuccessCall = function (res, streamId, updateRes) {
    if (addVerifyInfoLen.length > 0) {
      var addLen = addVerifyInfoLen.pop();
      var fieldLen = $(".netcafieldInfo").length;
      for (var j = 1; j <= addLen; j++) {
        signFields.pop();
        that.VerifyInfos.pop();
        $(".netcafieldInfo")
          .eq(fieldLen - j)
          .remove();
        $(".netcasignDetail")
          .eq(fieldLen - j)
          .remove();
      }
    } else {
      if (signFields.length || that.VerifyInfos.length) {
        signFields.pop();
        that.VerifyInfos.pop();
        $(".netcafieldInfo")
          .eq($(".netcafieldInfo").length - 1)
          .remove();
        $(".netcasignDetail")
          .eq($(".netcasignDetail").length - 1)
          .remove();
      }
    }

    // 重新打开撤章后的文件
    that.resetOriginalState(res, streamId);

    that.displaySignedDataVerifyTip(that.VerifyInfos); // toobar下验证提示信息
    that.createSignedDataVerifyInfo(); // 创建左边 签名状态  每个签名信息
    that.displayCert(); // 显示证书信息
    that.displayInfoFeild(); // 每个签名信息伸展或收缩显示

    // 撤章后重新拿签名域长度，计算下一撤章按钮怎么显示
    that.showNextDeleteBtn(unfinishedStreamId);

    // 多文件模式,需要更新sealFileId,更新左侧导航列表对应文件的签章状态
    if (NetcaPDFSeal.mode == 2) {
      var sealFileId = null;
      var hasSign = false;

      var pdfIndex = $("#leftNav ul li").index($("#leftNav ul li.actived")[0]); // 记录当前选中的pdf的索引
      if (NetcaPDFSeal.getSignatureCount() > 0) {
        sealFileId = updateRes.destFileStream
          ? updateRes.destFileStream.streamId
          : null;
        hasSign = true;
      } else {
        // 设置为未签状态
        hasSign = false;
        var _$signStatus = $("#leftNav ul li")
          .eq(pdfIndex)
          .find(".sign-status");
        if (_$signStatus.hasClass("actived")) {
          _$signStatus.removeClass("actived");
        }
      }
      NetcaPDFSeal.multiplePDFUrlData[pdfIndex].sealFileId = sealFileId;
      NetcaPDFSeal.multiplePDFUrlData[pdfIndex].hasSign = hasSign;
    }
  };
  that.signatureVerifierUndoPDFReadStreamCallBack = function (signSuccessRes) {
    // 旧的读数据是srcFileStream，为保持一致 赋给destFileStream，保持调用一致
    if (signSuccessRes.srcFileStream) {
      signSuccessRes.destFileStream = signSuccessRes.srcFileStream;
    }
    completedStreamId = signSuccessRes.destFileStream.streamId;
    signSuccessRes.destFileEncode = [];
    var params = {
      streamId: signSuccessRes.destFileStream.streamId,
      length: writeLength * 1024 * 1024,
    };

    NetcaPKI.readStream(params)
      .Then(function (res) {
        that.SignatureVerifierUndoPDFReadStreamUpdateCallBack(
          res,
          signSuccessRes,
        );
      })
      .Catch(function (res) {
        alert("撤销签名/章失败：" + res.msg);
      });
  };
  that.SignatureVerifierUndoPDFReadStreamUpdateCallBack = function (
    res,
    signSuccessRes,
  ) {
    // 旧的读数据是srcFileStream，为保持一致 赋给destFileStream，保持调用一致
    if (res.srcFileStream) {
      res.destFileStream = res.srcFileStream;
    }
    completedStreamId = res.destFileStream.streamId;
    signSuccessRes.destFileEncode.push(res.data);
    if (!res.hasMoreData) {
      that.revokeSignatureSuccessCall(
        signSuccessRes,
        res.destFileStream.streamId,
        signSuccessRes,
      );
      return;
    }
    var params = {
      streamId: res.destFileStream.streamId,
      length: writeLength * 1024 * 1024,
    };

    NetcaPKI.readStream(params)
      .Then(function (res) {
        that.SignatureVerifierUndoPDFReadStreamUpdateCallBack(
          res,
          signSuccessRes,
        );
      })
      .Catch(function (res) {
        alert("撤销签名/章失败：" + res.msg);
      });
  };
  /*** 选中签名域信息* */
  that.selectSignatureField = function () {
    var netcafieldInfo = document.getElementsByClassName("netcafieldInfo");
    for (var i = 0; i < netcafieldInfo.length; i++) {
      netcafieldInfo[i].index = i;
      var _netcafieldInfo = netcafieldInfo[i];
      _netcafieldInfo.onclick = function () {
        // 通过签名域name 与 验证结果的fieldName 对应上
        var name = $(".netcafieldInfo").eq(this.index).attr("name");
        $(".netcafieldInfo")
          .eq(this.index)
          .css({ border: "4px dashed #426bf6" });
        $(".netcafieldInfo").eq(this.index).siblings().css({ border: "" });
        $(".netcasignDetail[name=" + name + "]").css({ background: "#e2eeff" });
        $(".netcasignDetail[name=" + name + "]")
          .siblings()
          .css({ background: "none" });
        if (this.index === netcafieldInfo.length - 1) {
          $("#btn_discard").css({ display: "block" });
          $(".netcafieldInfo").eq(this.index).off("hover");
        }
        _netcafieldInfo = null;
      };
    }
  };
  /**
   * 选中标签信息
   * */
  that.selectCertField = function () {
    var netcasignDetail = document.getElementsByClassName("netcasignDetail");
    for (var i = 0; i < netcasignDetail.length; i++) {
      netcasignDetail[i].index = i;
      var _netcasignDetail = netcasignDetail[i];
      _netcasignDetail.onclick = function () {
        var name = $(".netcasignDetail").eq(this.index).attr("name");
        $(".netcafieldInfo[name=" + name + "]").css({
          border: "4px dashed #426bf6",
        });
        $(".netcafieldInfo[name=" + name + "]")
          .siblings()
          .css({ border: "" });
        $(".netcasignDetail").eq(this.index).css({ background: "#e2eeff" });
        $(".netcasignDetail")
          .eq(this.index)
          .siblings()
          .css({ background: "none" });
        var _top = parseFloat(
          $(".netcafieldInfo[name=" + name + "]").css("top"),
        );
        $("#viewerContainer").scrollTop(_top);
        _netcasignDetail = null;
      };
    }
  };
  /**打印*/
  that.printPDF = function () {
    var params = {
      srcBytes: NetcaPDFSeal.SetPDFBytes,
    };
    NetcaPKI.printPDF(params)
      .Then(function (res) {
        alert("打印文档成功");
      })
      .Catch(function (res) {
        alert("打印文档失败:" + res.msg);
      });
  };

  /**
   * 点击close按钮，关闭签名验证信息
   * */
  that.closeSignedDataVerifyInfo = function (params) {
    // 关闭签名验签信息
    if (params === "netcainvalidClose") {
      $("#netcasignedDataVerify").css("display", "none");
      $("#viewerContainer").css({ "margin-top": "0" });
      $("#netcaDisplaySignedDataVerify").css({ top: "70px", height: "92%" });
    }
    if (params === "netcaclose2") {
      $("#netcaDisplaySignedDataVerify").css({ display: "none" });
    }
  };
  /**
   * 点击详细信息，显示左侧签名验证详细信息
   * */
  that.displaySignedDataVerifyInfo = function () {
    $("#netcaDisplaySignedDataVerify").css({
      display: "block",
      top: "117px",
      height: "84%",
    });
  };
  // 鼠标移入移除签章菜单背景色变化
  that.transBackground = function (name) {
    $("." + name).hover(
      function () {
        $(this).css("background", "#DBECFF");
      },
      function () {
        $(this).css("background", "#fff");
      },
    );
  };
  // 设置ui是否可见
  that.setUIVisible = function (obj) {
    for (var k in obj) {
      if (!obj[k]) {
        $("#" + k).css({ display: "none" });
      } else {
        $("#" + k).css({ display: "inline-block" });
      }
    }
    if (obj.NetcaToolBar === true) {
      $("#toolbarViewer").css({ display: "block" });
    } else if (obj.NetcaToolBar === false) {
      $("#toolbarViewer").css({ display: "none" });
    }
  };
  // 获取当前时间
  that.getWorkTime = function () {
    var date = new Date();
    var time =
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      ":" +
      date.getMilliseconds();
    return time;
  };
  that.closeFile = function () {
    $("#viewer").children().css("display", "none");
    $("#netcasignedDataVerify").css("display", "none");
    $("#netcaDisplaySignedDataVerify").css("display", "none");
    $(".netcasignpdf").css("margin-top", "0");
    var len = $(".netcafieldInfo").length;
    for (var i = 0; i < len; i++) {
      $(".netcafieldInfo").eq(i).remove();
    }
  };
  // 旋转页面按钮的点击事件触发函数
  that.onRotateLeft = function () {
    // 旋转角度，必须为0，90，180，270之一，顺时针旋转为正
    globalPDFViewerApplication.rotatePages(-90);
    that.describeSignatureField();
    that.createRevokeEvent("", unfinishedStreamId);
  };
  // 旋转页面按钮的点击事件触发函数
  that.onRotateRight = function () {
    // 旋转角度，必须为0，90，180，270之一，顺时针旋转为正
    globalPDFViewerApplication.rotatePages(90);
    that.describeSignatureField();
    that.createRevokeEvent("", unfinishedStreamId);
  };
  that.setStreamId = function (streamId) {
    that.streamId = streamId;
  };
  that.getStreamId = function () {
    return that.streamId;
  };
  return that;
})();

var NetcaIESignAPI = (function () {
  "use strict";
  var that = {};
  var readerAx;
  that.openPDF = function (byteBase64, callback) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    var comObj = null;
    try {
      var NETCA_PKI_BASE64_NO_NL = 1;
      comObj = new ActiveXObject("NetcaPki.Utilities");
      var bytesDecode = comObj.Base64Decode(byteBase64, NETCA_PKI_BASE64_NO_NL);

      // 签名印章加上时间
      if (NetcaPDFSeal.getSealWithDate()) {
        readerAx.SetSealBackGroundText(NetcaUtils.getNowFormatDate());
      }
      readerAx.OpenPDFBytes(bytesDecode);
      readerAx.PDFSavePath = ":AutoSave:";
      if (callback !== undefined) {
        callback();
      }
    } catch (e) {
      alert("异常:" + e);
    }
  };
  // 打开URL文件
  that.openPDFUrl = function (url, callback) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    try {
      readerAx.OpenPDFUrl(url);
      readerAx.PDFSavePath = ":AutoSave:";
      if (callback !== undefined) {
        callback();
      }
    } catch (e) {
      alert("异常:" + e);
    }
  };
  // 异步打开url文件
  that.asyncOpenPDFUrl = function (url) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    try {
      readerAx.AsyncOpenPDFUrl(url);
      readerAx.PDFSavePath = ":AutoSave:";
    } catch (e) {
      alert("异常:" + e);
    }
  };
  // 异步打开url文件 cookie
  that.AsyncOpenPDFUrlWithCookie = function (paramsObj) {
    // if (readerAx == null)
    // 再次进入调用AsyncOpenPDFUrlWithCookie，需要要重新拿新的object，否则还是旧的，调用接口是成功的，还是视图上是无法看到打开的文件。
    //if (readerAx == null)
    var readerAx = document.getElementById("NetcaReaderAx").object;
    try {
      readerAx.AsyncOpenPDFUrlWithCookie(paramsObj.url, paramsObj.cookie);
      readerAx.PDFSavePath = ":AutoSave:";
    } catch (e) {
      alert("异常:" + e);
    }
  };
  // 同步打开url文件 cookie
  that.OpenPDFUrlWithCookie = function (paramsObj, callback) {
    // if (readerAx == null)
    // 再次进入调用AsyncOpenPDFUrlWithCookie，需要要重新拿新的object，否则还是旧的，调用接口是成功的，还是视图上是无法看到打开的文件。
    //if (readerAx == null)
    var readerAx = document.getElementById("NetcaReaderAx").object;
    try {
      readerAx.OpenPDFUrlWithCookie(paramsObj.url, paramsObj.cookie);
      readerAx.PDFSavePath = ":AutoSave:";
      if (callback !== undefined) {
        callback();
      }
    } catch (e) {
      alert("异常:" + e);
    }
  };

  that.initPreView = function () {
    var obj = {
      NetcaToolBar: false,
      navigationBar: false,
    };

    that.setUIVisible(obj);
  };
  that.GetPDFBytes = function () {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    var bytes = readerAx.GetPDFBytes();
    var comObj = new ActiveXObject("NetcaPki.Utilities");
    var NETCA_PKI_BASE64_NO_NL = 1;
    bytes = comObj.Base64Encode(bytes, NETCA_PKI_BASE64_NO_NL);
    return bytes;
  };
  that.setUI = function (value, visiable) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    readerAx.SetIndividuationUI(value, visiable, "");
  };
  that.initUI = function () {
    var obj = {
      // 'netcaopen':false,
      netcasave: true,
      // 'viewFind':false,
      netcaFirstSeparator: false,
      netcaSecondSeparator: false,
      netcaThirdSeparaor: false,
      // 'netcaVerfity':false,
      netcaAbout: false,
      navigationBar: false,
      print: false,
      // 'leftBtn': false,
      // 'rightBtn': false
    };
    $("#netcasignpdf").css("display", "none");
    that.setUIVisible(obj);
  };
  that.setUIVisible = function (obj) {
    var UI_PDF_TOOLBAR_BUTTON = 0; //工具栏
    var UI_PDF_OPEN_BUTTON = 1; //打开按钮
    var UI_PDF_SAVE_BUTTON = 2; //保存按钮
    var UI_PDF_SERACH_BUTTON = 3; //搜索按钮
    var UI_PDF_ZOOM_IN_BUTTON = 4; //放大按钮
    var UI_PDF_ZOOM_OUT_BUTTON = 5; //缩小按钮
    var UI_PDF_ZOOM_RATION_COMBO = 6; //放大缩小比例列表框
    var UI_PDF_FIRST_SEPARATOR = 7; //第一个分割符控件
    var UI_PDF_FRONT_PAGE_BUTTON = 8; //上一页按钮
    var UI_PDF_NEXT_PAGE_BUTTON = 9; //下一页按钮
    var UI_PDF_PAGE_NUM_EDIT = 10; //页面数字
    var UI_PDF_SECOND_SEPARATOR = 11; //第二个分割符控件
    var UI_PDF_SIGN_BUTTON = 12; //签章按钮
    var UI_PDF_VERIFY_BUTTON = 13; //验证按钮
    var UI_PDF_THIRD_SEPARATOR = 14; //第三个分割符控件
    var UI_PDF_SETTING_BUTTON = 15; //设置按钮
    var UI_PDF_ABOUT_BUTTON = 16; //关于按钮
    var UI_PDF_NAVIGATION_BAR = 17; //导航栏
    var UI_PDF_MARK_BUTTON = 18; //书签按钮
    var UI_PDF_ANNOT_BUTTON = 19; //批注按钮
    var UI_PDF_PRINT_BUTTON = 20; //打印按钮
    var UI_PDF_COMMON_SIGN_MENU = 21; //签章签章
    var UI_PDF_EMPLOYEE_SIGN_MENU = 22; //员工签章
    var UI_PDF_INSTITUTION_SIGN_MENU = 23; //机构签章
    var UI_PDF_ARTIFIFCIAL_SIGN_MENU = 24; //法人签章
    var UI_PDF_CLOSE_BUTTON = 28; //关闭按钮
    var UI_PDF_TURN_LEFT_BUTTON = 29; //左转
    var UI_PDF_TURN_RIGHT_BUTTON = 30; //右转

    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    //工具栏
    if (obj.NetcaToolBar === true) {
      readerAx.SetIndividuationUI(UI_PDF_TOOLBAR_BUTTON, true, "");
    } else if (obj.NetcaToolBar === false) {
      readerAx.SetIndividuationUI(UI_PDF_TOOLBAR_BUTTON, false, "");
    }
    //打开按钮
    if (obj.openFile === true) {
      readerAx.SetIndividuationUI(UI_PDF_OPEN_BUTTON, true, "");
    } else if (obj.openFile === false) {
      readerAx.SetIndividuationUI(UI_PDF_OPEN_BUTTON, false, "");
    }

    //保存按钮
    if (obj.netcasave === true) {
      readerAx.SetIndividuationUI(UI_PDF_SAVE_BUTTON, true, "");
    } else if (obj.netcasave === false) {
      readerAx.SetIndividuationUI(UI_PDF_SAVE_BUTTON, false, "");
    }
    //搜索
    if (obj.viewFind === true) {
      readerAx.SetIndividuationUI(UI_PDF_SERACH_BUTTON, true, "");
    } else if (obj.viewFind === false) {
      readerAx.SetIndividuationUI(UI_PDF_SERACH_BUTTON, false, "");
    }
    //放大
    if (obj.zoomIn === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_IN_BUTTON, true, "");
    } else if (obj.zoomIn === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_IN_BUTTON, false, "");
    }
    //缩小
    if (obj.zoomOut === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_OUT_BUTTON, true, "");
    } else if (obj.zoomOut === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_OUT_BUTTON, false, "");
    }
    //缩放select控件
    if (obj.scaleSelectContainer === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_RATION_COMBO, true, "");
    } else if (obj.scaleSelectContainer === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_RATION_COMBO, false, "");
    }
    //第一个分割符控件
    if (obj.netcaFirstSeparator === true) {
      readerAx.SetIndividuationUI(UI_PDF_FIRST_SEPARATOR, true, "");
    } else if (obj.netcaFirstSeparator === false) {
      readerAx.SetIndividuationUI(UI_PDF_FIRST_SEPARATOR, false, "");
    }
    //上一页
    if (obj.previous === true) {
      readerAx.SetIndividuationUI(UI_PDF_FRONT_PAGE_BUTTON, true, "");
    } else if (obj.previous === false) {
      readerAx.SetIndividuationUI(UI_PDF_FRONT_PAGE_BUTTON, false, "");
    }
    //下一页
    if (obj.next === true) {
      readerAx.SetIndividuationUI(UI_PDF_NEXT_PAGE_BUTTON, true, "");
    } else if (obj.next === false) {
      readerAx.SetIndividuationUI(UI_PDF_NEXT_PAGE_BUTTON, false, "");
    }
    //页面数字
    if (obj.netcapage === true) {
      readerAx.SetIndividuationUI(UI_PDF_PAGE_NUM_EDIT, true, "");
    } else if (obj.netcapage === false) {
      readerAx.SetIndividuationUI(UI_PDF_PAGE_NUM_EDIT, false, "");
    }
    //第二个分割符控件
    if (obj.netcaSecondSeparator === true) {
      readerAx.SetIndividuationUI(UI_PDF_SECOND_SEPARATOR, true, "");
    } else if (obj.netcaSecondSeparator === false) {
      readerAx.SetIndividuationUI(UI_PDF_SECOND_SEPARATOR, false, "");
    }
    //关闭
    if (obj.closeFile === true) {
      readerAx.SetIndividuationUI(UI_PDF_CLOSE_BUTTON, true, "");
    } else if (obj.closeFile === false) {
      readerAx.SetIndividuationUI(UI_PDF_CLOSE_BUTTON, false, "");
    }
    //验证
    if (obj.verify === true) {
      readerAx.SetIndividuationUI(UI_PDF_VERIFY_BUTTON, true, "");
    } else if (obj.verify === false) {
      readerAx.SetIndividuationUI(UI_PDF_VERIFY_BUTTON, false, "");
    }
    //第三个分割符控件
    if (obj.netcaThirdSeparaor === true) {
      readerAx.SetIndividuationUI(UI_PDF_THIRD_SEPARATOR, true, "");
    } else if (obj.netcaThirdSeparaor === false) {
      readerAx.SetIndividuationUI(UI_PDF_THIRD_SEPARATOR, false, "");
    }
    //设置
    if (obj.netcaSetting === true) {
      readerAx.SetIndividuationUI(UI_PDF_SETTING_BUTTON, true, "");
    } else if (obj.netcaSetting === false) {
      readerAx.SetIndividuationUI(UI_PDF_SETTING_BUTTON, false, "");
    }
    //关于
    if (obj.netcaAbout === true) {
      readerAx.SetIndividuationUI(UI_PDF_ABOUT_BUTTON, true, "");
    } else if (obj.netcaAbout === false) {
      readerAx.SetIndividuationUI(UI_PDF_ABOUT_BUTTON, false, "");
    }

    //普通签章
    if (obj.sign === true) {
      readerAx.SetIndividuationUI(UI_PDF_SIGN_BUTTON, true, "");
    } else if (obj.sign === false) {
      readerAx.SetIndividuationUI(UI_PDF_SIGN_BUTTON, false, "");
    }

    //员工签章
    if (obj.netcastaff === true) {
      readerAx.SetIndividuationUI(UI_PDF_EMPLOYEE_SIGN_MENU, true, "");
    } else if (obj.netcastaff === false) {
      readerAx.SetIndividuationUI(UI_PDF_EMPLOYEE_SIGN_MENU, false, "");
    }

    //机构签章
    if (obj.netcaorganization === true) {
      readerAx.SetIndividuationUI(UI_PDF_INSTITUTION_SIGN_MENU, true, "");
    } else if (obj.netcaorganization === false) {
      readerAx.SetIndividuationUI(UI_PDF_INSTITUTION_SIGN_MENU, false, "");
    }

    //法人签章
    if (obj.netcalegalperson === true) {
      readerAx.SetIndividuationUI(UI_PDF_ARTIFIFCIAL_SIGN_MENU, true, "");
    } else if (obj.netcalegalperson === false) {
      readerAx.SetIndividuationUI(UI_PDF_ARTIFIFCIAL_SIGN_MENU, false, "");
    }

    //打印
    if (obj.print === true) {
      readerAx.SetIndividuationUI(UI_PDF_PRINT_BUTTON, true, "");
    } else if (obj.print === false) {
      readerAx.SetIndividuationUI(UI_PDF_PRINT_BUTTON, false, "");
    }

    //导航栏
    if (obj.navigationBar === true) {
      readerAx.SetIndividuationUI(UI_PDF_NAVIGATION_BAR, true, "");
    } else if (obj.navigationBar === false) {
      readerAx.SetIndividuationUI(UI_PDF_NAVIGATION_BAR, false, "");
    }

    //左转
    if (obj.leftBtn === true) {
      readerAx.SetIndividuationUI(UI_PDF_TURN_LEFT_BUTTON, true, "");
    } else if (obj.leftBtn === false) {
      readerAx.SetIndividuationUI(UI_PDF_TURN_LEFT_BUTTON, false, "");
    }

    //右转
    if (obj.rightBtn === true) {
      readerAx.SetIndividuationUI(UI_PDF_TURN_RIGHT_BUTTON, true, "");
    } else if (obj.rightBtn === false) {
      readerAx.SetIndividuationUI(UI_PDF_TURN_RIGHT_BUTTON, false, "");
    }
  };
  /**初始化页面
   * */
  that.init = function () {
    that.initUI();
  };
  that.signCallbackEvent = function (callback) {
    if (callback != null) {
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      readerAx.SetSignCallback(callback);
    }
  };
  that.getSignatureCount = function () {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    try {
      return readerAx.GetSignatureCount();
    } catch (e) {
      alert("异常：" + e);
    }
  };
  that.verifyCallbackEvent = function (callback) {
    if (callback != null) {
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      readerAx.SetVerifyCallback(callback);
    }
  };
  that.UndoCallbackEvent = function (callback) {
    if (callback != null) {
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      readerAx.SetUndoCallback(callback);
    }
  };
  that.closeFile = function () {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    try {
      return readerAx.ClosePDF();
    } catch (e) {
      alert("异常：" + e);
    }
  };
  that.readAppSettingsInfo = function () {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    return JSON.parse(readerAx.ReadAppSettingsInfo());
  };
  that.writeAppSettingsInfo = function (settingsInfo) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    readerAx.WriteAppSettingsInfo(settingsInfo);
  };
  return that;
})();

// 对方调用的
var NetcaPDFSeal = (function () {
  "use strict";
  /**set base64*/
  var that = {
    SetPDFBytes: "",
    isSealWithDate: false, //是否印章带有日期
    appearanceObj: {}, // 日期文本对象
    mode: 1, //模式      1.普通模式   2.多文件模式
    multiplePDFUrlData: null, // 多文件打开数据
    MultiFile: {}, //多文件模块，管理多文件方法
    hiddenVerificationSignaturePrompt: false,
    signMode: 1, // 签名模式 1：usbkey签 2：云密钥签 默认为1
  };
  var writeLength = 1; // 默认文件大小

  that.setPDFBytes = function (INPDFbase64) {
    that.SetPDFBytes = INPDFbase64;
  };
  /**get base64*/
  that.getSignPDFBytes = function (callback) {
    if (that._isIE()) {
      return NetcaIESignAPI.GetPDFBytes();
    } else {
      globalPDFViewerApplication.pdfDocument.getData().then(function (data) {
        callback(data);
      });
    }
  };
  /**判断当前浏览器是否为IE浏览器(ie11以下走控件)
   * */
  that._isIE = function () {
    var comObj = null;
    try {
      comObj = new ActiveXObject("NetcaPki.Utilities");
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * 需要隐藏的功能按钮
   * */
  that.setUIVisible = function (obj) {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.setUIVisible(obj);
    } else {
      NetcaSignAPI.setUIVisible(obj);
    }
  };
  /**初始化页面
   * */
  that.init = function () {
    that.initUI();
  };
  that.initUI = function () {
    if (that._isIE()) {
      NetcaIESignAPI.initUI();
    } else {
      NetcaSignAPI.initUI();
    }
  };

  that.initLeftNavUI = function (paramsObjArr, FilesName) {
    var htmlDOM = "";

    $("#leftNav .title").html(FilesName);
    //清空节点内容
    $("#leftNav ul").html("");
    for (var i = 0; i < paramsObjArr.length; i++) {
      (function (i) {
        htmlDOM +=
          "                 <li title=" +
          paramsObjArr[i].title +
          ">\n" +
          "                     <a href='#'><span class='prevIcon'></span>\n" +
          paramsObjArr[i].title +
          "                     </a>" +
          "                     <div class='sign-status'>" +
          "                     </div>" +
          "                 </li>";
      })(i);
    }
    $("#leftNav ul").append(htmlDOM);
    //给所有列表注册事件
    $("#leftNav ul li").each(function (index) {
      $(this).click(function () {
        $("#leftNav ul li").removeClass("actived");
        $("#leftNav ul li").eq(index).addClass("actived");

        // 判断文件是否已经签名，签名通过sealFileId重新load文件，否则通过url打开文件
        var _DFUrlData = NetcaPDFSeal.multiplePDFUrlData[index];
        if (_DFUrlData && _DFUrlData.hasSign) {
          // NetcaPDFSeal.setPDFBytes(res.destFileEncode);
          NetcaPDFSeal.MultiFile.getSealSignFile(
            _DFUrlData.sealFileId,
            function (base64) {
              that.openPDFBytes(base64);
            },
            function (status, msg) {},
          );
        } else {
          var paramsObj = {
            url: paramsObjArr[index].url,
            cookie: "",
          };
          that.openPDFUrl(paramsObj);
        }
      });
    });
    //默认打开第一个
    $("#leftNav ul li").eq(0).click();

    $("#leftNav").css("display", "block");
  };

  /**字节流方式打开pdf
   * */
  that.openPDFBytes = function (OpenPDFBytes, callback) {
    if (callback === undefined) {
      callback = function () {
        //一般置为空，测试时可置为其他
      };
    }
    if (!OpenPDFBytes) {
      alert("打开文档数据为空");
      return;
    }
    if (that._isIE()) {
      NetcaIESignAPI.openPDF(OpenPDFBytes, callback);
    } else {
      /**
       * 参数一： OpenPDFBytes: base64编码
       * 参数二:  callback回调
       * 参数三： 打开方式
       * */
      NetcaSignAPI.openPDF(OpenPDFBytes, callback, "openPDFBytes");
    }
  };
  /**
   * 指定url方式打开
   * */
  that.openPDFUrl = function (paramsObj, callback) {
    if (callback === undefined) {
      callback = function () {
        //一般置为空，测试时可置为其他
      };
    }
    if (!paramsObj.url) {
      alert("打开文档的url不能为空");
      return;
    }
    if (that._isIE()) {
      NetcaIESignAPI.OpenPDFUrlWithCookie(paramsObj, callback);
    } else {
      NetcaSignAPI.openPDFUrl(paramsObj, callback);
    }
  };

  /**
   * 指定多个pdf方式打开
   */
  that.MultiFile.openSealSignFiles = function (params) {
    var Files = params.Files;
    var FilesName = params.FilesName ? params.FilesName : "文件列表";
    if (Array.isArray(Files)) {
      // 设置模式为多文件模式
      that.mode = 2;
      var tempMultiplePDFUrlData = [];
      for (var i = 0; i < Files.length; i++) {
        var _pdfObj = Files[i];
        Object.assign(_pdfObj, { sealFileId: null });
        tempMultiplePDFUrlData.push(_pdfObj);
      }
      that.multiplePDFUrlData = tempMultiplePDFUrlData;
      // 初始化左边导航界面, 默认打开第一个文件
      that.initLeftNavUI(tempMultiplePDFUrlData, FilesName);
    } else {
      alert("MultiFile.openSealSignFiles方法传入的参数类型不对");
    }
  };
  /**
   * 获取多文件的签章结果
   */
  that.MultiFile.getSealSignFilesResult = function () {
    var sealSignResults = [];
    for (var i = 0; i < that.multiplePDFUrlData.length; i++) {
      var sealSignResult = that.multiplePDFUrlData[i];
      sealSignResults.push(sealSignResult);
    }
    var sealSignResultObj = {
      sealSignResults: [],
      status: -1,
    };
    sealSignResultObj.sealSignResults = sealSignResults;
    var hasSignFileCount = that.hasSignFileCount(sealSignResults);
    if (hasSignFileCount == 0) {
      sealSignResultObj.status = -1;
    } else if (hasSignFileCount == sealSignResults.length) {
      sealSignResultObj.status = 0;
    } else {
      sealSignResultObj.status = 1;
    }

    return sealSignResultObj;
  };
  /**
   * 判断多文件签名数量
   */
  that.hasSignFileCount = function (paramObjArr) {
    return paramObjArr.filter(function (e) {
      return e.hasSign;
    }).length;
  };
  /**
   * 获取签章文件的base64编码
   */
  that.MultiFile.getSealSignFile = function (
    sealFileId,
    succcallback,
    failback,
  ) {
    if (/\.pdf$/gi.test(sealFileId)) {
      // sealFileId对应的是PDFSavePath
      try {
        var littleFileTool = new ActiveXObject("LittleUtils.BinaryFile");
        var dataStream = littleFileTool.Read(sealFileId);

        var comObj = new ActiveXObject("NetcaPki.Utilities");
        var NETCA_PKI_BASE64_NO_NL = 1;
        var base64 = comObj.Base64Encode(dataStream, NETCA_PKI_BASE64_NO_NL);
        succcallback(base64);
      } catch (e) {
        alert("异常:" + e);
        failback(e.status, e.msg);
      }
    } else {
      // sealFileId对应的是streamId
      var _writeLength = writeLength * 1024 * 1024;

      var params = {
        streamId: sealFileId,
        length: _writeLength,
        streamSeekPos: 0,
      };
      NetcaPKI.readSealStream(params)
        .Then(function (res) {
          that.readStreamWithGetSealSignFile(
            res,
            sealFileId,
            succcallback,
            failback,
          );
        })
        .Catch(function (res) {
          failback(res.status, res.msg);
        });
    }
  };

  // 递归读取文件数据
  that.readStreamWithGetSealSignFile = function (
    res,
    sealFileId,
    succcallback,
    failback,
  ) {
    if (!res.hasMoreData) {
      succcallback(res.data);
      return;
    }
    var _writeLength = writeLength * 1024 * 1024;

    var params = {
      streamId: sealFileId,
      length: _writeLength,
      streamSeekPos: 0,
    };

    NetcaPKI.readStreamWithNetca(params)
      .Then(function (res) {
        that.readStreamWithGetSealSignFile(
          res,
          sealFileId,
          succcallback,
          failback,
        );
      })
      .Catch(function (res) {
        failback(res.status, res.msg);
      });
  };

  that.getVerifySignSuccessFlag = function (arr) {
    var invalidArr = [];
    var notSureArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].verifyResult === 3) {
        //签名无效
        invalidArr.push(arr[i].verifyResult);
      }
      if (arr[i].verifyResult === 2) {
        //签名不确定
        notSureArr.push(arr[i].verifyResult);
      } // 签名有效
    }
    if (invalidArr.length) {
      return 0;
    } else {
      if (notSureArr.length) {
        return -1;
      } else {
        return 1;
      }
    }
  };
  /**签章完成后对外提示接口*/
  that.setSignCallbackEvent = function (callback) {
    if (that._isIE()) {
      // NetcaIESignAPI.signCallbackEvent(callback)
      NetcaIESignAPI.signCallbackEvent(function (res) {
        // 多文件模式  ie浏览器的sealFileId存储PDFSavePath，,更新左侧导航列表对应文件的签章状态
        if (NetcaPDFSeal.mode == 2) {
          var readerAx;
          if (readerAx == null)
            readerAx = document.getElementById("NetcaReaderAx").object;
          try {
            var path = readerAx.PDFSavePath;
            var pdfIndex = $("#leftNav ul li").index(
              $("#leftNav ul li.actived")[0],
            ); // 记录当前选中的pdf的索引
            NetcaPDFSeal.multiplePDFUrlData[pdfIndex].sealFileId = path;
            NetcaPDFSeal.multiplePDFUrlData[pdfIndex].hasSign = true;
            var _$signStatus = $("#leftNav ul li")
              .eq(pdfIndex)
              .find(".sign-status");
            if (!_$signStatus.hasClass("actived")) {
              _$signStatus.addClass("actived");
            }
          } catch (e) {
            alert("异常:" + e);
          }
        }
        callback(res);
      });
    } else {
      NetcaSignAPI.signCallbackEvent = callback;
    }
  };
  /**验签完成后对外提示接口*/
  that.setVerifyCallbackEvent = function (callback) {
    if (that._isIE()) {
      NetcaIESignAPI.verifyCallbackEvent(callback);
    } else {
      NetcaSignAPI.verifyCallbackEvent = callback;
    }
  };
  /**撤章后对外提示接口*/
  that.setUndoCallbackEvent = function (callback) {
    if (that._isIE()) {
      if (NetcaPDFSeal.mode == 1) {
        //单文件
        NetcaIESignAPI.UndoCallbackEvent(callback);
      } else {
        NetcaIESignAPI.UndoCallbackEvent(function (res) {
          // 多文件
          // 多文件模式,需要更新sealFileId，更新左侧导航列表对应文件的签章状态
          var readerAx;
          if (readerAx == null)
            readerAx = document.getElementById("NetcaReaderAx").object;
          try {
            var path = null;
            var hasSign = false;
            var pdfIndex = $("#leftNav ul li").index(
              $("#leftNav ul li.actived")[0],
            ); // 记录当前选中的pdf的索引

            if (NetcaPDFSeal.getSignatureCount() > 0) {
              hasSign = true;
              path = readerAx.PDFSavePath;
            } else {
              // 设置为未签状态
              var _$signStatus = $("#leftNav ul li")
                .eq(pdfIndex)
                .find(".sign-status");
              if (_$signStatus.hasClass("actived")) {
                _$signStatus.removeClass("actived");
              }
            }

            NetcaPDFSeal.multiplePDFUrlData[pdfIndex].sealFileId = path;
            NetcaPDFSeal.multiplePDFUrlData[pdfIndex].hasSign = hasSign;
          } catch (e) {
            alert("异常:" + e);
          }
          callback(res);
        });
      }
    } else {
      NetcaSignAPI.UndoCallbackEvent = callback;
    }
  };
  /**获取签名个数*/
  that.getSignatureCount = function () {
    var count;
    if (that._isIE()) {
      count = NetcaIESignAPI.getSignatureCount();
    } else {
      count = NetcaSignAPI.getSignatureCount();
    }
    // alert(count);
    return count;
  };
  /**IE 关闭接口*/
  that.closeFile = function () {
    if (that._isIE()) {
      return NetcaIESignAPI.closeFile();
    }
  };
  /**设置 印章加上时间*/
  that.setSealWithDate = function (isWithDate) {
    that.isSealWithDate = isWithDate;
    if (that._isIE()) {
      var readerAx;
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      try {
        readerAx.PDFSavePath = ":AutoSave:";
        // 签名印章加上时间
        if (isWithDate) {
          readerAx.SetSealBackGroundText(NetcaUtils.getNowFormatDate());
        } else {
          readerAx.SetSealBackGroundText("");
        }
      } catch (e) {
        alert("异常:" + e);
      }
    }
  };
  /**获取 印章是否加入时间 */
  that.getSealWithDate = function () {
    return that.isSealWithDate;
  };

  that.getCurrentPageNumber = function () {
    if (that._isIE()) {
      var readerAx;
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      try {
        return readerAx.GetCurrentPageNumber();
      } catch (e) {
        alert("异常:" + e);
      }
    } else {
      return globalPDFViewerApplication.page;
    }
  };

  that.gotoPageNumber = function (page) {
    if (that._isIE()) {
      var readerAx;
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      try {
        readerAx.GotoPageNumber(page);
      } catch (e) {
        alert("异常:" + e);
      }
    } else {
      globalPDFViewerApplication.pdfLinkService.goToPage(page);
    }
  };

  that.useMergeSealModel = function (base64, callback) {
    if (that._isIE()) {
      var _srcBytes = base64; //源Pdf文件字节流
      var params = {
        srcBytes: _srcBytes, //源Pdf文件的Base64编码
      };
      NetcaPKI.initMergeSeal(params)
        .Then(function (res) {
          callback(res.id);
        })
        .Catch(function (res) {
          alert(res.msg);
        });
      var readerAx;
      if (readerAx == null)
        readerAx = document.getElementById("NetcaReaderAx").object;
      try {
        readerAx.UseMergeSealModel(base64, false);
        alert("初始化合并模式成功");
      } catch (e) {
        alert("异常:" + e);
      }
    } else {
      var _streamId = NetcaSignAPI.getStreamId(); //源Pdf文件字节流streamId
      if (!_streamId) {
        alert("pdf文件字节流streamId不允许为空");
        return false;
      }
      var params = {
        streamId: _streamId, //streamId
      };
      NetcaPKI.initMergeSeal(params)
        .Then(function (res) {
          callback(res.id);
          alert("初始化合并模式成功");
        })
        .Catch(function (res) {
          alert(res.msg);
        });
    }
  };

  that.getMergeIncrementInfo = function (_mergeId, callback) {
    if (that._isIE()) {
      var params = {
        id: _mergeId, //源Pdf文件的Base64编码
      };
      NetcaPKI.getIncrementSerializableInfo(params)
        .Then(function (res) {
          //多浏览器接口获取的增量信息
          var infoABase64 = res.incrementSerializableInfo;
          var readerAx;
          if (readerAx == null)
            readerAx = document.getElementById("NetcaReaderAx").object;
          try {
            var infoBBase64 = readerAx.GetMergeSealIncrementSerializableInfo();
            var infoAStr = atob(infoABase64);
            var objA = JSON.parse(infoAStr);
            if (infoBBase64 !== "") {
              var infoBStr = atob(infoBBase64);
              var objB = JSON.parse(infoBStr);
              for (var k = 0; k < objB.sealInfos.length; k++) {
                objA.sealInfos.push(objB.sealInfos[k]);
              }
              infoAStr = JSON.stringify(objA);
              infoABase64 = btoa(infoAStr);
              callback(infoABase64);
            } else {
              callback(infoABase64);
            }
          } catch (e) {
            alert("异常:" + e);
          }
        })
        .Catch(function (res) {
          var readerAx;
          if (readerAx == null)
            readerAx = document.getElementById("NetcaReaderAx").object;
          try {
            var infoBBase64 = readerAx.GetMergeSealIncrementSerializableInfo();
            callback(infoBBase64);
          } catch (e) {
            alert("异常:" + e);
          }
        });
    } else {
      var params = {
        id: _mergeId, //源Pdf文件的Base64编码
      };
      NetcaPKI.getIncrementSerializableInfo(params)
        .Then(function (res) {
          callback(res.incrementSerializableInfo);
        })
        .Catch(function (res) {
          alert(res.msg);
        });
    }
  };
  that.HiddenVerificationSignaturePrompt = function (value) {
    if (that._isIE()) {
      var settingsConfig = NetcaIESignAPI.readAppSettingsInfo();
      if (value) {
        if (settingsConfig) {
          settingsConfig.verify.isOpenVerifyTipUI = false;
          NetcaIESignAPI.writeAppSettingsInfo(JSON.stringify(settingsConfig));
        }
      } else {
        if (settingsConfig) {
          settingsConfig.verify.isOpenVerifyTipUI = true;
          NetcaIESignAPI.writeAppSettingsInfo(JSON.stringify(settingsConfig));
        }
      }
    } else {
      that.hiddenVerificationSignaturePrompt = value;
    }
  };

  that.sign = function (params) {
    if (params.signPosition) {
      CHARTLET_SEAL_STRATEGY.singleSeal(params);
    } else if (params.sealKeyWord) {
      CHARTLET_SEAL_STRATEGY.keywordSeal(params);
    } else if (params.batchSeal) {
      CHARTLET_SEAL_STRATEGY.batchSeal(params);
    } else if (params.acrossPageSeal) {
      CHARTLET_SEAL_STRATEGY.acrossPageSeal(params);
    }
  };

  var CHARTLET_SEAL_STRATEGY = {
    singleSeal: function (params) {
      if (
        Number.isNaN(params.signPosition.pageNum) ||
        params.signPosition.pageNum > globalPDFViewerApplication.pagesCount
      ) {
        alert("传入页码有误");
        return;
      }
      // 上面设置好了宽高，现在可以贴图了
      var goSingleSeal = function () {
        var newscale = NetcaSignAPI.getScale(); //缩放比例
        var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
        var K = scale / newscale;

        // 找到这个章所在页，然后算宽度
        var viewer_width = $("#viewer").width();
        var page_width = $("#viewer .page")
          .eq(params.signPosition.pageNum - 1)
          .width();
        var page_height = $("#viewer .page").eq(
          params.signPosition.pageNum - 1,
        )[0].offsetTop;
        // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
        if (viewer_width > page_width) {
          var blank_left = (viewer_width - page_width) / 2;
        } else {
          var blank_left = 9;
        }

        var x = params.signPosition.xPos / K + blank_left;
        var y = params.signPosition.yPos / K + 9 + page_height;
        var w = params.signPosition.width / K;
        var h = params.signPosition.height / K;

        var chartletNum = NetcaSignAPI.getChartletNum();

        $("#viewerContainer").append(
          ' <img class="vSeal" id="vSeal' +
            chartletNum +
            '" src="data:image/PNG;base64,' +
            params.sealImageEncode +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            x +
            "px;top:" +
            y +
            'px;opacity: 0.5;"></img>',
        );
        $("#viewerContainer").append(
          ' <div class="vSealBox" id="vSealBox' +
            chartletNum +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            (x - 4) +
            "px;top:" +
            (y - 4) +
            'px;"></div>',
        );
        $("#viewerContainer").append(
          "" +
            '<img class="vSealBoxDelete" id="vSealBoxDelete' +
            chartletNum +
            '" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
            'style="position:absolute;top:' +
            (y - 19) +
            "px;left:" +
            (x + w - 19) +
            'px;z-index:1000;">' +
            "",
        );

        var deleteClick = function (event) {
          event.stopPropagation();
          event.cancelBubble = false;
          var index = event.target.id.substring(14);

          // 界面上删去该贴图
          $("#vSeal" + index).remove();
          $("#vSealBox" + index).remove();
          $("#vSealBoxDelete" + index).remove();

          // 逻辑上删去该贴图
          var saveChartletArray = NetcaSignAPI.getSaveChartletArray();
          for (var k = 0; k < saveChartletArray.length; k++) {
            if (saveChartletArray[k].id > Number(index)) {
              saveChartletArray[k - 1] = saveChartletArray[k];
            }
          }
          saveChartletArray.length -= 1;
          NetcaSignAPI.setSaveChartletArray(saveChartletArray);
        };
        // 将数组拿出来
        var newSaveChartletArray = NetcaSignAPI.getSaveChartletArray();

        // 把东西塞进去
        newSaveChartletArray.push({
          id: chartletNum,
          pageNum: params.signPosition.pageNum,
          xPos: params.signPosition.xPos,
          yPos: params.signPosition.yPos,
          width: params.signPosition.width,
          height: params.signPosition.height,
          sealImageEncode: params.sealImageEncode,
        });

        // 把数组塞回去
        NetcaSignAPI.setSaveChartletArray(newSaveChartletArray);
        document
          .querySelector("#vSealBoxDelete" + chartletNum)
          .addEventListener("click", deleteClick);

        chartletNum++;

        NetcaSignAPI.setChartletNum(chartletNum);

        // 置入证书
        NetcaSignAPI.setCertEncode(params.certEncode);
      };
      if (
        params.signPosition.xPos === undefined ||
        params.signPosition.yPos === undefined
      ) {
        alert("没有提供坐标");
        return;
      }
      // 如果印章图片的宽高有一个设置为0，就不取传入的宽高
      if (params.signPosition.width === 0 || params.signPosition.height === 0) {
        // 判断图片原文中是否包含宽高信息
        var tempStr = atob(params.sealImageEncode);
        var heightReg = /(?<="Height"\s*:\s*").*?(?=cm")/;
        var widthReg = /(?<="Width"\s*:\s*").*?(?=cm")/;
        // 如果包含，则取出宽高信息
        if (
          tempStr.match(heightReg) !== null &&
          tempStr.match(widthReg) !== null
        ) {
          params.signPosition.width =
            Number(tempStr.match(widthReg)[0]) * 28.346;
          params.signPosition.height =
            Number(tempStr.match(heightReg)[0]) * 28.346;
          goSingleSeal();
        }
        // 如果不包含，就使用传入的证书开始读取key中印章信息
        else {
          // 读取印章
          NetcaPKI.readSeal({
            cert: {
              encode: params.certEncode,
            },
          }).Then(function (res) {
            // 有国密印章
            if (res.seSeals !== null) {
              if (res.seSeals.length > 1) {
                var flag = false;
                res.seSeals.forEach(function (item) {
                  NetcaPKI.sesStampDecode({
                    data: {
                      text: item.sealData,
                    },
                  }).Then(function (res) {
                    // 取其中的宽和高
                    if (
                      res.sesStamp.sealInfo.picture.data ===
                      params.sealImageEncode
                    ) {
                      flag = true;
                      if (res.sesStamp.sealInfo.picture.width !== 0) {
                        params.signPosition.width =
                          res.sesStamp.sealInfo.picture.width * 2.8346;
                      }
                      if (res.sesStamp.sealInfo.picture.height !== 0) {
                        params.signPosition.height =
                          res.sesStamp.sealInfo.picture.height * 2.8346;
                      }
                      goSingleSeal();
                    }
                  });
                });
                if (flag === false) {
                  alert("key中找不到传入的印章");
                }
              } else {
                // 解析 res.seSeals[0].sealData
                NetcaPKI.sesStampDecode({
                  data: {
                    text: res.seSeals[0].sealData,
                  },
                }).Then(function (res) {
                  // 取其中的宽和高
                  if (res.sesStamp.sealInfo.picture.width !== 0) {
                    params.signPosition.width =
                      res.sesStamp.sealInfo.picture.width * 2.8346;
                  }
                  if (res.sesStamp.sealInfo.picture.height !== 0) {
                    params.signPosition.height =
                      res.sesStamp.sealInfo.picture.height * 2.8346;
                  }
                  goSingleSeal();
                });
              }
            }
            // 有普通印章
            else if (res.netcaSeals !== null) {
              params.signPosition.width = 119;
              params.signPosition.height = 119;
              if (
                params.signPosition.xPos !== undefined &&
                params.signPosition.yPos !== undefined
              ) {
                goSingleSeal();
              } else {
                alert("没有提供坐标信息");
              }
            } else {
              alert("从key中读取印章失败");
            }
          });
        }
      } else {
        goSingleSeal();
      }
    },
    keywordSeal: function (params) {
      var goKeywordSeal = function () {
        // 置入证书
        NetcaSignAPI.setCertEncode(params.certEncode);
        var signObj = {
          keywordSignParams: {
            width: params.sealKeyWord.width,
            height: params.sealKeyWord.height,
            keyword: params.sealKeyWord.keyword,
            offsetX: params.sealKeyWord.offsetX,
            offsetY: params.sealKeyWord.offsetY,
            startPageNum: params.sealKeyWord.startPageNum,
            endPageNum: params.sealKeyWord.endPageNum,
            index: params.sealKeyWord.index,
            picture: params.sealImageEncode,
          },
        };
        NetcaSignAPI.seal_SealKeyWord(signObj);
      };
      if (params.sealKeyWord.keyword === undefined) {
        alert("没有提供关键字");
        return;
      }

      // 如果印章图片的宽高有一个设置为0
      if (params.sealKeyWord.width === 0 || params.sealKeyWord.height === 0) {
        // 判断图片原文中是否包含宽高信息
        var tempStr = atob(params.sealImageEncode);
        var heightReg = /(?<="Height"\s*:\s*").*?(?=cm")/;
        var widthReg = /(?<="Width"\s*:\s*").*?(?=cm")/;
        // 如果包含，则取出宽高信息
        if (
          tempStr.match(heightReg) !== null &&
          tempStr.match(widthReg) !== null
        ) {
          params.sealKeyWord.width =
            Number(tempStr.match(widthReg)[0]) * 28.346;
          params.sealKeyWord.height =
            Number(tempStr.match(heightReg)[0]) * 28.346;
          goKeywordSeal();
        }
        // 如果不包含，就使用传入的证书开始读取key中印章信息
        else {
          // 读取印章
          NetcaPKI.readSeal({
            cert: {
              encode: params.certEncode,
            },
          }).Then(function (res) {
            if (res.seSeals !== null) {
              if (res.seSeals.length > 1) {
                var flag = false;
                res.seSeals.forEach(function (item) {
                  NetcaPKI.sesStampDecode({
                    data: {
                      text: item.sealData,
                    },
                  }).Then(function (res) {
                    // 取其中的宽和高
                    if (
                      res.sesStamp.sealInfo.picture.data ===
                      params.sealImageEncode
                    ) {
                      flag = true;
                      if (res.sesStamp.sealInfo.picture.width !== 0) {
                        params.sealKeyWord.width =
                          res.sesStamp.sealInfo.picture.width * 2.8346;
                      }
                      if (res.sesStamp.sealInfo.picture.height !== 0) {
                        params.sealKeyWord.height =
                          res.sesStamp.sealInfo.picture.height * 2.8346;
                      }
                      goKeywordSeal();
                    }
                  });
                });
                if (flag === false) {
                  alert("key中找不到传入的印章");
                }
              } else {
                NetcaPKI.sesStampDecode({
                  data: {
                    text: res.seSeals[0].sealData,
                  },
                }).Then(function (res) {
                  // 取其中的宽和高
                  if (res.sesStamp.sealInfo.picture.width !== 0) {
                    params.sealKeyWord.width =
                      res.sesStamp.sealInfo.picture.width * 2.8346;
                  }
                  if (res.sesStamp.sealInfo.picture.height !== 0) {
                    params.sealKeyWord.height =
                      res.sesStamp.sealInfo.picture.height * 2.8346;
                  }
                  goKeywordSeal();
                });
              }
              // 有国密印章 解析 res.seSeals[0].sealData
            } else if (res.netcaSeals !== null) {
              // 有普通印章
              params.sealKeyWord.width = 119;
              params.sealKeyWord.height = 119;
              goKeywordSeal();
            } else {
              alert("读取印章失败");
            }
          });
        }
      } else {
        goKeywordSeal();
      }
    },
    acrossPageSeal: function (params) {},
    batchSeal: function (params) {},
  };

  return that;
})();
