// 专家信息
var userInfo = {
  name: "小小", // 专家名称
  identity: "110101199003076659", // 身份证号码
};

const params = encodeURIComponent(
  JSON.stringify({
    fileUrl:
      "https://www.xcjdev1.gm/group1/M00/00/14/CvQGbGTSD0aANWgpAAY57RiloU4383.pdf",
    saveFileUrl: "https://www.xcjdev1.gm/djc-gateway/files/file50m/single",
    serverOrigin: "https://www.xcjdev1.gm",
    keyword: "政府采购",
    ...userInfo,
  })
);

console.log(`params=${params}`);
