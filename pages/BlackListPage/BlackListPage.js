// pages/BlackListPage/BlackListPage.js
const blackListController = require("../../controllers/BlackListController.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    wHeight: 0,
    thStyle: 'position: absolute;top: 0;left: 0;',
    leftThStyle: '',
    datesPro: [],
    dates: [],
    row: [],
    name: '',
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
    queryStatus: -1,
  },

  onChange(event) {
    console.log(event.detail);
    if (event.detail == 0) {
      wx.reLaunch({
        url: '../AdminQueryPage/AdminQueryPage',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var adminName = wx.getStorageSync('name');
    this.setData({
      name: adminName,
    });
    blackListController.queryBlackList(this.showResult);
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

  logout:function(e){
    wx.showModal({
      title: '提示',
      content: '是否要退出登录',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: '../WelcomePage/WelcomePage',
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  removeFromBlackList:function(e){
    //console.log(e);
    var that = this;
    var target = parseInt(e.currentTarget.id);
    wx.showModal({
      title: '提示',
      content: '是否将该用户移出黑名单',
      success(res) {
        if (res.confirm) {
          blackListController.removeStudentFromBlackList(that.data.row[target].account_id, that.showResult2);
        } else if (res.cancel) {
        }
      }
    });
  },

  showResult2: function (res) {
    if (res.removeStatus == 0) {
      wx.showToast({
        title: '移出黑名单成功',
      })
      blackListController.queryBlackList(this.showResult);
    }
    else if (res.removeStatus == 1) {
      wx.showToast({
        icon: 'none',
        title: '错误，用户名非法',
      })
    }
    else if (res.removeStatus == 2) {
      wx.showToast({
        icon: 'none',
        title: '错误，用户不存在',
      })
    }
    else if (res.removeStatusStatus == -1) {
      wx.showToast({
        icon: 'none',
        title: '未知错误',
      })
    }
  },

  showResult: function(e){
    console.log(e);
    if(e.queryStatus == -1){
      wx.showToast({
        icon: 'none',
        title: '未知错误'
      })
    }
    else{
      for(var r in e.blackList){
        e.blackList[r].startDate = e.blackList[r].startDate.substring(5,10);
      }
      this.setData({
        row: e.blackList,
        queryStatus: e.queryStatus
      })
    }
  }
})