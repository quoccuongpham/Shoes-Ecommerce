import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import Home from "@/views/user/UserHomePage.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserHomePage from "@/views/user/UserHomePage.vue";
const routes = [
	{
		path: "/",
		name: "user-homepage",
		component: UserHomePage,
		children: [
			{
				path: "home",
				component: Home,
				index: true
			},

		]
	},
	{
		path: "/product/:id",
		component: () => import("@/views/user/UserDetailProduct.vue"),
		props: true
	},
	{
		path: "/mycart",
		component: () => import("@/views/user/UserCart.vue")
	},
	{
		path: "/list_recipe",
		component: () => import('@/views/user/UserListRecipe.vue')
	},
	{
		path: "/login",
		component: () => import("@/views/user/Auth/UserLogin.vue")
	},
	{
		path: "/register",
		component: () => import("@/views/user/Auth/UserRegister.vue")
	},
	{
		path: "/admin/login",
		component: () => import("@/views/admin/AdminLogin.vue")
	},
	{
		path: "/admin/",
		component: () => import("@/layouts/AdminLayout.vue"),
		children: [
			{
				path: "/admin/homepage",
				component: () => import('@/views/admin/AdminHomePage.vue')
			},
			{
				path: "/admin/add_staff",
				component: () => import('@/views/admin/Staff/AdminAddStaff.vue')
			},
			{
				path: "/admin/list_staff",
				component: () => import('@/views/admin/Staff/AdminListStaff.vue')
			},
			{
				path: "/admin/add_customer",
				component: () => import('@/views/admin/Customer/AdminAddCustomer.vue')
			},
			{
				path: "/admin/list_customer",
				component: () => import('@/views/admin/Customer/AdminListCustomer.vue')
			},
			{
				path: "/admin/add_product",
				component: () => import('@/views/admin/Product/AdminAddProduct.vue')
			},
			{
				path: "/admin/list_product",
				component: () => import('@/views/admin/Product/AdminListProduct.vue')
			},
			{
				path: "/admin/add_recipe/:id",
				component: () => import('@/views/admin/Recipe/AdminAddRecipe.vue'),
				props: true
			},
			{
				path: "/admin/list_recipe",
				component: () => import("@/views/admin/Recipe/AdminListRecipe.vue")
			}
		]
	},
	{
		path: "/main",
		name: "contactbook",
		component: ContactBook,
	},
	{
		path: "/contacts/:id",
		name: "contact.edit",
		component: () => import("@/views/ContactEdit.vue"),
		props: true,
	},
	{
		path: "/contacts/add",
		name: "contact.add",
		component: () => import("@/views/ContactAdd.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
