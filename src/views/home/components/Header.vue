<template>
  <div class="header">
    <span class="name">{{ store.getters.userinfo.user_name }}</span>
    <el-avatar :size="50" :src="avatarUrl" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const avatarUrl = computed(() => {
  return `http://1.15.125.141:3007/downloadavatar?name=${store.getters.userinfo.user_avatar}`;
});
</script>

<style >
.header {
  display: flex;
  flex-direction: row;
  flex-flow: row-reverse;
}
.name {
  color: #999;
  margin: auto 0;
  margin-left: 10px;
}
</style>
