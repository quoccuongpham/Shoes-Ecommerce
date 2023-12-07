<script setup>

import {onMounted, reactive, ref, toRaw} from "vue";
import axios from "axios";
import UserLayout from "@/layouts/UserLayout.vue";

// ref
const list_recipe = ref();

// load
onMounted(() => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/users/dathang/',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  axios.request(config)
      .then((response) => {
        list_recipe.value = response.data;
        console.log(list_recipe)
      })
      .catch((error) => {
        console.log(error);
      });
})

const columns = reactive([
  {
    title: "Mã đơn hàng",
    dataIndex: "_id",
  },
  {
    title: "Mã khách hàng",
    dataIndex: "MSKH"
  },
  {
    title: "Ngày đặt",
    dataIndex: "NgayDH",
    key: "NgayDH"
  },
  {
    title: "Ngày giao",
    dataIndex: "NgayGH",
    key: "NgayGH"
  },
  {
    title: "Trạng thái",
    dataIndex: "TrangThaiDH",
    key: "TrangThaiDH"
  },
  {
    title: "Chỉnh sửa",
    key: "action"
  }
]);
</script>

<template>
  <user-layout>
    <div class="main-content">
      <h1>Danh sách đơn hàng</h1>
      <a-divider/>
      <a-table :columns="columns" :data-source="list_recipe">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'NgayDH'">
            {{ (new Intl.DateTimeFormat("vi-VN")).format(new Date(record.NgayDH)) }}
          </template>

          <!--      <template v-if="column.key === 'NgayGH'">-->
          <!--        {{ record ? (new Intl.DateTimeFormat("vi-VN")).format(new Date(record.NgayGH)) : " " }}-->
          <!--      </template>-->

          <template v-if="column.key == 'action'">
            <a-button disabled v-if="record.TrangThaiDH == 'Đang chờ phê duyệt'">Đã nhận được hàng</a-button>
            <a-button v-else>Đã nhận được hàng</a-button>
          </template>

          <template v-if="column.key === 'TrangThaiDH'">
            <a-tag color="green">{{ record.TrangThaiDH }}</a-tag>
          </template>

        </template>
      </a-table>
    </div>
  </user-layout>
</template>

<style scoped>
.main-content {
  border-radius: 20px;
}
</style>