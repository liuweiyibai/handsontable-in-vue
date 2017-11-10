<template>
    <div class="login-wrap">
        <div class="ms-title">数据分析平台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" 
                   :autofocus="focus"
                  placeholder="用户名"
                   @blur="isExist($event,$event.target._value)"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-checkbox v-model="radio" style="margin-bottom:10px;">记住密码</el-checkbox>
                <div class="login-btn">
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getCookie } from "../../assets/js/common/storage";
import Vue from 'vue';
export default {
  data() {
    return {
      ruleForm: {
        username: "guest",
        password: "123456"
      },
      radio: true,
      focus: false,
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 判断用户名是否存在
    isExist(event, val) {
      let params = new URLSearchParams();
      if (val.length === 0) {
        this.focus = true;
        return;
      }
      params.append("username", val);
      this.$Http({
        url: "user/selectIsRepeatByName",
        method: "post",
        data: params
      }).then(m => {
        if (m.statusMsg == "用户名不存在") {
          this.$message(m.statusMsg);
          this.focus = true;
        }
      });
    },
    // 提交表单
    submitForm(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          let tag = "";
          if (this.radio === true) {
            // 记住密码
            tag = 1;
          } else if (this.radio === false) {
            tag = 2;
          }
          let params = new URLSearchParams();
          params.append("principal", self.ruleForm.username);
          params.append("password", self.ruleForm.password);
          params.append("tag", tag);
          self
            .$Http({
              url: "user/login",
              method: "post",
              data: params
            })
            .then(m => {
              let user = JSON.parse(m.data.user);
              localStorage.setItem("ID", user.userId);
              localStorage.setItem('islogin',true);
              Vue.prototype.ID = localStorage.getItem('ID');
              localStorage.setItem("token", user.userName);
              self.$router.push("/Home");
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message("请重新登录！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #5cafb9;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>