/**
 * Copyright 2025 ProdByBobo
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 * 
 * A custom element for displaying a list of steps with numbered circles and titles.
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ddd-steps-list";
  }

  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true },
    };
  }

  constructor() {
    super();
    this.dddPrimary = false; // Default value for the `ddd-primary` attribute
    this.title = ""; // Default title for localization
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Steps", // Default title that can be overridden by localization
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        counter-reset: step; /* Initialize the counter for step numbers */
      }
    `;
  }

  render() {
    return html`<slot @slotchange="${this._onSlotChange}"></slot>`;
  }

  firstUpdated() {
    this._validateChildren();
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      this._updatePrimaryAttribute();
    }
  }

  _onSlotChange() {
    this._validateChildren();
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== "ddd-steps-list-item") {
        this.removeChild(child); // Remove invalid children
      } else {
        stepCount++;
        child.step = stepCount; // Assign step numbers
        if (this.dddPrimary) {
          child.setAttribute("data-primary", "");
        } else {
          child.removeAttribute("data-primary");
        }
      }
    });
  }

  _updatePrimaryAttribute() {
    const items = this.querySelectorAll("ddd-steps-list-item");
    items.forEach((item) => {
      if (this.dddPrimary) {
        item.setAttribute("data-primary", "");
      } else {
        item.removeAttribute("data-primary");
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    //This method is called when the element is added to the DOM. 
    // It calls validateChildren to check the children.
    this.validateChildren();
    //This method loops through the children of the component. 
    // If a child element is not a ddd-steps-list-item, it removes the child and logs a warning.
  }

  validateChildren() {
    const validTagName = 'DDD-STEPS-LIST-ITEM';
    const children = Array.from(this.children);

    children.forEach(child => {
      if (child.tagName !== validTagName) {
        console.warn(`Invalid child element <${child.tagName.toLowerCase()}> removed from <ddd-steps-list>. Only <ddd-steps-list-item> is allowed.`);
        this.removeChild(child);
      }
    });
  }
}

customElements.define(DddStepsList.tag, DddStepsList);