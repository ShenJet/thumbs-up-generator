<template>
  <div id="container">
    <div class="top">
      <div class="l">
        <!-- @click="avatarChoose" -->
        <img :src="avatar" class="user" alt=""  mode='widthFix'>
      </div>
      <div class="r">
        <div class="nickname">{{nickname}}</div>
        <div class="text">{{text}}</div>
        <div class="imgs">
          <div class="empty" @click="imgChoose" v-if="!mainimgs.length"></div>
          <img v-for="(x,i) in mainimgs" :key="i" :src="x.path" alt="" class="f" @click="imgChoose" mode='aspectFill'>
        </div>
        <div class="time">{{time}}</div>
      </div>
    </div>
    <div class="friends">
      <img src="/static/images/index/xin.png" class="xin" mode="widthFix" alt="">
      <img v-for="(x,i) in imgArr" :key="i" :src="x" alt="" class="f" mode='widthFix'>
    </div>
    <div class="fix">
      <input type="text">
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
      avatar:'', 
      nickname:'',
      text:'',
      mainimgs:[],
      time:"",
      zanCount: 15,
      commentCount: 10,
    }
  },
  methods: {
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

<style lang=scss scoped>
#container{
  padding: 12px 30rpx;
  .top{
    display: flex;
    .l{
      .user{
        width: 73rpx;
        border-radius: 12rpx;
      }
    }
    .r{
      padding: 0 36rpx;
      .imgs{
        display: flex;
        flex-wrap: wrap;
        img{
          width: 157rpx;
          height: 157rpx;
          margin-right: 8rpx;
          margin-bottom: 8rpx;
        }
        .empty{
          width: 157rpx;
          height: 157rpx;
          margin-right: 8rpx;
          margin-bottom: 8rpx;
        }
      }
      .nickname{
        font-size: 28rpx;
        color: #5b6a91;
        font-weight: 600;
      }
      .text{
        font-size: 26rpx;
        color: #2b2b2b;
        font-weight: 600; 
        padding: 20rpx 0 16rpx;
      }
      .time{
        font-size: 20rpx;
        color: #666666;
        padding: 0 0 40rpx;
      }
    }
  }
  .friends{
    padding: 16rpx 62rpx 15rpx 62rpx;
    background-color: #f3f3f4;
    position: relative;
    .f{
      width: 64rpx;
      border-radius: 12rpx;
      margin-right: 8rpx;
    }
    .xin{
      display: block;
      width: 28rpx;
      position: absolute;
      top: 37rpx;
      left: 22rpx;
    }
  }
  .fix{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
}
</style>
