
var idinfolist = [
  { "code": "钙离子", "type": '', "assess": '' },
  { "code": "蛋白质", "type": '', "assess": '' },
  { "code": "锌离子", "type": '', "assess": '' },
]
var Date = ''
var time = ''
var time1 = ''
Page({
  data: {
    listData: idinfolist,
    Date: '',
    inputValue: '', //用于显示输入语句  
    searchinput: '', //用户输入的查询语句 
    time: '',
  },
  orderSign: function (e) {
    var fId = e.detail.formId;
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + App.globalData.wxData.token;
    var d = {
      touser: wx.getStorageSync('user').openid,
      template_id: 'U9Fe_JpotIdn4k549mFcWS_UoohQMazYNVS5UJJ6Q7g',//这个是1、申请的模板消息id，  
      page: '/pages/index/index',
      form_id: fId,
      value: {

        "keyword1": {
          "value": fObj.product,
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": fObj.detail,
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": new Date().getDate(),
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "201612130909",
          "color": "#9b9b9b"
        }
      },
      color: '#ccc',
      emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
      url: l,
      data: d,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
      },
      fail: function (err) {
        // fail  
        console.log("push err")
        console.log(err);
      }
    });
  },
  onLoad: function () {
    var self = this
    wx.getStorage({
      key: 'vcardData',
      success: function (res) {
        var listData = self.data.listData
        console.log(res, 'res')
        console.log(listData, 'listData')
        console.log(listData[0], 'listData[0]')
        listData[0].type = res.data.V_Cal
        listData[1].type = res.data.V_Pro
        listData[2].type = res.data.V_Zn
        time1 = res.data.createtime
        time1 = time1.split(" ")
        time = time1[0]
        self.setData({
          time: time
        })
        console.log(time)
        if (res.data.V_Cal <= 25) {

          listData[0].assess = "偏弱"

        } else if (res.data.V_Cal > 25 && res.data.V_Cal <= 30) {
          listData[0].assess = "适中"

        } else if (res.data.V_Cal > 30 && res.data.V_Cal <= 39) {

          listData[0].assess = "丰富"

        } else if (res.data.V_Cal > 39) {

          listData[0].assess = "优良"

        }
        if (res.data.V_Pro <= 1) {

          listData[1].assess = "偏弱"

        } else if (res.data.V_Pro > 1 && res.data.V_Pro <= 1.8) {
          listData[1].assess = "适中"

        } else if (res.data.V_Pro > 1.8 && res.data.V_Pro <= 2.6) {

          listData[1].assess = "丰富"

        } else if (res.data.V_Pro > 2.6) {

          listData[1].assess = "优良"

        }
        if (res.data.V_Zn <= 0.12) {

          listData[2].assess = "偏弱"

        } else if (res.data.V_Zn > 0.12 && res.data.V_Zn <= 0.25) {
          listData[2].assess = "适中"

        } else if (res.data.V_Zn > 0.25 && res.data.V_Zn <= 0.45) {

          listData[2].assess = "丰富"

        } else if (res.data.V_Zn > 0.45) {

          listData[2].assess = "优良"

        }
        self.setData({
          listData: listData
        })
        console.log(self.data, 'data')
        console.log(self.data.listData, 'data')

      },
    })
  },

  logIn: function () {
    wx.navigateTo({
      url: '/pages/share/share',
    })
  }  
})