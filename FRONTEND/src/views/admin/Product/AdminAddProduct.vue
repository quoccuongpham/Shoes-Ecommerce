<script setup>
import {reactive, ref, toRaw} from "vue";
import axios from "axios";
import { notification } from 'ant-design-vue';
import UploadFile from '../../../components/admin/UploadFile.vue'
import { UploadOutlined } from '@ant-design/icons-vue';
const [api, contextHolder] = notification.useNotification();

const fileList = ref([]);
const id_product = ref();
const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5ODQ3OTUxfQ.BzNaT6iTAt84LSLwk5ERpoEaj_QuzT6gjWyTvof5tLE',
};

const formState = reactive({
  TenHH: "",
  ThuongHieu: "",
  MoTaHH: "",
  Gia: 0,
  SoLuongHang: 0,
  Mau: "",
  KichCo: "",
  GhiChu: "",
  Images: [],
})

// handle
const handleChange = info => {
  if (info.file.status !== 'uploading') {

  }
  if (info.file.status === 'done') {
    console.log(info.fileList)
  } else if (info.file.status === 'error') {
    console.log('error')
  }
};

const onFinish = async values => {
  let data = JSON.stringify({
    "TenHH": formState.TenHH,
    "ThuongHieu": formState.ThuongHieu,
    "MoTaHH": formState.MoTaHH,
    "Gia": formState.Gia,
    "SoLuongHang": formState.SoLuongHang,
    "Mau": formState.Mau.split(","),
    "KichCo": formState.KichCo.split(","),
    "GhiChu": formState.GhiChu
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/admin/hanghoa',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5ODQ3OTUxfQ.BzNaT6iTAt84LSLwk5ERpoEaj_QuzT6gjWyTvof5tLE',
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
      .then((response) => {
        id_product.value = response.data.value.insertedId;
        if (response.data.success) {
          api.success({
            message: "Thành công",
            description: "Thêm hàng hóa thành công",
            placement: "topRight",
          });
        }
      })
      .catch((error) => {
        api.error({
          message: "Thất bại",
          description: "Đã có lỗi xảy ra",
          placement: "topRight"
        })
        console.log(error);
      });
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const previewFiles = (event) => {
  let data = new FormData();
  for (let i = 0; i < event.target.files.length; i++) {
    data.append('image_products', event.target.files[i])
  }


  // upload anh
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/admin/hinhhanghoa/${toRaw(id_product.value)}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5ODQ3OTUxfQ.BzNaT6iTAt84LSLwk5ERpoEaj_QuzT6gjWyTvof5tLE',
    },
    data: data
  };

  axios.request(config)
      .then((response) => {
        api.success({
          message: "Thành công",
          description: "Thêm hình ảnh thành công",
          placement: "topRight",
        });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}
</script>

<template>
  <h1>Thêm hàng hóa</h1>
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
        label="Tên hàng"
        name="TenHH"
        :rules="[{ required: true, message: 'Vui lòng nhập tên hàng!' }]"
    >
      <a-input v-model:value="formState.TenHH" />
    </a-form-item>
    <a-form-item
        label="Thương hiệu"
        name="ThuongHieu"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.ThuongHieu" />
    </a-form-item>
    <a-form-item
        label="Mô tả"
        name="MoTaHH"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-textarea v-model:value="formState.MoTaHH" />
    </a-form-item>
    <a-form-item
        label="Giá"
        name="Gia"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.Gia" />
    </a-form-item>
    <a-form-item
        label="Số lượng"
        name="SoLuongHang"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.SoLuongHang" />
    </a-form-item>
    <a-form-item
        label="Kích cỡ"
        name="KichCo"
        :rules="[{ required: true, message: 'Không được để trống!' }]"

    >
      <a-input v-model:value="formState.KichCo"/>
    </a-form-item>
    <a-form-item
        label="Màu sắc"
        name="Mau"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.Mau" />
    </a-form-item>
    <a-form-item
        label="Ghi chú"
        name="SoLuongHang"
        :rules="[{ required: true, message: 'Không được để trống!' }]"
    >
      <a-input v-model:value="formState.GhiChu" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Lưu</a-button>
    </a-form-item >
    <a-form-item label="Thêm hình ảnh">
      <input multiple type="file" @change="previewFiles">
    </a-form-item>
  </a-form>

  <contextHolder />
</template>

<style scoped>

</style>