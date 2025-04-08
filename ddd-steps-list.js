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

    <h1>Steps to Apply for First-Year Students</h1>
    <h4>Please review these helpful steps to understand the Penn State application process, as well as the application requirements for first-year students.</h4>

  <ddd-steps-list ddd-primary="5">
    
    <ddd-steps-list-item title="Apply to Penn State">
      <p>When completing your application, choose from our twenty campuses and select a first-choice and an alternate campus.</p>
      <p>If you’re enrolling in the 2+2 Plan, there’s no need to reapply when transitioning to your second campus. This streamlined process makes it easy to start at one campus and move seamlessly to another as you progress in your studies.</p>
    </ddd-steps-list-item>

    <ddd-steps-list-item title="Enroll at your starting campus">
      <p>Start your journey by completing general education and major prerequisite courses at your initial campus.</p>
      <p>During your first two years, you'll have access to a wide range of opportunities, including student clubs, organizations, and intramural sports, all while learning from expert faculty. This experience will help you build a strong foundation and make the most of your time as a Penn Stater.</p>
    </ddd-steps-list-item>
    
    <ddd-steps-list-item title="Work with your academic advisers">
      <p>In the second semester of your sophomore year, you'll collaborate with your academic adviser to begin the campus transfer process.</p>
      <p>Your adviser will guide you to ensure you're meeting the entrance requirements for your chosen program, as detailed in the Undergraduate Bulletin. This support helps you stay on track and smoothly transition to your next campus.</p>
    </ddd-steps-list-item>

    <ddd-steps-list-item title="Explore the Undergraduate Bulletin">
      <p>At Penn State, you’ll officially enter your major during your junior year.</p>
      <p>To stay on track, review the entrance to major requirements in the Undergraduate Bulletin. By meeting the entrance to major requirements, you’ll transition smoothly into your chosen field of study. These requirements are consistent, whether you start at the University Park campus or another undergraduate campus.</p>
    </ddd-steps-list-item>

    <ddd-steps-list-item title="Transition to your new campus">
      <p>You’ll start your junior year at your new campus, continuing your Penn State journey as you work toward graduation.</p>
      <p>As you approach the finish line, you'll earn your diploma and join the world’s largest alumni network, marking the beginning of your distinguished status as a Penn State graduate.</p>
    </ddd-steps-list-item>

    
    <ddd-steps-list-item title="Valid Step"></ddd-steps-list-item>
      <h2>Invalid Element</h2>
      <div>Another Invalid Element</div>
    </ddd-steps-list>

  </ddd-steps-list>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
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

globalThis.customElements.define(DddStepsList.tag, DddStepsList);