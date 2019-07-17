import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import styles from './section-title.scss';

@customElement('section-title')
export class SectionTitle extends LitElement {
  static get styles() {
    return [css`${unsafeCSS(styles)}`];
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
