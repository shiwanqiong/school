<template>
  <div class="dropSelect" @click="_autoShow($event)">
      <p class="label-text" :class="[{active:labelActive},customClass]">{{dropOptions.label}}<span class="arrow_d"></span></p>
      <ul v-show="isShow">
        <li v-for="option in dropOptions.options" @click="_itemClick(option)" :class="{active:option.active}">{{option.name}} <span></span></li>
      </ul>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            isShow:false,
            selected:null,
          }
      },
      props:{
          options:{
              type:Object
          },
          cbChange:{
              type:Function
          },
          statusChange:{
            type:Function
          },
          labelActive:{
              type:Boolean,
              default:false
          },
          customClass:{
              type:String,
              default:''
          }
      },
      mounted(){
        document.addEventListener('click',this._autoHide,false);
      },
      computed:{
          dropOptions(){
            return this.options;
          },
      },
      methods:{
        _autoShow:function(evt){
          let dropSelect=evt.target.parentNode;
         /* this.statusChange(dropSelect);*/
          this.isShow=!this.isShow;
        },
        _itemClick:function(option){
            this.dropOptions.options.forEach(data=>{
              data.active=false;
            });
//            this.selected=option.value;
            this.selected=option;
            this.cbChange(this.selected,option.name);
        },
        _autoHide(evt) {
          if (!this.$el.contains(evt.target)) {
            this.isShow = false;
          }
        }
      }
  }
</script>
<style lang="scss" scoped>
  .dropSelect{
    height:100%;
    line-height: 100%;
    /*padding:0 0.48rem;*/
  }
  .label-text{
    padding:0 0.48rem;
  }
  .label-text{
    /*font-size: 26px;*/
    height: 100%;
    @include font-dpr(26px);
    /*font-size:0.35rem;*/
    line-height: 1rem;
    color:#8E8E8E;
  }
  .label-text.active{
    color:#FF8556;
  }
  .arrow_d{
    display: inline-block;
    width:0.586667rem;
    height:0.586667rem;
    background: url("img/arrow_d.png") no-repeat;
    background-size: 100%;
    vertical-align: middle;
  }
  .dropSelect ul{
    position: absolute;
    width:100%;
    top:100%;
    left:0;
    background: #ffffff;
    z-index:11;
  }
  .dropSelect ul li{
    height:1.06rem;
    line-height: 1.06rem;
    padding:0 0.48rem;
    color:#8E8E8E;
    /*font-size: 24px;*/
    @include font-dpr(24px);
    /*font-size:0.32rem;*/
    border-bottom:1px solid #EAEAEA;
  }
  .dropSelect ul li.active span{
    float: right;
    display: inline-block;
    width:0.586667rem;
    height:0.586667rem;
    background: url("img/right.png") no-repeat;
    background-size: 100%;
    margin-top:4%;
  }

</style>
