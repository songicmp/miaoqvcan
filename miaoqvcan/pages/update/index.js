// pages/update/index.js
const db = wx.cloud.database().collection('cantingxinxi')
var api_logo=""
var api_poster=""
var locate=""
var number=""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    oneButton: [{text: '确定'}],
    showtrueButtonDialog: false
  },
  get_locate(event){
    locate=event.detail.value
    console.log(locate)
  },
  get_number(event){
    number=event.detail.value
    console.log(number)
  },
  get_logo(){
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        api_logo= res.tempFilePaths[0]
        console.log(api_logo)
        // tempFilePath可以作为img标签的src属性显示图片
      }
    })
  },get_poster(){
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        api_poster= res.tempFilePaths[0]
        console.log(api_poster)
        // tempFilePath可以作为img标签的src属性显示图片
      }
    })
  },
  taptrueDialogButton(){
    this.setData({
        showtrueButtonDialog: true
    })
    console.log("111")
  },
  update(){
    var logo_id=""
    var poster_id=""
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+'_logo.png',
      filePath: api_logo, // 文件路径
      success: res => {
        // get resource ID
        logo_id=res.fileID
        console.log(logo_id),
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'_poster.png',
          filePath: api_poster, // 文件路径
          success: res => {
            // get resource ID
            poster_id=res.fileID
            console.log(poster_id),
            db.add({
              data:{
                locate:locate,
                number:number,
                logo_id:logo_id,
                poster_id:poster_id
              }
            })
          },
          fail: err => {
            // handle error
          }
        })
      },
      fail: err => {
        // handle error
      }
    })
    this.taptrueDialogButton()
  },
  tapDialogButton() {
    this.setData({
        showtrueButtonDialog: false
    })
}
})