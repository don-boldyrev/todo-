<template>
  <div class="textarea-wrapper">
    <div
      v-if="!noControls"
      class="control-btns"
    >
      <v-button
        class="control-btns__btn"
        @click="onUndo"
        icon="undo"
      />
      <v-button
        class="control-btns__btn"
        @click="onRedo"
        icon="redo"
      />
    </div>
    <label>
      <div
        class="label-text"
        v-if="label"
      >
        {{ label }}
      </div>
      <textarea
        class="textarea"
        ref="textarea"
        :value="value"
        :placeholder="placeholder"
        @input="onInput"
        @keydown="onKeydown"
        autocomplete="off"
        :style="height ? { height: `${height}px` } : ''"
      />
    </label>
  </div>
  
  
</template>

<script src="./v-textarea.js"/>
<style src="./v-textarea.scss" lang="scss" scoped/>