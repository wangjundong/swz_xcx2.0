// pages/mymessage/mymessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_data: [{
        content: "来看待就是垃圾的垃圾到sasa大萨达多大萨达大多撒多的的撒割发代首改是了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到了",
        time: "2020年4月23日 10:12"
      },
      {
        content: "来看待就是垃圾的垃圾到哒哒哒哒所大师的法案的说法了",
        time: "2020年4月23日 10:12"
      }
    ],
    windowH: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
    success: function(res) {
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      that.setData({
          windowH:res.windowHeight-20
        });
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
    }
    })
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

  }
})