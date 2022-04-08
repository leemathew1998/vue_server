<template>
  <!-- <div>{{ dataref[0] }}</div> -->
  <el-table :data="dataref.data">
    <el-table-column fixed="left" prop="creat_body" label="内容" width="300" />
    <el-table-column prop="creat_time" label="发表时间 " />
    <el-table-column prop="creat_title" label="标题" />
    <el-table-column prop="user_name" label="姓名" />
    <el-table-column prop="comments" label="评论数" />
    <el-table-column prop="like" label="点赞数" />
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
          @click="deletecreat(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>

  <!--
    弹出框
  -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="内容" label-width="140px">
        <el-input v-model="form.creat_body" autocomplete="off" />
      </el-form-item>
      <el-form-item label="主题" label-width="140px">
        <el-input v-model="form.creat_title" autocomplete="off" />
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
const dialogFormVisible = ref(false);

const form = reactive({
  creat_body: "",
  creat_time: "",
  creat_title: "",
  user_name: "",
  like: [],
  comments: [],
  _id: "",
});
const dataref = reactive({
  data: [],
});
const request = async () => {
  const res = await instance({
    url: "/getallcreat",
    method: "post",
  });
  dataref.data = res.data.map((item) => {
    item.like = item.like.length;
    item.comments = item.comments.length;
    item.creat_time = new Date(item.creat_time).toLocaleString();
    return item;
  });
};
request();
const modifity = (e) => {
  dialogFormVisible.value = true;
  form.creat_body = e.creat_body;
  form.creat_title = e.creat_title;
  form._id = e._id;
};
const submit = async (info) => {
  if (info === "修改") {
    const res = await instance({
      url: "/updatecreat",
      method: "post",
      params: form,
    });
  }
  dialogFormVisible.value = false;
};
const deletecreat = async (info) => {
  const res = await instance({
    url: "/deletecreat",
    method: "post",
    params: { _id: info._id },
  });
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