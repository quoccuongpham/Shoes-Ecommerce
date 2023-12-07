<script setup>
import {ref} from 'vue';
import {ShoppingCartOutlined, LoginOutlined, SlidersOutlined, DownOutlined, SearchOutlined} from "@ant-design/icons-vue";
import {h} from "vue";
let dataSearch = ref("");

const search = () => {
  console.log(dataSearch.value);
}
</script>

<template>
  <div>
    <!--  MAIN HEADER-->
    <a-flex justify="space-between" align="center">
      <a-typography-text :level="3" class="logo">
        <span class="logo-special">9</span><span>Shoes</span>
      </a-typography-text>

      <a-space size="small">
        <a-input v-model:value="dataSearch" placeholder="Tìm kiếm">
          <template #prefix>
            <a-tooltip title="tìm kiếm">
              <search-outlined @click="search"/>
            </a-tooltip>
          </template>
        </a-input>

        <a-tooltip title="giỏ hàng">
            <a-button type="default" shape="circle" :icon="h(ShoppingCartOutlined)" size="large"  class="icon-button"/>
        </a-tooltip>



        <a-tooltip title="đăng nhập">
          <a-button shape="circle" :icon="h(LoginOutlined)" :onclick="() => {this.$router.push('/admin/login')}" size="large" class="icon-button"/>
        </a-tooltip>
      </a-space>
    </a-flex>
  </div>
</template>

<style scoped>
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  .logo-special {
    color: orange;
  }
  .icon-button {
    border: none;
    box-shadow: none;
  }
</style>