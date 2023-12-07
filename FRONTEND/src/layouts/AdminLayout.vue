<script setup>

import { ref } from 'vue';
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminLayoutSider from "@/components/admin/AdminLayoutSider.vue";


let is_colapse = ref(false);


</script>
<template>
  <a-layout>
    <a-layout-header class="header">
      <admin-header></admin-header>
    </a-layout-header>

    <a-layout class="main-layout">
<!--      SIDER -->
      <a-layout-sider
          :collapsed="is_colapse"
          collapsed-width="0"
          width="280px"
          class="sider"
      >
        <admin-layout-sider></admin-layout-sider>
      </a-layout-sider>

<!--      MAIN CONTENT -->
      <a-layout-content class="main-content">
        <router-view>

        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>

.header {
  background-color: #fff;
}
.main-layout {
  background-color: #fff;
}
.sider {
  background-color: #fff;
  width: 400px;
}
.main-content {
  min-height: 100vh;
  border-radius: 20px;
}
</style>
