(function () {
	"use strict";

	class TodoItem extends WebComponent {
		constructor () {
			super({ debug: true, template: 'todo-item-template' });

			if (this._debug) console.log('TodoItem constructor');
			this.binding = {};

			this._valEl = this._root.querySelector('[data-bind="value"]');
			this._destroyButton = this._root.querySelector('button.destroy');
			this._destroyButton.addEventListener('click', this.onClickDestroy.bind(this));

			this.update();
		}

		update () {
			if (this._valEl.innerText !== this.value) {
				this._valEl.innerText = this.value || '';
				this.dispatchUpdateEvent();
			}
		}

		onClickDestroy(e) {
			const eventOptions = {
				bubbles: false,
				cancelable: true,
				composed: false,
				detail: this,
			};
			window.dispatchEvent(new CustomEvent('todo-item-destroyed', eventOptions));
		}

		dispatchUpdateEvent() {
			const eventConfig = { "cancelable": false, "scoped": true };
			const event = new Event('todo-update');
			this.dispatchEvent(event);
		}

		get value () {
			return this.getAttribute('value');
		}

		set value (val) {
			if (val) {
				this.setAttribute('value', val);
			} else {
				this.removeAttribute('value');
			}

			this.update();
		}

		get completed () {
			return this.hasAttribute('completed');
		}

		set completed (val) {
			if (val) {
				this.setAttribute('completed', '');
			} else {
				this.removeAttribute('completed');
			}
		}

	}

	WebComponent.setup('todo-item', TodoItem);

})();
