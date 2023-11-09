function getParams() {
  try {
    const paramsString = location.search.split("=")[1];
    return JSON.parse(decodeURIComponent(paramsString));
  } catch {
    return {};
  }
}

function initPDF() {
  try {
    const {
      fileUrl,
      keyword,
      startPage,
      endPage,
      keywordIndex,
      width,
      height,
      offsetX,
      offsetY,
    } = getParams();

    if (!fileUrl) {
      return showError("请设置参数: fileUrl");
    }

    NetcaPDFSeal.openPDFUrl({ url: fileUrl, encodeType: "plain" }, () => {
      removeLoading();
      if (keyword) {
        sealWithKeyWords({
          keyword,
          startPage,
          endPage,
          keywordIndex,
          width,
          height,
          offsetX,
          offsetY,
        });
      }
    });
  } catch (e) {
    showLoading("初始化签章组件错误:" + e);
  }
}

function clearPwdCache() {
  return new Promise((resolve, reject) => {
    NetcaPKI.clearPwdCache({}).Then(resolve).Catch(reject);
  });
}

function startSign() {
  NetcaPKI.useSKFDevices({
    use: 1,
  })
    .Then(initPDF)
    .Catch(() => {
      removeLoading();
      showError("初始化失败, 请稍后再试");
    });
}

function init() {
  // 验证提示信息隐藏
  NetcaPDFSeal.HiddenVerificationSignaturePrompt(true);
  //使用这个方法可以开启不能撤回盖了的章的模式，默认为1，修改为2则不能撤章
  NetcaSignAPI.revokeSealModel(1);
  NetcaPDFSeal.setUIVisible({ openFile: false });
  NetcaPDFSeal.setUIVisible({ closeFile: false });
  NetcaPDFSeal.setUIVisible({ netcaSetting: false });
  NetcaPDFSeal.setUIVisible({ verify: false });
  NetcaPDFSeal.setUIVisible({ leftBtn: false });
  NetcaPDFSeal.setUIVisible({ rightBtn: false });

  showLoading("正在加载中，请稍后...");

  NetcaPDFSeal.init();

  // 显示工具条, 先隐藏，防止闪烁
  document.querySelector("#toolbarContainer").style.display = "block";

  clearPwdCache().then(startSign, startSign);
}
