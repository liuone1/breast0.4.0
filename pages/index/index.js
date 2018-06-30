var app = getApp()
var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
Page({
  data: {
    userInfodata: {},
    addressdata: {},
    check: '',
  },
  onLoad: function() {
    var that = this
    var qqmapsdk = new QQMapWX({
      key: 'R3HBZ-KN6KG-NI5QK-IE3O4-76HFO-46BDO' // 必填
    });
    console.log(app, 'app')
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          userInfodata: res.userInfo
        })
        console.log(userInfo)
        console.log(city)
        console.log(nickName)
        wx.hideLoading();
      }
    })

    wx.getLocation({
      success: ({
        latitude,
        longitude
      }) => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            console.log(res);
            that.setData({
              addressdata: res.result
            })
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      }
    })
  },
  logIn: function() {
    var that = this
    wx.getStorage({
      key: 'openIdData',
      success: function(res) {
        var openid = res.data;
        wx.scanCode({
          success: (res) => {
            var ress = res.result
            var orgcode = ress.split('?')
            let check = orgcode[0]
            if (check != 'http://www.1mum.cn/rc.html') {
              wx.showToast({
                title: '二维码错误',
                image: '../../img/130.png',
                duration: 1000
              })
              return false;
            }
            console.log(check)
            wx.request({
              method: 'get',
              url: 'https://www.1mum.cn/api/Public/v1/?service=Detect.CreateDetect',
              data: {
                openid: openid,
                orgcode: orgcode[1],
                detector: that.data.userInfodata.nickName,
                location: that.data.addressdata.address,
              },
              success: function(res) {
                wx.setStorage({
                  key: 'vcardData',
                  data: res.data.data,
                })
                wx.navigateTo({
                  url: '/pages/first/first' //页面跳转相对路径要写清楚且准确 
                })
              },
              fail: function(err) {
                console.log(err)
              }
            })
          }
        })
      }
    })
  },


})