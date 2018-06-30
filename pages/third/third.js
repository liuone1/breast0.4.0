Page({
  data: {
    array: ['<30分钟', '30~60分钟', '60~120分钟', '>120分钟'],
    objectMultiArray: [
      [{ id: 0, name: '1斤' }, { id: 1, name: '2斤' }, { id: 2, name: '3斤' }, { id: 3, name: '4斤' }, { id: 4, name: '5斤' }, { id: 5, name: '6斤' }, { id: 6, name: '7斤' }, { id: 7, name: '8斤' }, { id: 8, name: '9斤' }, { id: 9, name: '10斤' }, { id: 10, name: '11斤' }, { id: 11, name: '12斤' }, { id: 12, name: '13斤' }, { id: 13, name: '14斤' }, { id: 14, name: '15斤' }, { id: 15, name: '16斤' }, { id: 16, name: '17斤' }],
      [{ id: 0, name: '0两' }, { id: 1, name: '1两' }, { id: 2, name: '2两' }, { id: 3, name: '3两' }, { id: 4, name: '4两' }, { id: 5, name: '5两' }, { id: 6, name: '6两' }, { id: 7, name: '7两' }, { id: 8, name: '8两' }, { id: 9, name: '9两' }]
    ],
    multiIndex2: '',
    weight: '',
    index: '0',
    date: '',
    index1: '<30分钟',
    K_CTM: '',
    K_Sex: '',
    K_Sta: '',
    K_Birth: '',
    K_WT: '',
  },
  validatedate: function (date) {
    console.log(date);
    if (date == 0) {
      wx.showToast({
        title: '请选宝宝生日！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateweight: function (weight) {
    console.log(weight);
    if (weight == 0) {
      wx.showToast({
        title: '请选宝宝体重！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateK_Sex: function (K_Sex) {
    console.log(K_Sex);
    if (K_Sex == 0) {
      wx.showToast({
        title: '请选宝宝性别！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateK_Sta: function (K_Sta) {
    console.log(K_Sta);
    if (K_Sta == 0) {
      wx.showToast({
        title: '请选出生情况！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateindex1: function (index1) {
    console.log(index1);
    if (index1 == 0) {
      wx.showToast({
        title: '请选初乳时间！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

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
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
    console.log(this.data.objectMultiArray[0][this.data.multiIndex2[0]].name + this.data.objectMultiArray[1][this.data.multiIndex2[1]].name)
    this.setData({
      weight: this.data.objectMultiArray[0][this.data.multiIndex2[0]].name + this.data.objectMultiArray[1][this.data.multiIndex2[1]].name
    })

  },
  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.objectMultiArray[1] = [
              { id: 0, name: '1斤' },
              { id: 1, name: '2斤' },
              { id: 2, name: '3斤' },
              { id: 3, name: '4斤' },
              { id: 4, name: '5斤' },
              { id: 5, name: '6斤' },
              { id: 6, name: '7斤' },
              { id: 7, name: '8斤' },
              { id: 8, name: '9斤' },
              { id: 9, name: '10斤' },
              { id: 10, name: '11斤' },
              { id: 11, name: '12斤' },
              { id: 12, name: '13斤' },
              { id: 13, name: '14斤' },
              { id: 14, name: '15斤' },
              { id: 15, name: '4斤' },
              { id: 16, name: '16斤' },

            ];
            break;
          case 1:
            data.objectMultiArray[1] = [
              { id: 0, name: '1两' },
              { id: 1, name: '2两' },
              { id: 2, name: '3两' },
              { id: 3, name: '4两' },
              { id: 4, name: '5两' },
              { id: 5, name: '6两' },
              { id: 6, name: '7两' },
              { id: 7, name: '8两' },
              { id: 8, name: '9两' },
            ];
            break;
        }

    }
    this.setData(data);
  },
  listenerK_Sex: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      K_Sex: e.detail.value
    })
  },
  listenerK_Sta: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      K_Sta: e.detail.value
    })
  },
  logIn: function () {
    var that = this
    if (this.validatedate(this.data.date) == false) return;
    if (this.validateweight(this.data.weight) == false) return;
    if (this.validateK_Sex(this.data.K_Sex) == false) return;
    if (this.validateK_Sta(this.data.K_Sta) == false) return;
    if (this.validateindex1(this.data.index1) == false) return;
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
            K_Birth: that.data.date,
            K_WT: that.data.weight,
            K_CTM: that.data.index1,
            K_Sex: that.data.K_Sex,
            K_Sta: that.data.K_Sta,
          },
          success: function (res) {
            wx.navigateTo({
              url: '/pages/last/last',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  },
})
