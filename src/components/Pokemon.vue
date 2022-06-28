<!-- Pokémon data, if the quickview parameter is passed, some options are hidden. -->
<template>
  <div>
    <div v-if="!loading" :class="'bg-'+pokemon.types[0].type.name" class="rounded-lg relative bg-pokeball">
          <div class="text-left absolute left-0 top-0 p-4">
            <div class="uppercase text-2xl font-extrabold">{{ pokemon.name }}</div>
            <div class="font-extrabold text-xl">#{{ pokemon.id }}</div>
          </div>
         
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" :alt="pokemon.name" class="w-[20rem] m-0 m-auto"/>
          
        </div>
        <div class="bg-white -mt-8 rounded-3xl relative">
            <PokeTabs
              class="w-11/12 lg:w-10/12 mx-auto"
              :tabList="tab_list"
              variant="vertical"
            >
              <template v-slot:tabPanel-1>
                <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="space-x-4 flex text-xs text-left">
                  <div class="w-1/3 py-2 text-gray-700 capitalize">{{ stat.stat.name }}</div>
                  <div class="w-1/8 py-2 font-semibold capitalize">{{ stat.base_stat }}</div>
                  <div class="w-1/2 py-2">
                    <div class="w-full bg-gray-200 h-1">
                      <div class="h-1" :class="[stat.base_stat >=50 ? 'bg-green-500' : 'bg-orange-500', '']" :style="'width:'+stat.base_stat+'%'"></div>
                      </div>
                    </div>
                </div>
              </template>
              <template v-slot:tabPanel-2>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Type</div>
                  <div class="w-3/4 py-2 font-semibold"><span class="text-xs mr-2 tag" :class="'bg-'+typepokemon.type.name" v-for="typepokemon in pokemon.types" :key="typepokemon.type.name">{{ typepokemon.type.name }}</span></div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Height</div>
                  <div class="w-3/4 py-2 font-semibold">{{ ((pokemon.height*100)/10) }} cm</div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Weight</div>
                  <div class="w-3/4 py-2 font-semibold">{{ (pokemon.weight/10) }} kg</div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Abilities</div>
                  <div class="w-3/4 py-2 font-semibold"><span class="text-xs mr-2 text-green-500" v-for="ability in pokemon.abilities" :key="ability.ability.name">{{ ability.ability.name }}</span></div>
                </div>
              </template>
               <template v-if="!quickview" v-slot:tabPanel-3>
                   <div class="overflow-y-auto h-32">
                       <div v-for="move in pokemon.moves" :key="move.move.name" class="py-2 text-gray-700 capitalize inline-block">
                            <div class="px-4 mx-4 border-solid border-2 rounded-full border-blue-200">{{ move.move.name }}</div>
                        </div>
                   </div>
              </template>
               <template v-if="!quickview" v-slot:tabPanel-4>
                   <div><img :src="pokemon.shiny" :alt="pokemon.name" class="w-[20rem] m-0 m-auto"/></div>
              </template>
              
            </PokeTabs>
        </div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      loading: true,
      url: null,
      tab_list: [],
      pokemon: {
        name: '',
        id:'',
        stats: '',
        abilities: '',
        types: '',
        shiny: '',
        height: 0,
        weight: 0,
      },
    }
  },
  props: {
    referenceid: [Number,String],
    name: String,
    quickview: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  watch : {
    referenceid(new_){
      new_ && this._loadPokemonData();
    }
  },
  
  methods: {

    _loadPokemonData: function(){
   
      this.url = 'https://pokeapi.co/api/v2/pokemon/'+this.referenceid;

      this.$http.get(this.url).then(res => {
        this.pokemon.name      = res.data.name;
        this.pokemon.id        = res.data.id;
        this.pokemon.stats     = res.data.stats;
        this.pokemon.shiny     = res.data.sprites.front_shiny;
        this.pokemon.height    = res.data.height;
        this.pokemon.weight    = res.data.weight;
        this.pokemon.types     = res.data.types;
        this.pokemon.abilities = res.data.abilities;
        this.pokemon.moves     = res.data.moves;

        if(this.quickview)
            this.tab_list = ["Base Stats", "About"];
        else
            this.tab_list = ["Base Stats", "About","Movements","Shiny"];

        this.loading = false;

      }).catch(err => {
        console.log(err);
      })
    },
   
  },
  created: function(){
    this._loadPokemonData();
  }

}
</script>