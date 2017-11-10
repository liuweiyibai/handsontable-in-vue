<template>
  <div class="register-wrap">
      <div class="ms-title">强强次</div>
      <div class="ms-register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
          <el-form-item label="账号" prop="name" style="width:100%;">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" style="width:100%;">
            <el-input type="text" v-model="ruleForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" v-show="false">
            <el-input type="text" v-model="ruleForm.code" auto-complete="off">
             <el-button slot="append">{{code.rules}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repass">
            <el-input type="password" v-model="ruleForm.repass" auto-complete="off"></el-input>
          </el-form-item>
          <div class="register-btn ">
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          </div>
       </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 匹配用户名是否存在
    let validateAccount = (rule, value, callback) => {
      let params = new URLSearchParams();
      params.append("username", this.ruleForm.name);
      this.$Http.post("user/selectIsRepeatByName", params).then(m => {
        console.log(m);
        let num = JSON.parse(m.data).status;
        console.log(JSON.parse(m.data).status);
        if (num === "200") {
          callback();
        } else if (num === "100") {
          callback(new Error("用户名已存在"));
        } else {
          callback(new Error("错误"));
        }
      });
    };
    let validateTell = (rule, value, callback) => {
      let regTel = /^1\d{10}$/,
        regMail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        flag = "",
        len = value.length,
        self = this;
      if (value === "") {
        callback(new Error("请输入手机号或者邮箱"));
        return;
      }
      if (len == 11 && regTel.test(value)) {
        flag = "tel";
      } else if (regMail.test(value)) {
        flag = "mail";
      } else {
        callback(new Error("请输入合法邮箱或者手机号"));
        return;
      }
      if (flag === "tel") {
        let params = new URLSearchParams();
        params.append('phone',value);
        self.$Http({
          url:"user/selectIsRepeatByPhone",
          method:"post",
          data:params
        })
        .then(m=>{
          console.log(m);
          alert(m);
        })
      } else if (flag === "mail") {
        console.log('邮箱');
      }
    };
    let validatePass = (rule, value, callback) => {
      let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (regExp.test(value) === false) {
        callback(new Error("8-16字母和数字组成，不能是纯数字或纯英文"));
      } else {
        if (this.ruleForm.repass !== "") {
          this.$refs.ruleForm.validateField("repass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        code: "",
        pass: "",
        repass: ""
      },
      status:{
        one:fasle,
        two:false,
        three:false,
        four:fasle
      },
      code: {
        rules: "发送验证码"
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 13, message: "长度在 3 到 13 个字符", trigger: "blur" },
          { validator: validateAccount, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入正确的验证码", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入用手机号或者邮箱", trigger: "blur" },
          { min: 6, message: "请输入合法邮箱或者手机号111", trigger: "blur" },
          { validator: validateTell, trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        repass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //  提交按钮事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          this.$ajax
            .post(this.rootUrl + _this.url, _this.ruleForm)
            .then(response => {
              this.$message.success("注册成功！");
              this.$refs[formName].resetFields();
              //  跳转到登录页
              this.$router.push({ path: "/" });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.register-wrap {
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
.ms-register {
  position: absolute;
  left: 47%;
  top: 50%;
  width: 305px;
  height: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px 110px 40px 40px;
  border-radius: 5px;
  background: #fff;
}
.register-btn {
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 36px;
}
</style>
