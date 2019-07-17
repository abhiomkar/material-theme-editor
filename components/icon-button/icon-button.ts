import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './icon-button.scss';
import iconStyles from '../icon/icon.scss';
import {MDCRipple} from '@material/ripple';

@customElement('mdc-icon-button')
export class IconButton extends LitElement {
  @property({type: String, reflect: true})
  density = 'default';

  @property({type: String})
  icon = '';

  private ripple: MDCRipple;

  get rootClasses() {
    return classMap({
      'mdc-icon-button': true,
      'material-icons': true,
      'dense-default': this.density === 'default',
      'dense-comfortable': this.density === 'comfortable',
      'dense-compact': this.density === 'compact',
    });
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`, css`${unsafeCSS(iconStyles)}`];
  }

  firstUpdated() {
    this.ripple = MDCRipple.attachTo(this.shadowRoot.querySelector('.mdc-icon-button'));
    this.ripple.unbounded = true;
  }

  layout() {
    this.ripple.layout();
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return html`
      <button class=${this.rootClasses} @click=${(e) => this.handleClick(e)}>
        ${this.icon}
      </button>`;
  }
}
