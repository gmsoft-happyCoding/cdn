var { serverOrigin } = getParams();

var baseUrl =
  (serverOrigin || "https://www.gec123.com") + "/djc-gateway/sign/public/v1";

var getStampUrl = "/netca/stamp/getStamp"; // 获取印章图片URL
// var signPdfUrl = '/netca/sign/pdf'; // pdf盖章
var uploadPdfUrl = "/netca/file/upload/pdf"; // pdf上传
var savePdfUrl = "/netca/sign/pdf";
var keywordUrl = "/netca/sign/keyword/getPosition";

/**
 * ajax post提交
 * @param url 请求路径
 * @param params 请求参数
 * @param successCallBack 成功回调
 * @param errorCallback 失败回调
 * @return
 */
function sendAjax(url, params, successCallBack, errorCallback) {
  $.ajax({
    type: "POST",
    url: baseUrl + url,
    data: JSON.stringify(params),
    dataType: "json", // 接收到响应后自动解析为JSON对象
    contentType: "application/json;charset=UTF-8", // 设置ContentType为JSON，并指定字符编码
    success: function (response) {
      if (response.code === 200) {
        successCallBack(response.content);
      } else {
        alert(response.message);
        $.unblockUI();
        errorCallback(response);
      }
    },
    error: function (err) {
      alert(err.responseJSON.message || err.statusText);
      $.unblockUI();
      if (errorCallback && typeof errorCallback === "function") {
        errorCallback(err);
      }
    },
  });
}
