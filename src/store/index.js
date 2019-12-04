// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mainImgs:[],
    randomArr:[],
    avatar:'',
    text:'',
    nickname:'',
    zanCount:10,
    commentCount:6,
    time:'今天 7:16'
  },
  mutations: {
    setMainImgs: (state,v) => {
        state.mainImgs = [...v]
    },
    setRandomArr: (state,v) => {
      state.randomArr = [...v]
    },
    setAvatar: (state,v) => {
      state.avatar = v
    },
    setText: (state,v) => {
      state.text = v
    },
    setNickname: (state,v) => {
      state.nickname = v
    },
    setZanCount: (state,v) => {
      state.zanCount = v
    },
    setCommentCount: (state,v) => {
      state.commentCount = v
    },
    setTime: (state,v) => {
      state.time = v
    },
  }
})

export default store
