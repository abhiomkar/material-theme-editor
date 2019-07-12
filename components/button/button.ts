import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './button.scss';
import iconStyles from '../icon/icon.scss';

@customElement('mdc-button')
export class Button extends LitElement {
  @property()
  icon = '';

  @property()
  label = '';

  @property({type: String})
  classes  = '';

  @property({type: Boolean})
  unelevated = false

  @property({type: Boolean})
  outlined = false

  @property({type: Boolean})
  raised = false

  @property({type: String, reflect: true})
  density = 'default';

  get rootClasses() {
    return classMap({
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'dense--3': this.density === '-3',
      'dense--2': this.density === '-2',
      'dense--1': this.density === '-1',
      'dense--0': this.density === '-0',
      'dense-default': this.density === 'default',
      'dense-comfortable': this.density === 'comfortable',
      'dense-compact': this.density === 'compact',
      ...this.classes && {[this.classes]: true},
    });
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`, css`${unsafeCSS(iconStyles)}`];
  }

  get iconTemplate() {
    if (!this.icon) {
      return null;
    }

    return html`<span aria-hidden="true" class="material-icons mdc-button__icon">${this.icon}</span>`;
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return html`
      <button class=${this.rootClasses} @click=${(e) => this.handleClick(e)}>
        ${this.iconTemplate}
        <span class="mdc-button__label"><slot></slot></span>
      </button>`;
  }
}
