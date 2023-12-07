<script setup>
import axios from "axios";
defineProps(['id'])
var formData = new FormData;
const previewFiles = (event) => {
  let data = new FormData();
  for (let i = 0; i < event.target.files.length; i++) {
    data.append('image_products', event.target.files[i])
  }

  console.log(data)

  // upload anh
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/admin/hinhhanghoa/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTE5NjdiN2JiNDZhMGZmZTA0YTk5ZiIsInJvbGUiOiIyIiwiaWF0IjoxNjk5ODQ3OTUxfQ.BzNaT6iTAt84LSLwk5ERpoEaj_QuzT6gjWyTvof5tLE',
    },
    data: data
  };

  axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}
</script>

<template>
  <input multiple type="file" @change="previewFiles">
</template>

<style scoped>

</style>