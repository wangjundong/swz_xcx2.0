// pages/signup/signup.js
var apiParams = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    nation: ['汉族', '傣族', '彝族', '汉族', '傣族', '彝族','汉族', '傣族', '彝族'],
    nation_list: [],
    sex:['男','女'],
    relationship:['爸爸','妈妈'],
    birthday_val: {},
    nation_val: {},
    sex_val: {},
    relationship_val:{},
    back: true,
    camera: false,
    src: '',
    fail: true,
    msg: '',
    jump: false,
    userInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取民族
      this.getNation();
      let userInfo = wx.getStorageSync('userInfo') || '';
      this.setData({ userInfo: userInfo});
      if(!userInfo||!userInfo.uid){
        this.setData({msg:'请先授权登录！'});
        this.setData({ jump: true });
      }

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
  // 获取民族
  getNation: function(){
    let that = this;
    wx.request({
      url: apiParams.params.uri + apiParams.params.getNation,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.ret == 200) {
          that.setData({ nation_list: res.data.data });
            let nation = [];
            res.data.data.map(x=>{
                nation.push(x.nation);
            });
          that.setData({nation:nation});
        } else {
           that.setData({ msg: '数据获取失败！' });
        }
      }
    })
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
    else if(who=='nation'){
      Object.keys(that.data.nation_list).find((k)=>{
         if(k==val){
           console.log(that.data.nation_list[k].nation);
           let nation = that.data.nation_list[k].nation;
           that.setData({ nation_val: { show: nation, form: nation } }); 
         }
      });
      
    }else if(who=='sex'){
      let sex = val==0 ? '男' : '女';
      that.setData({ sex_val: { show: sex, form: sex } });
    }else if (who =='relationship'){
      let relationship = val==0? '爸爸' : '妈妈';
      that.setData({ relationship_val: { show: relationship, form: relationship } });
    }
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
  },
  // 取消
  cancel: function(){
    wx.showModal({
      title: '提示',
      content: '确定取消孩子报名吗？',
      success(res) {
        if (res.confirm) {
          wx.navigateBack();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  next: function(){
      wx.navigateTo({
        url: '/pages/sign2up/sign2up',
      })
  },
  // 输入框失去焦点触发
  val: function(e){
    console.log(e);
    let index = e.currentTarget.dataset['index'];
    let value = e.detail.value;
    console.log(index,value);
  },
  // 获取手机号
  getPhoneNumber: function(e){
    console.log(e);
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    let code = 1;
  }
})