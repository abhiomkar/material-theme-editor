import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

interface ButtonOptions {
  classes: Object,
  label: string,
  iconName: string,
  trailingIconName: string,
  raised: boolean,
  unelevated: boolean,
  outlined: boolean,
  onClick: Function,
};

interface IconOptions {
  classes: Object,
  iconName: string,
}

interface IconButtonOptions {
  classes: Object,
  iconName: string,
  onClick: Function,
}

export const icon = ({classes, iconName}: Partial<IconOptions> = {}) => {
  if (!iconName) {
    return null;
  }

  const rootClasses = classMap(Object.assign({
    'material-icons': true,
    'mdc-button__icon': true,
  }, classes));

  return html`
    <span aria-hidden="true" class=${rootClasses}>${iconName}</span>
  `;
}

export const button = ({classes, label, iconName, trailingIconName, raised, unelevated, outlined, onClick}: Partial<ButtonOptions> = {}) => {
  const rootClasses = classMap(Object.assign({
    'mdc-button': true,
    'mdc-button--raised': !!raised,
    'mdc-button--unelevated': !!unelevated,
    'mdc-button--outlined': !!outlined,
  }, classes));

  return html`
    <button @click=${onClick} class=${rootClasses}>
      <div class="mdc-button__ripple"></div>
      ${icon({iconName})}
      <span class="mdc-button__label">${label}</span>
      ${icon({iconName: trailingIconName})}
    </button>`;
}

export const iconButton = ({classes, iconName, onClick}: Partial<IconButtonOptions>) => {
  const rootClasses = classMap(Object.assign({
    'mdc-icon-button': true,
    'material-icons': true,
  }, classes));

  return html`<button @click=${onClick} class=${rootClasses}>${iconName}</button>`;
}
