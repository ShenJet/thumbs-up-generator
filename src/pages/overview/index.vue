<template>
  <div id="container">
    <div class="con">
      <swiper 
        :indicator-dots="false"
        :autoplay="false" 
        interval="280000" 
        duration="800" 
        circular="false" style="width:750rpx;height:100%">
        <block v-for="(x,i) in mainimgs" :key="i">
          <swiper-item>
            <img mode='widthFix' :src="x.path" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="fix">
      <div class="t">{{text}}</div>
      <div class="operation">
        <div class="l" @click="toIndex">
          <img src="/static/images/index/wxin.png" mode='widthFix' alt="">
          <span>取消</span>
          <img src="/static/images/index/comment.png" mode='widthFix' alt="">
          <span>评论</span>
        </div>
        <div class="r" @click="toDetail">
          <img src="/static/images/index/wxin.png" mode='widthFix' alt="">
          <span>{{zanCount}}</span>
          <img src="/static/images/index/comment.png" mode='widthFix' alt="">
          <span>{{commentCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import chooseImg from '../../utils/chooseImg'
export default {
  data () {
    return {
      imgArr:[],
      nickname:'',
      text:'',
      mainimgs:[],
      time:"",
      zanCount: 15,
      commentCount:10,
      avatar:'',
    }
  },
  methods: {
    toIndex(){
      wx.navigateTo({url:'/pages/index/main'})
    },
    toDetail(){
      wx.navigateTo({url:'/pages/detail/main'})
    },
    nicknameSet(){
      store.commit('setNickname', )
    },
    async avatarChoose(){
      let imgs = await chooseImg(['compressed'], ['album'], 1)
      console.log('imgs:');
      console.log(imgs);
      if(imgs.length){
        this.avatar = imgs[0].path
        store.commit('setAvatar', imgs[0].path)

      }
    },
    async imgChoose(){
      // (type=['original', 'compressed'], from=['album', 'camera'], count=5)
      let imgs = await chooseImg(['compressed'], ['album'], 9)
      console.log('imgs:');
      console.log(imgs);
      if(imgs.length){
        this.mainimgs = imgs
        store.commit('setMainImgs', imgs)

      }
    },
  },

  created () {
  },
  onShow(){
    this.imgArr =       store.state.randomArr
    this.nickname =     store.state.nickname 
    this.text =         store.state.text 
    this.mainimgs =     store.state.mainImgs 
    this.time =         store.state.time 
    this.zanCount =     store.state.zanCount 
    this.commentCount = store.state.commentCount 
    this.avatar =       store.state.avatar 

    console.log(store.state.mainImgs );
    
    wx.setNavigationBarTitle({title: store.state.time || '今天 6:39'})
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
  background: #000;
  height: 100%;
}
</style>
<style lang=scss scoped>
#container{
  padding: 0;
  height: 100%;
  .add{
    color: #444feb;
    font-size: 40rpx;
    text-align: center;
    padding: 20px 0;
  }
  .con{
    height: 95%;
    display: flex;
    align-items: center;
    swiper-item{
      display: flex;
      align-items: center;
      width:750rpx;
      height:100%;
      /* background: pink; */
      img{
        width:750rpx;
      }
    }
  }
  .fix{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .t{
      background: #00000099;
      color: #fff;
      font-weight: 500;
      font-size: 27rpx;
      padding: 15rpx 20rpx 34rpx;
    }
    .operation{
      background: #181818;
      padding: 0 15rpx;
      height: 88rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
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
