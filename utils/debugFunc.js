// debugFunc.js
// for debugging without server.
//const isDebug = true;
const isDebug = false;
const md5 = require("../controllers/MD5.js");
const stateList = [
  '待使用',
  '使用中',
  '已过期',
  '已取消',
];
const timeList = [
  '08:00:00',
  '10:00:00',
  '12:00:00',
  '14:00:00',
  '16:00:00',
  '18:00:00',
  '20:00:00',
  '22:00:00',
];

var roomsDebug = [{
  roomId: 1,
  roomName: '图书馆',
  capacity: 400,
  socketCapacity: 20,
}, {
  romId: 2,
  roomName: '公教楼D102',
  capacity: 150,
  socketCapacity: 3,
}, {
  roomId: 3,
  roomName: '公教楼D103',
  capacity: 150,
  socketCapacity: 3,
}, {
  roomId: 4,
  roomName: '公教楼D104',
  capacity: 150,
  socketCapacity: 3,
}];

var orderRecordsDebug = [{
  orderId: '1',
  id: '12345678',
  date: getDateAfterNDays(0),
  roomId: 3,
  timeNumber: 6,
  state: 0,
  useSocket: false,
}, {
  orderId: '1234',
  id: '12345678',
  date: getDateAfterNDays(2),
  roomId: 2,
  timeNumber: 0,
  state: 0,
  useSocket: true,
}, {
  orderId: '1235',
  id: '12345678',
  date: getDateAfterNDays(2),
  roomId: 2,
  timeNumber: 1,
  state: 0,
  useSocket: false,
}, {
  orderId: '12450',
  id: '12345678',
  date: getDateAfterNDays(6),
  location: '图书馆',
  timeNumber: 6,
  state: 0,
  useSocket: true,
}, {
  orderId: '1236',
  id: '12344321',
  date: getDateAfterNDays(2),
  location: '公教楼D102',
  timeNumber: 3,
  state: 0,
  useSocket: false,
}, {
  orderId: '12444',
  id: '12344321',
  date: getDateAfterNDays(5),
  location: '公教楼D103',
  timeNumber: 5,
  state: 0,
  useSocket: true,
}, {
  orderId: '12445',
  id: '12344321',
  date: getDateAfterNDays(5),
  location: '公教楼D104',
  timeNumber: 6,
  state: 1,
  useSocket: true,
}];

var orderRoomsDebug = getOrderRooms(roomsDebug, orderRecordsDebug);

var studentsDebug = [{
  accountId: 1,
  name: '12345678',
  password: md5.encode('abc123'),
  inBlackList: false,
}];

var adminsDebug = [{
  accountId: 1,
  name: '87654321',
  password: md5.encode('abc123'),//未加密
}];

function getOrderRooms(rooms, orderRecords){
  var ans = [];
  for(var i = 0; i < 7; ++i){
    ans.push([]);
    for(var j = 0; j < rooms.length; ++j){
      /*ans[ans.length - 1].push([]);*/
      var room = rooms[j];
      for(var k = 0; k < timeList.length - 1; ++k){
        var orderRoom = {
          roomName: room.roomName,
          date: getDateAfterNDays(i),
          timeNumber: k,
          numberOfOrder: 0,
          numberOfOrderedSocket: 0,
        }
        orderRoom.numberOfOrder = orderRecords.filter((value, index, array) => {
          return value.location == orderRoom.roomName &&
            value.date == orderRoom.date &&
            value.timeNumber == orderRoom.timeNumber &&
            (value.state == 0 || value.state == 1);
        }).length;
        orderRoom.numberOfOrderedSocket = orderRecords.filter((value, index, array) => {
          return value.location == orderRoom.roomName &&
            value.date == orderRoom.date &&
            value.timeNumber == orderRoom.timeNumber &&
            (value.state == 0 || value.state == 1) &&
            value.useSocket == true;
        }).length;
        ans[ans.length - 1]/*[ans[ans.length - 1].length - 1]*/.push(orderRoom);
      }
    }
  }
  return ans;
}

function getDateAfterNDays(n){
  var date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate() + n].map(n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join('-');
}

const addStudentDebug = (name, password) => {
  var isNew = studentsDebug.every((value, index, array) => {
    //console.log('value.name:' + value.name + ', name:' + name + ', ' + (value.name != name).toString());
    return value.name != name;
  });
    //(name == '12344321' && password == 'abc123');//就加这一个
  if(isNew == false){
    return 1;
  }
  studentsDebug.push({
    name: name,
    password: password,
    inBlackList: false,
  });
  console.log(studentsDebug);
  return 0;
}

const studentLoginDebug = (name, password) => {
  var student = studentsDebug.find((value, index, array) => {
    return value.name == name;
  });
  if (student == undefined) {
    return 1;
  }
  if (student.password != password) {
    return 2;
  }
  return 0;
}

const adminLoginDebug = (name, password) => {
  var admin = adminsDebug.find((value, index, array) => {
    return value.name == name;
  });
  if (admin == undefined) {
    return 1;
  }
  if (admin.password != password) {
    return 2;
  }
  return 0;
}

const getStudentByIdDebug = (id) => {
  var student = studentsDebug.find((value, index, array) => { 
    return value.id == id; 
  });
  return {
    id: student.id,
    inBlackList: student.inBlackList ? '是' : '否',
  };
}

const getOrdersByStudentIdDebug = (id) => {
  var ordersOfThisStudent = [];
  orderRecordsDebug.forEach((value, index, array) => {
    if(value.id == id && value.state == 0){
      var newValue = {
        orderId: value.orderId,
        accountId: value.accountId,
        date: value.date,
        location: value.location,
        state: stateList[value.state],
        startTime: timeList[value.timeNumber],
        endTime: timeList[value.timeNumber + 1],
        useSocket: value.useSocket ? '是' : '否',
      };
      ordersOfThisStudent.push(newValue);
    }
  });
  return {
    orders: ordersOfThisStudent,
  };
}

const cancelOrderRecordDebug = (orderId) => {
  var cancelledOrder = orderRecordsDebug.find((value, index, array) => {
    return value.orderId == orderId;
  });
  if(cancelledOrder){
    cancelledOrder.state = 3;
    console.log(orderRecordsDebug);
    return true;
  }
  return false;
}

const getAllRoomsDebug = () => {
  return roomsDebug;
}

const getOrderRoomsByDateDebug = (date) => {
  return orderRoomsDebug.find((value, index, array) => {
    return value[0].date == date;
  });
}

const getOrderRoomsByDateAndTimeDebug = (date, timeNumber) => {
  return orderRoomsDebug.find((value, index, array) => {
    return value[0].date == date && value[0].timeNumber == timeNumber;
  });
}

module.exports = {
  isDebug: isDebug,
  addStudentDebug: addStudentDebug,
  studentLoginDebug: studentLoginDebug,
  adminLoginDebug: adminLoginDebug,
  getStudentByIdDebug: getStudentByIdDebug,
  getOrdersByStudentIdDebug: getOrdersByStudentIdDebug,
  cancelOrderRecordDebug: cancelOrderRecordDebug,
  getAllRoomsDebug: getAllRoomsDebug,
  getOrderRoomsByDateDebug: getOrderRoomsByDateDebug,
  getOrderRoomsByDateAndTimeDebug: getOrderRoomsByDateAndTimeDebug,
}