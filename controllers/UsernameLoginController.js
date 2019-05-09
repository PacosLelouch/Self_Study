// pages/UsernameLoginPage/UsernameLoginController.js
const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/checkInputController.js");

const login = (page, id, password, type) => {
  var idValidity = checkInput.checkIdValidity(id);
  var passwordValidity = checkInput.checkPasswordValidity(password);
  if(!idValidity || !passwordValidity){
    page.showResult({
      idValidity: idValidity,
      passwordValidity: passwordValidity,
      loginValidity: true, //未检查，不用考虑
    });
  }
  if (type == 0) {
    studentLogin(page, id, password);
  }
  else if (type == 1) {
    adminLogin(page, id, password);
  }
}

function studentLogin(page, id, password){
  var loginValidity = true;
  if(debugFunc.isDebug == true){
    loginValidity = debugFunc.studentLoginDebug(id, password);
    page.showResult({
      idValidity: true,
      passwordValidity: true,
      loginValidity: loginValidity,
    });
    if (loginValidity == true) {
      var loginSucceed = storageLogin(0, id);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  }
  else{
    wx.request({
      url: serverUrl.studentLoginUrl,
      data: { id: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        console.log(res); 
        loginVaildity = res.data.returnValue; 
        page.showResult({
          idValidity: true,
          passwordValidity: true,
          loginValidity: loginValidity,
        });
        if (loginValidity == true) {
          var loginSucceed = storageLogin(0, id);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    });
  }
}

function adminLogin(page, id, password){
  var loginValidity = true;
  if (debugFunc.isDebug == true) {
    loginValidity = debugFunc.adminLoginDebug(id, password);
    page.showResult({
      idValidity: true,
      passwordValidity: true,
      loginValidity: loginValidity,
    });
    if (loginValidity == true) {
      var loginSucceed = storageLogin(1, id);
      console.log('loginSucceed = ' + loginSucceed.toString());
    }
  }
  else {
    wx.request({
      url: serverUrl.adminLoginUrl,
      data: { id: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        loginVaildity = res.data.returnValue;
        page.showResult({
          idValidity: true,
          passwordValidity: true,
          loginValidity: loginValidity,
        });
        if (loginValidity == true) {
          var loginSucceed = storageLogin(1, id);
          console.log('loginSucceed = ' + loginSucceed.toString());
        }
      },
      fail: function (res) { },
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
  }
  catch (e){
    console.log('Storage Error.');
    console.log(e.toString());
    return false;
  }
}

module.exports = {
  login: login,
}