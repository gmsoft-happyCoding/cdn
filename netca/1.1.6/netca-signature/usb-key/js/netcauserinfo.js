/* 
   NetcaUserInfo 模块(V1.0.0)
   该模块主要提供定制的获取信息的PKI接口，对外入口为NetcaPKI。通过NetcaPKI.xx调用接口
		
   版本 V1.0.0  2019-10-29
        增加获取硬件和网络信息的接口
   版本 V1.0.1  2022-04-26
        增加获取日志信息的接口
		
*/

NetcaPKI.hardDeviceInformation = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "UserInfo";
  requestQueryParams["function"] = "HardDeviceInformation";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.getHardDeviceInformation = function (params) {
  return NetcaPKI.hardDeviceInformation(params);
};

NetcaPKI.networkInformation = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "UserInfo";
  requestQueryParams["function"] = "NetworkInformation";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
NetcaPKI.getNetworkInformation = function (params) {
  return NetcaPKI.networkInformation(params);
};

NetcaPKI.getLog = function (params) {
  var requestQueryParams = {};
  requestQueryParams["appName"] = "UserInfo";
  requestQueryParams["function"] = "GetLog";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};
