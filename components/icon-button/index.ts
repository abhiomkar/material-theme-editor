import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

interface IconButtonOptions {
  iconName: string,
  ariaLabel: string,
  classes: Object,
}

export const iconButton = ({iconName, ariaLabel, classes}: Partial<IconButtonOptions> = {}) => {
  const rootClasses = classMap(Object.assign({}, {
      'mdc-icon-button': true,
      'material-icons': true,
  }, classes));

  return html`
  <button class=${rootClasses} aria-label=${ariaLabel}>
    ${iconName}
  </button>`;
}
