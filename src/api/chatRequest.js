import HttpRequest  from './request.js'

function CRequest (){
  HttpRequest.call(this)
}
CRequest.prototype = Object.create(HttpRequest.prototype)
CRequest.prototype.constructor = CRequest
//这里可以根据不同规则重写
CRequest.prototype.callbackHandle = function(isSuccess,res,error,callback){
  console.log(123, res, isSuccess)
 if(isSuccess){
   if(res.ret){
     if(callback) callback(true,res.data)
   }
   else{
     if(callback) callback(false,null,{
       errorNo:res.errcode,
       errorMsg:res.errmsg
     })
   }
 }
 else{
   if(callback) callback(isSuccess,null,error)
 }
}

export default CRequest
