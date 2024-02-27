function sealWithKeyWords({
  // 指定的关键字
  keyword,
  // 整数	1	开始页码，正数为正数，倒数为负，如最后一页为-1
  startPage = 1,
  // 整数	-1	结束页码，正数为正数，倒数为负，如最后一页为-1
  endPage = -1,
  // 关键字搜索顺序从 1 开始，倒数为负，如最后一个为-1
  index = 1,
  // 整数, 签名域矩形的宽度, 0 为图片本身的宽度
  width = 100,
  // 整数, 签名域矩形的高度, 0 为图片本身的高度
  height = 50,
  // 整数	0	签名域相对关键字位置的偏移，正数右偏，负数左偏
  offsetX = 0,
  // 整数	0	签名域相对关键字位置的偏移，正数下偏，负数上偏
  offsetY = 0,
}) {
  const sealKeyWordParams = {
    keyword,
    startPageNum: startPage,
    endPageNum: endPage,
    indexes: [index],
    width,
    height,
    offsetX,
    offsetY,
  };

  NetcaPDFSeal.signKeyWord(sealKeyWordParams, function callback(result) {
    if (result instanceof Error) {
      console.error(result);
    }
  });
}
