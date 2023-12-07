<script setup>

import {onMounted, reactive, ref, toRaw} from "vue";
import axios from "axios";
import { notification } from 'ant-design-vue';
import router from "@/router";
const [api, contextHolder] = notification.useNotification();

const list_product = ref();
onMounted(() => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/hanghoa',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5OTI3NDIxfQ.jiIyoNdtIy83pKyCntax-O4tHg3gkNUnu8lQDxBVyrk'
    }
  };

  axios.request(config)
      .then((response) => {
        list_product.value = response.data;
        list_product.value = toRaw(list_product.value).dataValues;
      })
      .catch((error) => {
        console.log(error);
      });
})

// xoa
async function makeRequest(id) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/admin/hanghoa/${id}`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const response = await axios.request(config).then(value => {
      api.success({
        message: "Thành công",
        description: "Xóa thành công",
        placement: "topRight",
      });
    });
    router.go(0);
  }
  catch (error) {
    console.log(error);
  }
}
const columns = reactive([
  {
    title: "Tên",
    dataIndex: "TenHH",
    sorter: true,
  },
  {
    title: "Thuương hiệu",
    dataIndex: "ThuongHieu"
  },
  {
    title: "Giá",
    dataIndex: "Gia",
    sorter: true
  },
  {
    title: "Số lượng",
    dataIndex: "SoLuongHang"
  },
  // {
  //   title: "Kích cỡ",
  //   dataIndex: "KichCo"
  // },
  // {
  //   title: "Màu",
  //   dataIndex: "Mau"
  // },
  {
    title: "Chỉnh sửa",
    key:"action"
  }
]);
</script>

<template>
  <h1>Danh sách hàng hóa</h1>
  <a-divider/>
  <a-table :columns="columns" :data-source="list_product">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key == 'action'">
        <a-button danger @click="makeRequest(record._id)">Xóa</a-button>
      </template>
    </template>
  </a-table>
  <contextHolder/>
</template>

<style scoped>

</style>