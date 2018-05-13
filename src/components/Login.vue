<template>
      <div class="main">
          <div class="login-user">
            <label for="input1"> 昵称 </label>
            <input type="text" class="name" id="input1" v-model.trim="nickName"> <br>
            <label for="input2"> 密码 </label>
            <input type="password" class="pwd" id="input2" v-model.trim="password"> <br>
            <div class="btn-team">
              <button @click="loginBtn(true)">登录</button>
              <button @click="loginBtn(false)">注册</button>
            </div>
            <div class="login-msg" v-show="isShowErr">
              <span>{{errMsg}}</span>
            </div>
          </div>
      </div>

</template>

<script>
import api from '@/api/chatApi.js';
export default {
  name: 'Login',
  data () {
    return {
      nickName: "",
      password: "",
      errMsg: "",
      isShowErr: true
    }
  },
  methods:{
    loginBtn(isLogin) {
          let nickName = this.nickName;
          let password = this.password;
          console.log(nickName, password);
          let isUseful = nickName.length>3 &&  nickName.length<9 && password.length>3 &&  password.length<9 
                     ? true : false;

          if( isUseful ) {
            if(isLogin) {
              api.login(nickName, password, (isSuccess,data,err)=>{
                if(isSuccess) {
                  this.errMsg = data.stateText;
                  this.$router.push({ name:'ChatIndex' })
                }else {
                  this.errMsg = err.errorMsg;
                }
              })
            }else {
              api.register(nickName, password, (isSuccess,data,err)=>{
                if(isSuccess) {
                  this.errMsg = data.stateText;
                }else {
                  this.errMsg = err.errorMsg;
                }
              })
            }
          } else {
            this.errMsg = "用户名或密码长度不合格！";
          }

        }
  }
}
</script>

<style lang="scss" scoped>
  input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  border: 1px solid #CCC;
  }
  .main {
    // width: 100vh;
    height: 100vh;
    position: relative;
  }
  .login-user {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 4px;
    background-color: #fff;
    width: 380px;
    height: 540px;
    padding: 20px;
    text-align: center;
    input {
      width: 236px;
      height: 22px;
      padding: 12px 20px;
      background-color: #fff;
      transition: border .2s ease-in-out;  
      border: 1px solid #CCC;
      &:focus {
        border-color: #57a3f3;
      }
      &:hover {
        border-color: #57a3f3;
      }
    }
    label {
      display: block;
      margin: 20px 0;
    }
    .btn-team {
      margin-top: 20px;
    }
    .login-msg {
      margin-top: 60px;
      font-size: 14px;
      color: #495060;
    }
    button {
      width: 100px;
      height: 42px;
      color: #495060;
      background-color: transparent;
      border-color: #dddee1;

      &:hover {
        color: #57a3f3;
        background-color: transparent;
        border-color: #57a3f3;
      }
    }
  }


</style>
