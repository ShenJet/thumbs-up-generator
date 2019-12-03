<template>
  <div id="container">
    <div class="top">
      <div class="l">
        <img :src="user" class="user" alt="" mode='widthFix'>
      </div>
      <div class="r">
        <div class="nickname">{{nickname}}</div>
        <div class="text">{{text}}</div>
        <div class="imgs">
          <img v-for="(x,i) in imgs" :key="i" :src="x" alt="" class="f" mode='widthFix'>
        </div>
      </div>
    </div>
    <div class="friends">
      <img v-for="(x,i) in imgArr" :key="i" :src="x" alt="" class="f" mode='widthFix'>
    </div>
    <div class="fix">
      <input type="text">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count:146,
      imgArr:[],
      user:'/static/images/1.jpg',
      nickname:'小敏',
      text:'长申购物广场12月3日开始试营业！\n大家帮忙点赞，急，谢谢各位~~~',
      imgs:[],
    }
  },
  methods: {

  },

  created () {
    // let app = getApp()
    this.imgArr = []
  },
  onShow(){
    let i=1
    while(this.imgArr.length<this.count){
      let index = '/static/images/'+ i + '.jpg'
      this.imgArr.push(index)
      i++
    }
  }
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
      .nickname{
        font-size: 28rpx;
        color: #5b6a91;
        font-weight: 600;
      }
      .text{
        font-size: 26rpx;
        color: #111111;
        /* font-weight: 600; */
      }
    }
  }
  .friends{
    padding: 16rpx 62rpx 15rpx 62rpx;
    background-color: #f3f3f4;
    .f{
      width: 64rpx;
      border-radius: 12rpx;
      margin-right: 8rpx;
    }
  }
}
</style>
