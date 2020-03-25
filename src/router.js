import Vue from 'vue'
import Router from 'vue-router'
import NoteList from '@/pages/note-list/note-list.vue'
import NoteDetail from '@/pages/note-detail/note-detail.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/notes'
  },
  {
    path: '/notes',
    name: 'notes',
    component: NoteList
  },
  {
    path: '/notes/:id',
    name: 'note-detail',
    component: NoteDetail
  }
]

export default new Router({
  routes
})