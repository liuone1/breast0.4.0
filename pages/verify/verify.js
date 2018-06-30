var app = getApp()
var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
Page({
  data: {
    userInfodata: {},
    addressdata: {}
  },
  onLoad: function (optionsz, ) {
    var that = this
    var qqmapsdk = new QQMapWX({
      key: 'R3HBZ-KN6KG-NI5QK-IE3O4-76HFO-46BDO' // 必填
    });
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        that.setData({
          userInfodata: res.userInfo
        })
        console.log(1);
        wx.hideLoading();
        wx.getLocation({
          success: ({ latitude, longitude }) => {
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function (res) {
                console.log(res);
                that.setData({
                  addressdata: res.result
                })
                var ress = decodeURIComponent(optionsz.q)
                var orgcode = ress.split('?')
                console.log(orgcode);
                wx.request({
                  method: 'get',
                  url: 'https://www.1mum.cn/api/Public/v1/?service=Detect.CreateDetect',
                  data: {
                    openid: '072564555',
                    orgcode: orgcode[1],
                    detector: that.data.userInfodata.nickName,
                    location: that.data.addressdata.address,
                  },
                  success: function (res) {
                    wx.setStorage({
                      key: 'vcardData',
                      data: res.data.data,
                    })
                    wx.redirectTo({
                      url: '/pages/first/first' //页面跳转相对路径要写清楚且准确 
                    })
                  },
                  fail: function (err) {
                    console.log(err)
                  }
                })
              },
              fail: function (res) {
                console.log(res);
              },
              complete: function (res) {
                console.log(res);
              }
            });
          }
        })
      }
    })


  },
})