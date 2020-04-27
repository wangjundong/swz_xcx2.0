// pages/center/center.js
//获取应用实例
var app = getApp();
var apiParams = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     avatar: '', 
     url: '',
     userinfo: '',
     isLogin: false,
     fail: true,
     msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 随机一个头像
    var avatarList = ["/static/center/avatar1.png", "/static/center/avatar2.png"];
    this.setData({ avatar: avatarList[Math.floor(Math.random() * avatarList.length)]});
    // 登录
    this.login();
    wx.getSystemInfo({
      success: function (res) {
        app.globalData.windowWidth = res.windowWidth;
        app.globalData.windowHeight = res.windowHeight; // ip6  555  ipx  642   xr&xsp  726 
        if (res.windowHeight > 555 && res.windowHeight < 642) 
          app.globalData.scroll_view_h = 1200;
        else if (res.windowHeight >= 642)
          app.globalData.scroll_view_h = 1150;
       
      },
    })
    console.log(app.globalData.windowHeight);
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
    // 获取用户信息
    let userInfo = wx.getStorageSync('userInfo')||'';
    console.log(userInfo);
    if(userInfo&&userInfo.uid){
      this.setData({ userinfo: userInfo });
      this.setData({ isLogin: true });
      this.setData({ avatar: userInfo.avatar});
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
  // 页面跳转
  go: function(e){
    let index = e.currentTarget.dataset['index'];
    let url = "";
    if(index==1)
      url = "/pages/order/order";
    else if(index==2)
      url = "/pages/credentials/credentials";
    else if(index==3)
      url = "/pages/credentials/credentials";
    else if(index==4)
      url = "/pages/certificate/certificate";
    else if (index == 5)
      url = "/pages/msg/msg";

    console.log(url);
    wx.navigateTo({
      url: url
    })
  },
  
  login: function(){
    let that = this;
    wx.login({
      success(res) {
        console.log(res);
        if(res.code){
          // 通过code换取openid
          let timestamp = apiParams.getTimestamp();
          var param = apiParams.sortApi({ appid: apiParams.params.appId, secret: apiParams.params.secret, js_code: res.code}, timestamp);
          // 没有数据缓存则取换取用户openid unionid
          let userId = wx.getStorageSync('userInfo') || '';
          console.log(userId);
          if (!userId){
            wx.request({
              url: apiParams.params.uri + apiParams.params.getOpenidByCode,
              data: param,
              method: 'POST',
              header: { "content-type": "application/x-www-form-urlencoded" },
              success: (e) => {
                console.log(e);
                console.log(e.data.data);
                if (e.data.ret == 200) {
                  wx.setStorageSync('userInfo', JSON.stringify(e.data.data))
                } else {
                  that.setData({ msg:"获取openid失败！"});
                }
              }
            })
          }
            

        }else{
          that.setData({ msg: "登录失败" });
        }
      }
    })
  },
  // 跳转到用户须知
  authLogin: function(){
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
  }
})