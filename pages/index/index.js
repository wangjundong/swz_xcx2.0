//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabList: [{
      id: 1,
      name: "分类"
    },
    {
      id: 2,
      name: "推荐"
    },
    {
      id: 3,
      name: "精品"
    }, {
      id: 4,
      name: "直播"
    },
    {
      id: 5,
      name: "广播"
    },
    {
      id: 6,
      name: "其他"
    }
    ],

    host: getApp().globalData.baseUrl,
    carouselList: [{
      "id": "101",
      "img": "https://swz-mweb.oss-cn-beijing.aliyuncs.com/Uploads/image/%E4%BB%99%E4%BA%BA%E6%8E%8C.jpg",
      "title": "",
      "url": "https://www.baidu.com/"
    },
    {
      "id": "102",
      "img": "https://swz-mweb.oss-cn-beijing.aliyuncs.com/Uploads/image/%E6%A9%99%E5%AD%90.jpg ",
      "title": "百度翻译",
      "url": "https://fanyi.baidu.com/"
    },
    {
      "id": "103",
      "img": "https://swz-mweb.oss-cn-beijing.aliyuncs.com/Uploads/image/%E7%94%B7%E5%AD%A9.jpg",
      "title": "百度地图",
      "url": "https://map.baidu.com/"
    },
    {
      "id": "104",
      "img": "https://swz-mweb.oss-cn-beijing.aliyuncs.com/Uploads/image/%E7%94%B7%E5%AD%A9.jpg",
      "title": "简书是一个写博客的网站，挺好用的，可以试试看",
      "url": "https://www.jianshu.com/"
    }
    ],
  },
  onLoad: function (options) {
    //this.requestCarouselListData();//请求轮播图
  },
  //请求轮播图
  requestCarouselListData() {
    var that = this;//注意this指向性问题
    var urlStr = that.data.host + "/xjj/chome_carousel_list.json"; //请求连接注意替换（我用本地服务器模拟）
    console.log("请求轮播图：" + urlStr);
    wx.request({
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data.result);
        var resultArr = res.data.result;
        that.setData({
          carouselList: resultArr
        })
      }
    })
  },

  //点击了轮播图
  chomeCarouselClick: function (event) {
    var urlStr = event.currentTarget.dataset.url;
    console.log("点击了轮播图：" + urlStr);
    // wx.navigateTo({
    //   url: 'test?id=1'
    // })
  },
  // 页面跳转
  go: function (e) {
    let index = e.currentTarget.dataset['index'];
    let url = "";
    if (index == 1)
      url = "/pages/signup/signup";
    else if (index == 2)
      url = "/pages/credentials/credentials";
    else if (index == 3)
      url = "/pages/credentials/credentials";
    else if (index == 4)
      url = "/pages/certificate/certificate";
    else if (index == 5)
      url = "/pages/msg/msg";

    console.log(url);
    wx.navigateTo({
      url: url
    })
  },
})
