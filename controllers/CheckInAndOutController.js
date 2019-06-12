const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const timeTable = [
  '08:00:00',
  '10:00:00',
  '12:00:00',
  '14:00:00',
  '16:00:00',
  '18:00:00',
  '20:00:00',
  '22:00:00',
];

const checkIn = function(locationId, callBack){
  var date = new Date();
  var timeNumber = checkTime(date);
  var message = '';
  console.log('TimeNumber:' + timeNumber.toString());
  if (timeNumber >= timeTable.length - 1){
    message = '今日自习签到已结束！';
    callBack({
      checkStatus: 3,
      message: message,
    });
  } else if (timeNumber == -1){
    message = '未到可签到时间，请在自习开始前15分钟内或自习开始后15分钟内签到！';
    callBack({
      checkStatus: 3,
      message: message,
    });
  } else {
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');
    var accountId;
    try{
      accountId = wx.getStorageSync('accountId');
    } catch (e) {
      console.log('Get account id error.');
      console.log(e.toString());
    }
    findOrderId(accountId, locationId, dateString, timeTable[timeNumber], message, 1, callBack);
  } 
}

function checkInAux(orderId, message, callBack){
  try {
    var accountId = wx.getStorageSync('accountId');
    if (debugFunc.isDebug) {
    } else {
      var url = serverUrl.checkInAndOut.url;
      wx.request({
        url: url,
        data: {
          order_id: orderId,
          state: 1,
        },
        header: { 'content-type': 'application/json', },
        method: serverUrl.checkInAndOut.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var checkStatus = 0;
          if (res.data.status == 'OK') {
            checkStatus = 0;
            message = '签到成功';
          } else if (res.data.status == 'UNAUTHORIZED') {
            checkStatus = 1;
            message = '签到失败，当前没有您的预约';
          } else if (res.data.status == 'FORBIDDEN') {
            checkStatus = 2;
            message = '签到失败，当前预约已失效';
          } else {
            checkStatus = -1;
            message = '签到失败，未知错误';
          }
          callBack({
            checkStatus: checkStatus,
            message: message,
          });
        },
        fail: function (res) {
          console.log(res);
          message = '签到失败，未知错误';
          callBack({
            checkStatus: -1,
            message: message,
          });
        },
        complete: function (res) { },
      });
    }
  } catch (e) {
    console.log('Check in error.');
    console.log(e.toString());
  }
}

const checkOut = function (locationId, callBack) {
  var date = new Date();
  var timeNumber = checkTime(date);
  var message = '';
  console.log('TimeNumber:' + timeNumber.toString());
  if (timeNumber >= timeTable.length) {
    message = '今日自习签退已结束！';
    callBack({
      checkStatus: 3,
      message: message,
    });
  } else if (timeNumber == -1 || timeNumber == 0) {
    message = '未到可签退时间，请在自习结束前15分钟内或自习结束后15分钟内签到！';
    callBack({
      checkStatus: 3,
      message: message,
    });
  } else {
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');//timeNumber得到结束的序号，所以要往前一个找开始的时间
    var accountId;
    try {
      accountId = wx.getStorageSync('accountId');
    } catch (e) {
      console.log('Get account id error.');
      console.log(e.toString());
    }
    //timeNumber是结束时间的序号，所以要-1以找到开始时间
    findOrderId(accountId, locationId, dateString, timeTable[timeNumber - 1], message, 2, callBack);
  }
}

function checkOutAux(orderId, message, callBack){
  try {
    if (debugFunc.isDebug) {
    } else {
      var url = serverUrl.checkInAndOut.url;
      wx.request({
        url: url,
        data: {
          order_id: orderId,
          state: 2,
        },
        header: { 'content-type': 'application/json', },
        method: serverUrl.checkInAndOut.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var checkOutStatus = 0;
          if (res.data.status == 'OK') {
            checkStatus = 0;
            message = '签退成功';
          } else if (res.data.status == 'UNAUTHORIZED') {
            checkStatus = 1;
            message = '签退失败，当前没有您的预约';
          } else if (res.data.status == 'FORBIDDEN') {
            checkStatus = 2;
            message = '签退失败，当前预约已失效';
          } else {
            checkStatus = -1;
            message = '签退失败，未知错误';
          }
          callBack({
            checkStatus: checkStatus,
            message: message,
          });
        },
        fail: function (res) {
          console.log(res);
          message = '签退失败，未知错误';
          callBack({
            checkStatus: -1,
            message: message,
          });
        },
        complete: function (res) { },
      });
    }
  } catch (e) {
    console.log('Check in error.');
    console.log(e.toString());
  }
}

function findOrderId(accountId, locationId, dateString, startTime, message, targetState, callBack){
  var url = serverUrl.orderState.url;
  wx.request({
    url: url,
    data: {
      account_id: accountId,
      location_id: locationId,
      date: dateString,
      startTime: startTime,
    },
    header: { 'content-type': 'application/json', },
    method: serverUrl.checkInAndOut.method,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log(res);
      if (res.data.status == 'OK'){
        if (res.data.data.state == targetState - 1){
          if (targetState == 1) {
            checkInAux(res.data.data.order_id, message, callBack);
          } else if (targetState == 2) {
            checkOutAux(res.data.data.order_id, message, callBack);
          }
        } else {
          if (targetState == 1) {
            message = '当前预约不可签到'
          } else if (targetState == 2) {
            message = '当前预约不可签退'
          }
          callBack({
            checkStatus: 2,
            message: message,
          });
        }
      } else if (res.data.status == 'UNAUTHORIZED'){
        message = '预约不存在'
        callBack({
          checkStatus: 1,
          message: message,
        });
      } else {
        message = '找不到预约，未知错误'
        callBack({
          checkStatus: -1,
          message: message,
        });
      }
    },
    fail: function (res) {
      console.log(res);
      message = '找不到预约，未知错误'
      callBack({
        checkStatus: -1,
        message: message,
      });
    },
    complete: function (res) {

    }
  })
}

function checkTime(nowDate) {
  var nowNumber = nowDate.getHours() * 3600 
    + nowDate.getMinutes() * 60 
    + nowDate.getSeconds();
  console.log(nowNumber);
  var secondList = timeTable.map(n => {
    return parseInt(n.substring(0, 2)) * 3600 
      + parseInt(n.substring(3, 5)) * 60 
      + parseInt(n.substring(6, 8));
  });
  var i = 0;
  for(i = 0; i < secondList.length; ++i){
    if(nowNumber <= secondList[i] + 15 * 60){
      break;
    }
  }
  if(nowNumber < secondList[i] - 15 * 60){
    return -1;
  }
  return i;
}

module.exports = {
  checkIn: checkIn,
  checkOut: checkOut,
};