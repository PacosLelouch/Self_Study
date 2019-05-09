// pages/UsernameLoginPage/UsernameLoginPage.js
const usernameLoginController = require("../../controllers/UsernameLoginController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomePage: "../WelcomePage/WelcomePage",
    idValidity: true,
    passwordValidity: true,
    loginValidity: true,
    id: '',
    password: '',
    type: 0,
    login: {
      text: '登录',
      notValidMsg: '登录失败，账号或密码不正确！',
    },
    inputId: {
      text: '输入学号（只能为8位数字）',
      notValidMsg: '学号不合法，只能为8位数字！',
      notNewMsg: '学号已存在！',
    },
    inputPassword: {
      text: '输入密码（>=6，字母数字）',
      notValidMsg: '密码不合法，要求不少于6位字符，必须只包含字母数字！',
    },
    inputType: {
      text: '类型',
      types: ['学生', '管理员'],
      typesNo: [0, 1],
    }
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
    var logined = wx.getStorage({
      key: 'logined',
    });
    if(logined == 'true'){
      let that = this;
      wx.reLaunch({
        url: that.data.welcomePage,
      });
    }
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
  
  inputId: function (e) {
    this.setData({
      id: e.detail.value,
    });
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },
  inputType: function (e) {
    this.setData({
      type: e.detail.value,
    });
  },
  login: function (e) {
    console.log("Login.");
    var id = this.data.id;
    var password = this.data.password;
    var type = this.data.type;
    console.log(id + ',' + password + ',' + type);
    usernameLoginController.login(this, id, password, type);
  },
  showResult: function (returnData) {
    this.setData(returnData);
    for (var d in returnData) {
      if (!returnData[d]) {
        return;
      }
    }
    //登录成功
    var that = this;
    wx.reLaunch({
      url: that.data.welcomePage,
    });
    showLoginSuccessInfo();
  }
})

function showLoginSuccessInfo(){
  wx.showToast({
    title: '登录成功。',
    icon: 'success',
    duration: 2000,
  });
}