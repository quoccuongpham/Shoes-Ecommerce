<script setup>
import {h, ref} from 'vue';
import {
  DownOutlined,
  LoginOutlined,
  ReconciliationOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SlidersOutlined
} from "@ant-design/icons-vue";

let dataSearch = ref("");

const search = () => {
  console.log(dataSearch.value);
}
</script>

<template>
  <div>
    <!--  MAIN HEADER-->
    <a-flex align="center" justify="space-between">
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
          <a-button
              :icon="h(ShoppingCartOutlined)"
              class="icon-button"
              shape="circle"
              size="large"
              type="default"
              @click="this.$router.push({path: '/mycart'})"
          />
        </a-tooltip>

        <a-tooltip title="đơn hàng">
          <a-button
              :icon="h(ReconciliationOutlined)"
              class="icon-button"
              shape="circle"
              size="large"
              type="default"
              @click="this.$router.push({path: '/list_recipe'})"
          />
        </a-tooltip>

        <a-tooltip title="đăng nhập">
          <a-button
              :icon="h(LoginOutlined)"
              class="icon-button"
              shape="circle"
              size="large"
              @click="this.$router.push({path: '/login'})"
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <!--  FILTER-->
    <a-flex class="filter" justify="end">
      <a-button :icon="h(SlidersOutlined)" class="icon-button" size="large" @click="this.$emit('colapse')">Lọc
      </a-button>
      <a-button :icon="h(DownOutlined)" class="icon-button" size="large">Sắp xếp</a-button>
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