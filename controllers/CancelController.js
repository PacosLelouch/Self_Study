const util = require("../utils/util.js");
const debugFunc = require("../utils/debugFunc.js");

const cancelOrderRecord = (page, data) => {
  var id = data.orderId;
  var date = data.date;
  var startTime = data.startTime;
  var validCancel = checkDate(date, startTime);
  if(validCancel){
    showCancel(page, data);
  }
  else{
    showInvalid();
  }
}

function checkDate (date, startTime) {
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
  if(now.year > record.year){
    return false;
  }
  if(now.month > record.month){
    return false;
  }
  if(now.day + 1 > record.day){ // 24h
    return false;
  }
  else if(now.day + 1 == record.day){
    var nowSecond = now.hour * 3600 + now.minute * 60 + now.second;
    var recSecond = record.hour * 3600 + record.minute * 60 + record.second;
    if(recSecond - nowSecond < 86400){
      return false;
    }
    return true;
  }
  else{
    return true;
  }
}

function showInvalid () {
  wx.showToast({
    title: '已过可取消时间！',
    icon: 'loading',
    duration: 2000,
  });
}

function showCancel (page, data) {
  var str = '预约号：' + data.orderId + '，是否取消该预约？';
  wx.showModal({
    title: '取消预约',
    content: str,
    success: function (res) {
      if (res.confirm) {//这里是点击了确定以后
        console.log('confirm');
        var result = false;
        if(debugFunc.isDebug == true){
          result = debugFunc.cancelOrderRecordDebug(data.orderId);
          if (result == true) {

            page.showStudentInfo();
            showCancelSuccess();
          }
        }
        else{
          //request PUT

        }
      }
      else {//这里是点击了取消以后
        console.log('cancel');
      }
    }
  });
}

function showCancelSuccess () {
  wx.showToast({
    title: '取消成功！',
    icon: 'success',
    duration: 2000,
  });
}

module.exports = {
  cancelOrderRecord: cancelOrderRecord,
}