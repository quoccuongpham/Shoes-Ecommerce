<script setup>
  import UserLayout from "@/layouts/UserLayout.vue";
  import UserProductCard from "@/components/user/UserProductCard.vue";
  import ProductService from "@/services/user/user_product.service";
  import {onMounted, ref} from 'vue';
  let data = ref([]);
  const loadData = async () => {
    try {
      data.value = (await ProductService.getAll()).dataValues;
      console.log(data);
    } catch (e) {
      data = [];
    }
  }

  onMounted(() => {
    loadData();
  })
  console.log(data.value)
</script>

<template>
	<user-layout>
    <a-grid>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24}">
        <a-col :span="{md: 4}" v-for="info in data" class="col-item">
          <user-product-card
              :img="info.list_images[0]?.Url"
              :title="info?.TenHH"
              :price="Number.parseInt(info?.Gia)"
              :des="`${info?.Mau?.length} colours`"
              :id="String(info?._id)"
          />
        </a-col>
      </a-row>
    </a-grid>


  </user-layout>
</template>

<style scoped>
  .col-item {
    margin-bottom: 20px;
    margin-top: 10px;
  }
</style>
