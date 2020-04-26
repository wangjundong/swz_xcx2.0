// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    nation: ['汉族', '傣族', '彝族', '汉族', '傣族', '彝族','汉族', '傣族', '彝族'],
    sex:['男','女'],
    birthday_val: {},
    nation_val: {},
    sex_val: {},
    back: true,
    camera: false,
    src: ''
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
  pickerChange: function(e){
    let that = this;
    console.log(e);
    // 获取picker选择器
    let who = e.target.id;
    // 获取选中值
    let val = e.detail.value;
    if(who=='birthday')
      that.setData({birthday_val: {show:val,form:val}});
    else if(who=='nation')
      that.setData({ nation_val: { show: '汉族', form: val } });
    else if(who=='sex')
      that.setData({ sex_val: { show: '女', form: val } });
  },
  // 调起拍照组件
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        this.setData({
          src: res.tempImagePath
        })
        this.setData({camera: !this.data.camera});
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  // 切换前后摄像头
  reback: function(){
    this.setData({back:!this.data.back});
  },
  photo: function(){
    this.setData({camera: true});
  }
})