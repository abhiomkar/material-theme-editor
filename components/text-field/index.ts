import { css, unsafeCSS, customElement, html, LitElement, property } from 'lit-element';
import {MDCTextField} from '@material/textfield';
import { classMap } from 'lit-html/directives/class-map';
import {getId} from '../../lib/util';
import styles from './text-field.scss';
import iconStyles from '../icon/icon.scss';

@customElement('mdc-text-field')
export class TextField extends LitElement {
  @property({type: String})
  label = '';

  @property({type: String})
  placeholder  = '';

  @property({type: String})
  classes  = '';

  @property({type: String})
  trailingIcon  = '';

  @property({type: String})
  value  = '';

  @property({type: String})
  ariaLabel = '';

  @property({type: Boolean})
  outlined = false;

  @property({type: String})
  helperText = '';

  @property({type: String, reflect: true})
  density = 'default';

  @property({type: String, reflect: true})
  rounded = false;

  private labelId = getId();

  firstUpdated() {
    MDCTextField.attachTo(this.renderRoot.querySelector('.mdc-text-field'));
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`, css`${unsafeCSS(iconStyles)}`];
  }

  get inputTemplate() {
    return html`<input
      type="text"
      class="mdc-text-field__input"
      id=${this.labelId}
      aria-label=${this.ariaLabel}
      placeholder=${this.placeholder}
      value=${this.value}
      />`;
  }

  get textFieldClasses() {
    return classMap({
      'mdc-text-field': true,
      'mdc-text-field--default': !this.outlined,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--with-trailing-icon': this.trailingIcon,
      'dense-default': this.density === 'default',
      'dense-comfortable': this.density === 'comfortable',
      'dense-compact': this.density === 'compact',
      'is-rounded': this.rounded === true,
      ...this.classes && {[this.classes]: true},
    });
  }

  get helperTextTemplate() {
    if (!this.helperText) {
      return null;
    }

    return html`
      <div class="mdc-text-field-helper-line">
        <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">${this.helperText}</div>
      </div>`;
  }

  get trailingIconTemplate() {
    if (!this.trailingIcon) {
      return null;
    }

    return this.iconTemplate(this.trailingIcon);
  }

  iconTemplate(icon) {
    return html`<span class="material-icons mdc-text-field__icon" tabindex="0" role="button">${icon}</span>`;
  }

  get defaultTemplate() {
    return html`
    <div class=${this.textFieldClasses}>
      ${this.inputTemplate}
      <label class="mdc-floating-label" for=${this.labelId}>${this.label}</label>
      ${this.trailingIconTemplate}
      <div class="mdc-line-ripple"></div>
    </div>
    ${this.helperTextTemplate}`;
  }

  get outlinedTemplate() {
    return html`
      <div class=${this.textFieldClasses}>
        ${this.inputTemplate}
        ${this.trailingIconTemplate}
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label class="mdc-floating-label">${this.label}</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
      ${this.helperTextTemplate}`;
  }

  render() {
    if (this.outlined) {
      return this.outlinedTemplate;
    } else {
      return this.defaultTemplate;
    }
  }
}
