<template>
	<nav class="relative flex flex-wrap items-center justify-between py-3 bg-primary">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
				<a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
					PokeVue
				</a>
				<button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
					<i class="fas fa-bars"></i>
				</button>
			</div>
			<div v-bind:class="{'hidden': !menuShow, 'flex': menuShow}" class="lg:flex lg:flex-grow items-center">
				<ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
					<li class="nav-item">
					<router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/">Inicio</router-link>
					</li>
					<li class="nav-item">
					<router-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/pokemon/ditto">Pokemon</router-link>
					</li>
				</ul>
			</div>
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

