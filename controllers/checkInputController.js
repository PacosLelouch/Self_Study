const checkNameValidity = id => { //学号必须合法，即8位数字。
  var str = id;
  if (str == null || str.length != 8) {
    return false;
  }
  var reg1 = new RegExp(/^[0-9]+$/);
  if (!reg1.test(str)) {
    return false;
  }
  return true;
}

const checkPasswordValidity = password => { //密码至少包含6位符号，必须包含数字加字母，不能包含特殊符号。
  var str = password;
  if (str == null || str.length < 6) {
    return false;
  }
  var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
  if (!reg1.test(str)) {
    return false;
  }
  var reg2 = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
  if (!reg2.test(str)) {
    return false;
  }
  return true;
}

module.exports = {
  checkNameValidity: checkNameValidity,
  checkPasswordValidity: checkPasswordValidity,
};