
// 照片选择

function chooseImg(type=['original', 'compressed'], from=['album', 'camera'], count=5){
    return new Promise((resolve, reject) => {
      mpvue.chooseImage({
        count: count,
        sizeType: type,
        sourceType: from,
        success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFiles = res.tempFiles
            resolve(tempFiles)
        },
        fail(err){
          resolve([])
        }
      })
    })
  }
  export default chooseImg