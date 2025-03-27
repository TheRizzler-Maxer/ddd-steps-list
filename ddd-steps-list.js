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
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }
  constructor() {
    super();
    // Initialize a default title for the component
    this.title = "";
    
    // Initialize and merge the localization object with a default title
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Steps", // Default title that can be overridden by localization
    };

    // Register localization with the provided locales and path.
    // Adjust the localesPath and locales list based on your project structure and requirements.
    registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Define reactive properties using Lit's property API
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Optional: Define some styles for the component
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Verdana sans-serif;
      }
      .steps-list {
        border: 2px solid #ccc;
        border-radius: 6px;
        padding: 16px;
        background-color: #fafafa;
        max-width: 600px;
        margin: 20px auto;
      }
      h2 {
        color: #003366;
        margin-top: 0;
      }
      
    `;
  }

  // The render method outputs the HTML template for the component.
  // The <slot> element allows insertion of child elements (e.g., <ddd-steps-list-item>).
  render() {
    return html`
      <div class="steps-list">
        <h2>${this.t.title || this.title}</h2>
        <slot></slot>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);