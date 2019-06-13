// pages/StudentQueryPage/StudentQueryPage.js
const studentQueryController = require("../../controllers/StudentQueryController.js");
const adminQueryController = require("../../controllers/AdminQueryController.js");
const blackListController = require("../../controllers/BlackListController.js");
const cancelOrderController = require("../../controllers/CancelController.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: '1',
    active : 0,
    stateName: ['已失效', '待使用', '已签到', '已签退'],
    wHeight: 0,
    thStyle: 'position: absolute;top: 0;left: 0;',
    leftThStyle: '',
    datesPro: [],
    dates: [],
    select: 0,
    select1: 0,
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
    location: [],
    locationName: [],
    select2: 0,
    queryStatus : 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //处理tabbar
    wx.setTabBarItem({
      index: 0,
      "pagePath": "pages/AdminQueryPage/AdminQueryPage",
      "text": "查询预约",
      "selectedIconPath": "res/Home.png",
      "iconPath": "res/Home.png"
    })
    wx.setTabBarItem({
      index: 1,
      "iconPath": "res/Info.png",
      "selectedIconPath": "res/Info.png",
      "pagePath": "pages/BlackListPage/BlackListPage",
      "text": "管理黑名单"
    })


    try {
      this.setData({
        datesPro: [-7,-6,-5,-4,-3,-2,-1, 0, 1, 2, 3, 4, 5, 6, 7].map((value, index, array) => {
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
    studentQueryController.queryRoom(this.setRoom);
    this.setData({
      dates: this.data.datesPro.map((value, index, array) => {
        return value.toDateString();
      }),
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

  onChange(event) {
    console.log(event.detail);
    if(event.detail == 1){
      wx.reLaunch({
        url: '../BlackListPage/BlackListPage',
      })
    }
  },
  onChange1(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  setRoom: function(res){
    var that = this;
    if(res.queryRoomStatus == -1){
      wx.showToast({
        title: '查询自习室错误',
      })
    }
    else{
      console.log(res.roomList);
      that.setData({
        location : res.roomList,
      })
      var temp = [];
      for(var v in res.roomList){
        temp.push(that.data.location[v].name);
      }
      that.setData({
        locationName: temp
      })
    }
  },
  inputDate: function (e) {
    this.setData({
      select: e.detail.value,
    });
    this.query();
  },
  inputTime: function (e) {
    this.setData({
      select1: e.detail.value,
    });
    this.query();
  },
  inputLocation: function(e){
    this.setData({
      select2: e.detail.value,
    });
    this.query();
  },
  query: function () {
    var date = this.data.datesPro[this.data.select];
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');
    var timeNumber = this.data.select1;
    console.log(this.data.location[this.data.select2].id, dateString, this.data.column[timeNumber].slice(0, 8));
    adminQueryController.queryOrder(this.data.location[this.data.select2].id, dateString, this.data.column[timeNumber].slice(0, 8),this.showRestlt);
  },
  showRestlt: function (e) {
    console.log(e);
    this.setData({
      queryStatus: e.queryOrderStatus,
      row: e.orderList
    })
  },
  cancelOrder: function(e){
    var that = this;
    var target = parseInt(e.currentTarget.id);
    var date = this.data.datesPro[this.data.select];
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');
    var timeNumber = this.data.select1;
    wx.showModal({
      title: '提示',
      content: '是否要取消该预约',
      success(res) {
        if (res.confirm) {
        cancelOrderController.cancelOrder(that.data.row[target].order_id, dateString, that.data.column[timeNumber].slice(0, 8), that.showResult3);
        } else if (res.cancel) {
        }
      }
    });
  },

  showResult3:function(res){
    console.log(res);
    var that = this;
    if (res.cancelStatus == 0) {
      wx.showToast({
        title: '取消预约成功',
      })
      that.query();
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
  },

  addToBlackList: function(e){
    console.log(e);
    var that = this;
    var target = parseInt(e.currentTarget.id);
    wx.showModal({
      title: '提示',
      content: '是否将该用户加入黑名单',
      success(res) {
        if (res.confirm) {
          blackListController.addStudentIntoBlackList(that.data.row[target].account_id, that.showResult2);
        } else if (res.cancel) {
        }
      }
    });
  },
  showResult2: function (res) {
    var that = this;
    if (res.addBlackListStatus == 0) {
      wx.showToast({
        title: '加入黑名单成功',
      })
      that.query();
    }
    else if (res.addBlackListStatus == 1) {
      wx.showToast({
        icon: 'none',
        title: '错误，用户名非法',
      })
    }
    else if (res.addBlackListStatus == 2) {
      wx.showToast({
        icon: 'none',
        title: '错误，用户已在黑名单中',
      })
    }
    else if (res.addBlackListStatus == 3) {
      wx.showToast({
        icon: 'none',
        title: '错误，用户不存在',
      })
    }
    else if (res.addBlackListStatus == -1) {
      wx.showToast({
        icon: 'none',
        title: '未知错误',
      })
    }
  }
})