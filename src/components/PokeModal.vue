<!-- Modal component -->
<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal relative" @click.stop>
        <div class="z-40 absolute cursor-pointer right-4 top-4 uppercase" @click="$emit('close-modal')">
          <i class="fa fa-xmark-circle fa-xl"></i>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>