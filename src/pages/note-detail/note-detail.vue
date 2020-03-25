<template>
  <div class="todo-item">
    <h1 class="page-title">
      Note detail
    </h1>
    <router-link
      :to="{
        name: 'notes'
      }"
    >
      <v-button
        class="go-back-btn"
      >
        Go to list
      </v-button>
    </router-link>
    <note-item
      v-if="note"
      :note="note"
    />
  </div>
</template>

<script src="./note-detail.js"/>
<style src="./note-detail.scss" lang="scss" scoped/>