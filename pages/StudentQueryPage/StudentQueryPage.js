// pages/StudentQueryPage/StudentQueryPage.js
const studentQueryController = require("../../controllers/StudentQueryController.js");
const orderRoomController = require("../../controllers/OrderRoomController.js");
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
    select1: 0,
    needSocket : false, //需要插座为0 不需要为1
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
    orderStatus: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      this.setData({
        datesPro: [1, 2, 3, 4, 5, 6, 7].map((value, index, array) => {
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
  inputTime: function(e){
    this.setData({
      select1: e.detail.value,
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
    studentQueryController.queryOrder(dateString, this.data.column[timeNumber].slice(0, 8),this.setSomething);
    
    console.log(dateString, this.data.column[timeNumber].slice(0, 8),this.data.grid);
    // var temp = [];
    // for(var v in this.data.row){
    //   for(var k in this.data.grid){
    //     if(this.data.row[v].name == this.data.grid[k].location_name)
    //       temp.push(this.data.grid[k]);
    //   }
    // }
  },
  setSomething: function (res){
    console.log(res.queryList);
    this.setData({
      orderStatus: res.queryOrderStatus,
      grid: res.queryList,
    })
  },
  askIfNeedSocket: function(e){
    var that = this;
    wx.showActionSheet({
      itemList: ["需要插座", "不需要插座", "取消"],
      success(res) {
        console.log(res.tapIndex);
        if(res.tapIndex==0){
          that.setData({
            needSocket: true,
          });
          that.order(e);
        }
        if (res.tapIndex == 1) {
          that.setData({
            needSocket: false,
          });
          that.order(e);
        }
      },
      fail(res) {
        console.log(res.errMsg)
      },
    })
  },
  order: function (e) {
    console.log(e);
    var index = parseInt(e.currentTarget.id);
    var toOrder = this.data.grid[index];
    var date = this.data.datesPro[this.data.select];
    var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }).join('-');
    var toDate = dateString;
    var timeNumber = this.data.select1;
    var toStartTime = this.data.column[timeNumber].slice(0, 8);
    
    orderRoomController.orderRoom(toDate, toStartTime, toOrder.location_id, this.data.needSocket, this.showResult);
  },
  showResult:function(res){
    var that = this;
    if (res.orderStatus == 0){
      wx.showToast({
        title: '预约成功',
      })
      that.query();
    }
    else if(res.orderStatus == 1){
      wx.showToast({
        icon: 'none',
        title: '错误，用户不存在',
      })
    }
    else if(res.orderStatus == 2){
      wx.showToast({
        icon: 'none',
        title: '错误，用户处于黑名单中',
      })
    }
    else if(res.orderStatus == 3){
      wx.showToast({
        icon: 'none',
        title: '日期格式错误',
      })
    }
    else if (res.orderStatus == 4) {
      wx.showToast({
        icon: 'none',
        title: '日期时间段段地点组合错误',
      })
    }
    else if (res.orderStatus == 5) {
      wx.showToast({
        icon: 'none',
        title: '预约失败，已有相同预约，或预约已满，或插座数已满',
      })
    }
    else if (res.orderStatus == -1) {
      wx.showToast({
        icon: 'none',
        title: '未知错误',
      })
    }
  }
})