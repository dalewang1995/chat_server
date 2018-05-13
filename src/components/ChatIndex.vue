<template>
  <div>

    <div class="main" v-show="!isShowLogin">
      <div class="panel">
        <div class="header">
          <div class="avatar">
            
          </div>
          
          <div class="info">
            <span>汪小鱼</span>
            <span class="menu" @click="userMenu()">MENU</span>
          </div>

        </div>
        <div class="panel-tab">
          在线人员列表
        </div>
        <div class="chat-p">
          <ul>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
            <li>dawdawdawdaw</li>
          </ul>
        </div>
      </div>

      <div class="chat-box">
        <div class="box-hd">
          <div class="title-wrap">
            <div class="title-name">
              汪小鱼
            </div>
          </div>
        </div>

        <div class="box-bd">
            <ul v-for="(item, index) in BdContent" :key="index">
              <li>{{item}}</li>
            </ul>
        </div>

        <div class="box-ft">
            <div class="tool-bar">

            </div>
            <div class="msg-content">
              <textarea ref="TextVal"></textarea>
            </div>
            <div class="btn-action">
              <a href="javascript:;" @click="getSendMSG()">发送</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex';
import io from 'socket.io-client';
import api from '@/api/chatApi.js';

export default {
  name: 'ChatIndex',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      BdContent: [],
      isShowLogin: false,
      nickName: '',
      password: ''
    }
  },
  methods:{
    getSendMSG() {
      let value = this.$refs.TextVal.value;
      this.BdContent.push(value);
      const MsgObj = {
				roomId: 0,
				timeStamp: this.getTimeStr(),
				// status: 'usermsg',
				userId: '222',
				avator: 'dadwwadwa',
				nickname: 'dale',
				text: value
      }
      
      this.socket.emit('chat-msg', MsgObj);
      this.$refs.TextVal.value = '';
    },
    getTimeStr() {
      let timeStr = new Date();
      return timeStr.toJSON();
    },
    userMenu() {
      alert(0)
    }
 
  },
  mounted() {
    this.socket = io('http://localhost:4005');
    const infoObj = {
			status: '0',
			nickname: 'dale',
			roomId: 123
		}
    this.socket.emit('room', infoObj);
    this.socket.on('room', (joinInfo) => {
      console.log(joinInfo)
		})
  }
  // component() { Header }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .main {
    max-width: 1000px;
    min-width: 800px;
    height: 100vh;
    margin: 0 auto;
    border-radius: 3px;
    overflow: hidden;
  }
  .panel {
    position: relative;
    float: left;
    width: 280px;
    height: 100%;
    background-color: #2e3238;
  }
  .header {
    padding: 18px;
    position: relative;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: inline-block;
    background: url("../assets/timg.png") no-repeat 50%;
    background-size: cover;
  }
  .info {
    display: inline-block;
    padding-left: 10px;
    font-weight: 400;
    width: 156px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #fff;
    font-size: 18px;
    vertical-align: top;
    line-height: 40px;
    text-decoration: none;
  }
  .menu {
    cursor: pointer;
  }
  .panel-tab {
    height: 35px;
    overflow: hidden;
    position: relative;
    /* padding-bottom: 4px; */
    text-align: center;
    line-height: 35px;
    color: #eee;
    border-top: 1px solid #292c33;
    border-bottom: 1px solid #292c33;
  }

  .chat-p {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  /*  */

  .chat-box {
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: #eee;
  }
  .box-hd {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 30px;
  }
  .title-wrap {
    position: relative;
    padding: 10px 0;
    margin: 0 19px;
    border-bottom: 1px solid #d6d6d6;
    background-color: #eee;
    z-index: 1024;
  }
  .title-name {
    font-weight: 400;
    height: 25px;
    display: inline-block;
    font-size: 14px;
  }

  .box-bd {
    position: absolute;
    overflow-y: auto;
    top: 51px;
    right: 0;
    bottom: 0;
    left: 0;
    bottom: 180px;
    padding: 0 19px;

    li {
      list-style: none;
    }
  }

  .box-ft {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 180px;
    margin-right: 19px;
    border-top: 1px solid #d6d6d6;
  }
  .tool-bar {
    height: 30px;
    padding: 5px 17px;
  }

  .msg-content {
    height: 84px;
    textarea {
      height: 100%;
      width: 100%;
      padding-left: 20px;
      border: none;
      font-size: 1em;
      outline: none;
      resize:none;
      overflow: height;
      background-color: #eee;
    }
  }
  .btn-action {
    text-align: right;

    a {
        display: inline-block;
        padding-left: 30px;
        padding-right: 30px;
        text-decoration: none;
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        padding: 3px 20px;
        font-size: 14px;
        color: #222;
        background-color: #fff;
      }
  }
</style>
