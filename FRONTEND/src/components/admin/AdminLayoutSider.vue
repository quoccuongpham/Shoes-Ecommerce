<script setup>
import { reactive, ref, watch, h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';
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
  getItem('Nhân viên', 'nav1', () => h(MailOutlined), [
    getItem('Thêm nhân viên', 'nav1_1'),
    getItem('Danh sách nhân viên', 'nav1_2'),
  ]),
  getItem('Khách hàng', 'nav2', () => h(UserOutlined), [
    getItem('Thêm khách hàng', 'nav2_1'),
    getItem('Danh sách khách hàng', 'nav2_2'),
  ]),
  getItem('Đơn hàng', 'nav3', () => h(ShoppingCartOutlined), [
    getItem('Tạo đơn hàng', 'nav3_1'),
    getItem('Danh sách đơn hàng', 'nav3_2'),
  ]),
  getItem('Hàng hóa', 'nav4', () => h(AppstoreOutlined), [
    getItem('Thêm hàng', 'nav4_1'),
    getItem('Danh sách hàng', 'nav4_2'),
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
      router.push({path: '/admin/add_staff'});
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
      router.push({path: '/admin/login'});
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