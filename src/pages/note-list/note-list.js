import { mapState, mapMutations } from 'vuex'
import NoteItem from '@/modules/note-item/note-item.vue'
import AddEditForm from '@/components/add-edit-form/add-edit-form.vue'

export default {
  name: 'NoteList',
  components: {
    NoteItem,
    AddEditForm
  },
  computed: {
    ...mapState(['notes'])
  },
  methods: {
    ...mapMutations(['addNewNote'])
  }
}