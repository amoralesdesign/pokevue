<!-- Modal component -->
<template>
  <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal relative" @click.stop>
        <div class="z-40 absolute cursor-pointer right-4 top-4 uppercase" @click="$emit('close-modal')">
          <i class="fa fa-xmark-circle fa-xl"></i>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>