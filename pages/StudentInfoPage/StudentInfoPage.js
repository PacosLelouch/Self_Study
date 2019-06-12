// pages/StudentInfoPage/StudentInfoPage.js
const studentInfoController = require("../../controllers/StudentInfoController.js");
const cancelController = require("../../controllers/CancelController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wHeight: 0,
    title: '个人信息',
    orders: [],
    accountId: '',
    inBlackList: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      this.setData({
        wHeight: wx.getStorageSync('wHeight'),
      })
      this.showStudentInfo();
    } catch (e) {
      console.log("Fail to show student info.");
      console.log(e);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showStudentInfo: function () {
    studentInfoController.getStudentInfo(this);
    studentInfoController.getOrders(this);
  },
  setStudent: function (student) {
    this.setData(student);
  },
  setOrders: function (orders) {
    this.setData(orders);
  },
  cancelOrderRecord: function (e) {
    //console.log(e);
    var index = parseInt(e.currentTarget.id);
    var data = this.data.orders[index];
    console.log(data);
    cancelController.cancelOrderRecord(this, data);
  }
})