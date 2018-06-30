//app.js

App({

  onLaunch: function ()  {
    wx.login({
      success: function (res) {
       var  code = res.code //返回code
        console.log(code)
        wx.request({
          method: 'get',
          url: 'https://www.1mum.cn/api/Public/v1/?service=Detect.GetOpenid',
          data: {
            code: code,

          },
          success: function (res) {
            console.log(res.data.data.openid)
            wx.setStorage({
              key: 'openIdData',
              data: res.data.data.openid,
            })
          }
        })
      }
    })
  },
  
  onLoad: function () {
  
  }
})