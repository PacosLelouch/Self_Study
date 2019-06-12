const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const queryRoom = (callBack) => {
  if(debugFunc.isDebug == true){
    var rooms = debugFunc.getAllRoomsDebug();
    console.log(rooms);
    callBack({
      queryRoomStatus: 0,
      roomList: rooms,
      message: '成功',
    });
  }
  else{
    var url = serverUrl.queryRoom.url
    wx.request({
      url: url,
      data: { },
      header: { 'content-type': 'application/json', },
      method: serverUrl.queryRoom.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var queryRoomStatus = 0;
        if (res.data.status == 'OK') {
          queryRoomStatus = 0;
        } else {
          queryRoomStatus = -1;
        }
        callBack({
          queryRoomStatus: queryRoomStatus,
          roomList: res.data.data,
          message: res.data.message,
        })
      },
      fail: function (res) {
        console.log(res);
        page.displayRoom({
          queryRoomStatus: -1,
          roomList: [],
          message: res.data.message,
        })
      },
      complete: function (res) {

      }
    });
  }
}

const queryOrder = (date, startTime, callBack) =>{
  if (debugFunc.isDebug == true) {/*
    var orderRooms = debugFunc.getOrderRoomsByDateAndTimeDebug(date, timeNumber);
    console.log(orderRooms);
    callBack({
      queryOrderStatus: 0,
      queryList: orderRooms,
      message: '成功',
    });*/
  }
  else {
    wx.request({
      url: serverUrl.queryOrder.url,
      data: { date: date, startTime: startTime },
      header: { 'content-type': 'application/json', },
      method: serverUrl.queryOrder.method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var queryOrderStatus = 0;
        if (res.data.status == null) {//null是OK
          queryOrderStatus = 0;
        } else if (res.data.status == 'BAD_REQUEST') {
          queryOrderStatus = 1;
        } else if (res.data.status == 'UNAUTHORIZED') {
          queryOrderStatus = 2;
        } else {
          queryOrderStatus = -1;
        }
        callBack({
          queryOrderStatus: queryOrderStatus,
          queryList: res.data.data,
          message: res.data.message,
        });
      },
      fail: function (res) {
        console.log(res); 
        page.displayRoom({
          queryOrderStatus: -1,
          queryList: res.data.data,
          message: res.data.message,
        });
      },
      complete: function (res) {

      }
    });
  }
}

module.exports = {
  queryRoom: queryRoom,
  queryOrder: queryOrder,
}