<template>
  <div>
    <portal to="modal-container" v-if="isOpen">
      <div
        class="modal-overlay"
        @mousedown="close"
      >
        <transition name="scale-height">
          <div
            ref="modal-content"
            @mousedown.stop
            class="modal-transition"
            v-if="transitionStart"
          >
            <ic-close
              class="ic-close"
              @click="close"
            />
            <slot />
          </div>
        </transition>
      </div>
    </portal>
  </div>
  
</template>

<script src="./modal.js"/>
<style src="./modal.scss" lang="scss" scoped/>