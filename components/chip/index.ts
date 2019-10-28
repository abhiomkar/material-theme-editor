import { customElement, html, LitElement, property, css, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './chip.scss';
import iconStyles from '../icon/icon.scss';

@customElement('mdc-chip')
export class Chip extends LitElement {
  @property({type: String})
  icon = '';

  @property({type: String, reflect: true})
  density = 'default';

  get rootClasses() {
    return classMap({
      'mdc-chip': true,
      'dense-default': this.density === 'default',
      'dense-comfortable': this.density === 'comfortable',
      'dense-compact': this.density === 'compact',
    });
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`, css`${unsafeCSS(iconStyles)}`];
  }

  get iconTemplate() {
    if (!this.icon) {
      return null;
    }

    return html`<span class="material-icons mdc-chip__icon mdc-chip__icon--leading">${this.icon}</span>`;
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return html`
    <div class=${this.rootClasses} role="row">
      ${this.iconTemplate}
      <span role="gridcell">
        <span role="button" class="mdc-chip__text"><slot></slot></span>
      </span>
    </div>`;
  }
}
