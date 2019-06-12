const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const getStudentInfo = (callBack) => {
  try{
    var accountId = wx.getStorageSync('accountId');
    returnData.accountId = accountId;
    if(debugFunc.isDebug == true){
      var returnData = debugFunc.getStudentByIdDebug(accountId);
      callBack({
        getInfoStatus: 0,
        info: returnData,
        message: '成功',
      });
    }
    else{
      var url = serverUrl.studentInfo.url;
      let that = this;
      wx.request({
        url: url,
        data: { id: accountId },
        header: { 'content-type': 'application/json', },
        method: serverUrl.studentInfo.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          console.log(res);
          var getInfoStatus = 0;
          if (res.data.status == 'OK') {
            getInfoStatus = 0;
          } else if (res.data.status == 'UNAUTHORIZED') {
            getInfoStatus = 1;
          } else {
            getInfoStatus = -1;
          }
          callBack({
            getInfoStatus: getInfoStatus,
            info: res.data.data,
            message: res.data.message,
          });
        },
        fail: function (res) {
          console.log(res);
          callBack({
            getInfoStatus: -1,
            info: res.data.data,
            message: res.data.message,
          });
        },
        complete: function (res) { },
      })
    }
  } catch (e) {
    console.log('Get student info error.');
    console.log(e.toString());
  }
}

const getOrders = (callBack) => {
  try {
    var accountId = wx.getStorageSync('accountId');
    if (debugFunc.isDebug == true) {
      var returnData = debugFunc.getOrdersByStudentIdDebug(accountId);
      callBack({
        getOrdersStatus: 0,
        orderList: returnData,
        message: '成功',
      });
    }
    else {
      var url = serverUrl.studentOrder.url;
      let that = this;
      wx.request({
        url: url,
        data: { account_id: accountId },
        header: { 'content-type': 'application/json', },
        method: serverUrl.studentOrder.method,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var getOrdersStatus = 0;
          if (res.data.status == 'OK') {
            getOrdersStatus = 0;
          } else if (res.data.status == 'UNAUTHORIZED') {
            getOrdersStatus = 1;
          } else {
            getOrdersStatus = -1;
          }
          callBack({
            getOrdersStatus: getOrdersStatus,
            orderList: res.data.data,
            message: res.data.message,
          });
        },
        fail: function (res) {
          console.log(res);
          callBack({
            getOrdersStatus: -1,
            orderList: res.data.data,
            message: res.data.message,
          });
        },
        complete: function (res) { },
      })
    }
  }
  catch (e) {
    console.log('Get orders error.');
    console.log(e.toString());
  }
}

module.exports = {
  getStudentInfo: getStudentInfo,
  getOrders: getOrders,
}