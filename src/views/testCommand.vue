<template>
  <div class="act-detail">
    <button @click="isVerifyTrue" style="width: 100%; height: 50px">加密二维码</button>
    <button @click="isVerifyFalse" style="width: 100%; height: 50px;margin-top: 10px">不加密二维码</button>
    <button @click="getschoolinfo" style="width: 100%; height: 50px;margin-top: 10px">获取学校配置信息</button>
    <button @click="encrypt" style="width: 100%; height: 50px;margin-top: 10px">二维码加密</button>
    <button @click="wifi" style="width: 100%; height: 50px;margin-top: 10px">获取wifi列表</button>
    <button @click="states" style="width: 100%; height: 50px;margin-top: 10px">获取系统状态</button>
    <button @click="setting" style="width: 100%; height: 50px;margin-top: 10px">跳转设置</button>
    <button @click="wifiSetting" style="width: 100%; height: 50px;margin-top: 10px">跳转wifi列表</button>
    {{testMessage}}
  </div>
</template>
<script>

  export default {
    data()
    {
      return {
        testMessage: ""
      }
    },
    components: {},
    mounted()
    {
    },
    methods: {
      isVerifyTrue()
      {
        var _this = this;
        hm.request({
          command: 'hm_window://go/qrcode/scan',
          params: `{"is_verify":true,"action":"second://classroom"}`,
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      isVerifyFalse()
      {
        var _this = this;
        hm.request({
          command: 'hm_window://go/qrcode/scan',
          params: `{"is_verify":false}`,
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      getschoolinfo()
      {
        var _this = this;
        hm.request({
          command: 'data://user/getschoolinfo',
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      encrypt()
      {
        var _this = this;
        hm.request({
          command: 'data://other/qrcode/encrypt',
          params: `{"action":"send://other","params":{"user_id":"1f5ds6a-fdsaf456-fdsaf456saf","time":1234564564531}}`,
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      wifi()
      {
        var _this = this;
        hm.request({
          command: 'system://info/wifi/list',
          params: `{"max_count":50}`,
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      states()
      {
        var _this = this;
        hm.request({
          command: 'system://info/states',
          success: function (data)
          {
            var json = JSON.stringify(data);
            _this.testMessage = json;
          },
          failure: function (error)
          {

          }
        })
      },
      setting()
      {
        hm.request({
          command: 'hm_window://other/go',
          params: `{"page":"setting"}`
        })
      },
      wifiSetting()
      {
        hm.request({
          command: 'hm_window://other/go',
          params: `{"page":"setting_wifi"}`
        })
      }
    }
  }
</script>
