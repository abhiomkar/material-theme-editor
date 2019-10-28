import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import {emit} from '../../../components/common/events';

interface ToggleButtonOptions {
  classes: string,
  children: TemplateResult,
  onChange: Function,
}

export const toggleButton = ({classes, children, onChange}: Partial<ToggleButtonOptions> = {}) => {
  const rootClasses = classMap({
    'mdc-toggle-button': true,
    ...classes && {[classes]: true},
  });

  return html`
    <div class=${rootClasses} @click=${onChange}>
      ${children}
    </div>`;
}

interface ToggleButtonOptionOptions {
  selected: boolean,
  value: string,
  classes: string,
  label: string,
}

export const toggleButtonOption = ({selected, value, classes, label}: Partial<ToggleButtonOptionOptions> = {}) => {
  const ariaCheckedValue = selected ? 'true' : 'false';
  const rootClasses = classMap({
      'mdc-toggle-button-option': true,
      'is-selected': selected,
      ...classes && {[classes]: true},
    });

  return html`
    <div role="radio"
      tabindex="0"
      data-value=${value}
      class=${rootClasses}
      aria-checked=${ariaCheckedValue}>${label}</div>
  `;
}
