const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/CheckInputController.js");
const md5 = require("../controllers/MD5.js");

const createStudent = (name, rawPassword, confirmRawPassword, callBack) => {
  try{
    var nameValid = checkInput.checkNameValidity(name);
    var passwordValid = checkInput.checkPasswordValidity(rawPassword);
    var passwordConsistent = checkPasswordConsistency(rawPassword, confirmRawPassword);
    var password = md5.encode(rawPassword);
    var confirmPassword = md5.encode(confirmRawPassword);
    if (!nameValid || !passwordValid || !passwordConsistent) {
      callBack({
        nameNotValid: !nameValid,
        nameStatus: 0, //未检查，则不用考虑用户名已存在的问题
        passwordNotValid: !passwordValid,
        passwordNotConsistent: !passwordConsistent,
        message: '输入不合法',
      });
      return;
    } 
    if (debugFunc.isDebug == true) {
      callBack({
        nameNotValid: !nameValid,
        nameStatus: debugFunc.addStudentDebug(name, password),
        passwordNotValid: !passwordValid,
        passwordNotConsistent: !passwordConsistent,
        message: '？？？',
      });
    }
    else{
      wx.request({
        url: serverUrl.register.url,
        data: { name: name, password: password, },
        header: { 'content-type': 'application/json', },
        method: serverUrl.register.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var nameStatus;
          if(res.data.status == 'OK'){//200
            nameStatus = 0;
          }
          else if(res.data.status == 'CONFLICT'){//409
            nameStatus = 1;
          }
          else{
            nameStatus = -1;
          }
          callBack({
            nameNotValid: !nameValid,
            nameStatus: nameStatus,
            passwordNotValid: !passwordValid,
            passwordNotConsistent: !passwordConsistent,
            message: res.data.message,
          });
        },
        fail: function (res) {
          console.log(res);
          callBack({
            nameNotValid: !nameValid,
            nameStatus: -1,
            passwordNotValid: !passwordValid,
            passwordNotConsistent: !passwordConsistent,
            message: res.data.message,
          });
        },
        complete: function (res) { },
      });
    }
  } catch (e) {
    console.log('Register error.');
    console.log(e.toString());
  }
}

function checkPasswordConsistency(password, confirmPassword) {
  if (password == null || confirmPassword == null) {
    return false;
  }
  if (password != confirmPassword) {
    return false;
  }
  return true;
}

module.exports = {
  createStudent: createStudent,
}