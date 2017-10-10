<template>
  <div id="management">
		<div class="nav">
			<ul>
				<li>
					<span>缺勤</span>
				</li>
				<li>
					<span>签到情况</span>
				</li>
				<li>
					<span>签退情况</span>
				</li>
			</ul>
		</div>
		<div v-if="items.length>0" class="list"> 
			<p v-for="item in items">
				<span>{{item.userName}}</span>
				<span>已签到</span>
				<span :class="{wrong: item.outType==2}">{{item.outType | sort}}</span>
			</p>
		</div>
        <div v-else>
          <p class="none-msg">暂无记录</p>
        </div>
	</div>
</template>
<script>
export default {
    data(){
        return {
            id:'',
            items: []
        }
    },
    mounted(){
        this.id = this.$route.params.did;
        this.$nextTick(function (){
            this._loadRecords();
        })
    },
    methods: { 
        _loadRecords(){
            var _this = this;
            hm.request({
                command:'request://hm',
                params: `{"api":"activity.sign_in_record","params":{"id":"${_this.id}"}}`,
                success: function (data){
                    _this.items = data.content.data;
                    // alert(JSON.stringify(_this.items));
                },
                failure: function (error){
                    hm.request({
                        command: 'toast://default',
                        params: `{"message":"${data.error}"}`
                    });
                }
            })
        }
    },
    filters: {
        sort: function (val){
            switch (val){
                case 0:
                    return '未签退';
                    break;
                case 1:
                    return '正常签退';
                    break;
                case 2:
                    return '早退';
                    break;
                default:
                    return '';
            }         
        }
    }
}
</script>
<style lang="scss" scoped>
.nav{
		font-family: PingFangSC-Regular;
		font-size: 0.346667rem;
		color: #8E8E8E;
		letter-spacing: 0.34px;
	}
	.nav ul{
		display: flex;
		flex-direction: row;
		background: #F7F7F7;
	}
	.nav ul li{
		width: 33.333%;
        text-align: center;
        padding: 0.35rem 0;
	}
	.nav ul li:nth-child(2) span{
		width: 100%;
		display: inline-block;
		border-left: 1px solid #E3E3E3;
		border-right: 1px solid #E3E3E3;
	}
	.nav ul li:first-child span{
		width: 2.3733rem;
		display: inline-block;
		text-align: left;
	}
	.nav ul li:last-child span{
		width: 2.3733rem;
		display: inline-block;
		text-align: right;
	}
	.list p{
		padding: 0.32rem 0.48rem;
		font-family: PingFangSC-Regular;
		font-size: 0.34667rem;
		color: #8E8E8E;
		border-bottom: 1px solid #EAEAEA;
		display: flex;
		justify-content: space-between;
	}
	.list p span:first-child{
		color: #4A4A4A;
	}
	.wrong{
		color: #FF8556;
	}
</style>


