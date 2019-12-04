<template>
  <div id="container">
    <img class="logo" mode='widthFix' src="/static/images/index/logo.png" alt="">
    <div class="title">赞尼玛</div>

    <div class="gap"></div>

    <div class="head">
      为了给您提供更好的服务，该程序将获取以下 授权：
    </div>

    <div class="info">
      获得您的公开信息（昵称，头像等）
    </div>

    <div class="btns">
      <button class="l" type="primary" @click="refuse">拒绝</button>
      <button class="r" type="primary" @getuserinfo="getUserInfo" 
      open-type='getUserInfo'
      >允许</button>
    </div>
  </div>
</template>

<script>
import checkscope from '@/utils/check_scope'
import store from '../../store'
export default {
  data () {
    return {
      smsCode:"",
      userInfo: {
        nickName: '尚未登录',
        avatarUrl: ''
      }
    }
  },
  components: {
  },
  methods: {
    refuse(){
      console.log('拒绝');
      wx.navigateBack({
        delta: 1
      });
    },
    async getUserInfo() {
      var self = this;

      let checkscoperes = await checkscope('scope.userInfo')
      console.log( 'check scope.userInfo res:' ,checkscoperes);
      
      if(!checkscoperes){
        wx.setStorageSync('auth', 0)
        return wx.showModal({
          title: '阿欧~',
          content: '骚年，告诉老衲你为何拒绝？',
          cancelText:"关闭",
          confirmText:"闭关",
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.setStorageSync('auth', 1)
        wx.navigateTo({
          url: '/pages/overview/main'
        })
      }

    },
  },
  created () {

  },
}
</script>

<style lang='scss' scoped>
#container{
  padding-top: 20rpx;
  .logo{
    display: block;
    width:156rpx;
    border-radius:12rpx;
    margin: 100rpx auto 26rpx;
  }
  .title{
    font-size:36rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: center;

  }
  .gap{
    width:640rpx;
    height:1rpx;
    background:rgba(204,204,204,1);
    margin: 60rpx auto 0;
  }
  .head{
    width:640rpx;
    font-size:32rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin: 50rpx auto 0;
  }
  .info{
    width:640rpx;
    font-size:28rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
    margin: 40rpx auto 0;
  }
  .btns{
    width:640rpx;
    margin: 48rpx auto 0;
    display: flex;
    justify-content: space-between;
    button{
      width:300rpx;
      height:82rpx;
      border-radius:40rpx;
    }
    .l{
      background:#999999;
    }
    .r{
      background:#2D8CF0;
    }
  }
}
</style>
