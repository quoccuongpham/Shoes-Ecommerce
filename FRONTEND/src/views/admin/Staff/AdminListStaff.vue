<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import router from "@/router";

let list_staff = ref([]);
const columns = reactive([{
  title: 'ID',
  dataIndex: '_id',
},
  {
    title: 'Họ tên',
    dataIndex: 'HoTenNV',
  },
  {
    title: 'Address',
    dataIndex: 'DiaChi',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'SoDienThoai',
  },
]);

onMounted(async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/nhanvien/',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  axios.request(config)
      .then((response) => {
        list_staff.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
});

const createRecipe = (record) => {
  router.push({path: `/admin/add_recipe/${record}`});
}
</script>

<template>
  <h1>Danh sách nhân viên</h1>
  <a-divider/>
  <a-table :data-source="list_staff" :columns="columns">

  </a-table>
</template>

<style scoped>

</style>