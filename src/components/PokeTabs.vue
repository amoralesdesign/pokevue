<template>
  <div
    :class="{
      'flex space-x-4': variant === 'horizontal',
    }"
  >
    <ul
      class="list-none pt-1.5 border-b border-gray-200 text-center overflow-auto whitespace-nowrap"
      :class="{
        'flex items-center': variant === 'vertical',
      }"
    >
      <li
        v-for="(tab, index) in tabList"
        :key="index"
        class="w-full px-4 py-1.5 border-transparent hover:text-gray-700 hover:border-gray-300 hover:border-b-2 ease-in duration-200"
        :class="{
          'text-primary border-primary border-b-2 hover:border-primary hover:text-primary': index + 1 === activeTab,
          'text-gray-500': index + 1 !== activeTab,
        }"
      >
        <label
          :for="`${_uid}${index}`"
          v-text="tab"
          class="cursor-pointer block"
        />
        <input
          :id="`${_uid}${index}`"
          type="radio"
          :name="`${_uid}-tab`"
          :value="index + 1"
          v-model="activeTab"
          class="hidden"
        />
      </li>
    </ul>
    <template v-for="(tab, index) in tabList">
      <div
        :key="index"
        v-if="index + 1 === activeTab"
        class="flex-grow bg-white rounded-lg p-4"
      >
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => "vertical",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>