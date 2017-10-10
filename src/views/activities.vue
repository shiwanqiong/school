<template>
  <div class="activity">
    <div class="select-group">
      <div class="select-item" v-for="(option,index) in tabs" ref="selectItem">
        <drop-select :options="option" :cbChange="_choosedChange" :labelActive="dropActive[index]"
                     :customClass="'select'+index"></drop-select>
      </div>
    </div>
    <div class="content">
      <div v-if="items.length!=0">
        <scroll ref="scroll"
                :data="items"
                :scrollbar="scrollbarObj"
                :pullUpLoad="pullUpLoadObj"
                :pullDownRefresh="pullDownRefreshObj"
                @pullingDown="_onPullingDown"
                :startY="parseInt(startY)"
                @pullingUp="_onPullingUp">
          <ul class="content-list">
            <li v-for="item in items" @click="_onClickItem(item.id)">
              <activity-item :actItem="item">
              </activity-item>
            </li>
          </ul>
        </scroll>
      </div>
      <div v-else>
        <p class="none-msg">暂无活动</p>
      </div>

    </div>
  </div>
</template>
<script>
  import dropSelect from '../components/dropSelect/dropselect'
  import scroll from '../components/scroll/scroll.vue'
  import activityItem from '../components/activityItem/activityItem.vue'
  /*import { default as hm } from '../assets/js/unit.js'*/
  export default {
    data()
    {
      return {
        items: [],
        tabs: [],
        selected: 'All',//筛选条件的值
        dropActive: [false, false, false],//处于active的dropdown的数组
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        startY: 0,
        scrollToX: 0,
        scrollToY: -200,
        scrollToTime: 700,
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        page: 0,//默认加载第一页
        size: 10,
        statusSelected: 0,
        typeSelected: 'All',
        levelSelected: 'All',
        dataLength: 0 //每次加载回来数据的条数
      }
    },
    components: {
      dropSelect: dropSelect,
      activityItem: activityItem,
      scroll: scroll
    },
    computed: {
//      choosedItems(){
//        let selectObj=[];
//        for(let i=0;i<this.selected.length;i++){
//          selectObj.push(this.selected[i]);
//        }
//        switch(selectObj[0]){
//          case '0':
//            return selectObj[1]=='0'?this.items:this.items.filter((data)=>data.status==selectObj[1]);
//            break;
//          case '1':
//            return selectObj[1]=='0'?this.items:this.items.filter((data)=>data.type==selectObj[1]);
//            break;
//          case '2':
//            return selectObj[1]=='0'?this.items:this.items.filter((data)=>data.class==selectObj[1]);
//            break;
//        }
//      },
      pullDownRefreshObj: function ()
      {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      scrollbarObj: function ()
      {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullUpLoadObj: function ()
      {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    mounted()
    {
      this.$nextTick(function ()
      {
        this._innitDropSelect();
        this._loadData(this.statusSelected, this.typeSelected, this.levelSelected, this.page, this.size);
      })
    },
    methods: {
      _onClickItem(id)
      {
        this.$router.push({name: 'ActivityDetail', params: {id: id}});
      },
      _innitDropSelect()
      {
        this.tabs = [
          {
            label: '状态',
            options: [
              {key: '00', name: '全部', active: false, value: 0},
              {key: '01', name: '未开始', active: false, value: 1},
              {key: '02', name: '进行中', active: false, value: 2},
              {key: '03', name: '已结束', active: false, value: 3},
            ]
          },
          {
            label: '类型',
            options: [
              {key: '11', name: '全部', active: false, value: 'All'},
              {key: '11', name: '思想政治与道德素养类', active: false, value: 'Ideological'},
              {key: '12', name: '学术科技活动', active: false, value: 'Learning'},
              {key: '13', name: '文体竞赛及校园文化活动', active: false, value: 'Literary'},
              {key: '14', name: '社会实践和社会工作', active: false, value: 'Practice'},
            ]
          },
          {
            label: '级别',
            options: [
              {key: '20', name: '全部', active: false, value: 'All'},
              {key: '21', name: '班级', active: false, value: 'Class'},
              {key: '22', name: '院系级', active: false, value: 'Department'},
            ]
          }
        ];
        this.dropActive = [false, false, false];
      },
      _loadData: function (status, type, level, page, size)
      {
        let _this = this;
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.screening","params":{"page":${page},"size":${size},"status":${status},"type":"${type}","level":"${level}"}}`,
          success: function (data)
          {
            if (data.code == 0)
            {
              let resData = data.content.data;
              _this.dataLength = resData.length;
              if (resData.length != 0)
              {
                if (page == 0)
                {
                  _this.items = [];
                }
                _this.items = _this.items.concat(resData);//数据提取
              }
              else if (resData.length == 0)
              {
                _this.items = _this.items.concat([]);
              }
            }
          }
        })
      },
      _choosedChange(selected, changedLabel)
      {
        let selectObj = [];
        let selectedKey = selected.key;
        /*this._innitDropSelect();*/
//        this.selected=selected.value;
        this.page = 0;//切换时重置页数
        for (let i = 0; i < selectedKey.length; i++)
        {
          selectObj.push(selectedKey[i]);
        }
        switch (selectObj[0])
        {
          case '0':
            this.dropActive[0] = true;
            this.tabs[0].label = changedLabel;
            this.tabs[0].options[selectObj[1]].active = true;
            this.statusSelected = selected.value;
            break;
          case '1':
            this.dropActive[1] = true;
            this.tabs[1].label = changedLabel;
            this.tabs[1].options[selectObj[1]].active = true;
            this.typeSelected = selected.value;
            break;
          case '2':
            this.dropActive[2] = true;
            this.tabs[2].label = changedLabel;
            this.tabs[2].options[selectObj[1]].active = true;
            this.levelSelected = selected.value;
            break;
        }
        this.items = [];
        this._loadData(this.statusSelected, this.typeSelected, this.levelSelected, this.page, this.size);
        this._rebuildScroll();
      },
//      _statusChange(e){
//        let selectItems=this.$refs.selectItem;
//        console.dir(selectItems);
//        console.log(selectItems.indexOf(e));
//      },
      _onPullingUp()
      {
        if (this.dataLength >= this.size)
        {
          this.page++;
          this._loadData(this.statusSelected, this.typeSelected, this.levelSelected, this.page, this.size);
        }
        else
        {
          this.$refs.scroll.forceUpdate();
        }
      },
      _onPullingDown()
      {
        this.page = 0;
        this._loadData(this.statusSelected, this.typeSelected, this.levelSelected, this.page, this.size);
      },
      _rebuildScroll()
      {
        this.$nextTick(() =>
        {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }

    },
    watch: {
      scrollbarObj()
      {
        this._rebuildScroll()
      },
      pullDownRefreshObj()
      {
        this._rebuildScroll()
      },
      pullUpLoadObj()
      {
        this._rebuildScroll()
      },
      startY()
      {
        this._rebuildScroll()
      }
    },
  }
</script>
<style>
  .select1 {
    flex: 1;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .select2 {
    text-align: right;
    padding: 0;
  }
</style>
<style lang="scss" scoped>
  .activity {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .content {
    flex: 1;
  }

  .list-wrapper {
    top: 1.06rem;
  }

  .select-group {
    width: 100%;
    height: 1.06rem;
    background: #F7F7F7;
    position: relative;
    display: flex;
  }

  .select-item {
    height: 100%;
    width: 33.3%;
  }

  /*.select-item:nth-child(2) .dropSelect{
    padding:0;
  }*/
  .select1 {
    flex: 1;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .select2 {
    text-align: right;
  }
</style>
