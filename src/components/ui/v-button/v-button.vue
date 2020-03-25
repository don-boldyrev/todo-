<template>
  <button
    @click="onClick"
    :type="type"
    :class="viewType"
    class="btn"
  >
    <div class="btn-content">
      <component
        v-if="!!icon"
        :is="IconCmp"
        :class="{'not-text': !$slots.default}"
        class="btn-content__icon"
      />
      <div class="btn-content__text" v-if="$slots.default">
        <slot />
      </div>
    </div>
  </button>
</template>

<script src="./v-button.js"/>
<style src="./v-button.scss" lang="scss" scoped/>