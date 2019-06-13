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
    activeNames: '1',
    name: '',
    inBlackList: true,
    stateName: ['已失效','待使用','已签到','已签退'],
    cutDate: [],
    cutTimeS: [],
    cutTimeE: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      this.setData({
        wHeight: wx.getStorageSync('wHeight'),
      })

    } catch (e) {
      console.log("Fail to show student info.");
      console.log(e);
    }
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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
    this.showStudentInfo();
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

  showStudentInfo: function () {
    studentInfoController.getStudentInfo(this.setStudent);
    studentInfoController.getOrders(this.setOrders);
  },
  setStudent: function (student) {
    this.setData(student.info);
  },
  setOrders: function (orders) {
    console.log(orders)
    this.setData({orders:orders.orderList});
    var t1 = [];
    var t2 = [];
    var t3 = [];
    for (var v in orders.orderList){
      t1.push(orders.orderList[v].date.substring(5,10));
      t2.push(orders.orderList[v].startTime.substring(0,5));
      t3.push(orders.orderList[v].endTime.substring(0,5));
    }
    this.setData({cutDate:t1,cutTimeS:t2,cutTimeE:t3});
  },
  cancelOrderRecord: function (e) {
    console.log(e);
    var that = this;
    var index = parseInt(e.currentTarget.id);
    var data = this.data.orders[index];
    console.log(data);
    wx.showModal({
      title: '提示',
      content: '是否要取消该预约',
      success(res) {
        if (res.confirm) {
          cancelController.cancelOrder(data.order_id, data.date, data.startTime, that.showResult);
        } else if (res.cancel) {
        }
      }
    })

  },
  showResult: function(res) {
    var that = this;
    if (res.cancelStatus == 0) {
      wx.showToast({
        title: '取消预约成功',
      })
      that.showStudentInfo();
    }
    else if (res.cancelStatus == 1) {
      wx.showToast({
        icon: 'none',
        title: '错误，该预约不存在',
      })
    }
    else if (res.cancelStatus == 2) {
      wx.showToast({
        icon: 'none',
        title: '错误，超过可取消时间',
      })
    }
    else if (res.cancelStatus == -1) {
      wx.showToast({
        icon: 'none',
        title: '未知错误',
      })
    }
  }
})