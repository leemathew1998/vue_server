<template>
  <!-- <div>{{ dataref[0] }}</div> -->
  <el-table :data="dataref.data">
    <el-table-column fixed prop="user_name" label="name" width="150" />
    <el-table-column prop="user_password" label="password" width="150" />
    <el-table-column prop="user_number" label="number" width="120" />
    <el-table-column fixed="right" label="Operations">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          @click.prevent="modifity(scope.row)"
        />
        <el-button
          type="danger"
          :icon="Delete"
          @click="deleteuser(scope.row)"
        />
        <el-button type="primary">
          Upload<el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--
    弹出框
  -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="name" label-width="140px">
        <el-input v-model="form.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="password" label-width="140px">
        <el-input v-model="form.user_password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="phone number" label-width="140px">
        <el-input v-model="form.user_number" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit('修改')">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import instance from "@/assets/request";
import { Delete, Edit, Upload } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { JSEncrypt } from "jsencrypt";
import { PUBLIC_KEY } from "@/assets/const.js";
const dialogFormVisible = ref(false);

const form = reactive({
  user_name: "",
  user_password: "",
  user_number: "",
  _id: "",
});
const dataref = reactive({
  data: [],
});
const request = async () => {
  const res = await instance({
    url: "/getuser",
    method: "get",
  });

  dataref.data = res.data.map((item) => {
    item.user_password = "******";
    return item;
  });
};
request();
const modifity = (e) => {
  dialogFormVisible.value = true;
  form.user_name = e.user_name;
  dataref.data.user_name = e.user_name;
  form.user_password = e.user_password;
  form.user_number = e.user_number;
  form._id = e._id;
};
const submit = async (info) => {
  if (info === "修改") {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    form.user_password = encrypt.encrypt(form.user_password);
    const res = await instance({
      url: "/updateuserinfo",
      method: "post",
      params: form,
    });
  }
  dialogFormVisible.value = false;
};
const deleteuser = async (info) => {
  console.log(info);
  const res = await instance({
    url: "/deleteuserinfo",
    method: "post",
    params: { _id: info._id },
  });
  console.log(res);
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>