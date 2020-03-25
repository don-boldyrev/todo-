import { mapMutations } from 'vuex'
import ConfirmModal from '@/components/confirm-modal/confirm-modal.vue'
import IcChecked from '@/assets/svg/ic-checked.svg?inline'
import IcEdit from '@/assets/svg/ic-edit.svg?inline'
import IcRemove from '@/assets/svg/ic-remove.svg?inline'
import AddEditForm from '@/components/add-edit-form/add-edit-form.vue'


export default {
  name: 'NoteItem',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  components: {
    IcChecked,
    IcEdit,
    IcRemove,
    ConfirmModal,
    AddEditForm
  },
  data() {
    return {
      todoToRemove: null,
      todoToEdit: null
    }
  },
  computed: {
    isDetailPage() {
      return this.$route.name === 'note-detail'
    },
    todoEditStartForm() {
      return this.todoToEdit ? {
        description: this.todoToEdit.description
      } : null
    },
    noteEditStartForm() {
      return {
        description: this.note.description
      }
    },
    isNoteDone() {
      if (this.note.todos.length) {
        const todos = this.note.todos
        const todosDone = todos.filter(todo => todo.done)
        return todos.length === todosDone.length
      }
      return false
    },
    todoLimit() {
      return this.isDetailPage ? this.note.todos.length : 3
    }
  },
  methods: {
    ...mapMutations(['removeNote', 'removeTodo', 'editNote', 'editTodo', 'addNewTodo']),
    removeNoteConfirm() {
      this.$refs['remove-note-modal'].show()
    },
    removeTodoConfirm(todo) {
      this.todoToRemove = todo
      this.$refs['remove-todo-modal'].show()
    },
    applyRemoveNote() {
      this.removeNote(this.note.id)
    },
    applyRemoveTodo() {
      this.removeTodo({ noteId: this.note.id, todoId: this.todoToRemove.id })
      this.todoToRemove = null
    },
    cancelRemoveTodo() {
      this.todoToRemove = null
    },
    editNoteConfirm() {
      this.$refs['edit-note-modal'].show()
    },
    onSubmitEditNote({ description }) {
      this.editNote({
        noteId: this.note.id,
        description
      })
    },
    editTodoConfirm(todo) {
      this.todoToEdit = todo
      this.$refs['edit-todo-modal'].show()
    },
    onSubmitEditTodo(objToChange) {
      const updatedTodo = { ...this.todoToEdit }
      Object.keys(updatedTodo).forEach(key => {
        if (objToChange[key] !== undefined) {
          updatedTodo[key] = objToChange[key]
        }
      })
      this.editTodo (
        {
          noteId: this.note.id,
          updatedTodo 
        }
      )
      this.todoToEdit = null
    },
    toggleTodo(todo) {
      this.todoToEdit = todo
      const updatedTodo = { ...this.todoToEdit }
      updatedTodo.done = !updatedTodo.done
      this.onSubmitEditTodo(updatedTodo)
      this.todoToEdit = null
    }
  }
}