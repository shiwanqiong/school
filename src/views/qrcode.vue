<template>
  <qriously id="qrcode" :value="value" :size="300" />
</template>
<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
export default {
  data() {
    return {
      id: '',
      value: '',
      channel: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this._loadId();
      this._loadChannel();
    })
    setInterval(this._create, 10000);
  },
  methods: {
    _create() {
      var _this = this;
      var now = Date.parse(new Date());
      hm.request({
        command: 'data://other/qrcode/encrypt',
        params: '{"action":"second://classroom","params":{"id":"' + _this.id + '","channel":"' + _this.channel + '","time":' + now + '}}',
        success: function(data) {
          _this.value = data.result + "---";
        },
        failure: function(error) {
          hm.request({
            command: 'toast://default',
            params: `{"message":"${data.error}"}`
          });
        }
      })
    },
    _loadChannel() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
        this.channel = "ANDROID";
      }
      if(isiOS){
        this.channel = "IOS";
      }
    },
    _loadId() {
      var _this = this;
      hm.request({
        command: 'request://hm',
        params: '{"api":"user.info"}',
        success: function(data) {
          _this.id = data.content.id;
          _this._create();
        },
        failure: function(error) {
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
<style>
#qrcode {
  width: 10rem;
  height: 16.08rem;
  background: url("../assets/img/qrcode.png") no-repeat;
  background-size: cover;
}

#qrcode canvas {
  width: 4rem;
  height: 4rem;
  margin-top: 6.37333rem;
  margin-left: 3rem;
}
</style>
