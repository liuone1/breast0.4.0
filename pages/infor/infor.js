var app = getApp()
var idinfolist = [
  { "code": "钙离子", "type": '', "assess": '' },
  { "code": "蛋白质", "type": '', "assess": '' },
  { "code": "锌离子", "type": '', "assess": '' },
]
var Date = ''
var time = ''
var time1 = ''
var lisData, listData1, listData2, listData3, listData4, listData5, listData6, result, M_Name, result1, result2, result3, S_Pro, S_Cal, S_Zn;
Page({
  onShareAppMessage: function () {
    return {
      title: '优吗母乳检测',
      path: '/page/infor/infor',
      success: function (res) {
        console.log(分享成功)
      },
      fail: function (res) {
        console.log(分享失败)
      }
    }
  },
  data: {
    userInfodata: {},
    addressdata: {},
    listData: idinfolist,
    Date: '',
    inputValue: '', //用于显示输入语句  
    searchinput: '', //用户输入的查询语句 
    time: '',
  },
  onLoad: function (optionsz, ) {
    var that = this
    var ress = decodeURIComponent(optionsz.q)
    var orgcode = ress.split('?')
    console.log(orgcode);
    console.log(orgcode[1]);
    wx.request({
      method: 'get',
      url: 'https://www.1mum.cn/api/Public/v1/?service=Detect.GetDetectInfo',
      data: {
        id: orgcode[1]
      },
      success: function (res) {
        console.log(res.data)
      },
      success: function (res) {
        console.log(res.data)
        M_Name = res.data.data.M_Name;
        that.setData({
          M_Name: M_Name
        })
        time = res.data.data.createtime;
        that.setData({
          time: time
        })
        listData1 = res.data.data.V_Cal;
        that.setData({
          listData1: listData1
        })
        listData2 = res.data.data.V_Pro;
        that.setData({
          listData2: listData2
        })
        listData3 = res.data.data.V_Zn;
        that.setData({
          listData3: listData3
        })
        result = res.data.data.result;
        var result = result.split('您的')
        that.setData({
          result1: result[1]
        })
        that.setData({
          result2: result[2]
        })
        that.setData({
          result3: result[3]
        })
        console.log(result)
        console.log(result[1])
        console.log(result[2])
        console.log(result[3])
        S_Pro = res.data.data.S_Pro;
        that.setData({
          S_Pro: S_Pro
        })
        S_Cal = res.data.data.S_Cal;
        that.setData({
          S_Cal: S_Cal
        })
        S_Zn = res.data.data.S_Zn;
        that.setData({
          S_Zn: S_Zn
        })
      }
    })

  },
})