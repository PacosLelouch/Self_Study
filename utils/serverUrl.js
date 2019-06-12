const serverBaseUrl = "http://203.195.131.32:8080/";
module.exports = {
  register: {
    url: serverBaseUrl + "account/student/",
    method: 'POST',
  },
  studentLogin: {
    url: serverBaseUrl + "account/privilege/",
    method: 'POST',
  },
  adminLogin: {
    url: serverBaseUrl + "account/privilege/",
    method: 'POST',
  },
  studentInfo: {
    url: serverBaseUrl + "account/detail/",
    method: 'POST',
  },
  studentOrder: {
    url: serverBaseUrl + "order/list/",
    method: 'POST',
  },
  queryRoom: {
    url: serverBaseUrl + "location/list/",
    method: 'GET',
  },
  queryOrder: {
    url: serverBaseUrl + "order/listLoc/",
    method: 'POST',
  },
  orderRoom: {
    url: serverBaseUrl + "order/add/",
    method: 'POST',
  },
  cancelOrder: {
    url: serverBaseUrl + "order/delete/",
    method: 'POST',
  },
  queryOrderAdmin: {
    url: serverBaseUrl + "order/listAll/",
    method: 'GET',
  },
  queryBlackList: {
    url: serverBaseUrl + "blacklist/listAll/",
    method: 'GET',
  },
  blackListAdd: {
    url: serverBaseUrl + "blacklist/add/",
    method: 'POST',
  },
  blackListRemove: {
    url: serverBaseUrl + "blacklist/delete/",
    method: 'POST',
  },
  checkInAndOut: {
    url: serverBaseUrl + "order/changeState/",
    method: 'POST',
  },
  orderState: {
    url: serverBaseUrl + "order/changeState",
    method: 'POST',
  }
}