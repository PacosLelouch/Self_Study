// pages/UsernameLoginPage/UsernameLoginController.js
const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/checkInputController.js");

const login = (page, id, password, type) => {
  var idValid = checkInput.checkIdValidity(id);
  var passwordValid = checkInput.checkPasswordValidity(password);
  if(!idValid || !passwordValid){
    page.showResult({
      idNotValid: !idValid,
      passwordNotValid: !passwordValid,
      loginStatus: 0, //未检查，不用考虑
    });
  } else {
    if (type == 0) {
      studentLogin(page, id, password);
    } else if (type == 1) {
      adminLogin(page, id, password);
    }
  }
}

function studentLogin(page, id, password){
  var loginStatus = 0;
  if(debugFunc.isDebug == true){
    loginStatus = debugFunc.studentLoginDebug(id, password);
    page.showResult({
      idNotValid: false,
      passwordNotValid: false,
      loginStatus: loginStatus,
    });
    if (loginStatus == 0) {
      var loginSucceed = storageLogin(0, id);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  } else{
    wx.request({
      url: serverUrl.studentLogin.url,
      data: { name: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: serverUrl.studentLogin.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        console.log(res); 
        if(res.statusCode == 200){
          loginStatus = 0;
        } else if(res.statusCode == 404){
          loginStatus = 1;
        } else if(res.statusCode == 401){
          loginStatus = 2;
        } else{
          loginStatus = -1;
        }
        page.showResult({
          idNotValid: false,
          passwordNotValid: false,
          loginStatus: loginStatus,
        });
        if (loginStatus == 0) {
          var loginSucceed = storageLogin(0, id);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
      },
      fail: function (res) { 
        page.showResult({
          idNotValid: false,
          passwordNotValid: false,
          loginStatus: -1,
        });
      },
      complete: function (res) { },
    });
  }
}

function adminLogin(page, id, password){
  var loginStatus = 0;
  if (debugFunc.isDebug == true) {
    loginStatus = debugFunc.adminLoginDebug(id, password);
    page.showResult({
      idNotValid: false,
      passwordNotValid: false,
      loginStatus: loginStatus,
    });
    if (loginStatus == 0) {
      var loginSucceed = storageLogin(1, id);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  } else {
    wx.request({
      url: serverUrl.adminLogin.url,
      data: { name: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: serverUrl.adminLogin.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          loginStatus = 0;
        } else if (res.statusCode == 404) {
          loginStatus = 1;
        } else if (res.statusCode == 403) {
          loginStatus = 2;
        } else {
          loginStatus = -1;
        }
        page.showResult({
          idNotValid: false,
          passwordNotValid: false,
          loginStatus: loginStatus,
        });
        if (loginStatus == 0) {
          var loginSucceed = storageLogin(1, id);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
      },
      fail: function (res) { 
        page.showResult({
          idNotValid: false,
          passwordNotValid: false,
          loginStatus: -1,
        });
      },
      complete: function (res) { },
    });
  }
}

function storageLogin(type, id){
  try{
    wx.setStorageSync('type', type.toString());
    wx.setStorageSync('id', id.toString());
    wx.setStorageSync('logined', 'true');
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