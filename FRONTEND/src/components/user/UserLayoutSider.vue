<script setup>
import { reactive, ref, watch, h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined, BranchesOutlined } from '@ant-design/icons-vue';
import router from "@/router";
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = reactive([
  getItem('Điều hướng', 'nav1', () => h(BranchesOutlined), [
    getItem('Sản phẩm', 'nav1_1'),
  ]),
  getItem('Lọc dữ liệu', 'nav2', () => h(AppstoreOutlined), [
    getItem('Giá cao', 'nav2_1'),
    getItem('Giá thấp', 'nav2_2'),
  ]),
  {
    type: 'divider',
  },
  getItem('Tài khoản', 'nav', () => h(SettingOutlined), [
    getItem('Đăng xuất', 'nav5_1', () => h(LogoutOutlined)),
  ]),
]);
const handleClick = e => {
  switch (e.key) {
    case 'nav1_1':
      router.push({path: '/'});
      break;
    case 'nav1_2':
      router.push({path: '/admin/list_staff'});
      break;
    case 'nav2_1':
      router.push({path: '/admin/add_customer'});
      break;
    case 'nav2_2':
      router.push({path: '/admin/list_customer'});
      break;
    case 'nav3_1':
      router.push({path: '/admin/list_customer'});
      break;
    case 'nav3_2':
      router.push({path: '/admin/list_recipe'});
      break;
    case 'nav4_1':
      router.push({path: '/admin/add_product'});
      break;
    case 'nav4_2':
      router.push({path: '/admin/list_product'});
      break;
    case 'nav5_1':
      router.push({path: '/login'});
      break;

  }
  console.log('click', e);
};
watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>

<template>
  <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :items="items"
      @click="handleClick"
  ></a-menu>
</template>

<style scoped>

</style>