<template>
   <div
    :class="{ 'note-list-item': !isDetailPage }"
    class="note-item"
  >
    <div class="edited-item note-item__header">
      <div
        class="checkbox checked"
        v-if="isNoteDone"
      >
        <ic-checked
          class="ic-checked"
        />
      </div>
      <router-link
        :to="{
          name: 'note-detail',
          params: {
            id: note.id
          }
        }"
        :class="{
          disabled: isDetailPage
        }"
        class="edited-item__description"
      >
        {{ note.description }}
      </router-link>
      <div class="edited-item__actions">
        <ic-edit
          class="ic-edit"
          @click="editNoteConfirm"
        />
        <ic-remove
          class="ic-remove"
          @click="removeNoteConfirm"
        />
      </div>
    </div>

    <add-edit-form
      v-if="isDetailPage"
      class="add-todo-form"
      label="New todo"
      @submit="({ description }) => addNewTodo({ noteId: note.id, description })"
    />

    <div
      class="note-item__todos"
      v-if="note.todos.length"
    >
      <div
        class="edited-item todo"
        v-for="todo in note.todos.slice(0, todoLimit)"
        :key="todo.id"
      >
        <div
          class="checkbox"
          :class="{checked: todo.done}"
          @click="toggleTodo(todo)"
        >
          <ic-checked class="ic-checked"/>
        </div>
        <div
          class="edited-item__description"
          :class="{done: todo.done}"
          @click="toggleTodo(todo)"
        >
          {{ todo.description }}
        </div>
        <div
          v-if="isDetailPage"
          class="edited-item__actions"
        >
          <ic-edit
            class="ic-edit"
            @click="editTodoConfirm(todo)"
          />
          <ic-remove
            class="ic-remove"
             @click="removeTodoConfirm(todo)"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="note-item__todos-empty"
    >
      No tasks here
    </div>

    <confirm-modal
      ref="remove-note-modal"
      question='Are you sure you want to remove this note?'
      apply-btn-text='Remove'
      @apply="applyRemoveNote"
    />
    
    <confirm-modal
      ref="remove-todo-modal"
      question='Are you sure you want to remove this todo?'
      apply-btn-text='Remove'
      @apply="applyRemoveTodo"
      @cancel="cancelRemoveTodo"
    />
    
    <add-edit-form
      ref="edit-note-modal"
      label="Edit note"
      :in-modal="true"
      :start-form="noteEditStartForm"
      @submit="onSubmitEditNote"
    />

    <add-edit-form
      ref="edit-todo-modal"
      label="Edit todo"
      :in-modal="true"
      :start-form="todoEditStartForm"
      @submit="onSubmitEditTodo"
      @cancel="todoToEdit = null"
    />
  </div>
</template>

<script src="./note-item.js"/>
<style src="./note-item.scss" lang="scss" scoped/>