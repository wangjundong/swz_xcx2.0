//获取应用实例
var app = getApp();
var apiParams = require('../../utils/api.js')
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    time: 5,
    timer: '',
    title: '书丸子·AI语测',
    imgUrl: ''
  },
  onLoad: function() {
    // 动态设置页面title
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
    
  },
  onShow: function() {
    let that = this
    that.data.time = 5;
    // 获取当前主题
    that.getTheme();
    // let userInfo = wx.getStorageSync('userInfo')
    // if (!userInfo) {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //       })
    //     }
    //   })
    // } else {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // }
  },
  onReady: function() {
    var that = this;
    // 1s后不显示加载动效
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    // 倒计时展示启动图
    that.data.timer = setInterval(function(){
      if(that.data.time>=1)
        that.data.time -= 1;
      that.setData({time:that.data.time});
      if (that.data.time==0){
        that.goToIndex();
      }
    },1000);
  },
  // 跳转到首页
  goToIndex: function () {
    clearInterval(this.data.timer);
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  // 获取当期主题
  getTheme: function(){
    let that = this;
    wx.request({
      url: apiParams.params.uri + apiParams.params.getTheme,
      method: 'POST',
      success: function(res){
        console.log(res);
        if(res.data.ret == 200){
          that.setData({ imgUrl: res.data.data.url});
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            mask: true
          })
        }
      }
    })
  },
});