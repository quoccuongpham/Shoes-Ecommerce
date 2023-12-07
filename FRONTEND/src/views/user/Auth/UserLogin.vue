<script setup>
import { reactive } from 'vue';
import axios from "axios";
import router from "@/router";
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();

const formState = reactive({
  SoDienThoai: '',
  Password: '',
});
const onFinish = async values => {
  let data = JSON.stringify({
    "Password": formState.Password,
    "SoDienThoai": formState.SoDienThoai
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/users/khachhang/auth/dangnhap',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
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
          message: "Đăng nhập thất bại",
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
    <a-space direction="vertical" class="login-container" >
      <a-typography-title align="center">Đăng nhập</a-typography-title>
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 8 }"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
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

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Đăng nhập</a-button>
        </a-form-item>
        <div class="footer">
          <a-typography-text>Chưa có tài khoản? </a-typography-text>
          <a-typography-text strong>
            <router-link to="/register">Đăng Ký</router-link>
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