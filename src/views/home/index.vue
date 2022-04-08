<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-container>
        <el-header><Header /></el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <!-- <keep-alive> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script  setup>
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
</script>

<style lang="sass">
</style>