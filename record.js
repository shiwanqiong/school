/**
 * Created by qq on 2017/9/20 0020.
 */
// 请求用户角色
hm.request({
  command: 'data://user/getuserinfo',
  success: function(data) {
    let role = data.current_role;
    if(role==='Student'){
      _this.navText.title='我的活动';
      _this.navText.subTitle='与我相关活动';
      _this.navText.pathName='Activities'
    }
    else{
      _this.navText.title='活动审核';
      _this.navText.subTitle='审核相关活动';
      _this.navText.pathName='WillCheck'
    }
  },
  failure: function (error){
  }
});

// 请求数据
hm.request({
  command:'request://hm',
  params: `{"api":"activity.screening","params":{"page":${page},"size":${size},"status":${status},"type":${type},"level":${level}}}`,
  success:function(data){
    if(data.code==0){
      let resData=data.content.data;
      _this.dataLength=resData.length;
      if(resData.length!=0){
        _this.items=_this.items.concat(data.content.data);//数据提取
      }
    }
  }
})

//禁止下拉刷新（原生）
hm.request({
  command:'hm_window://init',
  params:'{"refresh_enabled":false}'
});

//设置导航栏
