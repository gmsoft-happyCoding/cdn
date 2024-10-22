NetcaPKI.useSKFDevices = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "UseSKFDevices";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.SetSKFDevicesCA = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "SetSKFDevicesCA";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

NetcaPKI.getUseSKFDevicesParam = function (params) {
  var requestQueryParams = {};
  requestQueryParams["function"] = "GetUseSKFDevicesParam";
  requestQueryParams["param"] = params;
  return NetcaPKI.SendNetcaCryptoJsonRpcMessage(requestQueryParams);
};

function openSKFDevices() {
  var params = {
    use: 1,
  };
  NetcaPKI.useSKFDevices(params)
    .Then(function (res) {
      console.log("开启多CA模式成功\n");
    })
    .Catch(function (res) {
      console.log("开启多CA模式失败" + res.msg);
    });
}

function setSKFDeviceOpenCA() {
  var params = {
    devices: {},
  };
  if (document.getElementById("catype1").checked) {
    params["GDCA"] = {};
  }
  if (document.getElementById("catype2").checked) {
    params["EZCA"] = {};
  }
  if (document.getElementById("catype3").checked) {
    params["BJCA"] = {};
  }
  if (document.getElementById("catype4").checked) {
    params["HNCA"] = {};
  }
  if (document.getElementById("catype5").checked) {
    params["SZCA"] = {};
  }
  NetcaPKI.SetSKFDevicesCA(params)
    .Then(function (res) {
      alert("CA设置成功\n");
    })
    .Catch(function (res) {
      alert("CA设置失败" + res.msg);
    });
}

function getUserCert() {
  var selectType =
    '{"UIFlag":"default", "InValidity":true, "Method":"device","Value":"any"}';
  var selectCondition = "InValidity='True'";
  netca_getCertStringAttribute(
    null,
    selectType,
    selectCondition,
    -1,
    successGetCertStringAttributeCallBack,
    failedGetCertStringAttributeCallBack,
  );
}

function uIDisplayCert() {
  var certEncode = null;
  var selectType = "Device";
  var selectCondition = "";

  var params = {
    cert: {
      encode: certEncode,
      type: selectType,
      condition: selectCondition,
    },
  };
  NetcaPKI.displayCert(params)
    .Then(function (res) {
      alert("证书显示成功");
    })
    .Catch(function (res) {
      alert(res.msg);
    });
}
