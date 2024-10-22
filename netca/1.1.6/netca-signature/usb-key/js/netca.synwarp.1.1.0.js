var NETCASYNWARP = (function () {
  var localself = {};

  localself.regFunction = function (name) {
    localself[name] = function (params) {
      return new Promise((resolve, reject) => {
        NetcaPKI[name](params)
          .Then(function (res) {
            // 成功回调返回的参数加上status=0,让使用者区别返回结果是成功回调还是失败回调
            var obj = {
              status: 0,
              data: res,
            };
            resolve(obj);
          })
          .Catch(function (res) {
            reject(res);
          });
      });
    };
  };

  //RSA 加解密模块
  localself.regFunction("PublicKeyEncrypt");
  localself.regFunction("PrivateKeyDecrypt");

  //SignedData 模块
  localself.regFunction("SignedDataSign");
  localself.regFunction("SignedDataVerify");

  //数字信封 模块
  localself.regFunction("EnvelopedDataEncrypt");
  localself.regFunction("EnvelopedDataDecrypt");

  //PDFSign 模块
  localself.regFunction("PdfAutoSign");
  localself.regFunction("GetCertStringAttribute");
  localself.regFunction("IsInsertKey");
  localself.regFunction("VerifyKeyPwd");
  localself.regFunction("GetVersionInfo");
  localself.regFunction("MonitorDevice");
  localself.regFunction("GetCertList");
  localself.regFunction("HashData");
  localself.regFunction("GetCertStringExtensionValue");
  localself.regFunction("GetClientVersionInfo");

  //
  localself.regFunction("Sign");
  localself.regFunction("VerifySignature");
  localself.regFunction("SignatureCreator");
  localself.regFunction("ClearPwdCache");
  localself.regFunction("Cipher");
  localself.regFunction("VerifyCertificate");
  localself.regFunction("NetcaAAVerifyUserCert");
  localself.regFunction("NetcaAAChkOneCert");
  localself.regFunction("ModifyKeyPwd");
  localself.regFunction("UnlockKeyPwd");
  localself.regFunction("GenerateP10");
  localself.regFunction("InstallCertificate");
  localself.regFunction("KeyXClientPluginShell");
  localself.regFunction("DisplayCert");
  localself.regFunction("CreateData");
  localself.regFunction("ReadData");
  localself.regFunction("WriteData");
  localself.regFunction("DeleteData");
  localself.regFunction("MacData");
  localself.regFunction("GenerateRandom");
  localself.regFunction("SignedDataGetInfo");
  localself.regFunction("Kdf");

  return localself;
})();

NetcaPKI.syn = NETCASYNWARP;
