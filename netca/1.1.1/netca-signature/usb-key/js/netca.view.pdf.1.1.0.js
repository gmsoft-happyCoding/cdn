/*
   版本 V1.0.0 2019-11-08
   Netca  Google/Firefox 多浏览器签章模块
        封装了签章函数实现过程：读取key设备、获取证书列表、渲染证书列表layer、选择证书显示签章图片、获取签章点击坐标（DPI和页面缩放比例scale处理）
                              传参到签章接口、set和get签章的base64编码、读取base64编码openPDF、签章图片大小的处理（DPI和scale）、放大缩小上一页下一页功能函数
                              回车跳到指定页、鼠标滚动切换pdf页、是否显示功能按钮的处理

   pdf预览:支持Google、Firefox、edge、IE   定点签章

   2020-04-07
   增加验证（验证签名和整个证书路径包括是否作废）、显示证书UI、显示签名域、选中签名域、撤销最后一个签名/章

*/
/**
 * Google、Firefox
 * */
var netca_scaleSelect;
var netca_scaleSelect_option;

var netcanumPages;
var netcapageNumber;
var netca_canvas;

var netcapreviewpdf;
var netcaPDF;

var pageNum = 1; //上一页、下一页
var pdfscrollTop = 0;
var scrollFunc;
var NetcaPageNumber = 0; //页码：设定当前属于第几页
var decimal = 0; //界定页码

var NetcaUtils = (function () {
  var UtilsObject = {};

  ("use strict");

  //判断当前是否手动盖章界面
  UtilsObject.isUserManualSignUI = function () {
    if ($(".netcasignpdf").length) {
      return true;
    }

    return false;
  };
  //判断当前是否为预览界面
  UtilsObject.isUserPreviewUI = function () {
    if ($(".netcapreviewpdf").length) {
      return true;
    }

    return false;
  };
  return UtilsObject;
})();

