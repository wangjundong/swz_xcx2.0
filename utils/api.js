// 测试环境&生成环境标识符
const md5 = require('md5');
const CusBase64 = require('base64');
var env = 1;
var params = {};

if (env == 1)
  params = {
    appId: 'wx84489af999ead998',
    secret: 'c47db38c667ec8d03b1455f6e2645b2b',
    uri: 'https://swz.production.wjdv.cn/?s=',
    getTheme: 'App.SwzXcx_v2_Other.GetTheme',
    getOrderList: 'App.SwzXcx_v1_Wechat.GetOrderList',
    getOpenidByCode:'App.SwzXcx_v1_Wechat.GetOpenid',
    authLogin: 'App.SwzXcx_v1_Member.AuthLogin',
    getNation: 'App.SwzXcx_v1_Nation.GetNationList',
    getPhoneNumber: 'App.SwzXcx_v1_Wechat.GetPhoneNumber'
  };
else
  params = {
    appId: 'wx84489af999ead998',
    secret: 'c47db38c667ec8d03b1455f6e2645b2b',
    uri: 'https://swz.production.wjdv.cn/?s=',
    getTheme: 'App.SwzXcx_v2_Other.GetTheme',
    getOrderList: 'App.SwzXcx_v1_Wechat.GetOrderList',
    getOpenidByCode: 'App.SwzXcx_v1_Wechat.GetOpenid',
    authLogin: 'App.SwzXcx_v1_Member.AuthLogin',
    getNation: 'App.SwzXcx_v1_Nation.GetNationList',
    getPhoneNumber: 'App.SwzXcx_v1_Wechat.GetPhoneNumber'
  };

function sortApi(obj, timestamp) {

  // 字典法排序
  let data = {};
  let base64_url = "";
  let res = Object.keys(obj).sort();
  for (var key in res) {
    // console.log("key: " + res[key] + " ,value: " + obj[res[key]]);
    if (obj[res[key]] == null || obj[res[key]] == undefined || (obj[res[key]] == "" && obj[res[key]]!=0))
      continue;
    data[res[key]] = obj[res[key]];
    base64_url += res[key] + "=" + obj[res[key]] + "&";
  }
  // console.log('url:'+base64_url);
  // 去掉右边的&
  base64_url = base64_url.replace(/&$/gi, '');
  // base64
  // base64_url = new Buffer(base64_url).toString('base64')
  base64_url = CusBase64.CusBASE64.encoder(base64_url);
  // console.log(data);
  // console.log('base64:'+base64_url);
  // 第一次md5
  let data_md5_1 = md5.hexMD5(base64_url);
  // console.log('md51:' + data_md5_1)
  // 第二次md5
  let data_md5_2 = md5.hexMD5(data_md5_1 + timestamp);
  // console.log('md52:' + data_md5_2)
  data.sign = data_md5_2;
  data.timestamp = timestamp;
  let param = JSON.stringify(data);
  // console.log(param)
  return {
    param: param
  };

}
// 当前时间戳
function getTimestamp() {
  //获取当前时间戳  
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  return timestamp;
}
module.exports = {
  params: params,
  sortApi: sortApi,
  getTimestamp: getTimestamp
}