<template>
  <div class="activity-detail">
    <div class="banner">
      <!--<img src="../../assets/img/default-max.png" alt="">-->
      <img :src="detail.picture==''?defaultPath:(path+detail.picture)" width="100%" alt="">
    </div>
    <div class="major">
      <p class="first">
        <span class="title">{{detail.name}}</span>
        <span class="during">{{detail.activityState}}</span>
      </p>
      <p class="second">
        <span>{{detail.activityLevel | level}}</span>
        <b></b>
        <span>{{detail.activitySort | sort}}</span>
        <b></b>
        <span>{{detail.activitySortTwo | sortTwo}}</span>
      </p>
      <p class="third"></p>
      <ul class="fourth">
        <li>
          <!--<img src="../../assets/img/a1.png" alt="">-->
          <!--<span class="l-mid">活动小组：</span>-->
          <!--<span>2016级英语2班</span>-->
        </li>
        <li>
          <img src="../../assets/img/a2.png" alt="">
          <span class="l-mid">活动时间：</span>
          <span class="l-left l-color">{{detail.startTime | timeFormat}}</span>
          至
          <span class="l-right l-color">{{detail.endTime | timeFormat}}</span>
        </li>
        <li>
          <img src="../../assets/img/a3.png" alt="">
          <span class="l-mid">活动地点：</span>
          <span class="l-addr">{{detail.addr}}</span>
        </li>
        <li>
          <img src="../../assets/img/a4.png" alt="">
          <span class="l-mid">活动课时：</span>
          <span class="l-color l-number">{{detail.period}}</span> <span>课时</span>
        </li>
        <li>
          <img src="../../assets/img/a5.png" alt="">
          <span class="l-mid">活动发布：</span>
          <span>{{detail.userName}}</span>
        </li>
      </ul>
    </div>
    <div class="detail">
      <p class="a-detail">活动详情</p>
      <div class="a_detail">
        <p class="a-t"></p>
        <div v-html="newline(detail.details)" class="a-d"></div>
      </div>
    </div>
    <!--<div class="btn">签到</div>-->
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
        defaultPath: '../../../static/images/actDetail_banner.png',
      };
    },
    props: {
      detail: {
        type: Object
      }
    },
    methods: {
      newline: function (data)
      {
        if (data)
        {
          let a = data.replace(/\n/g, "<br/>")
            .replace(/\r/g, "&nbsp;");
          return a;
        }
        else
        {
          return data;
        }
      }
    },
    filters: {
      sort: function (val)
      {
        if (!val)
        {
          return ''
        }
        switch (val)
        {
          case 'Ideological':
            return '思想政治类';
            break;
          case 'Learning':
            return '专业学术类';
            break;
          case 'Literary':
            return '文体竞赛和校园文体类';
            break;
          case 'Practice':
            return '社会实践类';
          default:
            return '';
        }
      },
      sortTwo: function (val)
      {
        if (!val)
        {
          return ''
        }
        switch (val)
        {
          case 'PartyLeague':
            return '党团活动';
            break;
          case 'Thematic':
            return '主题教育活动';
            break;
          case 'Ideological':
            return '思想政治理论学习活动';
            break;
          case 'RestIdeological':
            return '其他思想政治类活动';
          case 'Competition':
            return '学术和学科竞赛';
          case 'Research':
            return '学术论文和研究成果';
          case 'Chair':
            return '学术科技类报告、讲座';
          case 'Study':
            return '国内外访学或游学';
          case 'Literary':
            return '文体竞赛活动';
          case 'Campus':
            return '校园文化活动';
          case 'Practice':
            return '社会实践活动';
          case 'Work':
            return '社会工作';
          default:
            return '';
        }
      },
      level: function (val)
      {
        if (!val)
        {
          return ''
        }
        switch (val)
        {
          case 'Class':
            return '班级';
            break;
          case 'Department':
            return '系级';
          default:
            return '';
        }
      },
      timeFormat: function (value, formatString)
      {
        formatString = formatString || 'MM-DD HH:mm';
        return moment(value).format(formatString);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .banner {
    margin-bottom: 0.1333rem;
    display: flex;
  }

  .banner img {
    width: 100%;
    height: 4.26667rem;
  }

  .major {
    padding: 0.42667rem 0.48rem;
    background: #fff;
    margin-bottom: 0.1333rem;
  }

  .major .title {
    font-family: PingFangSC-Regular;
    font-size: 0.37333rem;
    @include font-dpr(28px);
    /*height: 0.37333rem;*/
    padding-top: 0.1rem;
    color: #4A4A4A;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
    /*-o-text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    width: 85%;
  }

  .first {
    display: flex;
    justify-content: space-between;
    line-height: 0.37333rem;
  }

  .first span:last-child {
    @include font-dpr(20px);
    font-size: 0.26667rem;
    color: #C2C2C2;
    padding: 0 0.093333rem;
    background: #F5F5F5;
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    height: 0.453333rem;
    line-height: 0.4rem;
    text-align: center;
  }

  .second {
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    /*height: 0.32rem;*/
    line-height: 0.32rem;
    color: #8E8E8E;
    margin-top: 0.37333rem;
  }

  .second b {
    display: inline-block;
    width: 2px;
    height: 0.32rem;
    background: #DBDBDB;
    margin: 0 0.26667rem;
  }

  .third {
    width: 100%;
    height: 1px;
    background: #EAEAEA;
    margin-top: 0.4rem;
  }

  .fourth li {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    font-family: PingFangSC-Regular;
    font-size: 0.34667rem;
    line-height: 0.586667rem;
  }

  .fourth li img {
    width: 0.586667rem;
    height: 0.586667rem;
  }

  .fourth li span {
    line-height: 0.58667rem;
  }

  .l-mid {
    color: #8E8E8E;
    margin-left: 0.34667rem;
    margin-right: 0.16rem;
  }

  .l-left {
    margin-right: 0.13333rem;
  }

  .l-addr {
    width: 65%;
  }

  .l-right {
    margin-left: 0.13333rem;
  }

  .l-color {
    color: #FF8556;
  }

  .l-number {
    margin-right: 0.05333rem;
  }

  .detail {
    background: #fff;
    padding-bottom: 1.06667rem;
  }

  .a-detail {
    font-family: PingFangSC-Regular;
    @include font-dpr(26px);
    color: #4A4A4A;
    padding: 0.29333rem 0.48rem;
    border-bottom: 1px solid #EAEAEA;
  }

  .a_detail {
    padding: 0.37333rem 0.48rem;
  }

  .a-t {
    font-family: PingFangSC-Regular;
    font-size: 0.37333rem;
    color: #4A4A4A;
    /*margin-bottom: 0.48rem;*/
  }

  .a-d {
    font-family: PingFangSC-Regular;
    @include font-dpr(24px);
    color: #8E8E8E;
    line-height: 0.506667rem;
    word-break: break-all;
    word-wrap: break-word;
  }

  .btn {
    width: 8.26667rem;
    margin: 1.06667rem auto;
    background: #C2C2C2;
    border-radius: 0.1333rem;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
    color: #FFFFFF;
    text-align: center;
    height: 1.3333rem;
    line-height: 1.3333rem;
  }
</style>
