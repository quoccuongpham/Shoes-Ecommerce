<script setup>
import {onMounted, reactive, toRaw, ref} from "vue";
import axios from "axios";
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();

// props
const customer = defineProps(["id"])

// ref
const list_product = ref();
const selected_product = ref();



// lay thong tin hang hoa
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
        list_product.value = response.data?.dataValues;
        console.log(list_product)
      })
      .catch((error) => {
        console.log(error);
      });
})

// tạo state
const formState = reactive({
  MSKH: customer.id,
  NgayGH: "",
  MSHH: "",
  SoLuong: 1,
  GiaDatHang: 0,
  GiamGia: 0,
})

// Gui form
const onFinish = async values => {

  // data to json
  let data = JSON.stringify({
    "MSKH": formState.MSKH,
    "NgayGH": formState.NgayGH,
    "MSHH": formState.MSHH,
    "SoLuong": formState.SoLuong,
    "GiaDatHang": formState.GiaDatHang,
    "GiamGia": formState.GiamGia
  });

  //config api
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/dathang',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    data : data
  };

  // send axios
  axios.request(config)
      .then((response) => {
        if (response.data.success) {
          api.success({
            message: "Thành công",
            description: "Tạo đơn hàng thành công",
            placement: "topRight",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

// xu ly loi
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

// handle
const selectedProductHandleChange = value => {
  formState.MSHH = list_product.value[value]._id;
  formState.GiaDatHang = list_product.value[value].Gia;
}
</script>

<template>
  <h1>Tạo đơn hàng</h1>
  <a-divider/>

  <!-- FORM -->
  <a-form
      :model="formState"
      name="add_recipe"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      autocomplete="on"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Mã số khách hàng"
        name="MSKH"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.MSKH" />
    </a-form-item>
    <a-form-item
        label="Hàng hóa"
        name="MSHH"
    >
<!--      <a-input v-model:value="formState.MSHH" />-->
      <a-select ref="selected_product" @change="selectedProductHandleChange">
        <a-select-option v-for="(data, i) in list_product" :value="i">{{data.TenHH}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
        label="Giá"
        name="Gia"
    >
      <a-input type="number" v-model:value="formState.GiaDatHang" />
    </a-form-item>
    <a-form-item
        label="Số lượng"
        name="SoLuong"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input :min="1" type="number" v-model:value="formState.SoLuong" />
    </a-form-item>
    <a-form-item
        label="Ngày giao"
        name="NgayGH"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input type="date" v-model:value="formState.NgayGH" />
    </a-form-item>
    <a-form-item
        label="Giảm giá"
        name="GiamGia"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input type="number" v-model:value="formState.GiamGia" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Lưu</a-button>
    </a-form-item>
  </a-form>
  <contextHolder />
</template>

<style scoped>

</style>