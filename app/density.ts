document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('changed', (event) => {
    const controlClassName = (event.composedPath()[0] as HTMLElement).classList.value;

    const COMPONENT_SELECTOR = 'mdc-button, mdc-icon-button, mdc-chip, mdc-text-field, mdc-checkbox';
    const DENSITY_SCALE_CONTROL_CLASS = 'density-scale-toggle-button';
    const SHAPE_CONTROL_CLASS = 'rounded-shape-toggle-button';
    if (controlClassName === DENSITY_SCALE_CONTROL_CLASS) {
      const density = event.detail.selected;
      for (const component of document.querySelectorAll(COMPONENT_SELECTOR)) {
        component.density = density;
        component.layout && component.layout();
      }
    } else if (controlClassName === SHAPE_CONTROL_CLASS) {
      const isRounded = event.detail.selected === 'rounded';

      for (const component of document.querySelectorAll(COMPONENT_SELECTOR)) {
        component.rounded = isRounded;
      }
    }
  });
});
