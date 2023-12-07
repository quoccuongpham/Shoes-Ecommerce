<script setup>
import {reactive} from 'vue';
import axios from "axios";
import router from "@/router";
import {notification} from 'ant-design-vue';

const [api, contextHolder] = notification.useNotification();

const formState = reactive({
  SoDienThoai: '',
  Password: '',
  HoTenKH: "",
  DiaChi: "",
});

// handle
const onFinish = async values => {
  let data = JSON.stringify({
    SoDienThoai: formState.SoDienThoai,
    Password: formState.Password,
    HoTenKH: formState.HoTenKH,
    DiaChi: formState.DiaChi
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/users/khachhang/auth/dangky',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios.request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          router.push({path: '/'})
        }
      })
      .catch((error) => {
        api.error({
          message: "Đăng kí thất bại",
          description: "Sai số điện thoại hoặc mật khẩu",
          placement: "topRight",
        });
        console.log("err")
        console.log(error);
      });
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="main-container">
    <a-space class="login-container" direction="vertical">
      <a-typography-title align="center">Đăng ký</a-typography-title>
      <a-form
          :label-col="{ span: 8 }"
          :model="formState"
          :wrapper-col="{ span: 8 }"
          autocomplete="on"
          name="basic"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
            label="Số điện thoại"
            name="SoDienThoai"
        >
          <a-input v-model:value="formState.SoDienThoai"/>
        </a-form-item>

        <a-form-item
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
            label="Mật khẩu"
            name="Password"
        >
          <a-input-password v-model:value="formState.Password"/>
        </a-form-item>

        <a-form-item
            :rules="[{ required: true, message: 'Không được để trống!' }]"
            label="Họ tên"
            name="HoTenKH"
        >
          <a-input v-model:value="formState.HoTenKH"/>
        </a-form-item>

        <a-form-item
            :rules="[{ required: true, message: 'Không được để trống!' }]"
            label="Địa chỉ"
            name="DiaChi"
        >
          <a-input v-model:value="formState.DiaChi"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button html-type="submit" type="primary">Đăng ký</a-button>
        </a-form-item>
        <div class="footer">
          <a-typography-text>Đã có tài khoản? </a-typography-text>
          <a-typography-text strong>
            <router-link to="/login">Đăng nhập</router-link>
          </a-typography-text>
        </div>
      </a-form>
      <contextHolder/>
    </a-space>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  height: 98vh;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
}
.footer {
  text-align: center;
}
</style>