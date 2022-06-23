<template>
  <div class="bg-primary px-8 py-2 pb-32">
    <div class="mx-auto">
        <div class="max-w-xl mx-auto">
          <label class="relative block">
            <input v-model="search" class="rounded-full text-center placeholder:text-slate-400 block bg-white w-full border border-slate-300  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search Pokémon o filter by type..." type="text" name="search"/>
            <span class="absolute inset-y-0 right-0 text-gray-500 flex items-center pr-4">
              <i class="fa fa-search"></i>
            </span>
          </label>
        </div>
      <div class="mt-10 mx-auto max-w-6xl">
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="type in types" :key="type.name">
            <div 
              @click="_getFilterTypes(type)"
              class="tag cursor-pointer ml-4 text-xs bg-orange-200 text-orange-700" :class="{ 'ring-2 ring-emerald-500 ring-inset': type.name == selected_type }">
              {{ type.name }}
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        
        <div v-if="selected_type" @click="_loadPokemons()" class="tag">CLEAR FILTERS <i class="fa fa-xmark ml-1"></i></div>
      </div>
    </div>
  </div>
  <div class="container mx-auto">
  <div class="grid grid-cols-4 gap-8 -mt-12">
    <div class="pokecard p-4 flex items-center justify-center" 
      v-for="pokemon in filtered_pokemons"
      :key="pokemon.name">
       <div class="relative">
         <div class="uppercase absolute text-lg font-extrabold">
           {{ _getName(pokemon) }}
           <div class="-mt-2 text-sm">#{{ _getId(pokemon) }}</div>
         </div>
         <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_getId(pokemon)}.png`" :alt="pokemon.name" class="mx-auto w-[10rem]"/>
       </div>
       <div class="">
        <div class="mb-4"><button class="btn border bg-white border-green-500 text-green-500 w-full" @click="_showPokemon(_getId(pokemon))">Quickview</button></div>
        <div>
          <router-link :to="{name: 'pokemon', params: {id: _getId(pokemon) }}">
            <button class="btn btn-cta w-full">Pokemon</button>
          </router-link>
        </div>
      </div>
    </div>

    <PokeModal v-show="showModal" @close-modal="showModal = false">
      <template v-if="selected_pokemon" v-slot:content>
        <div :class="'bg-'+this.selected_pokemon.types[0].type.name" class="rounded-lg relative bg-pokeball">
          <div class="text-left absolute left-0 top-0 p-4">
            <div class="uppercase text-2xl font-extrabold">{{ selected_pokemon.name }}</div>
            <div class="font-extrabold text-xl">#{{ selected_pokemon.id }}</div>
          </div>
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected_pokemon.id}.png`"
            :alt="selected_pokemon.name"
            class="w-[20rem] m-0 m-auto"
          />
        </div>
        <div class="bg-white -mt-8 rounded-3xl relative">
            <PokeTabs
              class="w-11/12 lg:w-10/12 mx-auto"
              :tabList="tabList"
              variant="vertical"
            >
              <template v-slot:tabPanel-1>
                <div v-for="stat in selected_pokemon.stats" :key="stat.stat.name" class="space-x-4 flex text-xs text-left">
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
                  <div class="w-3/4 py-2 font-semibold"><span class="text-xs mr-2 tag" :class="'bg-'+typepokemon.type.name" v-for="typepokemon in selected_pokemon.types" :key="typepokemon.type.name">{{ typepokemon.type.name }}</span></div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Height</div>
                  <div class="w-3/4 py-2 font-semibold">{{ ((selected_pokemon.height*100)/10) }} cm</div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Weight</div>
                  <div class="w-3/4 py-2 font-semibold">{{ (selected_pokemon.weight/10) }} kg</div>
                </div>
                <div class="space-x-4 flex text-sm text-left">
                  <div class="w-1/4 py-2 text-gray-700 capitalize">Abilities</div>
                  <div class="w-3/4 py-2 font-semibold"><span class="text-xs mr-2 text-green-500" v-for="ability in selected_pokemon.abilities" :key="ability.ability.name">{{ ability.ability.name }}</span></div>
                </div>
              </template>
            </PokeTabs>
        </div>
      </template>
    </PokeModal>
  </div>
  </div>
</template>

<script>
import PokeModal from '@/components/PokeModal.vue'
import PokeTabs from '@/components/PokeTabs.vue'

import 'vue3-carousel/dist/carousel.css';

export default {
  components: { PokeModal, PokeTabs },
  name: 'Home',

  data() {
    return {
      pokemons: [],
      types: [],
      search: "",
      selected_type: null,
      selected_pokemon: null,
      showModal: false,
      tabList: ["Base Stats", "About"],
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 12,
        itemsToScroll: 4,	
        snapAlign: 'start',
      },
    },
    }
  },
  
  mounted() {
    
    this._loadPokemons();

    this.$http
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        this.types = response.data.results;
      });
  },

  methods: {
    _loadPokemons() {

      this.$http
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        this.pokemons = response.data.results;
        // response.data.results.map((pokemon) => {
        //   return this._getPokemonData(pokemon);
        // });
      });

      this.selected_type = null;
    },
    _getFilterTypes(type) {

      this.selected_type = type.name;

      this.$http
      .get(type.url)
      .then((poketypes) => {
        
        var pokemons_by_type = poketypes.data.pokemon.map((types) => {
            return types.pokemon;
        });

        this.pokemons = pokemons_by_type.filter(pokemon => this._getId(pokemon) <= 151);
            
      });
    },

    _getId(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
    _getName(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
    _showPokemon(id) {
      this.$http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selected_pokemon = response.data;
        this.showModal = !this.showModal;
      });
    },
    _getMoveLevel(move) {
      for (let version of move.version_group_details) {
        if (
          version.version_group.name == "sword-shield" &&
          version.move_learn_method.name == "level-up"
        ) {
          return version.level_learned_at;
        }
      }
      return 0;
    },
    filter_moves(pokemon) {
      return pokemon.moves.filter((item) => {
        let include = false;
        for (let version of item.version_group_details) {
          if (
            version.version_group.name == "sword-shield" &&
            version.move_learn_method.name == "level-up"
          ) {
            include = true;
          }
        }
        return include;
      });
    },
  },
  computed: {
    filtered_pokemons() {
      return this.pokemons.filter((item) => {
        return item.name.includes(this.search.toLowerCase().trim());
      });
    },
  },
}
</script>