var NetcaSignAPI = (function () {
  "use strict";
  //获取元素
  var netcaDisplaySignedDataVerify;
  var netcasignedDataVerify;
  var netcaPDF1;
  var NetcaSignMoveImage;
  var NetcaSignMoveDiv;
  var netcascaleSelect;
  var NetcaSignImage;
  var netcaPageNum;
  var netcaselectScale;
  var netcapageNumberSpan;
  var NetcaToolBar;
  var netcainvalidInfo;
  var netcainvalidIcon_img;
  var netcasubjectCN_img;
  var netcasignInfo;
  var netcasignDetail;
  var netcainvalidBtn;

  //定义变量名
  var originImage_width; //初始状态图片的width（指图片没经过缩放）
  var originImage_height; //初始状态的图标的height
  var sealImage_halfWidth; //签章图片width的一半，用于鼠标定位到图片中心
  var sealImage_halfheight;
  var click_x; //点击点的横坐标
  var click_y; //点击点的纵坐标
  var page_size; //页码
  var scale; //页面缩放比例
  var sealImageSrc = ""; //签章图片src
  var NetcaSignAPI = {
    certEncode: "", //证书编码
    //默认嵌入作废信息，保持和客户端一样
    revInfoIncludeFlag: false,
    //当打开文档时验证文档有效性
    verifyDocumentValidity: null,
    isVerifyOpen: false,
    TimeStamp: {
      //默认使用时间戳，保持和客户端一样
      tsaUrl: "", //时间戳地址
      tsaUsr: "", //时间戳服务对应用户名
      tsaPwd: "", //时间戳服务对应用户的密码
      tsaHashAlgo: "",
    },

    tagObj: {
      width: 0,
      height: 0,
    },
    scale: 1,
    zoomOutScale: [],
    zoomInScale: [],
    VerifyInfos: [],
  };
  var filedFlag = false;
  //验证级别
  var NETCA_PKI_SINGEDDATA_VERIFY_LEVEL_VERIFY_CERTPATH_REVOKE = null;
  /**获取证书列表*/
  NetcaSignAPI.getCertList = function () {
    NetcaSignAPI.isInsertKey();
  };
  /**判断是否插入key*/
  NetcaSignAPI.isInsertKey = function () {
    netca_isInsertKey(
      "",
      "",
      "",
      NetcaSignAPI.InsertCallBack,
      NetcaSignAPI.UnInsertCallBack
    );
  };
  /**判断是否插入key 成功回调*/
  NetcaSignAPI.InsertCallBack = function (res) {
    if (res.insertCount) {
      netca_SelectSealSigntureInfoWithDispaly(
        function (res) {
          if (res.type === 2) {
            alert("不支持 无外观（不可见签名），请重新选择电子印章");
          } else {
            NetcaSignAPI.certEncode = res.cert;
            NetcaSignAPI.tagObj.width = res.width;
            NetcaSignAPI.tagObj.height = res.height;
            sealImageSrc = res.picture;
            NetcaSignAPI.NetSetSignImageSize();
            NetcaSignAPI.NetcaSignImageMoveEvent();
          }
        },
        function (res) {
          console.log(res);
          alert("获取签名弹框失败：" + res.msg);
        }
      );
    }
  };
  /**判断是否插入key 失败回调*/
  NetcaSignAPI.UnInsertCallBack = function (res) {
    if (!res.insertCount) {
      alert("找不到签名证书，请检查设备是否连接正确");
    }
  };

  NetcaSignAPI.initPreView = function (scale) {
    NetcaSignAPI.setScale(scale);
  };
  /**设置pdf缩放比例*/
  NetcaSignAPI.setScale = function (scale) {
    NetcaSignAPI.scale = scale;
  };
  /**选中option，缩放pdf*/
  NetcaSignAPI.zoomPDFBySelectOptionScale = function () {
    netca_scaleSelect.onchange = function () {
      var result =
        netca_scaleSelect.options[netca_scaleSelect.selectedIndex].value;
      NetcaSignAPI.setScale(result);
      NetcaSignAPI.netcaLoadPDF(result, NetcaPDFSeal.SetPDFBytes);
      NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.SetPDFBytes);
    };
  };
  /**获取页面缩放比例
     ctrl+鼠标缩放页面时，缩放倍数不是option中预设的，获取到的scale会是0；
     通过NetcaSignAPI.getCurrentScale()拿到当前的scale
     * */
  NetcaSignAPI.getScale = function () {
    var currentScale = NetcaSignAPI.NetcaChangeRatio();
    scale = currentScale === 100 ? NetcaSignAPI.scale : currentScale / 100;
    return scale;
  };
  /**
    设置跟随鼠标移动的图片大小
    图像的像素宽度为 originImage_width，水平分辨率为 72 点/英寸
    如果调用此方法在分辨率为 96 点/英寸的设备上绘制该图像，则所呈现图像的像素宽度就是： (originImage_width/72)*96
    * */
  NetcaSignAPI.NetSetSignImageSize = function () {
    /**
     * 注意：jquery的width()不能获取到图片的宽度，改为原生js写法
     * 设置图片大小为NetcaSignAPI.getNetcaSealTag 获得的width  height
     */
    NetcaSignMoveImage.width(NetcaSignAPI.tagObj.width);
    NetcaSignMoveImage.height(NetcaSignAPI.tagObj.height);

    /**缩放比例*/
    var scale = NetcaSignAPI.getScale();
    NetcaSignMoveImage.attr("src", "data:image/PNG;base64," + sealImageSrc);

    originImage_width = NetcaSignMoveImage.width();
    var w = originImage_width * scale;
    NetcaSignMoveDiv.width(w);

    originImage_height = NetcaSignMoveImage.height();
    var h = originImage_height * scale;
    NetcaSignMoveDiv.height(h);

    NetcaSignMoveImage.css({
      width: "100%",
      height: "100%",
    });

    sealImage_halfWidth = parseInt(NetcaSignMoveDiv.width()) / 2;
    sealImage_halfheight = parseInt(NetcaSignMoveDiv.height()) / 2;
  };
  /**鼠标移动签章图片事件 mousemove*/
  NetcaSignAPI.NetcaSignImageMoveEvent = function () {
    $(document).mousemove(function (event) {
      var ev = event || window.event;
      /**position left和top 设置鼠标位于图片中央*/
      NetcaSignMoveDiv.css({
        display: "block",
        left: ev.clientX - sealImage_halfWidth + "px",
        top: ev.clientY - sealImage_halfheight + "px",
      });
    });

    $(document).mousedown(function () {
      NetcaSignAPI.NetcaGetSignImagePosition();
    });

    $(document).mouseup(function () {
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
    });
    /**点击右键  取消签章*/
    $(document).bind("contextmenu", function () {
      NetcaSignAPI.NetcaHideSignImage();
      netcaPDF1.unbind("click");
      return false;
    });
  };
  /**netcaPDF点击事件*/
  NetcaSignAPI.netcaPdfClickEvent = function () {
    var flag = 2;
    var netcasignpdf = document.getElementsByClassName("netcasignpdf")[0];
    var netcasignpdf_offsetLeft = netcasignpdf.offsetLeft;
    var netcasignpdf_offsetTop = netcasignpdf.offsetTop;
    $("#netcaPDF").click(function (e) {
      flag--;
      /**    每一页canvas的outerWidth、包括padding、border
       * */
      // var page_width = $('canvas').width();
      var page_height = $("canvas").outerHeight() - 7;
      //减7  每一页的paddingBottom多余的7px

      /**#netcaPDF 滚动条滚动的高度*/
      pdfscrollTop = $("#netcaPDF").scrollTop();

      /**鼠标指针的位置，相对于文档的左边缘/上边缘*/
      var position_x = e.clientX;
      var position_y = e.clientY - 70; //70 toolbar的高度
      if (netcasignedDataVerify.css("display") === "block") {
        position_y = position_y - 45; //验证提示信息的高度
      }
      if (netcaDisplaySignedDataVerify.css("display") === "block") {
        position_x = position_x - netcaDisplaySignedDataVerify.width();
      }
      var page_y = position_y + pdfscrollTop;

      /**获取点击页码*/
      page_size = Math.floor(page_y / page_height) + 1;
      /**pdf文档的总宽度*/
      var netcaPDF_width = $("#netca_canvas").width();
      netcaPDF_width = netcaPDF_width - 19; //减去滚动条的宽度19px
      /**鼠标在canvas页面上距离左边界的距离*/
      var blank_width = parseInt(
        $("canvas")
          .eq(page_size - 1)
          .css("marginLeft")
      );

      /**x坐标*/
      if (blank_width >= 0) {
        click_x = position_x - blank_width - netcasignpdf_offsetLeft;
      } else {
        click_x = position_x - netcasignpdf_offsetLeft;
      }

      /**y坐标*/
      click_y = page_y - page_height * (page_size - 1) - netcasignpdf_offsetTop;
      if (flag > 0) {
        /**每次点击只触发一次签章 超出文档左右界线不能点击签章*/
        if (
          click_x >= 0 &&
          netcaPDF_width - click_x - blank_width >= blank_width
        ) {
          NetcaSignAPI.seal_SignSealPosition();
        } else {
          NetcaSignAPI.NetcaHideSignImage();
          alert("不在签章范围内");
        }
      } else {
        return false;
      }
    });
  };
  /**
   * 获取点击PDF的坐标位置x\y以及页码，放置签章图片
   * */
  NetcaSignAPI.NetcaGetSignImagePosition = function () {
    NetcaSignAPI.netcaPdfClickEvent();
  };
  /**签章函数*/
  NetcaSignAPI.seal_SignSealPosition = function () {
    var xPos = parseInt(
      NetcaSignAPI.getMappingZoom(click_x - sealImage_halfWidth - 10)
    );
    var yPos = parseInt(
      NetcaSignAPI.getMappingZoom(click_y - sealImage_halfheight - 10)
    ); //-10 paddingTop + marginTop
    xPos = parseInt(xPos); //签名域/签章左下角的水平向右方向坐标
    yPos = parseInt(yPos); //签名域/签章左下角的垂直向上方向坐标
    var srcFile = "";
    var srcBytes = NetcaPDFSeal.SetPDFBytes;
    var destFile = ""; //目标pdf文件
    var certEncode = NetcaSignAPI.certEncode; //签名证书Base64编码
    var selMode = 1; //操作模式
    var signFieldText = ""; //签名域显示的文字
    var sealImageEncode = sealImageSrc; //签章图片Base64编码
    var fieldName = ""; //签名域名称
    var revInfoIncludeFlag = NetcaSignAPI.revInfoIncludeFlag; //是否包含吊销信息

    //SignPosition对象说明
    var pageNum = parseInt(page_size); //PDF文档的页码
    var width = parseInt(originImage_width); //签名域/签章的宽度
    var height = parseInt(originImage_height); //签名域/签章的高度

    //Tsa对象说明
    var tsaUrl = NetcaSignAPI.TimeStamp.tsaUrl; //时间戳地址
    var tsaUsr = NetcaSignAPI.TimeStamp.tsaUsr; //时间戳服务对应用户名
    var tsaPwd = NetcaSignAPI.TimeStamp.tsaPwd; //时间戳服务对应用户的密码
    var tsaHashAlgo = NetcaSignAPI.TimeStamp.tsaHashAlgo;

    netca_SignatureCreator_PdfSignSealPosition(
      srcFile,
      srcBytes,
      destFile,
      certEncode,
      selMode,
      signFieldText,
      sealImageEncode,
      revInfoIncludeFlag,
      pageNum,
      xPos,
      yPos,
      width,
      height,
      tsaUrl,
      tsaUsr,
      tsaPwd,
      tsaHashAlgo,
      NetcaSignAPI.SignatureCreatorSuccessCallBack,
      NetcaSignAPI.SignatureCreatorFailedCallBack
    );
  };
  NetcaSignAPI.SignatureCreatorSuccessCallBack = function (res) {
    var signValue = res.destFileEncode;
    NetcaPDFSeal.setPDFBytes(signValue);
    layer.open({
      title: "提示",
      content: "签名/章成功",
      btn: ["确定"],
      yes: function (index) {
        //按钮确定的回调
        NetcaSignAPI.signedDataVerify(
          "",
          signValue,
          NETCA_PKI_SINGEDDATA_VERIFY_LEVEL_VERIFY_CERTPATH_REVOKE
        );
        NetcaSignAPI.resetTheOriginalState(index);
        filedFlag = true;
        NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.SetPDFBytes);
      },
      cancel: function (index) {
        //右上角关闭回调
        NetcaSignAPI.resetTheOriginalState(index);
      },
    });
    NetcaSignAPI.certEncode = null;
  };
  /**浏览器缩放映射->OPTION缩放->接口72DPI缩放*/
  NetcaSignAPI.getMappingZoom = function (size) {
    //size 需要转换的长度 ratio!== 100 && scale !== 1
    var ratio = NetcaSignAPI.NetcaChangeRatio() / 100;
    var ratioSize = size / ratio;
    var len = ratioSize / NetcaSignAPI.scale;
    return len;
  };
  NetcaSignAPI.SignatureCreatorFailedCallBack = function (res) {
    NetcaSignAPI.NetcaHideSignImage();
    NetcaSignAPI.certEncode = null;
    alert("签名/章失败 " + res.msg);
  };
  /**
   * 隐藏签章图片
   * */
  NetcaSignAPI.NetcaHideSignImage = function () {
    NetcaSignMoveDiv.css({
      display: "none",
    });
  };
  /**
   * 重置状态：关闭layer、签章图片隐藏、展示最新pdf
   * */
  NetcaSignAPI.resetTheOriginalState = function (index) {
    layer.close(index);
    NetcaSignAPI.netcaLoadPDF(
      NetcaSignAPI.scale,
      NetcaPDFSeal.getSignPDFBytes()
    );
    NetcaSignMoveImage.attr("src", "");
    NetcaSignAPI.NetcaHideSignImage();
  };

  NetcaSignAPI.netcaLoadPDF = function (scale, byteBase64) {
    this.setScale(scale);
    this.openPDF(byteBase64);
  };
  /**打开PDF*/
  NetcaSignAPI.openPDF = function (byteBase64) {
    var selfScale = this.scale;

    /**每次渲染之前先置空netcaPDF*/

    netcaPDF.innerHTML = "";

    var loadingTask = pdfjsLib.getDocument({ data: atob(byteBase64) });

    loadingTask.promise.then(function (pdf) {
      /**总页数*/
      if (NetcaUtils.isUserManualSignUI()) {
        netcanumPages.innerText = pdf.numPages;
      }

      for (var i = 1; i < pdf.numPages + 1; i++) {
        // 先添加一个占位的div
        var placeholderDiv = document.createElement("div");
        netcaPDF.append(placeholderDiv);

        void (function (pageNumber) {
          pdf.getPage(pageNumber).then(
            function (page) {
              /**页面缩放比例scale，通过外部传参进来
               * */
              console.log(selfScale);
              var viewport = page.getViewport({ scale: selfScale });

              var canvas = document.createElement("canvas");

              var context = canvas.getContext("2d");

              canvas.width = viewport.width;
              canvas.height = viewport.height;
              // 添加到页码对应的 div 里
              netcaPDF.childNodes[pageNumber - 1].appendChild(canvas);

              var renderContext = {
                canvasContext: context,
                viewport: viewport,
              };

              /**签章完成后，通过scrollTop回到签章当前的位置范围*/
              if ($("#netcaPDF").length) $("#netcaPDF").scrollTop(pdfscrollTop);

              /**如果签章时，鼠标+ctrl放大了页面，当签章完成后，让页面缩放比例置为1，ratio = 1
               * */
              if ($("#netcaPDF").length) {
                window.devicePixelRatio = 1;
              }

              page.render(renderContext);
            },
            function (err) {
              alert("pdf解析失败：" + err);
            }
          );
        })(i);
      }
    });
  };
  /**时间戳*/
  NetcaSignAPI.NetcaSetTimeStamp = function (
    tsaUrl,
    tsaUsr,
    tsaPwd,
    tsaHashAlgo
  ) {
    NetcaSignAPI.TimeStamp.tsaUrl = tsaUrl; //时间戳地址
    NetcaSignAPI.TimeStamp.tsaUsr = tsaUsr; //时间戳服务对应用户名
    NetcaSignAPI.TimeStamp.tsaPwd = tsaPwd; //时间戳服务对应用户的密码
    NetcaSignAPI.TimeStamp.tsaHashAlgo = tsaHashAlgo; //hash算法
  };
  /**是否包含吊销信息 true\false*/
  NetcaSignAPI.NetcaRevInfoIncludeFlag = function (flag) {
    NetcaSignAPI.revInfoIncludeFlag = flag;
  };

  /**调整浏览器显示比例*/
  NetcaSignAPI.NetcaChangeRatio = function () {
    var ratio = 0;
    var screen = window.screen;
    var ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    } else if (~ua.indexOf("msie")) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
    } else if (
      window.outerWidth !== undefined &&
      window.innerWidth !== undefined
    ) {
      ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
      ratio = Math.round(ratio * 100);
    }
    return ratio;
  };
  /**缩放倍数*/
  NetcaSignAPI.NetcaGetZoomScale = function () {
    for (var i = 0; i < netca_scaleSelect_option.length; i++) {
      if (netca_scaleSelect_option[i].value > NetcaSignAPI.scale) {
        NetcaSignAPI.zoomOutScale.push(netca_scaleSelect_option[i].value);
      }
      if (netca_scaleSelect_option[i].value < NetcaSignAPI.scale) {
        NetcaSignAPI.zoomInScale.push(
          Number(netca_scaleSelect_option[i].value)
        );
      }
    }
    NetcaSignAPI.zoomInScale.sort(function (a, b) {
      return b - a;
    });
  };
  /**
   * 点击放大、缩小按钮功能函数
   */
  NetcaSignAPI.NetcaZoomPDFPage = function (arg) {
    if (arg === "zoomOut") {
      NetcaSignAPI.zoomOutScale = [];
      NetcaSignAPI.NetcaZoomOutInPDF(NetcaSignAPI.zoomOutScale);
    } else if (arg === "zoomIn") {
      NetcaSignAPI.zoomInScale = [];
      NetcaSignAPI.NetcaZoomOutInPDF(NetcaSignAPI.zoomInScale);
    }
  };
  /**
   * 放大、缩小按钮事件的实现过程
   */
  NetcaSignAPI.NetcaZoomOutInPDF = function (condition) {
    var zoomFlag = 0;
    NetcaSignAPI.NetcaGetZoomScale();
    if (condition) {
      for (var j = 0; j < condition.length; j++) {
        if (zoomFlag === j) {
          NetcaSignAPI.netcaLoadPDF(
            Number(condition[j]),
            NetcaPDFSeal.getSignPDFBytes()
          );
          NetcaSignAPI.setScale(Number(condition[j]));
          NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.getSignPDFBytes());
          netcascaleSelect.val(NetcaSignAPI.scale);
        }
      }
      zoomFlag++;
      if (zoomFlag > condition.length) {
        return false;
      }
    } else {
      return false;
    }
  };
  /**
     下一页按钮事件
     * */
  NetcaSignAPI.NetcaGoToNextPage = function () {
    if (pageNum < netcanumPages.innerText) {
      netcapageNumber.value = pageNum + 1;
      netcaPDF1.scrollTop(($("canvas").outerHeight() - 7) * pageNum);
      pageNum++;
    }
  };
  /**
     上一页按钮事件
     * */
  NetcaSignAPI.NetcaGoToPrevPage = function () {
    if (pageNum > 1) {
      pageNum--;
      netcaPageNum.val(pageNum);
      netcaPDF1.scrollTop(($("canvas").outerHeight() - 7) * (pageNum - 1));
    }
  };
  NetcaSignAPI.setUIVisible = function (obj) {
    for (var k in obj) {
      if (!obj[k]) {
        $("#" + k).css({ display: "none" });
      } else {
        $("#" + k).css({ display: "inline-block" });
      }
    }
    if (obj.NetcaToolBar === true) {
      NetcaToolBar.css({ display: "block" });
      netcaPDF1.css({ top: "70px" });
    } else if (obj.NetcaToolBar === false) {
      NetcaToolBar.css({ display: "none" });
      netcaPDF1.css({ top: "0" });
    }
  };

  /**
   * 判断firefox\edge浏览器、改变缩放比例和页码的top值
   * */
  NetcaSignAPI.checkBrowseFirefoxOrEdge = function () {
    if (
      navigator.userAgent.indexOf("Firefox") >= 0 ||
      navigator.userAgent.indexOf("Edge") >= 0
    ) {
      netcaselectScale.css({ top: "-18px" });
      netcapageNumberSpan.css({ top: "-18px" });
    }
  };

  /**页数 input 回车事件*/
  NetcaSignAPI.goTofixedPagePDF = function (event) {
    //input为空或者0时，默认为第一页
    if (netcapageNumber.value === "" || netcapageNumber.value === "0") {
      if (event.keyCode === 13) {
        netcaPDF1.scrollTop(0);
        netcapageNumber.value = 1;
      }
    }
    //input值大于总页数时
    if (Number(netcapageNumber.value) <= Number(netcanumPages.innerText)) {
      if (event.keyCode === 13) {
        netcaPDF1.scrollTop(
          ($("canvas").outerHeight() - 7) * (Number(netcapageNumber.value) - 1)
        );
        pageNum = Number(netcapageNumber.value);
      }
    } else {
      //小于总页数时
      if (event.keyCode === 13) {
        netcaPDF1.scrollTop(0);
        netcapageNumber.value = 1;
      }
    }
  };
  NetcaSignAPI.initUI = function () {
    //初始化dom对象

    if (NetcaUtils.isUserManualSignUI()) {
      netca_scaleSelect = document.getElementById("netcascaleSelect");
      netca_scaleSelect_option =
        netca_scaleSelect.getElementsByTagName("option");

      netcanumPages = document.getElementById("netcanumPages");
      netcapageNumber = document.getElementById("netcapageNumber");
      netca_canvas = document.getElementById("netca_canvas");
      // NetcaSignImage = document.getElementById('NetcaSignImage');
      netcaPDF = document.getElementById("netcaPDF");

      netcaDisplaySignedDataVerify = $("#netcaDisplaySignedDataVerify");
      netcasignedDataVerify = $("#netcasignedDataVerify");
      netcaPDF1 = $("#netcaPDF");
      NetcaSignMoveImage = $("#NetcaSignMoveImage");
      NetcaSignMoveDiv = $(".NetcaSignMoveDiv");
      netcascaleSelect = $("#netcascaleSelect");
      NetcaSignImage = $("#NetcaSignImage");
      netcaPageNum = $("#netcapageNumber");
      netcaselectScale = $(".netcaselectScale");
      netcapageNumberSpan = $(".netcapageNumber");
      NetcaToolBar = $(".NetcaToolBar");
      netcainvalidInfo = $(".netcainvalidInfo");
      netcainvalidIcon_img = $(".netcainvalidIcon img");
      netcasubjectCN_img = $(".netcasubjectCN img");
      netcasignInfo = $(".netcasignInfo");
      netcasignDetail = $(".netcasignDetail");
      netcainvalidBtn = $("#netcainvalidBtn");

      /**绑定事件函数
       * 签章、放大、缩小、上一页、下一页、input回车、关闭签名验证提示、签名验证后详细信息 NetcaSignAPI.displayInfoFeild
       * */
      document
        .getElementById("netcasign")
        .addEventListener("click", NetcaSignAPI.getCertList);
      document
        .getElementById("netcaVerfity")
        .addEventListener("click", function () {
          NetcaSignAPI.signedDataVerify(
            "",
            NetcaPDFSeal.SetPDFBytes,
            NETCA_PKI_SINGEDDATA_VERIFY_LEVEL_VERIFY_CERTPATH_REVOKE,
            true
          );
        });
      document
        .getElementById("netcazoomOut")
        .addEventListener("click", function () {
          NetcaSignAPI.NetcaZoomPDFPage("zoomOut");
        });
      document
        .getElementById("netcazoomIn")
        .addEventListener("click", function () {
          NetcaSignAPI.NetcaZoomPDFPage("zoomIn");
        });
      document
        .getElementById("netcaprevious")
        .addEventListener("click", NetcaSignAPI.NetcaGoToPrevPage);
      document
        .getElementById("netcanext")
        .addEventListener("click", NetcaSignAPI.NetcaGoToNextPage);
      document
        .getElementById("netcainvalidClose")
        .addEventListener("click", function () {
          NetcaSignAPI.closeSignedDataVerifyInfo("netcainvalidClose");
        });
      document
        .getElementById("netcaclose2")
        .addEventListener("click", function () {
          NetcaSignAPI.closeSignedDataVerifyInfo("netcaclose2");
        });
      document
        .getElementById("netcainvalidBtn")
        .addEventListener("click", NetcaSignAPI.displaySignedDataVerifyInfo);

      /**input 页数keydown事件*/
      netcapageNumber.addEventListener(
        "keydown",
        NetcaSignAPI.goTofixedPagePDF
      );

      /**
       * 输入页数，点击NetcaToolBar,跳到指定页
       * */
      $("#NetcaToolBar").bind("click", function (event) {
        // event.currentTarget
        if (event.target === event.currentTarget) {
          //input为''、0、特殊字符时，回到第一页
          if (
            Number(netcapageNumber.value) > Number(netcanumPages.innerText) ||
            Number(netcapageNumber.value) <= 0 ||
            isNaN(Number(netcaPageNum.val()))
          ) {
            netcaPDF1.scrollTop(0);
            netcapageNumber.value = 1;
          }
          if (
            netcaPDF1.scrollTop() !==
            ($("canvas").outerHeight() - 7) * (Number(netcaPageNum.val()) - 1)
          ) {
            netcaPDF1.scrollTop(
              ($("canvas").outerHeight() - 7) * (Number(netcaPageNum.val()) - 1)
            );
            pageNum = Number(netcaPageNum.val());
          }
        }
      });

      /**
       * 选中option，缩放pdf
       * */

      NetcaSignAPI.zoomPDFBySelectOptionScale();

      NetcaSignAPI.checkBrowseFirefoxOrEdge();

      /**netcaPDF 滚动条事件**/
      // $("#netcaPDF").scroll(function() {
      //     NetcaSignAPI.getPageNum();
      //     if(parseInt(decimal * 10) <= 4){
      //         netcaPageNum.val(NetcaPageNumber);
      //     }
      // });

      /**
       * 鼠标滚动事件：页码切换
       * netcaPDF滚过的高度 + netcaPDF高度  === 当前canvas总高度
       * canvas总高度 / 一个canvas的高度  === 倍数
       * 注：倍数取整是页码，剩下小数部分*10，取整后，在0~9之间，根据临界值判断当前界面属于上一页还是下一页；此处选择 4 作为判断标准
       * */
      scrollFunc = function (e) {
        e = e || window.event;

        /**当滑轮向上滚动时*/
        if (e.wheelDelta > 0 || e.detail < 0) {
          NetcaSignAPI.getPageNum();
          if (parseInt(decimal * 10) <= 4) {
            netcaPageNum.val(NetcaPageNumber);
          }
        }
        /** 当滑轮向下滚动时*/
        if (e.wheelDelta < 0 || e.detail > 0) {
          NetcaSignAPI.getPageNum();
          if (parseInt(decimal * 10) >= 3) {
            netcaPageNum.val(NetcaPageNumber + 1);
          }
        }
      };

      /**IE、Opera注册事件 attachEvent*/
      if (document.attachEvent) {
        document.attachEvent("onmousewheel", scrollFunc);
      }
      /**Firefox使用addEventListener添加滚轮事件*/
      if (document.addEventListener) {
        //firefox
        document.addEventListener("DOMMouseScroll", scrollFunc, false);
      }
      /**Safari与Chrome属于同一类型*/
      window.onmousewheel = document.onmousewheel = scrollFunc;

      /**
       * 解析渲染pdf
       * 参数scale:缩放比例，默认是1
       * 参数pdfData:base64编码，注意：需要atob解码
       * */
      NetcaPDFSeal.setPDFBytes(btoa(NetcaPDFSeal.OpenPDFBytes));
      pdfjsLib.GlobalWorkerOptions.workerSrc = "./js/pdf.worker.js";
    } else if (NetcaUtils.isUserPreviewUI()) {
      netcapreviewpdf = document.getElementById("netcapreviewpdf");
      netcaPDF = document.getElementById("netca_canvas");
    }

    // $('#NetcaReaderAx').remove();
    $("#netca_canvas").css("display", "inline-block");
    $("#NetcaReaderAx").css("display", "none");
  };
  NetcaSignAPI.getPageNum = function () {
    var totalHeight = netcaPDF1.scrollTop() + netcaPDF1.outerHeight();
    var page = (totalHeight / $("canvas").outerHeight()).toFixed(1) + 1.0;
    NetcaPageNumber = parseInt(page);
    decimal = page - NetcaPageNumber;
  };
  /**
   * signatureVerifierVerifyPDF PDF签名文档进行验证
   * */
  NetcaSignAPI.signedDataVerify = function (srcFile, srcBytes, level, params) {
    if (params) {
      if (
        netcasignedDataVerify.css("display") === "none" ||
        (netcasignedDataVerify.css("display") === "none" &&
          netcaDisplaySignedDataVerify.css("display") === "block")
      ) {
        netca_signatureVerifierVerifyPDF(
          srcFile,
          srcBytes,
          level,
          NetcaSignAPI.SuccessSignedDataVerifyCallBack,
          NetcaSignAPI.FailedSignedDataVerifyCallBack
        );
      }
    } else {
      netca_signatureVerifierVerifyPDF(
        srcFile,
        srcBytes,
        level,
        NetcaSignAPI.SuccessSignedDataVerifyCallBack,
        NetcaSignAPI.FailedSignedDataVerifyCallBack
      );
    }
  };
  NetcaSignAPI.SuccessSignedDataVerifyCallBack = function (res) {
    NetcaSignAPI.VerifyInfos = res.VerifyInfos;
    NetcaSignAPI.createSignedDataVerifyInfo();
    NetcaSignAPI.displaySignedDataVerifyTip("success", res.VerifyInfos);

    NetcaSignAPI.displayCert();
    NetcaSignAPI.displayInfoFeild();
  };
  NetcaSignAPI.FailedSignedDataVerifyCallBack = function (res) {
    if (NetcaSignAPI.isVerifyOpen) {
      if (res.status === -2006) {
        NetcaSignAPI.isVerifyOpen = false;
      }
    } else {
      NetcaSignAPI.displaySignedDataVerifyTip("fail");
      alert("验证签名失败：" + res.msg);
    }
  };
  /**
   * 显示签名验证后的信息
   * */
  NetcaSignAPI.displaySignedDataVerifyTip = function (arg, info) {
    var len = [];
    if (arg === "success" && info) {
      for (var i = 0; i < info.length; i++) {
        if (info[i].status === "签名状态无效") {
          len.push(info[i].status);
        }
      }
      if (len.length) {
        netcainvalidInfo.text(
          '至少一个签名验证失败，请点击右方 "详细信息" 查询签名的详细验证信息。'
        );
        netcainvalidIcon_img.attr("src", "ui/image/certicon_invalid.png");
      } else {
        netcainvalidInfo.text(
          '签名验证成功，请点击右方 "详细信息" 查询签名的详细验证信息。'
        );
        netcainvalidIcon_img.attr("src", "ui/image/certicon_valid.png");
      }
      if ($("#netcainvalidBtn").css("display") === "none") {
        $("#netcainvalidBtn").css({
          display: "inline-block",
        });
      }
    }
    if (arg === "fail") {
      netcainvalidInfo.text("本文档找不到可验证的签名");
      netcainvalidIcon_img.attr("src", "");
      netcainvalidBtn.css("display", "none");
    }
    if (netcaDisplaySignedDataVerify.css("display") === "block") {
      netcaDisplaySignedDataVerify.css({ top: "115px" });
    }
    netcasignedDataVerify.css("display", "block");
    netcaPDF1.css({ top: "115px" });
  };
  /**
   * 点击close按钮，关闭签名验证信息
   * */
  NetcaSignAPI.closeSignedDataVerifyInfo = function (params) {
    if (params === "netcainvalidClose") {
      netcasignedDataVerify.css("display", "none");
      netcaPDF1.css({ top: "70px" });
      netcaDisplaySignedDataVerify.css({ top: "70px" });
    }
    if (params === "netcaclose2") {
      netcaDisplaySignedDataVerify.css({ display: "none" });
      netcaPDF1.css({ left: "0", width: "100%" });
      NetcaSignAPI.VerifyInfos = null;
      NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.SetPDFBytes);
    }
  };
  /**
   * 点击详细信息，显示左侧签名验证详细信息
   * */
  NetcaSignAPI.displaySignedDataVerifyInfo = function () {
    netcaDisplaySignedDataVerify.css({ display: "block" });
    netcaPDF1.css({ width: "82%", left: "18%" });
    NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.SetPDFBytes);
  };
  /**
   * 动态生成 签名验证 具体信息
   * */
  NetcaSignAPI.createSignedDataVerifyInfo = function () {
    var icon = "";
    var htmlDOM = "";
    //清空节点内容
    $("div").remove(".netcasignDetail");
    for (var i = 0; i < NetcaSignAPI.VerifyInfos.length; i++) {
      (function (i) {
        if (NetcaSignAPI.VerifyInfos[i].status === "签名状态无效") {
          icon = "icon_invalid";
          NetcaSignAPI.VerifyInfos[i].status1 = "签名无效";
        } else {
          icon = "icon_valid";
          NetcaSignAPI.VerifyInfos[i].status1 = "签名有效";
        }
        if (NetcaSignAPI.VerifyInfos[i].hasTsa === true) {
          NetcaSignAPI.VerifyInfos[i].hasTsaText = "已嵌入时间戳";
          if (NetcaSignAPI.VerifyInfos[i].isTsaValid === true) {
            NetcaSignAPI.VerifyInfos[i].isTsaValidText = "有效";
          } else if (NetcaSignAPI.VerifyInfos[i].isTsaValid === false) {
            NetcaSignAPI.VerifyInfos[i].isTsaValidText = "无效";
          }
        }
        if (NetcaSignAPI.VerifyInfos[i].hasRevoke === true) {
          NetcaSignAPI.VerifyInfos[i].hasRevokeText = "已嵌入吊销信息";
        }
        htmlDOM +=
          '                        <div class="netcasignDetail">\n' +
          '                             <span class="btn_fold"><img class="btn_fold_img" src="ui/image/btn_unfold.png"></span>\n' +
          '                            <span class="netcasubjectCN"><span><img src="ui/image/' +
          icon +
          '.png" alt=""></span>' +
          NetcaSignAPI.VerifyInfos[i].signerName +
          "</span>\n" +
          '                            <div class="netcasignContent">\n' +
          '                                <div class="netcasignTip"><span>' +
          NetcaSignAPI.VerifyInfos[i].status1 +
          '</span> <input type="button" value="详细" class="netcadetailBtn"><input type="hidden" value="' +
          NetcaSignAPI.VerifyInfos[i].certEncode +
          '" class="netcahiddenBtn"></div>\n' +
          '                                <div class="netcasignTime">\n' +
          "                                    <p>域名:" +
          NetcaSignAPI.VerifyInfos[i].fieldName +
          "</p>\n" +
          "                                    <p><span> 签名时间:</span><br><span> " +
          NetcaSignAPI.VerifyInfos[i].signDate +
          "</span></p>\n" +
          '                                    <p class="hasTsa"><span> ' +
          NetcaSignAPI.VerifyInfos[i].hasTsaText +
          "</span><span>（" +
          NetcaSignAPI.VerifyInfos[i].isTsaValidText +
          "）</span><br><span> " +
          NetcaSignAPI.VerifyInfos[i].tsaDate +
          "</span></p>\n" +
          '                                    <p class="hasRevoke"><span> ' +
          NetcaSignAPI.VerifyInfos[i].hasRevokeText +
          "</span><span>（" +
          NetcaSignAPI.VerifyInfos[i].revokeStatus +
          "）</span></p>\n" +
          "                                </div>\n" +
          "                            </div>\n" +
          "                        </div>";
      })(i);
    }
    if ($(".netcasignInfo").length) {
      netcasignInfo.append(htmlDOM);
    }
    var len = $(".hasTsa").length;
    for (var j = 0; j < len; j++) {
      if (NetcaSignAPI.VerifyInfos[j].hasRevoke === false) {
        $(".hasRevoke").eq(j).css({ display: "none" });
      }
      if (NetcaSignAPI.VerifyInfos[j].hasTsa === false) {
        $(".hasTsa").eq(j).css({ display: "none" });
      }
    }
    htmlDOM = null;
    NetcaSignAPI.VerifyInfos = null;
    len = null;
  };
  NetcaSignAPI.displayCert = function () {
    var arr = document.getElementsByClassName("netcadetailBtn");
    var arr1 = document.getElementsByClassName("netcahiddenBtn");
    var DeviceOutputId = document.getElementById("DeviceOutputId");
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i;
      arr[i].onclick = function () {
        DeviceOutputId.value = arr1[this.index].value;
        uIDisplayCert();
      };
    }
  };
  /**
   * 签名状态 切换显示
   * */
  NetcaSignAPI.displayInfoFeild = function () {
    var btn_fold = document.getElementsByClassName("btn_fold");
    for (var i = 0; i < btn_fold.length; i++) {
      btn_fold[i].index = i;
      btn_fold[i].onclick = function () {
        if ($(".netcasignTime").eq(this.index).css("display") === "none") {
          $(".netcasignTime").eq(this.index).css({ display: "block" });
          $(".btn_fold_img")
            .eq(this.index)
            .attr("src", "ui/image/btn_fold.png");
        } else {
          $(".netcasignTime").eq(this.index).css({ display: "none" });
          $(".btn_fold_img")
            .eq(this.index)
            .attr("src", "ui/image/btn_unfold.png");
        }
      };
    }
  };
  /***
   * 获取PDF文档的签名域信息
   * */
  NetcaSignAPI.getSignatureFieldInfo = function (signBytes) {
    $(".netcafieldInfo").remove();
    netca_getSignatureFieldInfo(
      "",
      signBytes,
      function (res) {
        if (res.signFields) {
          for (var i = 0; i < res.signFields.length; i++) {
            (function (i) {
              res.signFields[i].xPos =
                res.signFields[i].xPos * NetcaSignAPI.scale;
              res.signFields[i].yPos =
                res.signFields[i].yPos * NetcaSignAPI.scale;

              if (res.signFields[i].pageNum > 1) {
                res.signFields[i].yPos =
                  (res.signFields[i].pageNum - 1) *
                    $("canvas")
                      .eq(pageNum - 1)
                      .outerHeight(true) +
                  res.signFields[i].yPos;
              }

              res.signFields[i].yPos = res.signFields[i].yPos + 9;
              res.signFields[i].xPos =
                res.signFields[i].xPos +
                parseInt(
                  $("canvas")
                    .eq(pageNum - 1)
                    .css("marginLeft")
                ) +
                9;
              res.signFields[i].width =
                res.signFields[i].width * NetcaSignAPI.scale;
              res.signFields[i].height =
                res.signFields[i].height * NetcaSignAPI.scale;

              $("#netcaPDF").append(
                ' <div class="netcafieldInfo" style="position:absolute;z-index:99;width:' +
                  res.signFields[i].width +
                  "px;height:" +
                  res.signFields[i].height +
                  "px;left:" +
                  res.signFields[i].xPos +
                  "px;top:" +
                  res.signFields[i].yPos +
                  'px;"></div>'
              );
              if (res.signFields[i].width === 0) {
                $(".netcafieldInfo").eq(i).css({ display: "none" });
              }
            })(i);
          }
          if (filedFlag) {
            $(".netcafieldInfo")
              .eq($(".netcafieldInfo").length - 1)
              .append(
                "" +
                  '<img id="btn_discard" src="ui/image/btn_discard_nor.png" alt="" ' +
                  'style="position:absolute;top:-15px;right:-15px;z-index:1000;display: none;">' +
                  ""
              );
            $(".netcafieldInfo")
              .eq($(".netcafieldInfo").length - 1)
              .hover(
                function () {
                  $("#btn_discard").css({ display: "block" });
                },
                function () {
                  $("#btn_discard").css({ display: "none" });
                }
              );
            $("#btn_discard").click(function () {
              // -1表示最后的一个签名/章
              NetcaSignAPI.signatureVerifierUndoPDF(
                NetcaPDFSeal.getSignPDFBytes(),
                -1
              );
            });
          }
          NetcaSignAPI.selectSignatureField();
          NetcaSignAPI.selectCertField();
        }
      },
      function (res) {
        alert(res.msg);
      }
    );
  };
  /**
   * 选中签名域信息
   * */
  NetcaSignAPI.selectSignatureField = function () {
    var netcafieldInfo = document.getElementsByClassName("netcafieldInfo");
    for (var i = 0; i < netcafieldInfo.length; i++) {
      netcafieldInfo[i].index = i;
      netcafieldInfo[i].onclick = function () {
        $(".netcafieldInfo")
          .eq(this.index)
          .css({ border: "4px dashed #426bf6" });
        $(".netcafieldInfo").eq(this.index).siblings().css({ border: "" });
        $(".netcasignDetail").eq(this.index).css({ background: "#e2eeff" });
        $(".netcasignDetail")
          .eq(this.index)
          .siblings()
          .css({ background: "none" });
        if (this.index === netcafieldInfo.length - 1) {
          $("#btn_discard").css({ display: "block" });
          $(".netcafieldInfo").eq(this.index).off("hover");
        }
      };
    }
  };
  /**
   * 选中标签信息
   * */
  NetcaSignAPI.selectCertField = function () {
    var netcasignDetail = document.getElementsByClassName("netcasignDetail");
    for (var i = 0; i < netcasignDetail.length; i++) {
      netcasignDetail[i].index = i;
      netcasignDetail[i].onclick = function () {
        $(".netcafieldInfo")
          .eq(this.index)
          .css({ border: "4px dashed #426bf6" });
        $(".netcafieldInfo").eq(this.index).siblings().css({ border: "" });
        $(".netcasignDetail").eq(this.index).css({ background: "#e2eeff" });
        $(".netcasignDetail")
          .eq(this.index)
          .siblings()
          .css({ background: "none" });
        var div_top = parseInt($(".netcafieldInfo").eq(this.index).css("top"));
        if (div_top > 250) {
          netcaPDF1.scrollTop(div_top - 100);
        } else {
          netcaPDF1.scrollTop(div_top);
        }
      };
    }
  };
  /**
   * 撤销章
   * */
  NetcaSignAPI.signatureVerifierUndoPDF = function (_signBytes, _index) {
    layer.confirm(
      "是否需要撤销选定的签章？",
      {
        btn: ["是", "否"], //按钮
      },
      function (index) {
        layer.close(index);
        netca_signatureVerifierUndoPDF(
          "",
          _signBytes,
          _index,
          function (res) {
            NetcaPDFSeal.SetPDFBytes = res.srcBytes;
            NetcaSignAPI.netcaLoadPDF(NetcaSignAPI.scale, res.srcBytes);
            filedFlag = false;
            NetcaSignAPI.getSignatureFieldInfo(NetcaPDFSeal.SetPDFBytes);
            $(".netcasignDetail").last().remove();
          },
          function (res) {
            alert("撤销签名/章失败：" + res.msg);
          }
        );
      },
      function (index) {
        layer.close(index);
      }
    );
  };
  /**
   * 获取签章客户端的配置信息
   * */
  NetcaSignAPI.getSealConfigInfo = function () {
    netca_getSealConfigInfo(
      function (res) {
        //是否验证吊销状态
        NetcaSignAPI.revInfoIncludeFlag = res.sign.isRevokeInclude;
        //是否验证时间戳
        if (res.sign.isTsaInclude) {
          for (var i = 0; i < res.timeStamp.length; i++) {
            (function (i) {
              if (res.timeStamp[i].checked) {
                NetcaSignAPI.TimeStamp.tsaUrl = res.timeStamp[i].url;
              }
            })(i);
          }
        }
        //验证签名级别
        NETCA_PKI_SINGEDDATA_VERIFY_LEVEL_VERIFY_CERTPATH_REVOKE =
          res.verify.verifySignLevel;
        NetcaSignAPI.isVerifyOpen = res.verify.isVerifyOpen;
        //打开文档时是否验证文档有效性
        //if(NetcaSignAPI.isVerifyOpen){
        //NetcaSignAPI.signedDataVerify('',NetcaPDFSeal.SetPDFBytes,NETCA_PKI_SINGEDDATA_VERIFY_LEVEL_VERIFY_CERTPATH_REVOKE);
        //}
      },
      function (res) {
        alert(res.msg);
      }
    );
  };
  return NetcaSignAPI;
})();

