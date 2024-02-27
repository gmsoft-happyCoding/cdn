/*
    Netca电子签章模块(V1.3.0)
    版本 V1.0.0
        提供基础的电子签章接口

    版本 V1.2.0  2019-10-07
        提供关键字的印章接口

    版本 V1.3.0  2020-03-03
        提供获取签名域信息接口
    
    版本 1.1.1 2022-11-9
        提供合并签章接口，签名/签名接口中增加是否合并模式的参数
*/

NetcaPKI.getSealClientVersion = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetSealClientVersion";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getNetcaSealImage = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "GetNetcaSealImage";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.GetNetcaSealImage = function (params) {
  return NetcaPKI.getNetcaSealImage(params);
};

NetcaPKI.SignatureCreatorPdfSignSealFieldOrPosition = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorSignSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.signatureCreatorSignSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorSignSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.SignatureCreatorPdfSignSealFieldOrPositionEx = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorSignSealEx";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.signatureCreatorSignSealEx = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorSignSealEx";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.SignatureCreatorSignSealEx = function (params) {
  return NetcaPKI.signatureCreatorSignSealEx(params);
};

NetcaPKI.signatureVerifierVerifyPDF = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureVerifierVerifyPDF";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.signatureVerifierUndoPDF = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureVerifierUndoPDF";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.Custom_PdfSignAndUpload = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "Custom_PdfSignAndUploadByBytes";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.custom_PdfSignAndUploadByBytes = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "Custom_PdfSignAndUploadByBytes";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.displaySealConfigInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "DisplaySealConfigInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.Custom_PdfSignAndUploadByURL = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "Custom_PdfSignAndUploadByURL";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getSignatureFieldInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetSignatureFieldInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.SelectSealSigntureInfoWithDispaly = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SelectSealSigntureInfoWithDispaly";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.getSealConfigInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetSealConfigInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.printPDF = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "PrintPDF";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.readSealStream = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "ReadStream";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.signatureCreatorBatchSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorBatchSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.signatureCreatorAcrossPageSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SignatureCreatorAcrossPageSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.getPdfPageInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetPdfPageInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.createStream = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "CreateStream";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.writeStream = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "WriteStream";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.destoryStream = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "DestoryStream";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.readStream = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "ReadStream";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.undoPDF = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "UndoPDF";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.graphicsProcessDrawText = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GraphicsProcessDrawText";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.mergeSealById = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "MergeSealById";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.mergeSealByIncrementInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "MergeSealByIncrementInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.initMergeSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "InitMergeSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getIncrementSerializableInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetIncrementSerializableInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.clearIncrementInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "ClearIncrementInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.writeSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "WriteSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.readSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "ReadSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.deleteSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "DeleteSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.sesStampDecode = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "SesStampDecode";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.sesSignatureDecode = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "SesSignatureDecode";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.selectSealSigntureInfoWithDispaly = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "SelectSealSigntureInfoWithDispaly";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.signatureCreatorInsertImage = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "SignatureCreatorInsertImage";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.download = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "Download";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.getSignatureField = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "GetSignatureField";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.verifyDocument = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "VerifyDocument";
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.signatureCreatorUpload = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "Upload";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getDocumentPage = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetDocumentPage";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getCloudKeyInfo = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetCloudKeyInfo";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getKeyWord = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetKeyWord";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getAcrossPageSeal = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "SignatureCreator";
  requestQueryParams["function"] = "GetAcrossPageSeal";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
