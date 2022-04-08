<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <router-link to="/usersetting" class="link">
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>用户设置</span>
          </el-menu-item>
        </router-link>
        <router-link to="/creatsetting" class="link">
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>文章设置</span>
          </el-menu-item>
        </router-link>
        <router-link to="/groupsetting" class="link">
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>小组设置</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
</script>

<style >
.link {
  text-decoration: none;
}
</style>
