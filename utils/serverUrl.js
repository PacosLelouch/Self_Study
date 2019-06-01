const serverBaseUrl = "http://203.195.131.32:8081/";
module.exports = {
  register: {
    url: serverBaseUrl + "student/",
    method: 'POST',
  },
  studentLogin: {
    url: serverBaseUrl + "privilege/student/",
    method: 'GET',
  },
  adminLogin: {
    url: serverBaseUrl + "admin/privilege/",
    method: 'GET',
  },
  studentInfo: {
    url: serverBaseUrl + "student/info/",
    method: 'GET',
  },
  orders: {
    url: serverBaseUrl + "orders/",
    method: 'GET',
  },
  order: {
    url: serverBaseUrl + "order/",
    method: 'GET',
  },
}