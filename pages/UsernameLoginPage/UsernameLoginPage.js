// pages/UsernameLoginPage/UsernameLoginPage.js
const usernameLoginController = require("../../controllers/UsernameLoginController.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomePage: "../WelcomePage/WelcomePage",
    queryPage: "../StudentQueryPage/StudentQueryPage",
    adminPage: "../AdminQueryPage/AdminQueryPage",
    title: "自习室预约系统",
    subtitle: "中山大学",
    nameValidity: true,
    passwordValidity: true,
    loginValidity: true,
    id: '',
    select : 0,
    password: '',
    type: 0,
    login: {
      text: '登录',
      idNotValidMsg: '登录失败，用户名不存在！',
      passwordNotValidMsg: '登录失败，密码不正确！',
      notSucceedMsg: '登录失败，请检查网络情况！',
    },
    inputId: {
      text: '请输入8位学号',
      notValidMsg: '学号不合法，只能为8位数字！',
      notNewMsg: '学号已存在！',
    },
    inputPassword: {
      text: '请输入密码',
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
      select: e.detail.value,
    });
  },
  login: function (e) {
    console.log("Login.");
    var name = this.data.id;
    var password = this.data.password;
    var type = this.data.select;
    console.log(name + ',' + password + ',' + type);
    usernameLoginController.login(name, password, type, this.showResult);
  },
  showResult: function (returnData) {
    this.setData(returnData);
    console.log(returnData);
    if (returnData.idNotValid) {
      wx.showModal({
        title: '错误',
        content: this.data.inputId.notValidMsg,
        showCancel: 'false'
      });
    }
    else if (returnData.loginStatus == 1) {
      wx.showModal({
        title: '错误',
        content: this.data.login.idNotValidMsg,
        showCancel: 'false'
      });
    }
    else if (returnData.loginStatus == 2) {
      wx.showModal({
        title: '错误',
        content: this.data.login.passwordNotValidMsg,
        showCancel: 'false'
      });
    }
    else if (returnData.loginStatus == -1) {
      wx.showModal({
        title: '错误',
        content: this.data.login.notSucceedValidMsg,
        showCancel: 'false'
      });
    }
    else if (returnData.passwordNotValid) {
      wx.showModal({
        title: '错误',
        content: this.data.inputPassword.notValidMsg,
        showCancel: 'false'
      });
    }
    //登录成功
    else{
      try{
        var temptype = wx.getStorageSync('type');
      }
      catch(e){
        console.log(e);
      }
      var that = this;
      console.log(temptype);
      if(temptype == 0){
        wx.reLaunch({
          url: that.data.queryPage,
        });
        showLoginSuccessInfo();
      }
      else if(temptype == 1){
        wx.reLaunch({
          url: that.data.adminPage,
        });
        showLoginSuccessInfo();
      }
    }
  }
})

function showLoginSuccessInfo(){
  wx.showToast({
    title: '登录成功。',
    icon: 'success',
    duration: 2000,
  });
}