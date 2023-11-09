const params = encodeURIComponent(
  JSON.stringify({
    fileUrl:
      "http://www.ssf.gov.cn/portal/rootfiles/2022/05/31/1655612237174353-1655612237184213.pdf",
    saveFileUrl: "https://www.xcjdev1.gm/djc-gateway/files/file50m/single",
    keyword: "政府采购",
  })
);

console.log(`params=${params}`);
