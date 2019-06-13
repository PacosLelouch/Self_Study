// pages/UsernameLoginPage/UsernameLoginController.js
const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/CheckInputController.js");
const md5 = require("../controllers/MD5.js");

const login = (name, rawPassword, type, callBack) => {
  var nameValid = checkInput.checkNameValidity(name);
  var passwordValid = checkInput.checkPasswordValidity(rawPassword);
  var password = md5.encode(rawPassword);
  if(!nameValid || !passwordValid){
    callBack({
      nameNotValid: !nameValid,
      passwordNotValid: !passwordValid,
      loginStatus: 0, //未检查，不用考虑
    });
  } else {
    if (type == 0) {
      studentLogin(name, password, callBack);
    } else if (type == 1) {
      adminLogin(name, password, callBack);
    }
  }
}


function studentLogin(name, password, callBack){
  var loginStatus = 0;
  if(debugFunc.isDebug == true){
    loginStatus = debugFunc.studentLoginDebug(name, password);
    callBack({
      nameNotValid: false,
      passwordNotValid: false,
      loginStatus: loginStatus,
    });
    if (loginStatus == 0) {
      var loginSucceed = storageLogin(0, name);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  } else{
    wx.request({
      url: serverUrl.studentLogin.url,
      data: { name: name, password: password, type:0 },
      header: { 'content-type': 'application/json', },
      method: serverUrl.studentLogin.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        console.log(res); 
        if(res.data.status == 'OK'){//200
          loginStatus = 0;
        } else if (res.data.status == 'UNAUTHORIZED'){//403
          loginStatus = 1;
        } else if (res.data.status == 'FORBIDDEN'){//401
          loginStatus = 2;
        } else{
          loginStatus = -1;
        }
        if (loginStatus == 0) {
          var loginSucceed = storageLogin(0, res.data.data, name);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
        callBack({
          nameNotValid: false,
          passwordNotValid: false,
          loginStatus: loginStatus,
        });
      },
      fail: function (res) { 
        callBack({
          nameNotValid: false,
          passwordNotValid: false,
          loginStatus: -1,
        });
      },
      complete: function (res) { },
    });
  }
}

function adminLogin(name, password, callBack){
  var loginStatus = 0;
  if (debugFunc.isDebug == true) {
    loginStatus = debugFunc.adminLoginDebug(name, password);
    callBack({
      nameNotValid: false,
      passwordNotValid: false,
      loginStatus: loginStatus,
    });
    if (loginStatus == 0) {
      var loginSucceed = storageLogin(1, name);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  } else {
    wx.request({
      url: serverUrl.adminLogin.url,
      data: { name: name, password: password, type:1 },
      header: { 'content-type': 'application/json', },
      method: serverUrl.adminLogin.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if(res.data.status == 'OK'){//200
          loginStatus = 0;
        } else if (res.data.status == 'UNAUTHORIZED'){//403
          loginStatus = 1;
        } else if(res.data.status == 'FORBIDDEN'){//401
          loginStatus = 2;
        } else{
          loginStatus = -1;
        }
        if (loginStatus == 0) {
          var loginSucceed = storageLogin(1, res.data.data, name);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
        callBack({
          nameNotValid: false,
          passwordNotValid: false,
          loginStatus: loginStatus,
          message: res.data.message,
        });
      },
      fail: function (res) { 
        callBack({
          nameNotValid: false,
          passwordNotValid: false,
          loginStatus: -1,
          message: res.data.message,
        });
      },
      complete: function (res) { },
    });
  }
}

function storageLogin(type, accountId, name){
  try{
    wx.setStorageSync('type', type.toString());
    wx.setStorageSync('name', name.toString());
    wx.setStorageSync('accountId', accountId.toString());
    return true;
  } catch (e){
    console.log('Storage Error.');
    console.log(e.toString());
    return false;
  }
}

module.exports = {
  login: login,
}