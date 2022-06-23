<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<Header />
			<router-view />
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },

  name: 'App',
 
}
</script>

