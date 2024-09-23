const fileInfoApi =
  "https://www.ccgp-chongqing.gov.cn/djc-gateway/sysfile/sysFileNo?sysFileNo=EBIDDING_CA_DOWN_X64";

function downloadFile(filePath, fileName) {
  const url = `https://www.ccgp-chongqing.gov.cn/djc-gateway/files?attachment=true&filePath=${filePath}&fileName=${fileName}`;

  if (url) {
    const elemIF = window.document.createElement("iframe");
    elemIF.src = url;
    elemIF.style.display = "none";
    window.document.body.appendChild(elemIF);
  }
}

async function downloadClient(url, filename, callback) {
  try {
    const res = await fetch(fileInfoApi);
    const { attach } = await res.json();

    downloadFile(attach.filePath, attach.attachName);
  } catch {
    showError("下载失败请稍后再试!", 3000);
  }
}
