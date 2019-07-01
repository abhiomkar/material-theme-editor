import { customElement, html, LitElement, property } from 'lit-element';
import {MDCTextField} from '@material/textfield';
import { classMap } from 'lit-html/directives/class-map';
import {getId} from '../lib/util';
import {createStyleSheet}  from '../lib/jss';

const styles = {
  title: {
    'margin-bottom': '4px',
  }
};

const {classes} = createStyleSheet(styles);

@customElement('mdc-text-field')
export class TextField extends LitElement {
  @property({type: String})
  label = '';

  @property({type: String})
  placeholder  = '';

  @property({type: String})
  classes  = '';

  @property({type: String})
  ariaLabel = '';

  @property({type: Boolean})
  outlined = false;

  private id = getId();
  private textField!: MDCTextField;

  protected createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.textField = new MDCTextField(this.renderRoot.querySelector('.mdc-text-field'));
  }

  get inputTemplate() {
    return html`<input type="text" class="mdc-text-field__input" id=${this.id} aria-label=${this.ariaLabel} placeholder=${this.placeholder}>`;
  }

  get textFieldClasses() {
    return classMap({
      'mdc-text-field': true,
      'mdc-text-field--outlined': this.outlined,
      ...this.classes && {[this.classes]: true},
    });
  }

  get defaultTemplate() {
    return html`
    <div class=${this.textFieldClasses}>
      ${this.inputTemplate}
      <label class="mdc-floating-label" for=${this.id}>${this.label}</label>
      <div class="mdc-line-ripple"></div>
    </div>
    `;
  }

  get outlinedTemplate() {
    return html`
      <div class=${this.textFieldClasses}>
        ${this.inputTemplate}
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label class="mdc-floating-label">${this.label}</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>`;
  }

  render() {
    if (this.outlined) {
      return this.outlinedTemplate;
    } else {
      return this.defaultTemplate;
    }
  }
}
