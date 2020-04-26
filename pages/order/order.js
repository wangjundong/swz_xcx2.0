// pages/order/order.js
var app = getApp();
var apiParams = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textClick1: true,
    textClick2: false,
    currentIndex: 0,
    orderList: [],
    scroll_view_h: 1040,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取支付订单数据
    this.getData();
    this.setData({ scroll_view_h: app.globalData.scroll_view_h});
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
  // 获取订单信息
  getOrder:  function(e){
    let index = e.currentTarget.dataset['index'];
    if(index==0)
      this.setData({ currentIndex: 0 });
    else
      this.setData({ currentIndex: 1 });
    this.getData();
  },
  touchStart: function (e) {
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchMove: function (e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchEnd: function (e) {
    let start = this.data.touchS ? this.data.touchS : 0;
    let end = this.data.touchE ? this.data.touchE : 0;
    console.log(start)
    console.log(end)
    if (start[0] < end[0] - 50) {
      console.log('右滑')
      this.setData({ currentIndex: 1 });
    } else if (start[0] > end[0] + 50) {
      console.log('左滑')
      this.setData({ currentIndex: 0 });
    } else {
      console.log('静止')
    }
  },
  // 页面初始化获取未支付订单
  getData: function(){
    let that = this;
    let timestamp = apiParams.getTimestamp();
    var param = apiParams.sortApi({ user_id: 100174, is_pay: that.data.currentIndex }, timestamp);
    console.log(param);
    wx.request({
      url: apiParams.params.uri + apiParams.params.getOrderList,
      data: param,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res){
          if(res.data.ret==200){
            that.setData({ orderList: res.data.data});
            console.log(that.data.orderList);
          }else{
            wx.showToast({
              title: '数据获取失败，请重试！',
              mask: true,
              icon: 'none',
              duration: 2000
            })
          }
      }
    })
  }
})