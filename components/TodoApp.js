'use strict'

class TodoApp extends WebComponent {
  constructor() {
    //# Initialize HTML element constructor
    super({ debug: true, template: 'todo-app-template' })

    this._form = this._root.querySelector('form')
    this._input = this._root.querySelector('.todo-input')
    this._list = this._root.querySelector('.todo-list')

    this.registerHandlers()
  }

  registerHandlers() {
    this._form.addEventListener('submit', this.onSubmit.bind(this), false)
  }

  onSubmit(e) {
    e.preventDefault()
    console.debug('submit')

    const newItem = this._doc.createElement('todo-item')
    newItem.value = this._input.value
    this._list.appendChild(newItem)
  }
}

customElements.define('todo-app', TodoApp)
