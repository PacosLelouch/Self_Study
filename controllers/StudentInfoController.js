const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const getStudentInfo = (page) => {
  var returnData = {};
  try{
    var id = wx.getStorageSync('id');
    returnData.id = id;
    if(debugFunc.isDebug == true){
      returnData = debugFunc.getStudentByIdDebug(id);
      page.setStudent(returnData);
    }
    else{
      var url = serverUrl.studentInfoUrl;
      let that = this;
      wx.request({
        url: url,
        data: { id: id },
        header: { 'content-type': 'application/json', },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          console.log(res); 
          returnData = res.data.returnValue;
          page.setStudent(returnData);
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
  catch (e) {
    console.log('Get student info error.');
    console.log(e.toString());
  }
}

const getOrdersByStudentId = (page, id) => {
  var returnData = {};
  try {
    if (debugFunc.isDebug == true) {
      returnData = debugFunc.getOrdersByStudentIdDebug(id);
      page.setOrders(returnData);
    }
    else {
      var url = serverUrl.ordersUrl;
      let that = this;
      wx.request({
        url: url,
        data: { id: id },
        header: { 'content-type': 'application/json', },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          console.log(res); 
          returnData = res.data.returnValue;
          page.setOrders(returnData);
        },
        fail: function (res) { },
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
  getOrdersByStudentId: getOrdersByStudentId,
}