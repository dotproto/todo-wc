'use strict'

{
  class WebComponent extends HTMLElement {
    constructor({ debug = false, template = undefined } = {}) {
      super()

      this._debug = debug;
      if (this._debug) console.debug('WebComponent: Debug enabled')

      //# Cache references to our import script
      // 
      // Cribbed from https://www.html5rocks.com/en/tutorials/webcomponents/imports/
      this._doc = document
      this._import = this._doc.currentScript.ownerDocument

      // Bind the component's template to this instance
      if (template) this.bindTemplate(template)

      // Not sure if this is necessary -- commenting out for the moment
      // 
      // this._styles = this._import.querySelector('link[rel="stylesheet"]')
      // this._main.head.appendChild(_styles.cloneNode(true));
    }

    listen(type, cb) {
      return document.addEventListener(type, cb)
    }

    bindTemplate(id) {
      // Implicitly sets `this.shadowRoot`
      const shadowOpts = {
        mode: this._debug ? 'open' : 'closed',
      }

      // Implicitly creates `this.shadowRoot`, but that's inaccessable in closed mode
      this._root = this.attachShadow(shadowOpts)
      const template = this._import.getElementById(id)
      const instance = template.content.cloneNode(true)

      this._root.appendChild(instance)
      if (this._debug) console.debug(this._root)
    }

    adoptedCallback(oldDocument, document) {
      console.debug('WebComponent:adoptedCallback')
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      console.debug('WebComponent:attributeChangedCallback')
    }
    disconnectedCallback() {
      console.debug('WebComponent:disconnectedCallback')
    }
    connectedCallback() {
      console.debug('WebComponent:connectedCallback')
    }

    // # TODO
    // 
    // - Look for a good way to bind attributes and properties
  }

  window.WebComponent = WebComponent
}
// Object.defineProperties(WebComponent, { })

/*
  // NOTE: There's a major problem with this approach: it messes up log line # in
  // the console, making it harder to jump straight to the line that logged the 
  // message.
  // class Logger {
  //   get safe() {
  //     return typeof console !== undefined
  //   }
  //   log(...args) {
  //     if (!this.safe) return
  //     console.log.apply(console, args)
  //   }
  //   info(...args) {
  //     if (!this.safe) return
  //     console.info.apply(console, args)    
  //   }
  //   debug(...args) {
  //     if (!this.safe) return
  //     console.debug.apply(console, args)    
  //   }
  //   warn(...args) {
  //     if (!this.safe) return
  //     console.warn.apply(console, args)    
  //   }
  //   error(...args) {
  //     if (!this.safe) return
  //     console.error.apply(console, args)    
  //   }
  // }
*/
