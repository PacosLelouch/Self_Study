const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/checkInputController.js");

const createStudent = (page, id, password, confirmPassword) => {
  var idValid = checkInput.checkIdValidity(id);
  var passwordValid = checkInput.checkPasswordValidity(password);
  var passwordConsistent = checkPasswordConsistency(password, confirmPassword);
  if (!idValid || !passwordValid || !passwordConsistent) {
    page.displayResult({
      idNotValid: !idValid,
      idStatus: 0, //未检查，则不用考虑用户名已存在的问题
      passwordNotValid: !passwordValid,
      passwordNotConsistent: !passwordConsistent,
    });
    return;
  } 
  if (debugFunc.isDebug == true) {
    page.displayResult({
      idNotValid: !idValid,
      idStatus: debugFunc.addStudentDebug(id, password),
      passwordNotValid: !passwordValid,
      passwordNotConsistent: !passwordConsistent,
    });
  }
  else{
    var idStatus;
    wx.request({
      url: serverUrl.register.url,
      data: { name: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: serverUrl.register.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if(res.statusCode == 200){
          idStatus = 0;
        }
        else if(res.statusCode == 409){
          idStatus = 1;
        }
        else{
          idStatus = -1;
        }
        page.displayResult({
          idNotValid: !idValid,
          idStatus: idStatus,
          passwordNotValid: !passwordValid,
          passwordNotConsistent: !passwordConsistent,
        });
      },
      fail: function (res) {
        page.displayResult({
          idNotValid: !idValid,
          idStatus: -1,
          passwordNotValid: !passwordValid,
          passwordNotConsistent: !passwordConsistent,
        });
      },
      complete: function (res) { },
    });
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