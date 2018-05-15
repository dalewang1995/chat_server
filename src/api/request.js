const axios = require('axios');
let HttpRequest = function (){}
HttpRequest.prototype.axios = axios
// axios.defaults.withCredentials = true
HttpRequest.prototype.postRequest = function(url,data,callback,args1){
  this.httpHandle(url,data,callback,'post',args1)
}

HttpRequest.prototype.getRequest = function(url,data,callback,args1){
  this.httpHandle(url,data,callback,'get',args1)
}

//中间件处理
HttpRequest.prototype.callbackHandle = function(isSuccess,res,error,callback){
  callback(isSuccess,res)
}

HttpRequest.prototype.httpHandle = function(url,data,callback,type,args1){
  this.http(url,data,(isSuccess,data,error)=>{
    this.callbackHandle(isSuccess,data,error,callback,args1)
  },type)
}

HttpRequest.prototype.http = function(url,paramsData,callback,type){
  console.log('http:',url,paramsData)
  // console.log('-------header='+axios.defaults.headers.common["cookies"])
  let data = type==='post' ? paramsData : null
  let params = type==='get' ? paramsData : null
  let req = { method: type, url: url, data,params,withCredentials: true}

  if(axios.defaults.cookiesStr){
    req.headers = {
      cookie: axios.defaults.cookiesStr
    }
    req.timeout = 10*1000
  }

  axios(req)
    .then(res=>{
      console.log('http-callback',url)//,res
      if(callback) callback(true,res.data)
    }).catch(err=>{
      console.log('http-post-callback error',url,err)
      if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if(callback) callback(false,null,{errorNo:-1000,errorMsg:'网络请求错误'})
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if(callback) callback(false,null,{errorNo:-1000,errorMsg:'网络请求错误'})
    }
    else{
      //程序自带处理错误，默认不做提示
    }

  })
}

export default HttpRequest
