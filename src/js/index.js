import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ajaxCommon } from './utils.js';

ajaxCommon()
  .then(function (res) {
    const { code, data } = res;
    if (code != 0) {
      return false;
    }
   
  })
  .catch(function (err) {
    console.log(err);
  });

$(function () {
  $.ajax({
    type: 'GET',
    url: '//a.xcar.com.cn/jssdk/wxsdk.php?url=' + encodeURIComponent(location.href.split('#')[0]),
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'flightHandler',
    success: function (json) {
      var c = JSON.parse(json);
      wx.config({
        debug: false,
        appId: c.appId,
        timestamp: c.timestamp,
        nonceStr: c.nonceStr,
        signature: c.signature,
        jsApiList: [
          'onMenuShareTimeline', //分享到朋友圈
          'onMenuShareAppMessage', //分享给朋友
          'hideMenuItems', //批量隐藏微信功能
          'showMenuItems', //批量显示微信功能
        ],
      });
      wx.ready(function () {
        const share_data = {
          title: '爱卡 春享·出游季', //分享信息的标题
          desc: '爱卡2022年春季电商节', //分享信息的描述
          link: '//zt.xcar.com.cn/x/m/202205/chunji_m/', //分享信息的链接
          imgUrl: '//img1.xcarimg.com/motonews/25007/25027/34573/20220509174123173847484293718.jpg',
        };
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        });
        wx.onMenuShareTimeline(share_data);
        wx.onMenuShareAppMessage(share_data);
      });
      wx.error(function (res) {
        console.log(res.errMsg);
      });
    },
    error: function () {},
  });
});
