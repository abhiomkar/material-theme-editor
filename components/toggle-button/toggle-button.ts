import { customElement, html, LitElement, property, css, unsafeCSS, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './toggle-button.scss';
import optionStyles from './toggle-button-option.scss';

@customElement('mdc-toggle-button')
export class ToggleButton extends LitElement {
  @property({type: String})
  classes  = '';

  @query('slot')
  protected slot_!: HTMLSlotElement;

  get rootClasses() {
    return classMap({
      'mdc-toggle-button': true,
      ...this.classes && {[this.classes]: true},
    });
  }

  static get styles() {
    return [css`${unsafeCSS(styles)}`];
  }

  handleClick(event) {
    const options = this.slot_.assignedNodes({flatten: true}).filter((el: Node) => el instanceof ToggleButtonOption) as ToggleButtonOption[];
    for (const [index, option] of options.entries()) {
      if (event.target === option) {
        this.emit({selected: option.value});
        option.selected = true;
      } else {
        option.selected = false;
      }
    }
  }

  emit(detail) {
    let event = new CustomEvent('changed', {bubbles: true, composed: true, detail});
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <span class=${this.rootClasses} @click=${this.handleClick}>
        <slot></slot>
      </span>`;
  }
}

@customElement('mdc-toggle-button-option')
export class ToggleButtonOption extends LitElement {
  @property({type: Boolean, reflect: true})
  selected = false;

  @property({type: String})
  value = '';

  @property({type: String})
  classes  = '';

  get ariaCheckedValue() {
    return this.selected ? 'true' : 'false';
  }

  static get styles() {
    return [css`${unsafeCSS(optionStyles)}`];
  }

  get rootClasses() {
    return classMap({
      'mdc-toggle-button-option': true,
      'is-selected': this.selected,
      ...this.classes && {[this.classes]: true},
    });
  }

  render() {
    return html`
      <span role="radio"
        tabindex="0"
        class=${this.rootClasses}
        aria-checked=${this.ariaCheckedValue}><slot></slot></span>
    `;
  }
}
