export default class Template {

  constructor(defaultValue, suffix) {
    this.markup = document.createElement('div');
    this.markup.classList.add('action');

    this.markup.innerHTML = `
  <button class="action-btn action-add" type="button">&#xe900;</button>
  <button class="action-btn action-minus" type="button">&#xe911;</button>
  <span class="action-viewport">${defaultValue}${suffix}</span>`;
  }

  get viewport() {
    return this.markup.querySelector('.action-viewport');
  }

}
