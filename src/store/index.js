import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { Note, Todo } from '@/data-schemas'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'myTodos'
})

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    addNewNote(state, description) {
      state.notes.push(new Note(description))
    },
    removeNote(state, notId) {
      state.notes = state.notes.filter(note => note.id !== notId)
    },
    removeTodo(state, { noteId, todoId }) {
      const note = state.notes.find(note => note.id === noteId)
      if (note) {
        note.todos = note.todos.filter(todo => todo.id !== todoId)
      }
    },
    editNote(state, { noteId, description }) {
      const note = state.notes.find(note => note.id === noteId)
      if (note) {
        note.description = description
      }
    },
    editTodo(state, { noteId, updatedTodo }) {
      const note = state.notes.find(note => note.id === noteId)
      if (note) {
        const todo = note.todos.find(todo => todo.id === updatedTodo.id)
        if (todo) {
          Object.assign(todo, updatedTodo)
        }
      }
    },
    addNewTodo(state, { noteId, description }) {
      const note = state.notes.find(note => note.id === noteId)
      note.todos.push(new Todo(description))
    }
  },
  plugins: [vuexLocal.plugin]
})