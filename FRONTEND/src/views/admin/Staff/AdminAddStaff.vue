<script setup>
import {reactive} from "vue";
import axios from "axios";
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();

// state form
const formState = reactive({
  HoTenNV: "",
  Password: "",
  DiaChi: "",
  ChucVu:"",
  role:"",
  SoDienThoai: ""
})

// submit
const onFinish = () => {
  let data = JSON.stringify({
    "HoTenNV": formState.HoTenNV,
    "Password": formState.Password,
    "DiaChi": formState.DiaChi,
    "ChucVu": formState.ChucVu,
    "role": formState.role,
    "SoDienThoai": formState.SoDienThoai
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/nhanvien/dangky',
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
            description: "Thêm nhân viên thành công",
            placement: "topRight",
          });
        }
      })
      .catch((error) => {
        api.error({
          message: "Lỗi",
          description: "Đã có lỗi xảy ra",
          placement: "topRight",
        });
        console.log(error);
      });
}

// handle error
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

// handle
const handleChangeSelect = value => {
  formState.role = value;
  if (value == 1) {
    formState.ChucVu = "Nhân viên"
  } else if (value == 2) {
    formState.ChucVu = "Quản lý"
  }
  console.log(formState);
}
</script>

<template>
  <h1>Thêm nhân viên</h1>
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
        name="HoTenNV"
        :rules="[{ required: true, message: 'Vui lòng nhập họ tên khách hàng!' }]"
    >
      <a-input v-model:value="formState.HoTenNV" />
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
        name="Password"
        :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
    >
      <a-input-password v-model:value="formState.Password" />
    </a-form-item>
    <a-form-item
        label="Địa chỉ"
        name="DiaChi"
        :rules="[{ required: true, message: 'Vui lòng địa chỉ khách hàng!' }]"
    >
      <a-input v-model:value="formState.DiaChi" />
    </a-form-item>
    <a-form-item
        label="Chức vụ"
        name="ChucVu"
    >
      <a-select @change="handleChangeSelect">
        <a-select-option value="1">
          Nhân viên
        </a-select-option>
        <a-select-option value="2">
          Quản lý
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Lưu</a-button>
    </a-form-item>
  </a-form>
  <contextHolder />
</template>

<style scoped>

</style>