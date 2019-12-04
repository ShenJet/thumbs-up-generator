<template>
  <div id="container">
    <div class="add" @click="avatarChoose" >
      <span>1.设置头像</span>
      <div style="width:120rpx;height:120rpx;background:#ccc;border-radius:4px;">
        <img :src="avatar" alt="" mode='widthFix' style="width:120rpx;border-radius:4px;" />
      </div>
    </div>
    <div class="add">
      <span>2.设置昵称</span>
      <div>
        <input @input="inputChange($event,'nickname')" type="text" :value="nickname" placeholder="输入你的昵称~">
      </div>
    </div>
    <div class="add">
      <span>3.设置显示时间</span>
      <div>
        <input @input="inputChange($event,'time')" type="text" :value="time" placeholder="输个时间~">
      </div>
    </div>
    <div class="add" @click="imgChoose">
      <span>4.设置主图</span>
      <div class="imgs">
        <img v-for="(x,i) in mainimgs" :key="i" :src="x.path" alt=""  class="f" mode='aspectFill'>
      </div>
    </div>
    <div class="add">
      <span>5.设置文本内容</span>
      <div>
        <textarea @input="inputChange($event,'text')" :value="text" cols="30" rows="10" placeholder="发表内容~"></textarea>
      </div>
    </div>
    <div class="add">
      <span>6.设置点赞数</span>
      <div>
        <input @input="inputChange($event,'zanCount')" type="number" :value="zanCount" placeholder="输入点赞数~">
      </div>
    </div>
    <div class="add">
      <span>7.设置评论数</span>
      <div>
        <input @input="inputChange($event,'commentCount')" type="number" :value="commentCount" placeholder="输入评论数~">
      </div>
    </div>

    <div class="con">
      
    </div>
    <div class="fix">
      <div class="operation">
        <div class="l">
          <button size='mini' plain='true' type="warn" @click="reset">全部重置</button>
        </div>
        <div class="r">
          <button size='mini' type="primary" @click="generate">立即生成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import chooseImg from '../../utils/chooseImg'
import checkscope from '@/utils/check_scope'
export default {
  data () {
    return {
      nickname:'',
      text:'',
      mainimgs:[],
      time:"今天 6:37",
      zanCount: 146,
      commentCount:23,
      avatar:'',
    }
  },
  methods: {
    inputChange(e,key){
      this[key] = e.mp.detail.value
    },
    toIndex(){
      wx.navigateTo({url:'/pages/detail/main'})
    },
    nicknameSet(){
      store.commit('setNickname', )
    },
    async avatarChoose(){
      let imgs = await chooseImg(['compressed'], ['album'], 1)
      if(imgs.length){
        this.avatar = imgs[0].path
        store.commit('setAvatar', imgs[0].path)
      }
    },
    async imgChoose(){
      let imgs = await chooseImg(['compressed'], ['album'], 9)
      if(imgs.length){
        this.mainimgs = [...imgs]
        store.commit('setMainImgs', imgs)
      }
    },
    reset(){
      store.commit("setMainImgs", '')
      store.commit("setRandomArr", '')
      store.commit("setAvatar", '')
      store.commit("setText", '')
      store.commit("setNickname", '')
      store.commit("setZanCount", 10)
      store.commit("setCommentCount", 6)
      store.commit("setTime", '今天 6:35')


      this.nickname = ''
      this.text = ''
      this.mainimgs = []
      this.time = "今天 6:37"
      this.zanCount =  10
      this.commentCount = 23
      this.avatar = ''

      let arr = []
      let i=1
      while(arr.length < this.zanCount){
        let index = '/static/images/f/'+ i + '.jpg'
        arr.push(index)
        i++
      }
      store.commit('setRandomArr', arr)
    },
    async generate(){
      let count = wx.getStorageSync('generateCount')
      let generateCount =  count?count*1:0
      generateCount++
      wx.setStorageSync('generateCount', generateCount)
      console.log(
        this.nickname ,
        this.text ,
        this.mainimgs ,
        this.time ,
        this.zanCount ,
        this.commentCount ,
        this.avatar ,
      );
      store.commit("setMainImgs",     this.mainimgs)
      store.commit("setAvatar",       this.avatar)
      store.commit("setText",         this.text)
      store.commit("setNickname",     this.nickname)
      store.commit("setZanCount",     this.zanCount)
      store.commit("setCommentCount", this.commentCount)
      store.commit("setTime",         this.time)

      if(this.zanCount>200){
        return wx.showModal({
          title: '哦哟~',
          content: '小伙子心不要太黑晓得伐？',
          cancelText:"嗯嗯",
          confirmText:"嗯嗯",
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      let arr = []
      let i=1
      while(arr.length < this.zanCount){
        let index = '/static/images/f/'+ i + '.jpg'
        arr.push(index)
        i++
      }
      store.commit('setRandomArr', arr)
      
      let checkscoperes = await checkscope('scope.userInfo')
      console.log( 'check scope.userInfo res:' ,checkscoperes);
      if(checkscoperes){
        return wx.navigateTo({url: '/pages/overview/main'})
      }
      wx.navigateTo({url: '/pages/permission/main'})
    }
  },

  onLoad () {
    // console.log('onLoad!');
    this.reset()
  },
  onShow(){
    // console.log('onshow');
    return
  },
  onShareAppMessage(){
    return {
      title:'瞧这里有个jian商，赶紧来欺负Ta!',
      path:'/pages/index/main', //这里拼接需要携带的参数
      success(res){
        console.log("转发成功"+res);
      }
    }
  },
}
</script>
<style lang=wxss >
page{
  background: #fff;
}
</style>
<style lang=scss scoped>
#container{
  padding: 0 0 100px 0;
  .add{
    font-size: 40rpx;
    padding: 20px 45rpx;
    span{
      color: #444feb;
    }
    .imgs{
      display: flex;
      flex-wrap: wrap;
      
      .f{
        width: 157rpx;
        height: 157rpx;
        margin-right: 8rpx;
        margin-bottom: 8rpx;
      }
    }
    input, textarea{
      border:1rpx solid #e5e5e5;
      border-radius: 4rpx;
      padding: 6px;
    }
  }
  .fix{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .operation{
      background: #e6e6e6;
      padding: 8px 95rpx;
      height: 88rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      border-top: 2rpx solid #e3e3e3;
      img{
        width: 28rpx;
        margin-right: 9rpx;
      }
      >div{
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 24rpx;
        span{
          padding-right: 18rpx;
        }
      }
    }
  }
}
</style>
