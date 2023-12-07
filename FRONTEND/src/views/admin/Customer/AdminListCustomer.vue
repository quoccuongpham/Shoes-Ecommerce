<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import router from "@/router";

let list_customer = ref([]);
const columns = reactive([{
    title: 'ID',
    dataIndex: '_id',
  },
  {
    title: 'Full Name',
    dataIndex: 'HoTenKH',
  },
  {
    title: 'Address',
    dataIndex: 'DiaChi',
  },
  {
    title: 'Phone Number',
    dataIndex: 'SoDienThoai',
  },
  {
    title: "Chỉnh sửa",
    key: "action"
  }
]);

onMounted(async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/khachhang',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5OTI3NDIxfQ.jiIyoNdtIy83pKyCntax-O4tHg3gkNUnu8lQDxBVyrk'
    }
  };

  axios.request(config)
      .then((response) => {
        list_customer.value = response.data;
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
  <h1>Danh sách khách hàng</h1>
  <a-divider/>
  <a-table :data-source="list_customer" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button @click="() => createRecipe(record._id)">Tạo đơn</a-button>
      </template>
    </template>
  </a-table>
</template>

<style scoped>

</style>