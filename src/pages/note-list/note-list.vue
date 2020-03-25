<template>
  <div class="note-list">
    <h1 class="page-title">
      Note list
    </h1>
    <add-edit-form
      class="add-form"
      label="Add new note"
      @submit="({ description }) => addNewNote( description )"
    />
    <note-item
      class="note-item"
      v-for="note in notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script src="./note-list.js"/>
<style src="./note-list.scss" lang="scss" scoped/>