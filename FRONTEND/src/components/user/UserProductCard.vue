<script setup>
import {number, string} from "yup";
import convert_currency from "../../assets/convert_currency";

  defineProps(
      {
        id: string,
        img: string,
        title: string,
        price: number,
        des: string,
      }
  )
</script>

<template>
  <router-link :to="'/product/' + id">
    <a-card hoverable class="main-card-container">
      <template #cover>
        <img :alt="title" :src="img" />
      </template>
      <a-card-meta :title="title">
        <template #description>
          <a-typography-text type="secondary">{{des}}</a-typography-text>
          <br>
          <a-typography-text strong>{{convert_currency(price)}}</a-typography-text>
        </template>
      </a-card-meta>
    </a-card>
  </router-link>
</template>

<style scoped>
  .main-card-container {
    width: 250px;
  }
</style>