// pages/RegisterPage/RegisterPage.js
const registerController = require("../../controllers/RegisterController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginPage: "../UsernameLoginPage/UsernameLoginPage",
    idValidity: true,
    idNew: true,
    passwordValidity: true,
    passwordConsistency: true,
    id: '',
    password: '',
    confirmPassword: '',
    register: {
      text: '注册',
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
    inputConfirmPassword: {
      text: '再次输入密码',
      notConsistentMsg: '密码不一致！',
    },
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
  inputConfirmPassword: function (e) {
    this.setData({
      confirmPassword: e.detail.value,
    });
  },
  register: function (e) {
    var id = this.data.id;
    var password = this.data.password;
    var confirmPassword = this.data.confirmPassword;
    //console.log(id + ',' + password + ',' + confirmPassword);
    registerController.createStudent(this, id, password, confirmPassword);
  },
  displayResult: function(returnData){
    this.setData(returnData);
    for (var d in returnData) {
      if (!returnData[d]) {
        return;
      }
    }
    //注册成功
    showSuccess(this);
  }
});

function showSuccess (page) {
  var loginPage = page.data.loginPage;
  wx.showModal({
    title: '注册成功',
    content: '注册成功，请牢记用户名和密码！\n点击确定跳转到登录界面',
    success: function (res) {
      if (res.confirm) {//这里是点击了确定以后
        console.log('confirm');
        wx.redirectTo({
          url: loginPage,
        })
      }
      else {//这里是点击了取消以后
        console.log('cancel');
      }
    }
  });
}