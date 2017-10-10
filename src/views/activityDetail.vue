<template>
  <div class="act-detail">
    <act-detail :detail="this.detail"></act-detail>
    <div v-show="showSignIn" class="btn-ctn" @click="onClickSignIn">
      <div class="btn">{{signInText}}</div>
    </div>
  </div>
</template>
<script>
  import actDetail from '../components/actDetail/actDetail.vue'
  //
  export default {
    data()
    {
      return {
        id: this.$route.params.id,
        detail: [],
        showSignIn: false,
        signInText: "签到",
        signInType: 'SIGN_IN'
      }
    },
    components: {
      actDetail: actDetail
    },
    mounted()
    {
      this.onLoad();
    },
    methods: {
      onLoad()
      {
        var _this = this;
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.detail","params":{"id":"${this.id}"}}`,
          success: function (data)
          {
            _this.detail = data.content;
            let signIn = _this.detail.signIn;
            let state = _this.detail.activityState;
            if (signIn === 1)
            {
              _this.signInText = "签退";
              _this.signInType = "SIGN_OUT";
            }
            if (signIn !== 2 && state != "已失效")
            {
              _this.showSignIn = true;
            }
          }
        })
      },

      onClickSignIn(){
        let _this = this;
        let endTime = this.detail.endTime;
        let now = Date.parse(new Date());
        if(now<endTime&&this.signInType==="SIGN_OUT"){
          // wifi 没开打，提示打开wifi或扫码
          hm.request({
            command: 'dialog://doublebond',
            params: `{"cancel":true,"content":"活动尚未结束，现在签退将无法获得课时！确认签退？","title":"","left_text":"取消","right_text":"确定"}`,
            success: function (data)
            {
              let rightClick = data.right_click;
              if (rightClick)
              {
                _this.signIn();
              }
            },
            failure: function (error)
            {
            }
          });
        }else{
            this.signIn();
        }
      },

      // 签到
      signIn()
      {

        if (hm.isAndroid())
        {
          this.wifiStatus();
        } else
        {
          this.scan();
        }
      },

      // wifi 状态
      wifiStatus()
      {
        var _this = this;
        hm.request({
          command: 'system://info/states',
          success: function (data)
          {
            var wifi = data.wifi_enabled;
            // 判断是否打开WIFI 如果打开了，就直接获取Wifi列表，没打开就提示。
            if (wifi)
            {
              _this.wifi();
            } else
            {
              // wifi 没开打，提示打开wifi或扫码
              hm.request({
                command: 'dialog://doublebond',
                params: `{"cancel":true,"content":"需要您打开WiFi后再打卡或直接扫描二维码打卡","title":"","left_text":"扫一扫打卡","right_text":"打开WiFi"}`,
                success: function (data)
                {
                  // 判断点击的是打开WIFI还是扫一扫
                  let leftClick = data.left_click;
                  let rightClick = data.right_click;
                  if (leftClick)
                  {
                    _this.scan();
                  }
                  if (rightClick)
                  {
                    hm.request({
                      command: 'hm_window://other/go',
                      params: `{"page":"setting_wifi"}`
                    })
                  }
                },
                failure: function (error)
                {
                }
              })
            }
          },
          failure: function (error)
          {
          }
        })
      },

      // 扫码
      scan()
      {
        var _this = this;
        hm.request({
          command: 'hm_window://go/qrcode/scan',
          params: `{"is_verify":true,"action":"second://classroom"}`,
          success: function (data)
          {

            let id = data.qrcode_valid.id;
            let time = data.qrcode_valid.time;
            if (hm.isAndroid())
            {
              _this.scanSignIn(id, time);
            } else
            {
              setTimeout(function ()
              {
                _this.scanSignIn(id, time);
              }, 1500);
            }

          },
          failure: function (error)
          {

          }
        })
      },

      // wifi列表
      wifi()
      {
        var _this = this;
        hm.request({
          command: 'system://info/wifi/list',
          params: `{"max_count":50}`,
          success: function (data)
          {
            _this.ssidSignIn(data.bssid);
          },
          failure: function (error)
          {

          }
        })
      },

      // scan 签到
      scanSignIn(id, time)
      {
        if(this.id !== id){
          hm.request({
            command: 'dialog://singlebond',
            params: `{"cancel":true,"content":"请扫描对应活动的二维码","title":"","button_text":"确定"}`,
            success: function (data)
            {
            },
            failure: function (error)
            {
            }
          });
          return;
        }
        var _this = this;
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.sign_in_scanning",
                    "params":{"id":"${id}",
                              "scanning_time":${time},
                              "sign_type":"${this.signInType}"}}`,

          success: function (data)
          {
            _this.signInSuccess(data);
          },
          failure: function (error)
          {

          }
        })
      },


      // SSID 签到
      ssidSignIn(bssid)
      {
        var _this = this;
        let mac = JSON.stringify(bssid);
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.sign_in_ssid",
                    "params":{"id":"${this.id}",
                    "mac":${mac},
                    "sign_type":"${this.signInType}"}}`,

          success: function (data)
          {
            _this.signInSuccess(data);
          },
          failure: function (error)
          {

          }
        })
      },

      // 签到(退) 成功后的处理.
      signInSuccess(data)
      {
        if (data.code === 0)
        {
          let message = "签到成功";
          if (this.signInType === "SIGN_OUT")
          {
            message = "签退成功";
            this.showSignIn = false;
          } else
          {
            this.signInText = "签退";
            this.signInType = "SIGN_OUT";
          }
          hm.request({
            command: 'toast://default',
            params: `{"message":"${message}"}`
          });
        }
        if (data.code === 1001)
        {
          let _this = this;
          let error = data.error;
          hm.request({
            command: 'dialog://singlebond',
            params: `{"cancel":true,"content":"${data.error}","title":"","button_text":"确定"}`,
            success: function (data)
            {
              if(error === "请使用扫码签到"){
                _this.scan();
              }
            },
            failure: function (error)
            {
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn {
    width: 8.26667rem;
    margin: 0 auto;
    background: #FF8556;
    border-radius: 0.1333rem;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
    color: #FFFFFF;
    text-align: center;
    height: 1.3333rem;
    line-height: 1.3333rem;
  }

  .btn-ctn {
    background: #ffffff;
    margin-bottom: 0.5rem;
  }

</style>
