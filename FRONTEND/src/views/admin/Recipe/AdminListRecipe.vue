<script setup>

import {onMounted, reactive, ref, toRaw} from "vue";
import axios from "axios";
import router from "@/router";

// ref
const list_recipe = ref();
const openModal = ref(false);
const idRecipe = ref();
const ngayGiaoHang = ref();
const showModel = (id) => {
  openModal.value = true;
  idRecipe.value = id;
  console.log(idRecipe.value)
}
const handleOk = async e => {
  console.log(ngayGiaoHang.value);
  let data = JSON.stringify({
    "NgayGH": ngayGiaoHang.value,
    "TrangThaiDH": 2
  });

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/admin/dathang/${idRecipe.value}`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  router.go(0);
  openModal.value = false;
};
// load
onMounted(() => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/dathang',
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
    title: "Cập nhật",
    key: "action"
  }
]);
</script>

<template>
  <h1>Danh sách đơn hàng</h1>
  <a-divider/>
  <a-table :columns="columns" :data-source="list_recipe">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'NgayDH'">
        {{ (new Intl.DateTimeFormat("vi-VN")).format(new Date(record.NgayDH)) }}
      </template>

      <template v-if="column.key === 'NgayGH'">
        <p v-if="record.NgayGH">{{ (new Intl.DateTimeFormat("vi-VN")).format(new Date(record.NgayGH)) }}</p>
      </template>

      <template v-if="column.key == 'action'">
        <a-button
            v-if="record.TrangThaiDH == 'Đang chờ phê duyệt'"
            @click="() => {showModel(record._id)}"
        >
          Chấp nhận đơn hàng
        </a-button>

        <a-button v-else disabled>Đã duyệt</a-button>
      </template>

      <template v-if="column.key === 'TrangThaiDH'">
        <a-tag color="green">{{ record.TrangThaiDH }}</a-tag>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="openModal" title="Chọn ngày giao hàng" @ok="handleOk">
    <a-input type="date" v-model:value="ngayGiaoHang"></a-input>
  </a-modal>
</template>

<style scoped>

</style>