/**
 * IE
 * */
var NetcaIESignAPI = (function () {
  var NetcaIESignAPI = {};
  var readerAx;

  NetcaIESignAPI.openPDF = function (byteBase64) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    var comObj = null;
    try {
      comObj = new ActiveXObject("NetcaPki.Utilities");
      var NETCA_PKI_BASE64_NO_NL = 1;
      var bytesDecode = comObj.Base64Decode(byteBase64, NETCA_PKI_BASE64_NO_NL);

      readerAx.PDFSavePath = ":AutoSave:";
      readerAx.AsyncOpenPDFBytes(bytesDecode);
    } catch (e) {
      alert("异常:" + e);
    }
  };
  NetcaIESignAPI.initPreView = function () {
    var obj = {
      NetcaToolBar: false,
      navigationBar: false,
    };

    NetcaIESignAPI.setUIVisible(obj);
  };
  NetcaIESignAPI.GetPDFBytes = function () {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;
    var path = readerAx.GetPDFBytes();
    comObj = new ActiveXObject("NetcaPki.Utilities");
    var NETCA_PKI_BASE64_NO_NL = 1;
    NetcaPDFSeal.setPDFBytes(comObj.Base64Encode(path, NETCA_PKI_BASE64_NO_NL));
  };
  NetcaIESignAPI.setUI = function (value, visiable) {
    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    readerAx.SetIndividuationUI(value, visiable, "");
  };
  NetcaIESignAPI.setUIVisible = function (obj) {
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

    if (readerAx == null)
      readerAx = document.getElementById("NetcaReaderAx").object;

    //工具栏
    if (obj.NetcaToolBar === true) {
      readerAx.SetIndividuationUI(UI_PDF_TOOLBAR_BUTTON, true, "");
    } else if (obj.NetcaToolBar === false) {
      readerAx.SetIndividuationUI(UI_PDF_TOOLBAR_BUTTON, false, "");
    }
    //打开按钮
    if (obj.netcaopen === true) {
      readerAx.SetIndividuationUI(UI_PDF_OPEN_BUTTON, true, "");
    } else if (obj.netcaopen === false) {
      readerAx.SetIndividuationUI(UI_PDF_OPEN_BUTTON, false, "");
    }

    //关闭按钮
    if (obj.netcasave === true) {
      readerAx.SetIndividuationUI(UI_PDF_SAVE_BUTTON, true, "");
    } else if (obj.netcasave === false) {
      readerAx.SetIndividuationUI(UI_PDF_SAVE_BUTTON, false, "");
    }
    //搜索
    if (obj.netcasearch === true) {
      readerAx.SetIndividuationUI(UI_PDF_SERACH_BUTTON, true, "");
    } else if (obj.netcasearch === false) {
      readerAx.SetIndividuationUI(UI_PDF_SERACH_BUTTON, false, "");
    }
    //放大
    if (obj.netcazoomOut === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_IN_BUTTON, true, "");
    } else if (obj.netcazoomOut === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_IN_BUTTON, false, "");
    }
    //缩小
    if (obj.netcazoomIn === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_OUT_BUTTON, true, "");
    } else if (obj.netcazoomIn === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_OUT_BUTTON, false, "");
    }
    //缩放select控件
    if (obj.netcascaleSelect === true) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_RATION_COMBO, true, "");
    } else if (obj.netcascaleSelect === false) {
      readerAx.SetIndividuationUI(UI_PDF_ZOOM_RATION_COMBO, false, "");
    }
    //第一个分割符控件
    if (obj.netcaFirstSeparator === true) {
      readerAx.SetIndividuationUI(UI_PDF_FIRST_SEPARATOR, true, "");
    } else if (obj.netcaFirstSeparator === false) {
      readerAx.SetIndividuationUI(UI_PDF_FIRST_SEPARATOR, false, "");
    }
    //上一页
    if (obj.netcaprevious === true) {
      readerAx.SetIndividuationUI(UI_PDF_FRONT_PAGE_BUTTON, true, "");
    } else if (obj.netcaprevious === false) {
      readerAx.SetIndividuationUI(UI_PDF_FRONT_PAGE_BUTTON, false, "");
    }
    //下一页
    if (obj.netcanext === true) {
      readerAx.SetIndividuationUI(UI_PDF_NEXT_PAGE_BUTTON, true, "");
    } else if (obj.netcanext === false) {
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
    //签章
    if (obj.netcasign === true) {
      readerAx.SetIndividuationUI(UI_PDF_SIGN_BUTTON, true, "");
    } else if (obj.netcasign === false) {
      readerAx.SetIndividuationUI(UI_PDF_SIGN_BUTTON, false, "");
    }
    //验证
    if (obj.netcaVerfity === true) {
      readerAx.SetIndividuationUI(UI_PDF_VERIFY_BUTTON, true, "");
    } else if (obj.netcaVerfity === false) {
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

    //关于
    if (obj.netcaAbout === true) {
      readerAx.SetIndividuationUI(UI_PDF_ABOUT_BUTTON, true, "");
    } else if (obj.netcaAbout === false) {
      readerAx.SetIndividuationUI(UI_PDF_ABOUT_BUTTON, false, "");
    }

    //导航栏
    if (obj.navigationBar === true) {
      readerAx.SetIndividuationUI(UI_PDF_NAVIGATION_BAR, true, "");
    } else if (obj.navigationBar === false) {
      readerAx.SetIndividuationUI(UI_PDF_NAVIGATION_BAR, false, "");
    }
  };
  NetcaIESignAPI.initUI = function () {
    var obj = {
      netcaopen: false,
      netcasave: false,
      netcasearch: false,
      netcaFirstSeparator: false,
      netcaSecondSeparator: false,
      netcaThirdSeparaor: false,
      // 'netcaVerfity':false,
      netcaSetting: false,
      netcaAbout: false,
      navigationBar: false,
    };
    // $('#netca_canvas').remove();
    $("#netca_canvas").css("display", "none");
    NetcaIESignAPI.setUIVisible(obj);
  };
  NetcaIESignAPI.getIEPDFBytes = function () {
    NetcaIESignAPI.GetPDFBytes();
  };
  return NetcaIESignAPI;
})();

