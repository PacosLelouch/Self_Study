// pages/StudentQueryPage/StudentQueryPage.js
const studentQueryController = require("../../controllers/StudentQueryController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wHeight: 0,
    thStyle: 'position: absolute;top: 0;left: 0;',
    leftThStyle: '',
    datesPro: [],
    dates: [],
    select: 0,
    row: [],
    column: [
      '08:00:00-10:00:00',
      '10:00:00-12:00:00',
      '12:00:00-14:00:00',
      '14:00:00-16:00:00',
      '16:00:00-18:00:00',
      '18:00:00-20:00:00',
      '20:00:00-22:00:00',
    ],
    grid: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      this.setData({
        datesPro: [0, 1, 2, 3, 4, 5, 6].map((value, index, array) => {
          var date = new Date();
          date.setDate(date.getDate() + value);
          return date;
        }),
        wHeight: wx.getStorageSync('wHeight'),
      });
    } catch (e) {
      console.log("Fail to load student query page.");
      console.log(e);
    }
    this.setData({
      dates: this.data.datesPro.map((value, index, array) => {
        return value.toDateString();
      }),
    });
    this.query();
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
  inputDate: function (e) {
    this.setData({
      select: e.detail.value,
    });
    this.query();
  },
  query: function () {
    var date = this.data.datesPro[this.data.select];
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');
    studentQueryController.queryRoom(this);
    studentQueryController.queryOrder(this, dateString);
  },
  order: function (e) {
    console.log(e);
    var index = parseInt(e.currentTarget.id);
  },
})