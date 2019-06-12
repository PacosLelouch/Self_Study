const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const queryOrder = (locationId, date, startTime, callBack) => {
  if(debugFunc.isDebug){

  } else {
    var url = serverUrl.queryOrderAdmin.url;
    wx.request({
      url: url,
      data: {},
      header: { 'content-type': 'application/json', },
      method: serverUrl.queryOrderAdmin.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var queryOrderStatus = 0;
        if (res.data.status == 'OK') {
          queryOrderStatus = 0;
        } else if (res.data.status == 'UNAUTHORIZED') {
          queryOrderStatus = 1;
        } else {
          queryOrderStatus = -1;
        }
        callBack({
          queryOrderStatus: queryOrderStatus,
          orderList: res.data.data,
          message: res.data.message,
        })
      },
      fail: function (res) {
        console.log(res);
        page.displayRoom({
          queryOrderStatus: -1,
          orderList: [],
          message: res.data.message,
        })
      },
      complete: function (res) {

      }
    });
  }
}

module.exports = {
  queryOrder: queryOrder,
}