// components/alert.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type: String
    },
    fail: {
      type: Boolean
    },
    jump: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    closeAlt: function(){
      this.setData({msg:''});
      if(this.data.jump==true){
        console.log(11111);
        wx.switchTab({
          url: '/pages/center/center'
        })
      }
        
    }
  }
})
