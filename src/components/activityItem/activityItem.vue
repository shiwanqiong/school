<template>
  <div class="activityItem content-item">
    <div class="item-detail">
      <slot></slot>
      <div class="img-ctn">
        <!--actItem.picture==''?'./img/activity.png':(path+actItem.picture)-->
        <img :src="actItem.picture==''?defaultPath:(path+actItem.picture)" width="100%" alt="">
      </div>
      <div class="text-ctn" :class="{progress:actItem.activityState=='进行中'}">
        <p class="title">{{actItem.name}}</p>
        <p class="detail"><span class="status">{{actItem.activityState}}</span><span
          class="class-count"><i>{{actItem.period}}</i>课时</span><span class="address">{{actItem.addr}}</span></p>
        <p span class="space"></p>
        <p class="date">{{actItem.startTime | timeFormat}}<slot name="checkStatus"></slot></p>
        <slot name="checkStatus"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import moment from 'moment'

  Vue.use(moment)
  export default {
    data()
    {
      return {
        path: 'http://app.hm-keji.com//classroom/upload/',
        defaultPath: '../../../static/images/activity.png',
        checkStatus: "待提交"
      }
    },
    props: {
      actItem: {
        type: Object
      }
    },
    filters: {
      timeFormat: function (value, formatString)
      {
        formatString = formatString || 'MM-DD';
        return moment(value).format(formatString);
      },
      status: function (stu)
      {
        if (stu == "Pending")
        {
          return  "待审核";
        } else if (stu == "Teacher_Approved")
        {
          return "老师审核通过";
        } else if (stu == "Teacher_Refuse")
        {
          return "老师审核拒绝";
        } else if (stu == "Director_Approved")
        {
          return "系主任审核通过";
        } else if (stu == "Director_Refuse")
        {
          return "系主任审核拒绝";
        }else{
          return "待提交";
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .content-item {
    padding: 0.51rem 0.48rem 0.48rem;
    border-bottom: 1px solid #EAEAEA;
    @include font-dpr(24px);
    /*font-size: 24px;*/
    /*font-size: 0.32rem;*/
  }

  .item-detail {
    display: flex;
  }

  .img-ctn {
    flex-shrink: 0;
    width: 2.74rem;
    height: 2.08rem;
    /*background: url("img/activity.png") no-repeat;*/
    /*background-size: contain;*/
  }

  .img-ctn img {
    width: 100%;
    height: 100%;
  }

  .img-ctn:last-child {
    border: none;
  }

  .text-ctn {
    width: 4.853333rem;
    flex: 1;
    padding-left: 0.53rem;
  }

  .text-ctn p {
    margin-bottom: 0.306667rem;
  }

  .text-ctn p.space {
    margin-bottom: 0.2rem;
  }

  .text-ctn p.date {
    margin-bottom: 0;
  }

  .title {
    @include font-dpr(28px);
    /*padding-top: 0.1rem;*/
    padding-top:0.026667rem;
    color: #4A4A4A;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .detail {
    display: flex;
    line-height: 0.4rem;
  }

  .detail span {
    margin-right: 0.53rem;
    line-height: 0.4rem;
    color: #8E8E8E;
  }

  .detail span:last-child {
    margin-right: 0;
  }

  .status {
    display: inline-block;
    @include font-dpr(20px);
    padding: 0 0.093333rem;
    height: 0.453333rem;
    line-height: 0.3rem;
    text-align: center;
    color: #C2C2C2;
    background: #F5F5F5;
    border-radius: 0.03rem;
    border: 1px solid #E6E6E6;
  }

  .space {
    display: inline-block;
    width:0.35rem;
    height:0.026667rem;
    background: #DBDBDB;
  }

  .progress .status {
    background: #FF8556;
    color: #ffffff;
    border-color: #FF8556;
  }

  .class-count {
    @include font-dpr(24px);
    /*font-size: 24px;*/
    /*font-size: 0.32rem;*/
    color: #8E8E8E;
  }

  .address {
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .progress .class-count {
    color: #FF8556;
  }

  .class-count i {
    color: #FF8556;
    font-style: normal;
    margin-right: 0.05rem;
  }

  .date {
    color: #C2C2C2;
  }
</style>

