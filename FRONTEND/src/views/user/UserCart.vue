<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import {onMounted, ref, toRaw} from "vue";
import convert_currency from "@/assets/convert_currency";
import axios from "axios";
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();
// ref
let list_products = ref();
let price = ref(0);

onMounted(() => {
  list_products.value = JSON.parse(localStorage.getItem('cart'));
  price.value = toRaw(list_products?.value)?.reduce((pre, curr) => {
    return pre + curr.Gia * curr.SoLuong;
  }, 0)
  console.log(list_products.value)
})

// handle
const submit_cart = () => {
  toRaw(list_products.value).forEach(value => {
    let data = JSON.stringify({
      "MSHH": value._id,
      "SoLuong": value.SoLuong
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/users/dathang/',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          api.success({
            message: value.TenHH,
            description: "Đặt hàng thành công",
            placement: "topRight",
          });
        })
        .catch((error) => {
          console.log(error);
        });
  });
  localStorage.removeItem('cart');
  list_products.value = [];
  price.value = 0;
}

const deleteItemCart = (idx) => {
  let items = [];
  items = JSON.parse(localStorage.getItem('cart'));
  if (items.length == 1) {
    items = [];
  } else {
    items.splice(idx, 1)
  }
  list_products.value = items;
  price.value = toRaw(list_products?.value)?.reduce((pre, curr) => {
    return pre + curr.Gia * curr.SoLuong;
  }, 0)
  localStorage.setItem('cart', JSON.stringify(items));
}
</script>

<template>
<user-layout>
 <div class="main-container">
   <a-typography-title>Giỏ hàng</a-typography-title>
   <a-divider/>
   <a-row>

     <a-col span="16">
       <div class="product" v-for="(data, idx) in list_products">
         <a-row>
             <a-col span="24">
               <a-card>
                 <a-row>
                   <a-col span="16">
                     <a-typography-title :level="5">{{ data.TenHH }}</a-typography-title>
                     <a-tag>{{data.Mau}}</a-tag>
                     <a-tag>{{data.KichCo}}</a-tag>
                     <br>
                     <a-typography-text strong mark class="quantity">Số lượng: {{data.SoLuong}}</a-typography-text>
                   </a-col>
                   <a-col span="8">
                     <a-typography-title
                         :level="5">
                       {{convert_currency(data.Gia)}}
                     </a-typography-title>
                     <a-button danger @click="() => {deleteItemCart(idx)}">Xóa</a-button>
                   </a-col>
                 </a-row>
               </a-card>
             </a-col>
         </a-row>
       </div>
     </a-col>
     <a-col span="8" class="price">
       <a-card title="Tổng">
         <a-typography-title
             :level="2">
           {{convert_currency(price)}}
         </a-typography-title>
         <a-button size="large" type="primary" block @click="submit_cart">Đặt hàng</a-button>
       </a-card>
     </a-col>
   </a-row>
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
.quantity {
  margin-top: 10px;
  display: inline-block;
}
.price {
  padding-left: 20px;
}
</style>