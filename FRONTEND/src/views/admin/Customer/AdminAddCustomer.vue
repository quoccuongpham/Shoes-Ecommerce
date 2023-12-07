<script setup>
import {reactive} from "vue";
import axios from "axios";
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();


const formState = reactive({
  HoTenKH: "",
  Password: "",
  DiaChi: "",
  SoDienThoai: "",
})
const onFinish = async values => {
  let data = JSON.stringify({
    "HoTenKH": formState.HoTenKH,
    "Password": formState.Password,
    "DiaChi": formState.DiaChi,
    "SoDienThoai": formState.SoDienThoai
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/khachhang',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
      .then((response) => {
        if (response.data.success) {
          api.success({
            message: "Thành công",
            description: "Tạo khách hàng thành công",
            placement: "topRight",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <h1>Thêm khách hàng</h1>
  <a-divider/>
  <a-form
    :model="formState"
    name="add_customer"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Họ tên"
      name="HoTenKH"
      :rules="[{ required: true, message: 'Vui lòng nhập họ tên khách hàng!' }]"
    >
      <a-input v-model:value="formState.HoTenKH" />
    </a-form-item>
    <a-form-item
        label="Số điện thoại"
        name="SoDienThoai"
        :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
    >
      <a-input v-model:value="formState.SoDienThoai" />
    </a-form-item>
    <a-form-item
        label="Mật khẩu"
        name="HoTenKH"
        :rules="[{ required: true, message: 'Vui lòng nhập họ tên mật khẩu!' }]"
    >
      <a-input-password v-model:value="formState.Password" />
    </a-form-item>
    <a-form-item
        label="Địa chỉ"
        name="HoTenKH"
        :rules="[{ required: true, message: 'Vui lòng địa chỉ khách hàng!' }]"
    >
      <a-input v-model:value="formState.DiaChi" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Lưu</a-button>
    </a-form-item>
  </a-form>
  <contextHolder />
</template>

<style scoped>

</style>