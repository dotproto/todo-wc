/* global WebComponent */
'use strict'

class TodoItem extends WebComponent {
  constructor () {
    super({ debug: true, template: 'todo-item-template' })

    if (this._debug) console.log('TodoItem constructor')
    this.binding = {}

    this._valEl = this._root.querySelector('[data-bind="value"]')
    this.update()
  }

  update () {
    if (this._valEl.innerText !== this.value) {
      this._valEl.innerText = this.value || ''
    }
  }

  get value () {
    return this.getAttribute('value')
  }

  set value (val) {
    if (val) {
      this.setAttribute('value', val)
    } else {
      this.removeAttribute('value')
    }

    this.update()
  }

  get completed () {
    return this.hasAttribute('completed')
  }

  set completed (val) {
    if (val) {
      this.setAttribute('completed', '')
    } else {
      this.removeAttribute('completed')
    }
  }
}

WebComponent.setup('todo-item', TodoItem)
