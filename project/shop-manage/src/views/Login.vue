<template>
  <div class="login-box">
    <h1 style="font-size: 80px;
    color: white;padding-top:200px">后台管理系统</h1>
    <div class="login-box-modal">
      <el-form label-width="80px" :model="form" ref="formRef" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="doLogin(formRef)">提交</el-button>
          <el-button @click="reset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
    // 获取组件实例
    const { proxy } = getCurrentInstance();

    // 响应式对象的内容
    const form = reactive({
      username: "",
      password: "",
    });

    // 约束规则
    const rules = reactive({
      username: [{ required: true, message: "必须输入用户名" }],
      password: [
        { required: true, message: "必须输入密码" },
        { min: 6, max: 10, message: "长度必须在6-10位数" },
      ],
    });

    // 获取页面元素
    const formRef = ref();

    // 提交
    const doLogin = (formEl) => {
      formEl.validate(async (valid, fields) => {
        if (valid) {
          const res = await proxy.$ajax.post("login", form);
          console.log(res, "/login");
        } else {
          console.log("error submit", fields);
        }
      });
    };

    // 重置
    const reset = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      form,
      formRef,
      reset,
      rules,
      doLogin,
    };
  },
});
</script>

<style>
.login-box{
    width: 100%;
    height: 100%;
    background: url('~@assets/image/login.jpg');
    background-size: cover;
}

.login-box-modal{
    width: 300px;
    height: 130px;
    backdrop-filter: blur(3px);
    box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 30%) inset, 0 0.5em 1em rgb(0 0 0 / 60%);
    text-shadow:0 1px 1px hsla(0,0%,100%,.3);
    padding: 70px 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.el-form-item__label{
    color: white;
}
</style>