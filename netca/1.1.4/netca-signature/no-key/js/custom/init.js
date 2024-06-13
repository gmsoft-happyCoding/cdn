function initPDF() {
  try {
    const {
      fileUrl,
      keyword,
      startPage,
      endPage,
      index,
      width,
      height,
      offsetX,
      offsetY,
      identity,
      name,
    } = getParams();

    if (!fileUrl) {
      return showError("请设置参数: fileUrl");
    }
    showLoading("正在加载中，请稍后...");

    const errorCallback = (error) => {
      showError("初始化签章组件错误:<br>" + (error.message || "加载文件失败"));
    };
    NetcaPDFSeal.openPDFUrl(
      fileUrl,
      () => {
        removeLoading();
        NetcaPDFSeal.setUserInfo({ idCard: identity, name });
        if (keyword) {
          sealWithKeyWords({
            keyword,
            startPage,
            endPage,
            index,
            width,
            height,
            offsetX,
            offsetY,
          });
        }
      },
      errorCallback
    );
  } catch (e) {
    errorCallback(e);
  }
}

function init() {
  initPDF();

  // 显示工具条, 先隐藏，防止闪烁
  document.querySelector("#toolbarContainer").style.display = "block";
}

/**
 * 签章按钮点击事件
 */
function sign() {
  const { width, height } = getParams();

  // 点击页面，需要拖拽
  var multiPagesParams = {
    width: width || 100, //签名域矩形的宽度
    height: height || 50, //签名域矩形的高度
  };

  NetcaPDFSeal.sign(multiPagesParams, function callback(result) {
    if (result instanceof Error) {
      console.error(result);
    }
  });
}
