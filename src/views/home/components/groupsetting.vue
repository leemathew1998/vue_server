<template>
  <el-table :data="dataref.data">
    <el-table-column label="图标">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-avatar
            shape="square"
            :size="size"
            :src="scope.row.group_avatar"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="group_name" label="小组名字" />
    <el-table-column prop="group_info" label="小组信息 " />
    <el-table-column prop="group_time" label="创建时间" />
    <el-table-column prop="group_user" label="用户数" />
    <el-table-column prop="group_content" label="文章数" />
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
        <el-input v-model="form.group_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="主题" label-width="140px">
        <el-input v-model="form.group_info" autocomplete="off" />
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
import { reactive, ref, computed } from "vue";
const dialogFormVisible = ref(false);

const form = reactive({
  group_name: "",
  group_info: "",
  group_time: "",
  group_user: "",
  group_content: [],
  group_avatar: "",
  comments: [],
  _id: "",
});
const dataref = reactive({
  data: [],
});
const request = async () => {
  const res = await instance({
    url: "/searchallgroup",
    method: "post",
  });

  dataref.data = res.data.map((item) => {
    item.group_user = item.group_user.length;
    item.group_content = item.group_content.length;
    item.group_time = new Date(item.group_time).toLocaleString();
    item.group_avatar = `http://1.15.125.141:3007/downloadavatar?name=${item.group_avatar}`;

    return item;
  });
};
request();
const modifity = (e) => {
  dialogFormVisible.value = true;
  form.group_name = e.group_name;
  form.group_info = e.group_info;
  form._id = e._id;
};
const submit = async (info) => {
  if (info === "修改") {
    const res = await instance({
      url: "/updategroup",
      method: "post",
      params: form,
    });
  }
  dialogFormVisible.value = false;
};
const deletecreat = async (info) => {
  const res = await instance({
    url: "/deletegroup",
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