import HttpRequest  from './request.js'

function CRequest (){
  HttpRequest.call(this)
}
CRequest.prototype = Object.create(HttpRequest.prototype)
CRequest.prototype.constructor = CRequest
//这里可以根据不同规则重写
CRequest.prototype.callbackHandle = function(isSuccess,res,error,callback){
  // 只要请求成功 isSuccess = true
  console.log(123, res, isSuccess)
 if(isSuccess){
   console.log('state--',res)
   // 根据返回的 state 判断
   if(res.state){
     // 请求成功的正常数据
     if(callback) callback(true,res.data)
   }
   else{
     // 请求成功的异常数据
     if(callback) callback(false,null,{
       errorNo:res.errCode,
       errorMsg:res.errMsg
     })
   }
 }
 else{
   if(callback) callback(isSuccess,null,error)
 }
}

export default CRequest
