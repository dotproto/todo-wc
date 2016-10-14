(function () {
	"use strict";

	const ENTER_KEY = 13;
	const ESC_KEY = 27;

	class TodoApp extends WebComponent {
		constructor () {
			// # Initialize HTML element constructor
			super({ debug: true, template: 'todo-app-template' });
			this.logDebug('TodoApp constructor');

			this._input = this._root.querySelector('.new-todo');
			this._list = this._root.querySelector('.todo-list');

			this._observer = new MutationObserver(this.onListMutation.bind(this));

			// Bind event listeners to this instance
			this._boundOnListMutation = this.onListMutation.bind(this);
			this._boundOnInputEnter = this.onInputEnter.bind(this);
			this._boundOnTodoDestroy = this.onTodoDestroy.bind(this);

			window.addEventListener('todo-item-destroyed', this._boundOnTodoDestroy, true);
		}

		// =========================================================================
		// Lifecycle Events

		adoptedCallback (oldDocument, document) {
			this.logDebug('TodoApp:adoptedCallback');
		}

		attributeChangedCallback (attrName, oldVal, newVal) {
			this.logDebug('TodoApp:attributeChangedCallback');
		}

		disconnectedCallback () {
			this.logDebug('TodoApp:disconnectedCallback');

			// Clean up listeners
			this._input.removeEventListener('keypress', this._boundOnInputEnter);
		}

		connectedCallback () {
			this.logDebug('TodoApp:connectedCallback');

			// Set up a mutation observer on the item list
			const obsConfig = { childList: true, attributes: true};
			this._observer.observe(this._list, obsConfig);

			// Register event listeners
			document.addEventListener('todo-update', this.onTodoUpdate);
			this._input.addEventListener('keypress', this._boundOnInputEnter);
		}

		// =========================================================================
		// Event Listeners
		onListMutation(mutations, observer) {
			console.log('MU callback', arguments);
		}

		onInputEnter(e) {
			if (e.charCode === ENTER_KEY && this._input.value.trim()) {
				this.createTodo();
			}
		}

		onTodoUpdate(e) {
			console.error('onTodoUpdate', e);
		}

		onTodoDestroy(e) {
			e.stopPropagation();

			var el = e.targetElement;
		}

		// =========================================================================
		// Instance Methods

		createTodo() {
			this.logDebug('TodoApp.onSubmit');

			const todo = this._doc.createElement('todo-item');
			todo.value = this._input.value;
			this._list.appendChild(todo);
			this._input.value = '';
		}

		// onSubmit (e) {
		// 	e.preventDefault();
		// 	this.logDebug('TodoApp.onSubmit');
		//
		// 	const listItem = this._doc.createElement('li');
		// 	const todo = this._doc.createElement('todo-item');
		//
		// 	todo.value = this._input.value;
		//
		// 	listItem.appendChild(todo);
		// 	this._list.appendChild(listItem);
		//
		// 	this._input.value = '';
		// 	this._input.focus();
		// }
	}

	WebComponent.setup('todo-app', TodoApp);

	window.TodoApp = TodoApp;
})();
