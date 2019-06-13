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
  '22:00:00'
];

const orderRoom = function(date, startTime, locationId, useSocket, callBack){
  try{
    var accountId = wx.getStorageSync('accountId');
    if(debugFunc.isDebug){
      
    } else {
      console.log(accountId, locationId, date, startTime, useSocket);
      wx.request({
        url: serverUrl.orderRoom.url,
        data: { 
          account_id: accountId, 
          location_id: locationId, 
          date: date, 
          startTime: startTime, 
          useSocket: useSocket
        },
        header: { 'content-type': 'application/json' },
        method: serverUrl.orderRoom.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var orderStatus = 0;
          if(res.data.status == 'OK'){
            orderStatus = 0;
          } else if (res.data.status == 'UNAUTHORIZED'){
            orderStatus = 1;
          } else if (res.data.status == 'FORBIDDEN') {
            orderStatus = 2;
          } else if (res.data.status == 'BAD_REQUEST') {
            orderStatus = 3;
          } else if (res.data.status == 'UNAUTHORIZED') {
            orderStatus = 4;
          } else if (res.data.status == 'CONFLICT') {
            orderStatus = 5;
          } else {
            orderStatus = -1;
          }
          callBack({
            orderStatus: orderStatus,
            message: res.data.message
          });
        },
        fail: function (res) {
          console.log(res);
          page.displayResult({
            orderStatus: -1,
            message: res.data.message
          });
        },
        complete: function (res) {}
      })
    }
  } catch (e) {
    console.log('Order room error.');
    console.log(e.toString());
  }
}

module.exports = {
  orderRoom: orderRoom,
};