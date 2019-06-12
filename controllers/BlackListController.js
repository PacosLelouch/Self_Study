const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const queryBlackList = function(callBack){
  if(debugFunc.isDebug){

  } else{
    var url = serverUrl.queryBlackList.url;
    wx.request({
      url: url,
      data: {},
      header: { 'content-type': 'application/json', },
      method: serverUrl.queryBlackList.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var queryStatus = 0;
        if (res.data.status == 'OK') {
          queryStatus = 0;
        } else {
          queryStatus = -1;
        }
        var blackList = res.data.data.map((value, index, array) => {
          if(value.startTime[10]){
            value.startDate = value.startTime.substring(0, 10);
            value.startTime = value.startTime.substring(11, 19);

          }
          return value;
        });
        callBack({
          queryStatus: queryStatus,
          blackList: blackList,
          message: res.data.message,
        });
      },
      fail: function (res) {
        console.log(res);
        callBack({
          queryStatus: -1,
          blackList: [],
          message: res.data.message,
        });
      },
      complete: function (res) { }
    })
  }
}

const addStudentIntoBlackList = function(accountId, callBack){
  if(debugFunc.isDebug){

  } else{
    var url = serverUrl.blackListAdd.url;
    wx.request({
      url: url,
      data: {
        account_id: accountId,
        account_name: null,
      },
      header: { 'content-type': 'application/json', },
      method: serverUrl.blackListAdd.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var addBlackListStatus = 0;
        if (res.data.status == 'OK') {
          addBlackListStatus = 0;
        } else if (res.data.status == 'BAD_REQUEST') {
          addBlackLIstStatus = 1;
        } else if (res.data.status == 'CONFLICT') {
          addBlackListStatus = 2;
        } else if (res.data.status == 'UNAUTHORIZED') {
          addBlackListStatus = 3;
        } else {
          addBlackListStatus = -1;
        }
        callBack({
          addBlackListStatus: addBlackListStatus,
          message: res.data.message,
        });
      },
      fail: function (res) {
        console.log(res);
        callBack({
          addBlackListStatus: -1,
          message: res.data.message,
        });
      },
      complete: function (res) { }
    })
  }
}

const removeStudentFromBlackList = function(accountId, callBack){
  if (debugFunc.isDebug) {

  } else {
    var url = serverUrl.blackListRemove.url;
    wx.request({
      url: url,
      data: {
        account_id: accountId,
        account_name: null,
      },
      header: { 'content-type': 'application/json', },
      method: serverUrl.blackListRemove.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var removeStatus = 0;
        if (res.data.status == 'OK') {
          removeStatus = 0;
        } else if (res.data.status == 'BAD_REQUEST') {
          removeStatus = 1;
        } else if (res.data.status == 'UNAUTHORIZED') {
          removeStatus = 2;
        } else {
          removeStatus = -1;
        }
        callBack({
          removeStatus: removeStatus,
          message: res.data.message,
        });
      },
      fail: function (res) {
        console.log(res);
        callBack({
          removeStatus: -1,
          message: res.data.message,
        });
      },
      complete: function (res) { }
    })
  }
}

module.exports = {
  addStudentIntoBlackList: addStudentIntoBlackList,
  removeStudentFromBlackList: removeStudentFromBlackList,
  queryBlackList: queryBlackList,
}