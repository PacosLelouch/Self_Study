// pages/CheckInPage/CheckInPage.js
const CheckInController = require("../../controllers/CheckInAndOutController.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCode: {
      text: '扫码签到',
      notValidMsg: '扫码失败',
    },
    scanCodeValidity: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  scanCode: function (e) {
    var that = this;
    console.log(e);
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        console.log(res);
        CheckInController.checkIn(res.result,that.showResult);
      },
      fail: function (res) {
        that.setData({
          scanCodeValidity: false,
        });
      }
    });
  },
  showResult: function (res) {
    var that = this;
    if (res.checkStatus == 0) {
      wx.showToast({
        title: '签到成功',
      })
    }
    else if (res.checkStatus == 1) {
      wx.showToast({
        icon: 'none',
        title: '错误，该预约不存在',
      })
    }
    else if (res.checkStatus == 2) {
      wx.showToast({
        icon: 'none',
        title: '错误，预约状态不可被修改',
      })
    }
    else if (res.checkStatus == 3) {
      wx.showToast({
        icon: 'none',
        title: '错误，非签到时间',
      })
    }
    else if (res.checkStatus == -1) {
      wx.showToast({
        icon: 'none',
        title: '未知错误',
      })
    }
  }
})