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
  width = 0,
  // 整数, 签名域矩形的高度, 0 为图片本身的高度
  height = 0,
  // 整数	0	签名域相对关键字位置的偏移，正数右偏，负数左偏
  offsetX = 0,
  // 整数	0	签名域相对关键字位置的偏移，正数下偏，负数上偏
  offsetY = 0,
}) {
  // 先判断是否插入key
  NetcaPKI.isInsertKey({})
    .Then(function (res) {
      if (res.insertCount > 0) {
        NetcaPKI.SelectSealSigntureInfoWithDispaly({
          // 必要参数，解决取消输入密码时的异常行为
          clsid: "001DE133-9BD7-4ACE-BF4D-AE14D689C061",
        })
          .Then(function (res) {
            var params = {
              certEncode: res.cert, //签名证书Base64编码
              sealImageEncode: res.picture, //签章图片Base64编码
              //签名位置对象
              sealKeyWord: {
                keyword,
                startPageNum: startPage,
                endPageNum: endPage,
                index,
                width,
                height,
                offsetX,
                offsetY,
              },
            };

            NetcaPDFSeal.sign(params);
          })
          .Catch(function (res) {
            if (res.msg == "用户取消了操作") {
              return;
            }
            if (res.msg == "PIN码验证失败") {
              return;
            }
            alert(res.msg);
          });
      } else {
        alert("可用证书为0张");
      }
    })
    .Catch(function (res) {
      alert("请确认UsbKey是否插入");
    });
}
