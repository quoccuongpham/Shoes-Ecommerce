<script setup>
import UserHeader from "@/components/user/UserHeader.vue";
import { ref } from "vue";
import UserLayoutSider from "@/components/user/UserLayoutSider.vue";

let is_colapse = ref(false);
</script>
<template>
	<a-layout>
		<a-layout-header class="header">
			<user-header
				@colapse="(e) => (is_colapse = !is_colapse)"
			></user-header>
		</a-layout-header>

		<a-layout>
			<a-layout-sider
				:collapsed="is_colapse"
				collapsed-width="0"
        width="280px"
				class="sider"
			>
        <user-layout-sider></user-layout-sider>
      </a-layout-sider>

			<a-layout-content class="main-content">
				<slot></slot>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<style scoped>
.header {
	background-color: #fff;
	height: 110px;
}
.sider {
  background-color: #fff;
  width: 400px;
}
.main-content {
	min-height: 100vh;
  padding: 20px;
  border-radius: 20px;
}
</style>
