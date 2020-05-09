<template>
<div class="login">
  <div class="login-form">

    <el-card class="login-form-card">
      <div style="display: flex;justify-content: center;">
        <el-form>
          <el-form-item>
            <span class="title" @click="toHome">
              TeamWork
            </span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="username" placeholder="您的用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input show-password v-model="password" placeholder="您的密码"></el-input>
          </el-form-item>
          <el-form-item>
            <span>
              <el-col :span="14">
                <el-input maxlength="5" placeholder="请输入右侧验证码" v-model="code"></el-input>
              </el-col>
              <el-col :span="10">
                <img @click="refresh" :src="codeUrl" class="check-code pointer" />
              </el-col>
            </span>
          </el-form-item>
          <el-form-item>
            <div style="color: white;">
              <el-row>
                <el-col :span="20">
                  <el-radio v-model="rememberMe" label="1">记住我</el-radio>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" style="width: 100%" @click="register">注册</el-button>
                </el-col>
              </el-row>
              <el-button v-loading="loading" style="width: 100%;margin-top: 10px;" plain @click="login">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>

  <el-dialog top="26vh" :append-to-body="true" :show-close="false" width="450px" :visible.sync="registerDialog">
    <el-divider slot="title" content-position="center">注册</el-divider>
    <el-card>
      <el-form>
        <el-form-item>
          <el-input v-model="username" placeholder="您的用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input show-password v-model="password" placeholder="您的密码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button slot="footer" @click="registerClick">注册</el-button>
  </el-dialog>
</div>
</template>

<script>
import {
  login,
  register
} from '@/api/common'
export default {
  data() {
    return {
      username: "",
      password: "",
      registerDialog: false,
      codeUrl: '',
      loading: false,
      rememberMe: true,
      code: '',
      images: [
        'http://pic.netbian.com/uploads/allimg/200411/223137-1586615497d5fd.jpg',
        'http://pic.netbian.com/uploads/allimg/160927/113509-1474947309a91a.jpg',
        'http://pic.netbian.com/uploads/allimg/200321/195836-1584791916a60c.jpg'
      ]

    };
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/"
      });
    },
    register() {
      this.registerDialog = true;
    },
    registerClick() {
      register(this.username, this.password).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        });
        this.registerDialog = false;
      })
    },
    login() {
      let that = this;
      this.loading = true;
      login(this.username, this.password, this.code)
        .then(response => {
          if (response.code === 200) {
            this.$store.dispatch("login", {
              token: response.token,
              userInfo: response.user
            });
            this.loading = false;
            this.$router.push({
              path: "/transit"
            });
          }
        })
        .catch(error => {
          this.refresh();
          this.loading = false;
          console.log(error);
        });
    },
    refresh() {
      this.codeUrl = '/api/web/common/createImageCode?d=' + new Date() * 1
    }
  },
  mounted() {
    let that = this;
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key === 13) {
        that.login();
      }
    };
    this.refresh()
  },
};
</script>

<style lang="scss">
.login {
  position: fixed;
  background: url("http://pic.netbian.com/uploads/allimg/191116/232401-15739178419b4c.jpg");
  background-color: #0d1213;
  background-image: linear-gradient(141deg,
      #a3c0b2 0%,
      #c0dadd 51%,
      #a5d4e6 75%);
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-color: rgba(41, 50, 39, 1);

  .login-form {
    display: flex;
    justify-content: center;
    margin-top: 190px;
  }

  .login-form-card {
    width: 450px;
    background: transparent;
    border: none;

    .title {
      font-family: "Audiowide";
      color: #00a67c;
      font-size: 1.5em;
    }

    .title:hover {
      cursor: pointer;
    }

    .check-code {
      float: right;
      width: 120px;
      border: 1.5px solid #1fc8db;
      border-radius: 4px;
    }
  }
}
</style>
