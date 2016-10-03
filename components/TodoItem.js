'use strict'

class TodoItem extends WebComponent {
  constructor() {
    super({ debug: true, template: 'todo-item-template' })
    console.log('todo')
  }
}


customElements.define('todo-item', TodoItem)