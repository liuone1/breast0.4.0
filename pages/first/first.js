
//index.js
//获取应用实例

Page({
  data: {
    motto: '欢迎登录微信智能蓝牙锁',
    array: ['汉族', '回族', '阿昌族', '白族', '布朗族', '保安族', '布依族', '朝鲜族', '傣族', '德昂族', '独龙族', '达斡尔族', '傣族', '德昂族', '侗族', '东乡族', '鄂伦春族', '俄罗斯族', '鄂温克族', '高山族', '仡佬族', '哈尼族', '哈萨克族', '赫哲族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '珞巴族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '仫佬族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '畲族', '水族', '塔吉克族', '塔塔尔族', '土族', '土家族', '佤族', '维吾尔族', '乌兹别克族', '锡伯族', '瑶族', '彝族', '裕固族', '藏族', '壮族'],
    index1: '汉族',
    index: 0,
    M_Name: '',
    M_MPN: '',
    M_HT: '',
    M_WT: '',
    M_Regn: '',
    openid: '',
    orgcode: '',
    detector: '',
    location: '',
    id_token: '',//方便存在本地的locakStorage
    response: '', //存取返回数据
    idData: ''
  },
  formSubmit: function (e) {
    console.log(e.detail.value);//格式 Object {openid: "Openid", orgcode: "orgcode",detector:"userInfo.nickName",location:"userInfo.city"}
    //获得表单数据
    var objData = e.detail.value;

    if (objData.openid && objData.orgcode && objData.detectore && objData.location) {
      // 同步方式存储表单数据
      wx.setStorage({
        key: 'openid',
        data: objData.openid
      });
      wx.setStorage({
        key: 'orgcode',
        data: objData.orgcode
      });
      wx.setStorage({
        key: 'detector',
        data: userInfo.nickName
      });
      wx.setStorage({
        key: 'location',
        data: userInfo.city
      });
    }
  },
  bindPickerChange: function (e) {
    /*console.log('picker发送选择改变，携带值为', e.detail.value)*/
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
  //验证宝妈
  validateindex1: function (index1) {
    console.log(index1);
    if (index1.length == 0) {
      wx.showToast({
        title: '',
        image: '../../img/120.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  //验证宝妈姓名
  validateM_Name: function (M_Name) {
    console.log(M_Name);
    if (M_Name.length == 0) {
      wx.showToast({
        title: '请输您的姓！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  //验证手机号码格式
  validateM_MPN: function (M_MPN) {
    console.log(M_MPN);
    if (M_MPN.length == 0) {
      wx.showToast({
        title: '请输手机号！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    if (M_MPN.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(M_MPN)) {
      wx.showToast({
        title: '手机号有误！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    return true;
  },
  validateM_HT: function (M_HT) {
    console.log(M_HT);
    if (M_HT.length == 0) {
      wx.showToast({
        title: '请输您的身高！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    if ((M_HT <= 100) || (M_HT >= 220)) {
      wx.showToast({
        title: '身高输入有误！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
  },
  validateM_WT: function (M_WT) {
    console.log(M_WT);
    if (M_WT.length == 0) {
      wx.showToast({
        title: '请输您的体重！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
    if ((M_WT <= 30) || (M_WT >= 150)) {
      wx.showToast({
        title: '体重输入有误！',
        image: '../../img/130.png',
        duration: 1000
      })
      return false;
    }
  },
  //用户名输入获取
  M_NameInput: function (e) {
    this.setData({
      M_Name: e.detail.value
    })
  },
  //用户名手机号输入获取
  M_MPNInput: function (e) {
    this.setData({
      M_MPN: e.detail.value
    })
  },
  //用户身高输入获取
  M_HTInput: function (e) {
    this.setData({
      M_HT: e.detail.value
    })
  },
  //用户体重输入获取
  M_WTInput: function (e) {
    this.setData({
      M_WT: e.detail.value
    })
  },


  logIn: function () {
    var that = this
    //请完成参数获取和用户名检查
    if (this.validateM_Name(this.data.M_Name) == false) return;
    if (this.validateM_MPN(this.data.M_MPN) == false) return;
    if (this.validateM_HT(this.data.M_HT) == false) return;
    if (this.validateM_WT(this.data.M_WT) == false) return;
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
            M_Name: that.data.M_Name + '女士',
            M_MPN: that.data.M_MPN,
            M_HT: that.data.M_HT,
            M_WT: that.data.M_WT,
            M_Regn: that.data.index1,
          },
          success: function (res) {
            wx.navigateTo({
              url: '/pages/second/second',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
    console.log(this.data.idData)
  },
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data);
        that.setData({ openid: res.data });
      }
    });
    wx.getStorage({
      key: 'orgcode',
      success: function (res) {
        console.log(res.data);
        that.setData({ orgcode: res.data });
      }
    });
    wx.getStorage({
      key: 'detector',
      success: function (res) {
        console.log(res.data);
        that.setData({ detector: res.data });
      }
    });
    wx.getStorage({
      key: 'location',
      success: function (res) {
        console.log(res.data);
        that.setData({ location: res.data });
      }
    });
    wx.showLoading({
      title: '正在获取信息',
    })
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          userInfo: res.userInfo
        })
        console.log(nickName)
        console.log(city)
        console.log(province)
        wx.hideLoading();
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  }

})