import { v1 as uuid } from 'uuid'

export class Note {
  constructor(description = '') {
    this.id = uuid()
    this.description = description
    this.todos = []
  }
}

export class Todo {
  constructor(description = '') {
    this.id = uuid()
    this.description = description
    this.done = false
  }
}
