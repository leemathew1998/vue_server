<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
  >
    <el-form-item label="username" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script  setup>
import { reactive, ref } from "vue";
import instance from "@/assets/request";
import { PUBLIC_KEY } from "@/assets/const.js";
import { JSEncrypt } from "jsencrypt";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import router from "@/router";
const store = useStore();

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "3",
  password: "3",
});

const rules = reactive({
  username: [
    {
      required: true,
      message: "Please input Activity username",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please select password",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const values = {};
      values.user_name = ruleForm.username;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(PUBLIC_KEY);
      values.user_password = encrypt.encrypt(ruleForm.password);
      const res = await instance({
        url: "/register",
        method: "post",
        params: values,
      });
      localStorage.setItem("userinfo", res.data.result);
      store.commit("user/setuserinfo", res.data.result);
      router.push("/usersetting");
      ElMessage({
        message: res.data.info,
        type: "success",
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