var NetcaPDFSeal = (function () {
  "use strict";
  var NetcaPDFSeal = {
    SetPDFBytes: "",
  };

  /**初始化页面
   * */
  NetcaPDFSeal.init = function () {
    NetcaPDFSeal.initUI();
  };
  /**判断当前浏览器是否为IE浏览器
   * */
  NetcaPDFSeal._isIE = function () {
    var comObj = null;
    try {
      comObj = new ActiveXObject("NetcaPki.Utilities");
      return true;
    } catch (e) {
      return false;
    }
  };
  /**打开pdf
   * */
  NetcaPDFSeal.openPDFBytes = function (OpenPDFBytes) {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.openPDF(OpenPDFBytes);
    } else {
      NetcaSignAPI.openPDF(OpenPDFBytes);
      NetcaSignAPI.getSealConfigInfo();
      NetcaSignAPI.getSignatureFieldInfo(OpenPDFBytes);
    }
    NetcaPDFSeal.setPDFBytes(OpenPDFBytes);
  };
  /**设置界面UI
   * */
  NetcaPDFSeal.initUI = function () {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.initUI();
    } else {
      NetcaSignAPI.initUI();
    }
  };
  /**set base64*/
  NetcaPDFSeal.setPDFBytes = function (INPDFbase64) {
    NetcaPDFSeal.SetPDFBytes = INPDFbase64;
  };
  /**get base64*/
  NetcaPDFSeal.getSignPDFBytes = function () {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.getIEPDFBytes();
    }

    return NetcaPDFSeal.SetPDFBytes;
  };
  /**
   * 需要隐藏的功能按钮
   * */
  NetcaPDFSeal.setUIVisible = function (obj) {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.setUIVisible(obj);
    } else {
      NetcaSignAPI.setUIVisible(obj);
    }
  };
  /**加载pdf*/
  NetcaPDFSeal.preViewPDF = function (scale, pdfData) {
    NetcaPDFSeal.initUI();

    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.initPreView();
    } else {
      //非IE浏览器才支持设置
      NetcaSignAPI.initPreView(scale);
    }

    NetcaPDFSeal.openPDFBytes(pdfData);
  };
  /**手动传入base64，渲染PDF*/
  NetcaPDFSeal.openPDFByBase64 = function (val) {
    if (NetcaPDFSeal._isIE()) {
      NetcaIESignAPI.openPDF(val);
    } else {
      NetcaSignAPI.netcaLoadPDF(1, val);
    }
    if (!NetcaPDFSeal._isIE()) {
      if (NetcaUtils.isUserManualSignUI()) {
        NetcaSignAPI.getSealConfigInfo();
        NetcaSignAPI.getSignatureFieldInfo(val);
      }
    }
    NetcaPDFSeal.setPDFBytes(val);
  };
  /**
   * 环境检测*/
  NetcaPDFSeal.checkKeyxAndSealTool = function (
    params1,
    params2,
    successCallBack
  ) {
    netca_getClientVersionInfo(
      function (res) {
        if (versionCompare(res.Version, params1)) {
          netca_getSealClientVersion(
            function (res) {
              if (!versionCompare(res.version, params2)) {
                alert("电子签章客户端版本过低，请先进行升级驱动！");
              } else {
                successCallBack();
              }
            },
            function (res) {
              alert(res.msg);
            }
          );
        } else {
          alert("数字证书驱动版本过低，请先进行升级驱动！");
        }
      },
      function (res) {
        alert(res.msg);
      }
    );
  };
  return NetcaPDFSeal;
})();

