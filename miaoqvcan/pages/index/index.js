const db = wx.cloud.database().collection("list1")
var id=""
var updid=""
var uage=""
Page({
    
    delectId(event){
        id=event.detail.value
        console.log(id)
    },
    updataId(event){
        updid=event.detail.value
    },
    updataage(event){
        uage=event.detail.value
    },
 //添加数据
 addData(){
db.add({
  data:{
      name:"宋科凡",
      age:20
  },
  success(res) {
      console.log("添加成功",res)
  },
  fail(res){
    console.log("添加成功",res)
  }
})
},
//删除数据
delectData(){
    db.doc(id).remove({
        success(res) {
            console.log("删除成功",res)
        },
        fail(res){
          console.log("删除失败",res)
        } 
    })
},
//修改数据
updataData(){
    db.doc(updid).update({
        data:{
            age:uage
        },
        success(res) {
            console.log("修改成功",res)
        },
        fail(res){
        console.log("修改失败",res)
        }
    })
},
//查询数据
getData(){
    db.get({success(res){
        console.log("查询数据成功",res)
    }
})
},


})
