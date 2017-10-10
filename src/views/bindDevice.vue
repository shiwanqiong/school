<template>
  <div v-if="isBinding">
    <div class="details">
      <p>
        <span>活动名称：</span>
        <span>{{activity_name}}</span>
      </p>
      <p>
        <span>绑定设备：</span>
        <span>{{device_name}}</span>
      </p>
    </div>
    <div class="btn" @click="_saoma">
      <span>重新绑定</span>
    </div>
  </div>
</template>
<script>
  export default {
    data()
    {
      return {
        id: '',
        activity_name: '',
        device_name: '',
        ssid: '',
        isBinding: ''
      }
    },
    mounted()
    {
      this.id = this.$route.params.bid;
      this.$nextTick(function ()
      {
        this._loadData();
      })
    },
    methods: {
      _loadData()
      {//获取绑定状态
        var _this = this;
        hm.request({
          command: 'request://hm',
          params: '{"api":"activity.bingind_state","params":{"id":"' + _this.id + '"}}',
          success: function (data)
          {
            _this.isBinding = data.content.is_binding;
            if (_this.isBinding == true)
            {
              _this.activity_name = data.content.activity_name;
              _this.device_name = data.content.device.name;
            } else
            {
              _this._saoma();
            }
          },
          failure: function (error)
          {
            hm.request({
              command: 'toast://default',
              params: `{"message":"${data.error}"}`
            });
          }
        })
      },
      _saoma()
      {//扫码
        var _this = this;
        hm.request({
          command: 'hm_window://go/qrcode/scan',
          params: '{"is_verify":false}',
          success: function (data)
          {
            _this.ssid = data.qrcode_full.ssid;
            setTimeout(function ()
            {
              _this._binding();
            },1500);
          },
          failure: function (error)
          {
            hm.request({
              command: 'toast://default',
              params: `{"message":"${error}"}`
            });
          }
        })
      },
      _binding()
      {//绑定设备
        var _this = this;
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.device_binding","params":{"id":"${_this.id}","ssid":"${_this.ssid}"}}`,
          success: function (data)
          {
            _this.isBinding = true;
            let message = "绑定失败";
            if (data.code === 0)
            {
              message = "绑定成功";
              _this._loadData();
            }
            hm.request({
              command: 'dialog://singlebond',
              params: `{"cancel":true,"content":"${message}","button_text":"确定"}`,
              success: function (data)
              {

                hm.request({command: 'hm_window://back'});

              },
              failure: function (error)
              {
                console.log(error);
              }
            });

          },
          failure: function (error)
          {
            hm.request({
              command: 'toast://default',
              params: `{"message":"${data.error}"}`
            });
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .details p {
    font-family: PingFangSC-Regular;
    padding: 0.32667rem 0.48rem;
    border-bottom: 1px solid #EAEAEA;
    font-size: 0.34667rem;
    letter-spacing: 0;
  }

  .details p span:first-child {
    color: #8E8E8E;
    height: 0.34667rem;
  }

  .details p span:last-child {
    color: #4A4A4A;
    height: 0.34667rem;
  }

  .btn {
    margin-top: 8.10667rem;
    text-align: center;
  }

  .btn span {
    display: inline-block;
    width: 8.2667rem;
    height: 1.333rem;
    margin: 0 auto;
    text-align: center;
    line-height: 1.333rem;
    background: #FF8556;
    border-radius: 10px;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #FFFFFF;
  }
</style>