function versionCompare(Str1, Str2) {
  //第一步：使用正则，先把传参进来的两个版本号中空格给替换成空。
  var nStr1 = Str1.replace(/(^\s+)|(\s+$)/gi, "");
  var nStr2 = Str2.replace(/(^\s+)|(\s+$)/gi, "");
  //第二步：进行一次判断，万一我们传进来的是空的，提示一下，
  if (!nStr1 || !nStr2) {
    alert("您输入的两个版本号为空");
    return true;
  }
  //第三步：使用正则来匹配截取两个传进来的版本号中的版本数字
  var req = /\d(\.|\d)*\d/gi; //这个是匹配**.**.**数字的正则
  nStr1 = nStr1.match(req)[0]; //match出来的是一个数组，这个匹配出来在第0个
  nStr2 = nStr2.match(req)[0];
  //alert(nStr1+"----"+nStr2);
  //第四步：版本比较，先把版本号字符串切割成数组，[主版本号，次版本号，修订号]
  var arr1 = nStr1.split("."); //[**,**,**]
  var arr2 = nStr2.split(".");
  //第五步：开始比较
  var minL = Math.min(arr1.length, arr2.length);
  var index = 0;
  var diff = 0;
  while (index < minL) {
    //循环数组的每一项，相减的差额来做判断
    diff = parseInt(arr1[index]) - parseInt(arr2[index]);
    if (diff != 0) {
      break;
    }
    index++;
  }
  diff = diff != 0 ? diff : arr1.length - arr2.length;
  //通过diff的值与0比较，生成true（第一个大于第二个） 或者是false（不大于）
  return diff > 0;
}
