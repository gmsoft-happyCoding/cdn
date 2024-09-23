const params = encodeURIComponent(
  JSON.stringify({
    fileUrl:
      "http://www.ssf.gov.cn/portal/rootfiles/2022/05/31/1655612237174353-1655612237184213.pdf",
    saveFileUrl: "https://www.xcjdev1.gm/djc-gateway/files/file50m/single",
    keyword: "政府采购",
    appearance: {
      textSpirits: [
        {
          fontSize: 50,
          text: "2024年1月4日",
          FontColor: {
            A: 255,
            R: 255,
            G: 0,
            B: 0,
          },
        },
      ],
    },
  })
);

console.log(`params=${params}`);
