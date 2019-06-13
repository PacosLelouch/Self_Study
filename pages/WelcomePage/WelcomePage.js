// pages/WelcomePage/WelcomePage.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "自习室预约系统",
    subtitle: "中山大学",
    logined: null,
    type: null,
    id: null,
    register: {
      url: "../RegisterPage/RegisterPage",
      text: "注册",
    },
    login: {
      url: "../UsernameLoginPage/UsernameLoginPage",
      text: "登录",
    },
    studentInfo: {
      url: "../StudentInfoPage/StudentInfoPage",
      text: "查询个人信息",
    },
    studentQuery: {
      url: "../StudentQueryPage/StudentQueryPage",
      text: "查询预约情况",
    },
    checkIn: {
      url: "../CheckInPage/CheckInPage",
      text: "签到",
    },
    checkOut: {
      url: "../CheckOutPage/CheckOutPage",
      text: "签退",
    },
    adminQuery: {
      url: "../AdminQueryPage/AdminQueryPage",
      text: "查询预约情况",
    },
    blackList: {
      url: "../BlackListPage/BlackListPage",
      text: "管理黑名单",
    },
    logout: {
      text: "注销",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      this.setData({
        logined: wx.getStorageSync('logined'),
        type: wx.getStorageSync('type'),
        id: wx.getStorageSync('id'),
      });
      const systemInfo = wx.getSystemInfoSync();
      wx.setStorageSync('wHeight', systemInfo.windowHeight);
      wx.setStorageSync('wWidth', systemInfo.windowWidth);
      console.log(this.data.logined);
      console.log(this.data.type);
      console.log(this.data.id);
    }
     catch (e) {
      console.log("Fail to load welcome page.");
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

  registerPage: function (e) {
    console.log("To registerPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.register.url,
    });
  },
  loginPage: function (e) {
    console.log("To loginPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.login.url,
    });
  },
  studentInfoPage: function (e){
    console.log("To studentInfoPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.studentInfo.url,
    })
  },
  studentQueryPage: function (e) {
    console.log("To studentQueryPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.studentQuery.url,
    })
  },
  checkInPage: function (e) {
    console.log("To checkInPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.checkIn.url,
    })
  },
  checkOutPage: function (e) {
    console.log("To checkOutPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.checkOut.url,
    })
  },
  adminQueryPage: function (e) {
    console.log("To adminQueryPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.adminQuery.url,
    });
  },
  blackListPage: function (e) {
    console.log("To blackListPage.");
    let that = this;
    wx.navigateTo({
      url: that.data.blackList.url,
    });
  },

  logout: function (e) {
    try{
      wx.removeStorageSync('logined');
      wx.removeStorageSync('type');
      wx.removeStorageSync('id');
      wx.redirectTo({
        url: '../WelcomePage/WelcomePage',
      });
      showLogoutSuccessInfo();
    }
    catch (e) {
      console.log('Logout Error.');
      console.log(e.toString());
      showLogoutFailInfo();
    }
  },
})

function showLogoutSuccessInfo() {
  wx.showToast({
    title: '注销成功。',
    icon: 'success',
    duration: 2000,
  });
}
function showLogoutFailInfo() {
  wx.showToast({
    title: '注销失败。',
    icon: 'loading',
    duration: 2000,
  });
}