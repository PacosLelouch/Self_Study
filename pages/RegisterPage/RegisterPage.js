// pages/RegisterPage/RegisterPage.js
const registerController = require("../../controllers/RegisterController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "自习室预约系统",
    subtitle: "中山大学",
    loginPage: "../UsernameLoginPage/UsernameLoginPage",
    idNotValid: false,
    idStatus: 0,
    passwordNotValid: false,
    passwordNotConsistent: false,
    id: '',
    password: '',
    confirmPassword: '',
    register: {
      text: '注册',
    },
    inputId: {
      text: '请输入8位学号',
      notValidMsg: '学号不合法，只能为8位数字！',
      notNewMsg: '学号已存在！',
      notSucceedMsg: '未知错误！请检查网络情况！',
    },
    inputPassword: {
      text: '请输入密码',
      notValidMsg: '密码不合法，要求不少于6位字符，必须同时包含字母数字！',
    },
    inputConfirmPassword: {
      text: '请再次输入密码',
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
    console.log(id + ',' + password + ',' + confirmPassword);
    registerController.createStudent(id, password, confirmPassword, this.displayResult);
  },
  displayResult: function(returnData){
    console.log(returnData);
    this.setData(returnData);
    if(returnData.nameNotValid){
      wx.showModal({
        title: '错误',
        content: this.data.inputId.notValidMsg,
        showCancel: 'false'
      })
      return
    }
    if (returnData.nameStatus == 1){
      wx.showModal({
        title: '错误',
        content: this.data.inputId.notNewMsg,
        showCancel: 'false'
      })
      return
    }
    if (returnData.nameStatus == -1) {
      wx.showModal({
        title: '错误',
        content: this.data.inputId.notSucceedMsg,
        showCancel: 'false'
      })
      return
    }
    if (returnData.passwordNotValid) {
      wx.showModal({
        title: '错误',
        content: this.data.inputPassword.notValidMsg,
        showCancel: 'false'
      })
      return
    }
    if (returnData.passwordNotConsistent) {
      wx.showModal({
        title: '错误',
        content: this.data.inputConfirmPassword.notConsistentMsg,
        showCancel: 'false'
      })
      return
    }
    // for (var d in returnData) {
    //   if (returnData[d]) {
    //     return;
    //   }
    // }
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