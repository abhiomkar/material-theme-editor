import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
// import './icon';
import styles from './button.scss';

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

  get rootClasses() {
    return classMap({
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      ...this.classes && {[this.classes]: true},
    });
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
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
