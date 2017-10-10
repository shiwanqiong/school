<template>
  <div class="single-check">
    <div class="tip">
      <p>该活动上传了附件，请至PC端查看</p>
    </div>
    <act-detail :detail="detail"></act-detail>
    <div class="btn">
      <input type="button" class="reject" @click="_reject" value="驳回">
      <input type="button" class="pass" @click="_pass" value="通过">
    </div>
  </div>
</template>
<script>
  import actDetail from '../components/actDetail/actDetail.vue'
  export default{
      data(){
          return {
            detail:null,
//            detail:{
//              "orderType": 0,
//              "period": 3,
//              "userName": "陈老师",
//              "userId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//              "picture": "1505981776001.png",
//              "teacherId": "c09e34e4-e040-44e3-b038-f345c2fa5eee",
//              "createTime": 1505981778000,
//              "activitySortTwo": "Competition",
//              "activityState": "已结束",
//              "schoolId": "2",
//              "activitySort": "Learning",
//              "name": "rede1",
//              "addrId": "5809aa08-0132-4dac-b0ed-6c88b8d24213",
//              "details": "nfdkfdfdsfasdffffffffffffffffffffffffffffffffhfhjhfz房间爱劳动立法老司机按发的发生佛挡杀佛佛挡杀佛带饭的发发呆阿斯顿发生地方大沙发斯蒂芬发生地方发生大法师的法师打发沙发发斯蒂芬 啊啊发放的法师打发斯蒂芬时",
//              "startTime": 1505981762000,
//              "endTime": 1505988962000,
//              "id": "d369967f-629d-48c9-8c34-ca9f6447c5dd",
//              "state": "Pending",
//              "activityType": 0,
//              "addr": "ww1w11e",
//              "activityLevel": "Department",
//              "addrType": "1"
//            },
            id:[]
          }
      },
      mounted(){
        this._loadDetail();
      },
      components:{
        actDetail:actDetail
      },
      methods:{
        _loadDetail(){
          var _this = this;
          _this.id.push(_this.$route.params.id);
          hm.request({
            command: 'request://hm',
            params: `{"api":"activity.detail","params":{"id":"${_this.$route.params.id}"}}`,
            success: function (data)
            {
              _this.detail = data.content;
            }
          })
        },
        _pass(){
          var _this=this;
          let ids=JSON.stringify(_this.id);
          hm.request({
            command:'request://hm',
            params: `{"api":"activity.audit_approved","params":{"ids":${ids}}}`,
            success:function(data){
              hm.request({
                command: 'toast://default',
                params: '{"message":"活动审核通过"}',
                success: function (data) {
                },
                failure: function (error) {
                  console.log(error);
                }
              });
            },
            failure(error){
              hm.request({
                command: 'toast://default',
                params: '{"message":'+error+'}',
                success: function (data) {
                  _this.$router.go(-1);
                },
                failure: function (error){
                  console.log(error);
                }
              });
            }

          })
          _this.$router.go(-1);
        },
        _reject(){
          let ids=JSON.stringify(this.id);
//          alert('tijao:'+ids);
          this.$router.push({name:'Reject',params:{ids:ids}});
        },
      }
  }
</script>
<style lang="scss" scoped>
  .tip{
    position: absolute;
    top:0;
    left: 0;
    background: #B6B8B8;
    width:100%;
    height:0.8rem;
  }
  .tip p{
    height:100%;
    line-height: 0.8rem;
    @include font-dpr(24px);
    color: #FFFFFF;
    text-align: center;
  }
  .btn{
    display: flex;
    padding:0 0.48rem;
    background: #ffffff;
    margin-bottom:1.066667rem;
  }
  .btn input[type=button]{
    width: 4.0rem;
    height: 1.066667rem;
    border-radius:0.08rem ;
    @include font-dpr(30px);
    color: #FFFFFF;
    line-height: 0.48rem;
  }
  .reject{
    background: #C2C2C2;
    margin-right:1.04rem;
  }
  .pass{
    background: #FF8556;
  }
</style>
