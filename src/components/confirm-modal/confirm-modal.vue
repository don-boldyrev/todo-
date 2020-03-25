<template>
  <modal
    ref="confirm-modal"
    @close="onClose"
  >
    <div class="confirm-modal">
      <div class="confirm-modal__question">
        {{ question }}
      </div>
      <div class="confirm-modal__btns">
        <v-button
          @click="apply"
          view-type="danger"
        >
          {{ applyBtnText }}
        </v-button>
        <v-button
          @click="cancel"
          class="cancel-btn"
        >
          Cancel
        </v-button>
      </div>
    </div>
  </modal>
</template>

<script src="./confirm-modal.js"/>
<style src="./confirm-modal.scss" lang="scss" scoped/>