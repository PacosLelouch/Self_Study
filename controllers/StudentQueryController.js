const serverUrl = require("../utils/serverUrl.js");
const debugFunc = require("../utils/debugFunc.js");

const queryRoom = (page) => {
  if(debugFunc.isDebug == true){
    var rooms = debugFunc.getAllRoomsDebug();
    console.log();
    page.setData({
      row: rooms,
    });
  }
  else{

  }
}

const queryOrder = (page, date, timeNumber) =>{
  if (debugFunc.isDebug == true) {
    var orderRooms = debugFunc.getOrderRoomsByDateAndTimeDebug(date, timeNumber);
    console.log(orderRooms);
    page.setData({
      grid: orderRooms,
    });
  }
  else {
    //TODO
  }
}

//Obsolete
const queryOrderObsolete = (page, date) =>{
  if(debugFunc.isDebug == true){
    var orderRooms = debugFunc.getOrderRoomsByDateDebug(date);
    console.log(orderRooms);
    /*for(var i = 0; i < orderRooms.length; ++i){
      orderRooms[i] = {i: orderRooms[i]};
    }*/
    page.setData({
      grid: orderRooms,
    });
  }
  else{

  }
}

module.exports = {
  queryRoom: queryRoom,
  queryOrder: queryOrder,
}