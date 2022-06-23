<template>
  <div class="">
    <h1>Ficha Pokémon</h1>
    <p>Nombre: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'PokemonSheet',
  props: {
    msg: String
  }
}
</script>


