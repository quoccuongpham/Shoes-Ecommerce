<script setup>
  import UserLayout from "@/layouts/UserLayout.vue";
  import {ShoppingCartOutlined} from "@ant-design/icons-vue"
  import {h} from 'vue';
  import axios from "axios";
  import { onMounted, ref, toRaw} from "vue";
  import convert_currency from "@/assets/convert_currency";
  import { notification } from 'ant-design-vue';
  const [api, contextHolder] = notification.useNotification();
  const id = defineProps(['id']);

  let data = ref();
  let SoLuong = ref(1);
  let selectedColor = ref(0)
  let selectedSize = ref(0)

  onMounted( () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/users/hanghoa/${id.id}`,
      headers: { }
    };

    axios.request(config)
        .then((response) => {
          data.value = response.data?.dataValues;
          console.log(data.value)
        })
        .catch((error) => {
          console.log(error);
        });
  });

  const handleAddToCart = (value) => {
    let myCart = localStorage.getItem('cart');
    if (Array.isArray(JSON.parse(myCart))) {
      myCart = JSON.parse(myCart);
      myCart.push(toRaw(value));
      localStorage.setItem('cart', JSON.stringify(myCart));
    } else {
      myCart = toRaw(value);
      localStorage.setItem('cart', JSON.stringify([myCart]))
    }
    api.success({
      message: "Thành công",
      description: "Đã thêm vào giỏ hàng",
      placement: "topRight",
    });
  }
</script>

<template>
  <user-layout>
    <div class="main-container">

      <div v-for="(info, i) in data">
        <a-row v-if="i == 1">
          <a-col span="8">
            <a-carousel arrows dots-class="slick-dots slick-thumb">
              <template #customPaging="props">
                <a>
                  <img :src="data[1][props.i].Url" />
                </a>
              </template>
              <div v-for="image in data[i]" :key="image.id">
                <img :src="image.Url" />
              </div>
            </a-carousel>
          </a-col>
          <a-col span="16">
            <a-typography-title :level="2">{{data[0].TenHH}}</a-typography-title>
            <a-typography-text strong>{{data[0].ThuongHieu}}</a-typography-text>
            <a-typography-title :level="3">{{convert_currency(data[0].Gia)}}</a-typography-title>

            <a-typography-text strong>MÔ TẢ</a-typography-text>
            <a-typography-paragraph>{{data[0].MoTaHH}}</a-typography-paragraph>

            <a-typography-paragraph strong>MÀU SẮC </a-typography-paragraph>
            <a-button v-for="(color, i) in data[0].Mau" type="default" class="btn-select"  :danger="i == selectedColor" @click="() => {selectedColor = i}">{{color}}</a-button>

            <a-typography-paragraph strong>KÍCH CỠ </a-typography-paragraph>
            <a-button v-for="(size, i) in data[0].KichCo" type="default" class="btn-select" :danger="i == selectedSize" @click="() => {selectedSize = i}" >{{size}}</a-button>
            <br>

            <a-typography-paragraph strong>SỐ LƯỢNG </a-typography-paragraph>
            <a-input-number
                min="1"
                :max="data[0].SoLuongHang"
                v-model:value="SoLuong">
            </a-input-number>
            <br>
            <!-- ADD TO CARD -->
            <a-button
                :icon="h(ShoppingCartOutlined)"
                size="large"
                class="submit-btn"
                type="primary"
                @click="() => handleAddToCart({...data[0],Mau: data[0].Mau[selectedColor], KichCo: data[0].KichCo[selectedSize], SoLuong: SoLuong})"
            >
              Thêm vào giỏ hàng
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <contextHolder/>
  </user-layout>
</template>

<style scoped>
.main-container {
  padding: 20px;
  background-color: #fff;
  height: 100%;
}
.carousel {
  width: 50%;
}
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

.btn-select {
  margin-bottom: 10px;
  margin-right: 5px;
}
.submit-btn {
  margin-top: 20px;
}
</style>