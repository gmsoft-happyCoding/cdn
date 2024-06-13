function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function doPostMessage(data) {
  try {
    const handler = window.opener || window.parent;
    /**
     * isSignedData 标记是否是签名后的数据
     * 用于区分是否是签名后的数据
     */
    handler.postMessage({ ...data, isSignedData: true }, "*");
  } catch {
    /**
     * postMessage 发送失败
     */
    showError("保存签章文件失败", 5000);
  }
}

function uploadArrayBufferRawImage(url, arraybuffer) {
  var formData = new FormData();
  formData.append("file", new Blob([arraybuffer], { type: "application/pdf" }), "signed.pdf");
  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      if (!response.ok) return Promise.reject(response);
      return response.json();
    })
    .then(function (json) {
      return json;
    });
}

async function saveFile(data) {
  const { saveFileUrl, token } = getParams();

  if (!saveFileUrl) {
    showError("请设置保存文件的地址", 5000);
    return;
  }

  showLoading("正在保存，请稍后...");

  const url = token
    ? `${saveFileUrl}${saveFileUrl.includes("?") ? "&" : "?"}token=${token}`
    : saveFileUrl;

  const result = await uploadArrayBufferRawImage(url, data);
  removeLoading();
  return result;
}

function handleError() {
  showError("保存签章文件失败", 5000, () => {
    doPostMessage({ errorMessage: "保存签章文件失败" });
  });
}

function save() {
  NetcaPDFSeal.save(async function (res) {
    if (res.status === 0) {
      // res.result 是签完名后的文件的base64字符串
      const data = base64ToArrayBuffer(res.result);

      try {
        const responseData = await saveFile(data);
        doPostMessage(responseData);
      } catch {
        handleError();
      }
    } else {
      handleError();
    }
  });
}
