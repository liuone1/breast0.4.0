
Page({
  data: {
    motto: '欢迎登录微信智能蓝牙锁',
    array: ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
    index: 0,
    B_Mth: 0,
    B_Age: '',
    B_Food: '',
    B_Feed: '',
    B_Chid: '',
    index1: '',
  },
  validateB_Age: function (B_Age) {
    console.log(B_Age);
    if (B_Age == 0) {
      wx.showToast({
        title: '请填生育年龄！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    if ((B_Age <= 14) || (B_Age >= 66)) {
      wx.showToast({
        title: '年龄输入有误！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
  },
  validateB_Mth: function (B_Mth) {
    console.log(B_Mth);
    if (B_Mth == 0) {
      wx.showToast({
        title: '请选分娩方式！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateB_Food: function (B_Food) {
    console.log(B_Food);
    if (B_Food == 0) {
      wx.showToast({
        title: '请选饮食习惯！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateB_Chid: function (B_Chid) {
    console.log(B_Chid);
    if (B_Chid == 0) {
      wx.showToast({
        title: '请选胎次！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateB_Feed: function (B_Feed) {
    console.log(B_Feed);
    if (B_Feed == 0) {
      wx.showToast({
        title: '请选喂养方式！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  /* bindPickerChange: function (e) {
     this.setData({
       index: e.detail.value
     })
     this.data.array.map((res, i) => {
       if (i == e.detail.value) {
         this.setData({
           index1: res
         })
         console.log(res)
       }
     })
   },*/
  B_AgeInput: function (e) {
    this.setData({
      B_Age: e.detail.value
    })
  },
  listenerB_Mth: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      B_Mth: e.detail.value
    })
    console.log(e.detail.value)
  },
  listenerB_Food: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      B_Food: e.detail.value
    })
  },
  listenerB_Feed: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      B_Feed: e.detail.value
    })
  },
  listenerB_Chid: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      B_Chid: e.detail.value
    })
  },
  logIn: function () {
    var that = this
    if (this.validateB_Age(this.data.B_Age) == false) return;
    if (this.validateB_Mth(this.data.B_Mth) == false) return;
    if (this.validateB_Food(this.data.B_Food) == false) return;
    if (this.validateB_Feed(this.data.B_Feed) == false) return;
    if (this.validateB_Chid(this.data.B_Chid) == false) return;
    wx.getStorage({
      key: 'vcardData',
      success: function (res) {
        that.setData({
          idData: res.data.id
        })
        wx.request({
          method: 'get',
          url: 'https://www.1mum.cn/api/Public/v1/?service=Detect.UpdateDetect',
          data: {
            id: that.data.idData,
            B_Age: that.data.B_Age + '岁',
            B_Mth: that.data.B_Mth,
            B_Food: that.data.B_Food,
            B_Feed: that.data.B_Feed,
            B_Chid: that.data.B_Chid
          },
          success: function (res) {
            wx.navigateTo({
              url: '/pages/third/third',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  }
})