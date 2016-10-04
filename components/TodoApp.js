(function () {
	"use strict";

	class TodoApp extends WebComponent {
		constructor () {
			// # Initialize HTML element constructor
			super({ debug: true, template: 'todo-app-template' });
			this.debug('TodoApp constructor');

			this._form = this._root.querySelector('form');
			this._input = this._root.querySelector('.todo-input');
			this._list = this._root.querySelector('.todo-list');

			this.registerHandlers();
		}

		registerHandlers () {
			this._form.addEventListener('submit', this.onSubmit.bind(this), false);
		}

		onSubmit (e) {
			e.preventDefault();
			this.debug('TodoApp.onSubmit');

			const listItem = this._doc.createElement('li');
			const todo = this._doc.createElement('todo-item');

			todo.value = this._input.value;

			listItem.appendChild(todo);
			this._list.appendChild(listItem);

			this._input.value = '';
			this._input.focus();
		}
	}

	WebComponent.setup('todo-app', TodoApp);

	window.TodoApp = TodoApp;
})();

