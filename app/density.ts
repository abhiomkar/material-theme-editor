document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.density-scale-toggle-button').addEventListener('changed', (event) => {
    const density = event.detail.selected;
    for (const button of document.querySelectorAll('mdc-button')) {
      button.density = density;
    }
  });
});
