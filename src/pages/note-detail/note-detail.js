import { mapState } from 'vuex'
import NoteItem from '@/modules/note-item/note-item.vue'

export default {
  name: 'NoteDetail',
  components: {
    NoteItem
  },
  data() {
    return {
      note: null
    }
  },
  computed: {
    ...mapState(['notes'])
  },
  created() {
    const noteId = this.$route.params.id
    this.note = this.notes.find(note => note.id === noteId)
    if (!this.note) {
      this.router.push({ name: 'notes' })
    }
  }
}