// pages/agreement/agreement.js
var apiParams = require('../../utils/api.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: false,
    scroll_view_h: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ scroll_view_h: app.globalData.scroll_view_h });
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
  // 授权获取用户信息
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              let userInfo = res.userInfo;
              console.log(userInfo);
              console.log(userInfo.nickName);
              // 获取openid 
              let userId = JSON.parse(wx.getStorageSync('userInfo')) || '';
              console.log(userId);
              let data = {
                openid: userId.openid,
                unionid: userId.unionid,
                nickname: userInfo.nickName,
                avatar: userInfo.avatarUrl
              };
              // 服务器注册
              let timestamp = apiParams.getTimestamp();
              var param = apiParams.sortApi(data, timestamp);
              wx.request({
                url: apiParams.params.uri + apiParams.params.authLogin,
                method: 'POST',
                data: param,
                header: { "content-type": "application/x-www-form-urlencoded" },
                success: function(res){
                    console.log(res);
                    if(res.data.ret==200){
                      userId.uid = res.data.data.user_id;
                      userId.nickname = userInfo.nickName;
                      userId.avatar = userInfo.avatarUrl;
                      console.log(userId)
                      wx.setStorageSync('userInfo', userId );
                      wx.navigateBack();
                    }else{
                      console.log('注册失败')
                    }
                }
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      },
      fail(e){
          console.log(e)
      }
    })
  },
  // 取消勾选
  checkboxChange: function(res){
    let agree = !this.data.agree;
    this.setData({
      agree: agree
    });
    console.log(this.data.agree);
  }
})