var NetcaPDFSeal = (function () {
  "use strict";
  /**set base64*/
  var that = {
    sourceFile: "", // 源文件
    signFile: "", // 签名后返回的文件
    stamp: "", // 印章图片
    userInfo: {}, // 用户信息
  };
  var TOKEN = "cqdj_expert_token";
  var xPos = null;
  var yPos = null;
  var seal_width_half = null;
  var seal_height_half = null;
  var seal_width = null;
  var seal_height = null;
  var pin = null;
  var signFieldInfoList = null;
  var hasCreateSignField = false;
  var hasUploadPdf = false;

  var chartletNum = 0;
  var saveArray = [];

  var imageObj;
  /**
   * 打开pdf
   * */
  that.openPDF = function (base64Val, callback, errorCallback) {
    saveArray = [];
    debounce(reChartlrt)();
    if (!base64Val) {
      alert("打开文档数据为空");
      return;
    }
    that.sourceFile = base64Val; // 保存源文件
    that.signFile = base64Val;
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    var Bytes = convertDataURIToBinary(base64Val);
    globalPDFViewerApplication.open(Bytes).catch(errorCallback);
    // 加个定时器为了知道什么时候文件加载完成
    var interval = setInterval(function () {
      if (globalPDFViewerApplication.pdfDocument == null) {
        console.info("Loading...");
      } else {
        $.unblockUI();
        globalPDFViewerApplication.pdfLinkService.goToPage(1);
        if (callback && typeof callback === "function") {
          callback();
        }
        clearInterval(interval);
      }
    }, 500);
  };

  that.openPDFUrl = function (url, callback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var fr = new FileReader();
      fr.readAsDataURL(new Blob([xhr.response]));
      fr.onload = function () {
        var base64 = fr.result.substring(fr.result.indexOf(",") + 1);
        that.openPDF(base64, callback, errorCallback);
      };
    };
    xhr.onerror = errorCallback;
    xhr.send();
  };

  that.getSaveArray = function () {
    return saveArray;
  };
  /**
   * 坐标拖拽印章盖章
   * */
  that.sign = function (multiPagesParams, callback) {
    // 有印章，直接拖拽印章
    if (that.stamp !== "") {
      dragStamp(multiPagesParams, callback);
    } else {
      // 检查sessionStorage中是否有token
      if (sessionStorage.getItem(TOKEN)) {
        // 身份证号码
        var idCard = that.userInfo.idCard;
        // sm3 哈希算法
        var hash = sm3(idCard);
        // 截取前32位
        var hashSubstring = hash.substring(0, 32);
        try {
          // sm4解密 msg为原文pin码
          var msg = sm4decrypt(sessionStorage.getItem(TOKEN), hashSubstring);
          pin = msg;
          // 获取印章，如果印章获取成功，则传入正常的回调，如果印章获取失败，则传入error和标识
          fetchStamp(
            multiPagesParams,
            function (flag, error) {
              if (flag === true) {
                callback(error);
              } else {
                callback(flag);
              }
            },
            false
          );
        } catch (error) {
          // sm4解密失败，则清除缓存，弹出输入密码框
          deleteFromSession();
          layer.prompt(
            {
              title: "请输入密码",
              formType: 1,
              success: function (layero) {
                $("input.layui-layer-input").on("keydown", function (e) {
                  if (e.which === 13) {
                    if ($(this).val() === "") {
                      return layero.focus();
                    }
                    pin = $(this).val(); // 保存pin码
                    layer.closeAll();
                    fetchStamp(
                      multiPagesParams,
                      function (flag, error) {
                        if (flag === true) {
                          callback(error);
                        } else {
                          callback(flag);
                        }
                      },
                      false
                    );
                  }
                });
              },
            },
            function (value, index, elem) {
              if (value === "") {
                return elem.focus();
              }
              pin = value; // 保存pin码
              layer.close(index);
              fetchStamp(
                multiPagesParams,
                function (flag, error) {
                  if (flag === true) {
                    callback(error);
                  } else {
                    callback(flag);
                  }
                },
                false
              );
            },
            function (value, index) {
              layer.close(index);
            }
          );
        }
      } else {
        // 没有印章，调接口获取
        layer.prompt(
          {
            title: "请输入密码",
            formType: 1,
            success: function (layero) {
              $("input.layui-layer-input").on("keydown", function (e) {
                if (e.which === 13) {
                  if ($(this).val() === "") {
                    return layero.focus();
                  }
                  pin = $(this).val(); // 保存pin码
                  layer.closeAll();
                  fetchStamp(
                    multiPagesParams,
                    function (flag, error) {
                      if (flag === true) {
                        callback(error);
                      } else {
                        callback(flag);
                      }
                    },
                    false
                  );
                }
              });
            },
          },
          function (value, index, elem) {
            if (value === "") {
              return elem.focus();
            }
            pin = value; // 保存pin码
            layer.close(index);
            fetchStamp(
              multiPagesParams,
              function (flag, error) {
                if (flag === true) {
                  callback(error);
                } else {
                  callback(flag);
                }
              },
              false
            );
          },
          function (value, index) {
            layer.close(index);
          }
        );
      }
    }
  };
  that.save = function (callback) {
    if (saveArray.length <= 0) {
      $.blockUI(blockUIConfig("请先进行签章后再点击保存按钮。", 3000));
      return;
    }
    $.blockUI(blockUIConfig("正在保存文件中，请稍后..."));
    var saveParams = {
      pdf: that.signFile, // PDF文件的base64编码
      name: that.userInfo.name, // 专家名称
      idCard: that.userInfo.idCard, // 身份证号码
      pin: pin, // PIN码
      imageAppearance: {
        // 印章外观信息
        width: seal_width,
        height: seal_height,
      },
      positions: saveArray,
    };
    sendRequest(
      savePdfUrl,
      saveParams,
      function (response) {
        $.unblockUI();
        // console.log('签名成功，base64为：');
        // console.log(response.signPdf);
        if (callback && typeof callback === "function") {
          callback({ status: 0, msg: "保存成功", result: response.signPdf });
        }
      },
      function () {
        if (signParams.keyword) {
          pin = "";
        }
        $.unblockUI();
        if (callback && typeof callback === "function") {
          // callback({ status: -1, msg: '保存失败' });
          callback(
            new Error("保存失败", {
              cause: {
                status: -1,
              },
            })
          );
        }
      }
    );
  };

  function reChartlrt() {
    var newscale = globalPDFViewerApplication.getCurrentScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var K = scale / newscale;
    var viewer_width = $("#viewer").width();
    if (saveArray.length > 0) {
      for (var i = 0; i < saveArray.length; i++) {
        var obj = saveArray[i];
        // 找到这个章所在页，然后算宽度
        var page_width = $("#viewer .page")
          .eq(obj.page - 1)
          .width();
        var page_height = $("#viewer .page").eq(obj.page - 1)[0].offsetTop;
        // 如果这个章所在页比外部框小，说明还有边缘空白部分，需要计算
        if (page_width < viewer_width) {
          var blank_left = (viewer_width - page_width) / 2;
        } else {
          var blank_left = 9;
        }
        // 很明显这里是算坐标和宽高的 这个K 是一个比例，与当前缩放程度有关
        var x = obj.x / K + blank_left;
        var y = obj.y / K + 9 + page_height;
        var w = seal_width / K;
        var h = seal_height / K;
        // 这是每个章的唯一标识哦
        var chartletNum = obj.id;
        // 把删除按钮、外面的box、图片放进去
        $("#viewerContainer").append(
          ' <img class="vSeal" id="vSeal' +
            chartletNum +
            '" src="data:image/PNG;base64,' +
            that.stamp +
            '" style="position:absolute;z-index:99;width:' +
            w +
            "px;height:" +
            h +
            "px;left:" +
            x +
            "px;top:" +
            y +
            'px;opacity: 0.9;"></img>'
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
            'px;"></div>'
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
            ""
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
          for (var k = 0; k < saveArray.length; k++) {
            if (saveArray[k].id > Number(index)) {
              saveArray[k - 1] = saveArray[k];
            }
          }
          saveArray.length -= 1;
        };
        document
          .querySelector("#vSealBoxDelete" + chartletNum)
          .addEventListener("click", deleteClick);
      }
    }
    $.unblockUI();
  }

  function debounce(fn) {
    var delay = 100;
    var time = null;
    return function () {
      if (saveArray.length === 0) {
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

  that.signKeyWord = function (sealKeyWordParams, callback) {
    // 有印章，直接使用
    if (that.stamp !== "") {
      getKeyword(sealKeyWordParams, callback);
    } else {
      // 如果已经缓存了密码
      if (sessionStorage.getItem(TOKEN)) {
        // 身份证号码
        var idCard = that.userInfo.idCard;
        // sm3 哈希算法
        var hash = sm3(idCard);
        // 截取前32位
        var hashSubstring = hash.substring(0, 32);
        try {
          // sm4解密 msg为原文pin码
          var msg = sm4decrypt(sessionStorage.getItem(TOKEN), hashSubstring);
          pin = msg;
          fetchStamp(
            sealKeyWordParams,
            function (flag, error) {
              if (flag === true) {
                getKeyword(undefined, callback, error);
              } else {
                getKeyword(sealKeyWordParams, callback);
              }
            },
            true
          );
        } catch (error) {
          // sm4解密失败，则清除缓存，弹出输入密码框
          deleteFromSession();
          layer.prompt(
            {
              title: "请输入密码",
              formType: 1,
              success: function (layero) {
                $("input.layui-layer-input").on("keydown", function (e) {
                  if (e.which === 13) {
                    if ($(this).val() === "") {
                      return layero.focus();
                    }
                    pin = $(this).val(); // 保存pin码
                    layer.closeAll();
                    fetchStamp(
                      sealKeyWordParams,
                      function (flag, error) {
                        if (flag === true) {
                          getKeyword(undefined, callback, error);
                        } else {
                          getKeyword(sealKeyWordParams, callback);
                        }
                      },
                      true
                    );
                  }
                });
              },
            },
            function (value, index, elem) {
              if (value === "") {
                return elem.focus();
              }
              pin = value; // 保存pin码
              layer.close(index);
              fetchStamp(
                sealKeyWordParams,
                function (flag, error) {
                  if (flag === true) {
                    getKeyword(undefined, callback, error);
                  } else {
                    getKeyword(sealKeyWordParams, callback);
                  }
                },
                true
              );
            },
            function (value, index) {
              layer.close(index);
            }
          );
        }
      } else {
        // 没有印章，调接口获取
        layer.prompt(
          {
            title: "请输入密码",
            formType: 1,
            success: function (layero) {
              $("input.layui-layer-input").on("keydown", function (e) {
                if (e.which === 13) {
                  if ($(this).val() === "") {
                    return layero.focus();
                  }
                  pin = $(this).val(); // 保存pin码
                  layer.closeAll();
                  fetchStamp(
                    sealKeyWordParams,
                    function (flag, error) {
                      if (flag === true) {
                        getKeyword(undefined, callback, error);
                      } else {
                        getKeyword(sealKeyWordParams, callback);
                      }
                    },
                    true
                  );
                }
              });
            },
          },
          function (value, index, elem) {
            if (value === "") {
              return elem.focus();
            }
            pin = value; // 保存pin码
            layer.close(index);
            fetchStamp(
              sealKeyWordParams,
              function (flag, error) {
                if (flag === true) {
                  getKeyword(undefined, callback, error);
                } else {
                  getKeyword(sealKeyWordParams, callback);
                }
              },
              true
            );
          },
          function (value, index) {
            layer.close(index);
          }
        );
      }
    }
  };

  function getKeyword(sealKeyWordParams, callback, error) {
    if (sealKeyWordParams === undefined) {
      callback(error);
      return;
    }
    var imageObj = {
      width: 0,
      height: 0,
      sealImageEncode: that.stamp,
    };
    // 有设置印章外观宽高，直接赋值
    if (
      sealKeyWordParams &&
      sealKeyWordParams.width &&
      sealKeyWordParams.height
    ) {
      imageObj.width = sealKeyWordParams.width;
      imageObj.height = sealKeyWordParams.height;
      setSealSize(imageObj);
    } else {
      // 不设置印章外观宽高，取印章图片的原图大小
      let newImage = new Image();
      newImage.src = "data:image/png;base64," + that.stamp;
      newImage.onload = function () {
        imageObj.width = newImage.width;
        imageObj.height = newImage.height;
        setSealSize(imageObj);
      };
    }

    var signParams = {
      pdf: that.signFile,
      startPageNum: sealKeyWordParams.startPageNum,
      endPageNum: sealKeyWordParams.endPageNum,
      keyword: sealKeyWordParams.keyword,
      indexes: sealKeyWordParams.indexes,
      offsetX: sealKeyWordParams.offsetX,
      offsetY: sealKeyWordParams.offsetY,
    };
    $.blockUI(blockUIConfig("正在获取关键字中，请稍等..."));
    sendRequest(
      keywordUrl,
      signParams,
      function (response) {
        $.unblockUI();
        var keywordPositions = response.keywordPositions;
        var newscale = globalPDFViewerApplication.getCurrentScale(); //缩放比例
        var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
        var K = scale / newscale;
        var viewer_width = $("#viewer").width();
        for (var k = 0; k < keywordPositions.length; k++) {
          keywordPositions[k].y -= seal_height / 2;
          var page_width = $("#viewer .page")
            .eq(keywordPositions[k].page - 1)
            .width();
          var page_height = $("#viewer .page").eq(
            keywordPositions[k].page - 1
          )[0].offsetTop;
          if (viewer_width > page_width) {
            var blank_left = (viewer_width - page_width) / 2;
          } else {
            var blank_left = 9;
          }
          var x = keywordPositions[k].x / K + blank_left;
          var y = keywordPositions[k].y / K + page_height + 9;
          var w = seal_width_half * 2;
          var h = seal_height_half * 2;

          keywordPositions[k].id = chartletNum;
          saveArray.push(keywordPositions[k]);
          chartletNum++;
        }
        debounce(reChartlrt)();
        if (callback && typeof callback === "function") {
          callback({ status: 0, msg: "获取关键字成功" });
        }
      },
      function () {
        if (callback && typeof callback === "function") {
          // callback({ status: -1, msg: '获取关键字失败' });
          callback(
            new Error("获取关键字失败", {
              cause: {
                status: -1,
              },
            })
          );
        }
      }
    );
  }
  /**
   * 上传文件
   * */
  that.uploadPdf = function (callback) {
    var params = {
      signPdf: that.signFile,
    };
    sendRequest(
      uploadPdfUrl,
      params,
      function () {
        if ($(".netcafieldInfo").length) {
          $(".netcafieldInfo").remove();
        }
        that.sourceFile = that.signFile;
        hasUploadPdf = true;
        if (callback && typeof callback === "function") {
          callback({ status: 0, msg: "上传文件成功" });
        }
      },
      function () {
        if (callback && typeof callback === "function") {
          // callback({ status: -1, msg: '上传文件失败' });
          callback(
            new Error("上传文件失败", {
              cause: {
                status: -1,
              },
            })
          );
        }
      }
    );
  };
  /**
   * 重新加载文件
   * */
  function openFile(base64Val) {
    if (!base64Val) {
      alert("打开文档数据为空");
      return;
    }
    $.blockUI(blockUIConfig("正在为您努力加载文件中，请稍后..."));
    var Bytes = convertDataURIToBinary(base64Val);
    globalPDFViewerApplication.open(Bytes);
    $.unblockUI();
  }
  /**
   * 获取印章
   * */
  function fetchStamp(multiPagesParams, callback, flag) {
    var params = {
      idCard: that.userInfo.idCard,
      pin: pin,
    };
    $.blockUI(blockUIConfig("正在为您努力加载印章中，请稍后..."));
    sendRequest(
      getStampUrl,
      params,
      function (response) {
        if (!response.stamp) {
          if (callback && typeof callback === "function") {
            callback(
              true,
              new Error("获取印章图片失败", {
                cause: {
                  status: -1,
                },
              })
            );
          }
          alert("获取印章图片失败");
          $.unblockUI();
          return;
        }
        that.stamp = response.stamp; // 印章图片
        // 请求成功，缓存token
        saveToSession();
        if (flag === false) {
          dragStamp(multiPagesParams, callback);
        } else {
          if (callback && typeof callback === "function") {
            callback();
          }
        }
        $.unblockUI();
      },
      function (err) {
        if (err.code === -3) {
          // getStamp接口调用失败，清除缓存, 重新弹窗
          if (callback && typeof callback === "function") {
            callback(
              true,
              new Error("密码错误", {
                cause: {
                  status: -1,
                },
              })
            );
          }
          deleteFromSession();
          layer.prompt(
            {
              title: "请输入密码",
              formType: 1,
              success: function (layero) {
                $("input.layui-layer-input").on("keydown", function (e) {
                  if (e.which === 13) {
                    if ($(this).val() === "") {
                      return layero.focus();
                    }
                    pin = $(this).val(); // 保存pin码
                    layer.closeAll();
                    fetchStamp(multiPagesParams, callback, flag);
                  }
                });
              },
            },
            function (value, index, elem) {
              if (value === "") {
                return elem.focus();
              }
              pin = value; // 保存pin码
              layer.close(index);
              fetchStamp(multiPagesParams, callback, flag);
            },
            function (value, index) {
              layer.close(index);
            }
          );
        } else {
          if (callback && typeof callback === "function") {
            callback(
              true,
              new Error("获取印章图片失败", {
                cause: {
                  status: -1,
                },
              })
            );
          }
        }
        // callback({ status: -1, msg: '获取印章图片失败' });
        pin = "";
      }
    );
  }
  /**
   * 提交PDF签名文件
   * */
  function sumbitPdf(signParams, callback) {
    var page = globalPDFViewerApplication.page;
    var scale = globalPDFViewerApplication.getCurrentScale();
    signParams.pin = pin;
    $.blockUI(blockUIConfig("正在盖章中，请稍等..."));
    sendRequest(
      signPdfUrl,
      signParams,
      function (response) {
        that.signFile = response.signPdf; // 保存每次签完的文件
        signFieldInfoList = response.signFieldInfoList; // 签名域
        openFile(response.signPdf); // 重新打开文件
        var interval = setInterval(function () {
          if (globalPDFViewerApplication.pdfDocument) {
            $.unblockUI();
            if ($("#viewer .page").length > 0) {
              clearInterval(interval);
              globalPDFViewerApplication.pdfViewer.currentScaleValue = scale; // 签完后文件缩放倍数保持不变
              // createSignField(signFieldInfoList); //描绘签名域
              var timer = setInterval(function () {
                if (hasCreateSignField) {
                  // 用来确保先创建好签名域，再增加撤章按钮
                  clearInterval(timer);
                  // createRevokeEvent(); //撤章事件
                  globalPDFViewerApplication.pdfLinkService.goToPage(page);
                }
              }, 10);
            }
          }
        }, 10);
        if (callback && typeof callback === "function") {
          callback({ status: 0, msg: "盖章成功" });
        }
      },
      function () {
        if (signParams.keyword) {
          pin = "";
        }
        if (callback && typeof callback === "function") {
          // callback({ status: -1, msg: '盖章失败' });
          callback(
            new Error("盖章失败", {
              cause: {
                status: -1,
              },
            })
          );
        }
      }
    );
  }
  /**
   * 设置用户信息
   * */
  that.setUserInfo = function (userInfo) {
    that.userInfo = userInfo;
  };
  that.getFileBase64 = function () {
    return that.signFile;
  };
  /**
   * 提交请求
   * */
  function sendRequest(url, params, successCallBack, errorCallback) {
    sendAjax(
      url,
      params,
      function (response) {
        if (successCallBack) {
          successCallBack(response);
        }
      },
      function (error) {
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );
  }
  /**
   * 坐标盖章
   * */
  function multiPagesSign(signObj, _pageNum, callback) {
    var newscale = globalPDFViewerApplication.getCurrentScale(); //缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    var _xPos = parseInt((scale / newscale) * (xPos - seal_width_half)); //签名域/签章左下角的水平向右方向坐标
    var _yPos = parseInt((scale / newscale) * (yPos - seal_height_half)); //签名域/签章左下角的垂直向上方向坐标
    var signParams = {
      pdf: that.signFile, // PDF文件的base64编码
      name: that.userInfo.name, // 专家名称
      idCard: that.userInfo.idCard, // 身份证号码
      pin: pin, // PIN码
      imageAppearance: {
        // 印章外观信息
        width: signObj.width,
        height: signObj.height,
      },
      signType: 2, // 盖章类型 1：关键字盖章 2：坐标盖章
      multiPages: {
        // 关键字参数
        x: _xPos,
        y: _yPos,
        startPage: _pageNum,
        endPage: _pageNum,
      },
    };
    sumbitPdf(signParams, callback); // 提交签名数据
    cancleStamp(); // 隐藏拖拽的印章
  }
  /**
   * 拖拽印章
   * */
  function dragStamp(multiPagesParams, callback) {
    if (
      multiPagesParams.xPos !== undefined &&
      multiPagesParams.yPos !== undefined
    ) {
      var imageObj = {
        width: 0,
        height: 0,
        sealImageEncode: that.stamp,
      };

      var positionSign = function (multiPagesParams) {
        saveArray.push({
          id: chartletNum,
          page: multiPagesParams.pageNum,
          x: multiPagesParams.xPos,
          y: multiPagesParams.yPos,
        });
        chartletNum++;
        debounce(reChartlrt)();
        if (callback && typeof callback === "function") {
          callback({ status: 0, msg: "直接传入坐标盖章成功" });
        }
      };
      // 有设置印章外观宽高，直接赋值
      if (
        multiPagesParams &&
        multiPagesParams.width &&
        multiPagesParams.height
      ) {
        imageObj.width = multiPagesParams.width;
        imageObj.height = multiPagesParams.height;
        setSealSize(imageObj);
        positionSign(multiPagesParams);
        // sealMoveEvent(imageObj, callback);
      } else {
        // 不设置印章外观宽高，取印章图片的原图大小
        let newImage = new Image();
        newImage.src = "data:image/png;base64," + that.stamp;
        newImage.onload = function () {
          multiPagesParams.width = newImage.width;
          multiPagesParams.height = newImage.height;
          imageObj.width = newImage.width;
          imageObj.height = newImage.height;
          setSealSize(imageObj);
          positionSign(multiPagesParams);
          // sealMoveEvent(imageObj, callback);
        };
      }
    } else {
      var imageObj = {
        width: 0,
        height: 0,
        sealImageEncode: that.stamp,
      };
      // 有设置印章外观宽高，直接赋值
      if (
        multiPagesParams &&
        multiPagesParams.width &&
        multiPagesParams.height
      ) {
        imageObj.width = multiPagesParams.width;
        imageObj.height = multiPagesParams.height;
        setSealSize(imageObj);
        sealMoveEvent(imageObj, callback);
      } else {
        // 不设置印章外观宽高，取印章图片的原图大小
        let newImage = new Image();
        newImage.src = "data:image/png;base64," + that.stamp;
        newImage.onload = function () {
          imageObj.width = newImage.width;
          imageObj.height = newImage.height;
          setSealSize(imageObj);
          sealMoveEvent(imageObj, callback);
        };
      }
    }
  }
  /**
     设置跟随鼠标移动的图片大小
     图像的像素宽度为 seal_width，水平分辨率为 72 点/英寸
     如果调用此方法在分辨率为 96 点/英寸的设备上绘制该图像，则所呈现图像的像素宽度就是： (seal_width/72)*96
     * */
  function setSealSize(imageObj) {
    var val = globalPDFViewerApplication.getCurrentScale(); //缩放比例
    var scale = 0.75; //当前缩放比例

    $("#seal_image").width(imageObj.width);
    $("#seal_image").height(imageObj.height);
    $("#seal_image").attr(
      "src",
      "data:image/PNG;base64," + imageObj.sealImageEncode
    );

    seal_width = $("#seal_image").width();
    var w = (seal_width * val) / scale;
    $(".seal_div").width(w);

    seal_height = $("#seal_image").height();
    var h = (seal_height * val) / scale;
    $(".seal_div").height(h);

    $("#seal_image").css({
      width: "100%",
      height: "100%",
    });

    seal_width_half = parseInt($(".seal_div").width()) / 2;
    seal_height_half = parseInt($(".seal_div").height()) / 2;

    $(".seal_div").css({ display: "none" });
  }

  /**
   * 鼠标移动签章图片事件
   * */
  function sealMoveEvent(signObj, callback) {
    $(document).mousemove(function (event) {
      var ev = event || window.event;
      /**position left和top 设置鼠标位于图片中央*/
      $(".seal_div").css({
        display: "block",
        left: ev.clientX - seal_width_half + "px",
        top: ev.clientY - seal_height_half + "px",
      });
    });

    $(document).mousedown(function () {
      pageClickEvent(signObj, callback);
    });

    $(document).mouseup(function () {
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
      $(document).unbind("mouseup");
    });

    /**点击右键  取消签章*/
    $(document).bind("contextmenu", function () {
      cancleStamp();
      $("#viewer").unbind("click");
      return false;
    });
  }
  /**
   * viewer点击事件
   * */
  function pageClickEvent(signObj, callback) {
    var pdfviewer = document.getElementById("netcasignpdf");
    var pdfviewerL = pdfviewer.offsetLeft;
    var pdfviewerT = pdfviewer.offsetTop;

    var flag = 2;
    var pageNum = globalPDFViewerApplication.page; //当前页码
    // 前n-1页 高度
    var _height = 0;
    if (pageNum > 1) {
      _height = addHeight(pageNum);
    }
    $("#viewer").click(function (e) {
      flag--;
      /**鼠标点击的位置，相对于文档的左边缘/上边缘*/
      var client_x = e.clientX;
      var client_y = e.clientY;

      var viewer_width = $("#viewer").width();
      var blank_top = $("#toolbarViewer").height() + 9;
      var pdfscrollTop = $("#viewerContainer").scrollTop(); //文档滚动高度
      var pdfscrollLeft = $("#viewerContainer").scrollLeft(); //文档滚动宽度

      var clicky_temp = client_y - blank_top + pdfscrollTop - pdfviewerT;
      yPos = clicky_temp - _height;
      // 大文件打开时只显示当前页，所以没有多个page
      var page_width = 0;
      if ($("#viewer .page").length > 1) {
        page_width = $("#viewer .page")
          .eq(pageNum - 1)
          .width();
      } else {
        page_width = $("#viewer .page").eq(0).width();
      }
      if (viewer_width > page_width) {
        var blank_left = (viewer_width - page_width) / 2;
      } else {
        var blank_left = 9;
      }
      var clickx_temp = client_x - pdfviewerL + pdfscrollLeft;
      xPos = clickx_temp - blank_left;

      //假如显示第1页，签第2页的位置
      var currentPageHeight = addHeight(pageNum + 1);
      if (currentPageHeight < clicky_temp) {
        pageNum = pageNum + 1;
        calcHeight(pageNum, clickx_temp, clicky_temp, viewer_width);
      }

      // 假如显示第2页，签第1页页尾位置
      if (yPos < 0) {
        //计算负数  重算高度  宽度
        pageNum = pageNum - 1;
        calcHeight(pageNum, clickx_temp, clicky_temp, viewer_width);
      }

      var x = client_x - seal_width_half + pdfscrollLeft;
      var y = client_y - seal_height_half - 75 + pdfscrollTop;
      // var x = 0;
      // var y = 0;

      var w = seal_width_half * 2;
      var h = seal_height_half * 2;

      if (flag > 0) {
        /**每次点击只触发一次签章 超出文档左右界线不能点击签章*/
        if (
          xPos > 0 &&
          (viewer_width - xPos - blank_left >= blank_left ||
            viewer_width < page_width)
        ) {
          var newscale = globalPDFViewerApplication.getCurrentScale(); //缩放比例
          var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
          var _xPos = (scale / newscale) * (xPos - seal_width_half); //签名域/签章左下角的水平向右方向坐标
          var _yPos = (scale / newscale) * (yPos + 4 - seal_height_half); //签名域/签章左下角的垂直向上方向坐标
          saveArray.push({
            id: chartletNum,
            page: pageNum,
            x: _xPos,
            y: _yPos,
          });

          chartletNum++;
          cancleStamp(); // 隐藏拖拽的印章
          debounce(reChartlrt)();
          if (callback && typeof callback === "function") {
            callback({ status: 0, msg: "拖拽盖章成功" });
          }
          // $.blockUI(blockUIConfig('正在盖章中，请稍等...'));
          // // 签章函数
          // multiPagesSign(signObj, pageNum, callback);
        } else {
          cancleStamp();
          alert("不在签章范围内");
        }
      }
    });
  }
  /**
   * 描绘签名域
   * */
  function createSignField(signFields) {
    //删除签名域信息
    if ($(".netcafieldInfo").length) {
      $(".netcafieldInfo").remove();
    }
    //获取外层盒子宽度
    var viewer_width = $("#viewer").width();
    //获取缩放比例
    var newscale = globalPDFViewerApplication.getCurrentScale();
    //获取缩放比例
    var scale = 0.75; // 75% 对应72dpi; 如果不是75%缩放比例，需要对应转换为72dpi的坐标大小
    //定义页面宽度高度
    var page_width;
    var page_height;
    //定义空白边框宽度
    var _brank;

    //如果签名域信息不为空
    if (signFields) {
      //遍例签名域信息
      for (var i = 0; i < signFields.length; i++) {
        //闭包解决i取值不正确的问题
        (function (i) {
          //计算签名域所在页面宽度
          page_width = $("#viewer")
            .find(".page")
            .eq(signFields[i].page - 1)
            .width();
          page_height = $("#viewer")
            .find(".page")
            .eq(signFields[i].page - 1)
            .height();
          //计算签名域所在页面周边空白宽度
          _brank = (viewer_width - page_width) / 2;
          var temp = 0;
          //计算缩放变换后的签名域宽高
          var width = (signFields[i].width * newscale) / scale;
          var height = (signFields[i].height * newscale) / scale;

          //计算签名域所在位置,-4指的是向左偏移边框的4px +5指的是先向下偏移外层边框的9px，再向上偏移边框的4px
          var x = (signFields[i].x * newscale) / scale - 4;
          var y =
            page_height - (signFields[i].y * newscale) / scale - height + 5;

          //如果不止一页，高度还要加上之前的页面的高度
          if (signFields[i].page > 1) {
            var _height = addHeight(signFields[i].page);
            y = _height + y;
          }
          // pdf的宽度小于屏幕宽度，图片选中框的left才需要加上左边空隙内容
          if (_brank >= 0) {
            x = x + _brank;
          }
          // 如果pdf的宽度大于屏幕宽度，则要修正外层边框添加的9px，向右偏移9px
          else {
            x = x + 9;
          }
          // 签名域绘制
          $("#viewerContainer").append(
            '<div class="netcafieldInfo" style="position:absolute;z-index:99;width:' +
              width +
              "px;height:" +
              height +
              "px;left:" +
              x +
              "px;top:" +
              y +
              'px;"></div>'
          );
        })(i);
      }
      hasCreateSignField = true;
    }
  }
  /**
   * 创建撤销按钮
   * */
  function createRevokeEvent() {
    // 判断是否能获取到文档内容 如果能获取到文档内容且页数大于0
    if (
      globalPDFViewerApplication.pdfDocument != null &&
      $("#viewer .page").length > 0
    ) {
      var len = $(".netcafieldInfo").length;
      if (signFieldInfoList.length > 0) {
        var addLen = signFieldInfoList.length;
        for (var index = 1; index <= addLen; index++) {
          (function (index, _id, streamId) {
            $(".netcafieldInfo")
              .eq(len - index)
              .append(
                "" +
                  '<img class="btn_discard" src="ui/images/icon/btn_discard_nor.png" alt="" ' +
                  'style="position:absolute;top:-15px;right:-15px;z-index:1000;display: none;">' +
                  ""
              );
            $(".netcafieldInfo")
              .eq(len - index)
              .hover(
                function () {
                  $(this).children(".btn_discard").css({ display: "block" });
                },
                function () {
                  $(this).children(".btn_discard").css({ display: "none" });
                }
              );
            // 绑定撤章事件
            $(".netcafieldInfo")
              .eq(len - index)
              .children(".btn_discard")
              .click(function () {
                layer.confirm(
                  "是否需要撤销选定的签章？",
                  {
                    btn: ["是", "否"], //按钮
                  },
                  function (index) {
                    layer.close(index);
                    that.signFile = that.sourceFile;
                    openFile(that.sourceFile); // 重新打开文件
                    //重新打开，删除已有签名域信息
                    if ($(".netcafieldInfo").length) {
                      $(".netcafieldInfo").remove();
                    }
                    hasCreateSignField = false;
                  },
                  function () {
                    hasCreateSignField = false;
                  }
                );
              });
          })(index);
        }
      }
    }
  }
  /**
   * 高度累加,计算纵坐标
   * */
  function addHeight(n) {
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
  }
  /**
   * 计算点击坐标高度
   * */
  function calcHeight(pageNum, clickx_temp, clicky_temp, viewer_width) {
    var _height;
    if (pageNum > 1) {
      _height = addHeight(pageNum);
    } else {
      _height = 0;
    }
    yPos = clicky_temp - _height;

    var page_width = $("#viewer .page")
      .eq(pageNum - 1)
      .width();
    var blank_left = (viewer_width - page_width) / 2;
    xPos = clickx_temp - blank_left;
  }
  /**
   * 隐藏签章图片
   * */
  function cancleStamp() {
    $(".seal_div").css({ display: "none" });
  }
  /**
   * 加载弹框
   * */
  function blockUIConfig(blockUIConfigText, timeout = 0) {
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
      timeout,
    };
  }
  /**转换成pdf.js能直接解析的Uint8Array类型*/
  function convertDataURIToBinary(dataURI) {
    var raw = window.atob(dataURI);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i) & 0xff;
    }
    return array;
  }
  function modifySignFiled() {
    if (!hasUploadPdf) {
      var zoomTimer = setTimeout(function () {
        clearTimeout(zoomTimer);
        createSignField(signFieldInfoList); //描绘签名域
        var timer = setInterval(function () {
          if (hasCreateSignField) {
            // 用来确保先创建好签名域，再增加撤章按钮
            clearInterval(timer);
            createRevokeEvent(); //撤章事件
          }
        }, 10);
      }, 1000);
    }
  }
  /**
   * 缩放页面
   * */
  window.addEventListener("resize", debounce(reChartlrt));
  $("#zoomIn").click(debounce(reChartlrt));
  $("#zoomOut").click(debounce(reChartlrt));
  $("#scaleSelect").change(debounce(reChartlrt));

  // 缓存token到sessionStorage
  function saveToSession() {
    // 身份证号码
    var idCard = that.userInfo.idCard;
    // sm3 哈希算法
    var hash = sm3(idCard);
    // 截取前32位
    var hashSubstring = hash.substring(0, 32);
    // sm4加密
    var token = sm4encrypt(pin, hashSubstring, {});
    // 缓存到sessionStorage
    sessionStorage.setItem(TOKEN, token);
  }
  // 从sessionStorage删除token
  function deleteFromSession() {
    sessionStorage.removeItem(TOKEN);
  }
  return that;
})();

var NetcaUtils = (function () {
  var that = {};
  that.convertDataURIToBinary = function (base64) {
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i) & 0xff;
    }
    return array;
  };

  return that;
})();
