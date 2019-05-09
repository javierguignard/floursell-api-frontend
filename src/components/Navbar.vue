<template>
	<div id="navbar">
		<el-menu
			:default-active="activeIndex2"
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b">
			<el-menu-item @click="mover('client')">Clientes</el-menu-item>
			<el-menu-item @click="mover('sell')">Ventas</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
	methods: {
		mover(name) {
			this.$router.push({ name: name })
		}
	}
}
</script>

<style>
.menu {
	background-color: #545c64;
	;
}
</style>
