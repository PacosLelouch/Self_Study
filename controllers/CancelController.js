const debugFunc = require("../utils/debugFunc.js");
const serverUrl = require("../utils/serverUrl.js");

const cancelOrder = (orderId, date, startTime, callBack) => {
  try{
    var accountType = wx.getStorageSync('type');
    var validCancel = false;
    if (accountType == '0') {
      validCancel = checkTime(date, startTime);
    } else if (accountType == '1') {
      validCancel = true;
    }
    if (!validCancel) {
      callBack({
        cancelStatus: 2,
        message: '已过可取消该预约的时间',
      });
    } else {
      if (debugFunc.isDebug == true) {
      }
      else {
        var url = serverUrl.cancelOrder.url;
        wx.request({
          url: url,
          data: { order_id: orderId },
          header: { 'content-type': 'application/json', },
          method: serverUrl.cancelOrder.method,
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res);
            var cancelStatus = 0;
            if (res.data.status == 'OK') {
              cancelStatus = 0;
            } else if (res.data.status == 'UNAUTHORIZED') {
              cancelStatus = 1;
            } else {
              cancelStatus = -1;
            }
            callBack({
              cancelStatus: cancelStatus,
              message: res.data.message,
            });
          },
          fail: function (res) {
            console.log(res);
            callBack({
              cancelStatus: -1,
              message: res.data.message,
            });
          },
          complete: function (res) { }
        })
      }
    }
  } catch (e) {
    console.log('Get account type error.');
    console.log(e.toString());
  }
}


function checkTime(date, startTime) {
  var nowDate = new Date();
  var now = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate(),
    hour: nowDate.getHours(),
    minute: nowDate.getMinutes(),
    second: nowDate.getSeconds(),
  };
  var record = {
    year: parseInt(date.substring(0, 4)),
    month: parseInt(date.substring(5, 7)),
    day: parseInt(date.substring(8, 10)),
    hour: parseInt(startTime.substring(0, 2)),
    minute: parseInt(startTime.substring(3, 5)),
    second: parseInt(startTime.substring(7, 9)),
  };
  console.log(now);
  console.log(record);
  if (now.year > record.year) {
    return false;
  }
  if (now.month > record.month) {
    return false;
  }
  if (now.day + 1 > record.day) { // 24h
    return false;
  }
  else if (now.day + 1 == record.day) {
    var nowSecond = now.hour * 3600 + now.minute * 60 + now.second;
    var recSecond = record.hour * 3600 + record.minute * 60 + record.second;
    if (recSecond - nowSecond < 86400) {
      return false;
    }
    return true;
  }
  else {
    return true;
  }
}

/*
const cancelOrderRecord = (orderId, date, startTime, callBack) => {
  var validCancel = checkTime(date, startTime);
  if(validCancel){
    showCancel(orderId, callBack);
  }
  else{
    showInvalid();
  }
}

function showInvalid () {
  wx.showToast({
    title: '已过可取消时间！',
    icon: 'loading',
    duration: 2000,
  });
}

function showCancel(orderId, callBack) {
  var str = '预约号：' + orderId + '，是否取消该预约？';
  wx.showModal({
    title: '取消预约',
    content: str,
    success: function (res) {
      if (res.confirm) {//这里是点击了确定以后
        console.log('confirm');
        var result = false;
        if(debugFunc.isDebug == true){
          result = debugFunc.cancelOrderRecordDebug(orderId);
          if (result == true) {
            callBack({
              
            });
          }
        }
        else{
          var url = serverUrl.cancelOrder.url;
          wx.request({
            url: url,
            data: { order_id: orderId },
            header: { 'content-type': 'application/json', },
            method: serverUrl.cancelOrder.method,
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res);
              showToast(res.data.message);
              if(res.data.status == 'OK'){
                page.showResult();
              }
            },
            fail: function (res) {}, 
            complete: function (res) {}
          })
        }
      }
      else {//这里是点击了取消以后
        console.log('cancel');
      }
    }
  });
}

function showToast (msg) {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000,
  });
}
*/
module.exports = {
  cancelOrder: cancelOrder,
}