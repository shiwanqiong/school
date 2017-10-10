<template>
  <div class="text-area">
    <textarea v-model="message" name="" id="" cols="30" rows="10" maxlength="100" placeholder="请输入驳回理由"></textarea>
    <p class="sub-foot">最多输入100字</p>
    <div class="success-btn">
      <input type="button" value="确定" @click="_submitReason">
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return {
              message:''
          }
      },
      methods:{
          _showTips(msg){
            hm.request({
              command: 'toast://default',
              params: '{"message":'+msg+'}',
              success: function (data) {
              },
              failure: function (error) {
                console.log(error);
              }
            });
          },
          _submitReason(){
            var _this=this;
            if(_this.message==''){
              _this._showTips('请输入驳回理由');
                return;
            }
            let ids=_this.$route.params.ids;
            hm.request({
              command:'request://hm',
              params: `{"api":"activity.audit_refuse","params":{"ids":${ids},"remarks":"${this.message}"}}`,
              success:function(data){
                  if(data.code===0){
                    hm.request({command: 'hm_window://back'});
                  }
              }
            })
          }
      }
  }
</script>
<style lang="scss" scoped>
  .text-area{
    padding: 0.6rem 0.333333rem 0;
    @include font-dpr(26px);
    color: #4A4A4A;
    letter-spacing: 0;
    line-height: 0.48rem;
  }
  textarea{
    width:100%;
    height:7.013333rem;
    padding:0.346667rem;
    -webkit-appearance: none;
    background: #F5F5F5;
    border: 1px solid #DDDDDD;
  }
  .sub-foot{
    margin-top:0.4rem;
    color: #ACACAC;
    text-align: right;
  }
  .success-btn{
    margin-top:1.933333rem;
    text-align: center;
  }
  .success-btn input{
    font-family: PingFangSC-Medium;
    width:8.266667rem;
    height:1.333333rem;
    background-color: #FF8556;
    color:#ffffff;
    @include font-dpr(36px);
    line-height: 0.48rem;
    border-radius:0.133333rem;
  }
</style>
