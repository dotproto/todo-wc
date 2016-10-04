(function () {
	"use strict";

	class WebComponent extends HTMLElement {
		constructor ({ debug = false, template } = {}) {
			super();

			this._debug = debug;
			this.debug('WebComponent: Debug enabled');

			// Bind the component's template to this instance
			if (template) this.bindTemplate(template);

			// Not sure if this is necessary -- commenting out for the moment
			//
			// this._styles = this._import.querySelector('link[rel="stylesheet"]')
			// this._main.head.appendChild(_styles.cloneNode(true));
		}

		debug (...args) {
			if (this._debug) console.log.apply(console, args);
		}

		listen (type, cb) {
			return document.addEventListener(type, cb);
		}

		bindTemplate (id) {
			// Create an open component when in debug mode
			const shadowOpts = {
				mode: this._debug ? 'open' : 'closed'
			};

			// Implicitly creates `this.shadowRoot`, but that's inaccessible in closed mode
			this._root = this.attachShadow(shadowOpts);
			const template = this._import.getElementById(id);
			const instance = template.content.cloneNode(true);

			this._root.appendChild(instance);
			this.debug(this._root);
		}

		adoptedCallback (oldDocument, document) {
			this.debug('WebComponent:adoptedCallback');
		}

		attributeChangedCallback (attrName, oldVal, newVal) {
			this.debug('WebComponent:attributeChangedCallback');
		}

		disconnectedCallback () {
			this.debug('WebComponent:disconnectedCallback');
		}

		connectedCallback () {
			this.debug('WebComponent:connectedCallback');
		}
	}

	// Finish the setup of a new WC. This includes registering the component with
	// the DOM and setting static properties on the prototype required by the
	// WebComponent constructor.
	//
	// * _doc - The document object that imported this WC
	// * _import - The document that contains the template
	WebComponent.setup = function setup (tag, Component) {
			// # Cache references to our import script
			//
			// Cribbed from https://www.html5rocks.com/en/tutorials/webcomponents/imports/
		const proto = Component.prototype;
		proto._doc = document;
		proto._import = proto._doc.currentScript.ownerDocument;

			// Register the element
		customElements.define(tag, Component);
	};

	window.WebComponent = WebComponent;
})();
