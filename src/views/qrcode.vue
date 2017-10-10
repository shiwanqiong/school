<template>
    <qriously id="qrcode" :value="value" :size="300"  />
</template>
<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
export default {
  data() {
    return {
        id:'',
        value:''
    }
  },
  mounted(){
    this.id = this.$route.params.id;
    this.$nextTick(function (){
        this._create();
    })
    setInterval(this._create,10000)
  },
  methods: {
    _create(){
      var _this = this;
      hm.request({
        command:'request://hm',
        params: `{"api":"classroom.qrcode","params":{"id":"${this.id}"}}`,
        success:function(data){
          if(data.code=='0'){
            _this.value = data.content.qrcdde;
          }
        }
      })
    }
  }
}
</script>
<style>
#qrcode{
    width: 10rem;
    height: 16.08rem;
    background: url("../assets/img/qrcode.png") no-repeat;
    background-size: cover;
}
#qrcode canvas{
    width: 4rem;
    height: 4rem;
    margin-top: 6.37333rem;
    margin-left: 3rem;
}
</style>
