<template>
	<nav class="relative flex flex-wrap items-center justify-between py-3 bg-primary">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-center">
			<router-link class="hover:opacity-75" to="/">
				<img src="@/assets/img/logo.svg" alt="">
			</router-link>
		</div>
	</nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuShow: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.menuShow = !this.menuShow;
    }
  }
}
</script>

