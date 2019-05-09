const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");
const checkInput = require("../controllers/checkInputController.js");

const createStudent = (page, id, password, confirmPassword) => {
  var idValidity = checkInput.checkIdValidity(id);
  var passwordValidity = checkInput.checkPasswordValidity(password);
  var passwordConsistency = checkPasswordConsistency(password, confirmPassword);
  if (!idValidity || !passwordValidity || !passwordConsistency) {
    page.displayResult({
      idValidity: idValidity,
      idNew: true, //未检查，则不用考虑用户名已存在的问题
      passwordValidity: passwordValidity,
      passwordConsistency: passwordConsistency,
    });
    return;
  } 
  if (debugFunc.isDebug == true) {
    page.displayResult({
      idValidity: idValidity,
      idNew: debugFunc.addStudentDebug(id, password), 
      passwordValidity: passwordValidity,
      passwordConsistency: passwordConsistency,
    });
  }
  else{
    var idNew;
    wx.request({
      url: serverUrl.registerUrl,
      data: { id: id, password: password, },
      header: { 'content-type': 'application/json', },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        idNew = res.data.returnValue;
        page.displayResult({
          idValidity: idValidity,
          idNew: idNew,
          passwordValidity: passwordValidity,
          passwordConsistency: passwordConsistency,
        });
      },
      fail: function (res) { },
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