import {utils} from '../../utils/main';

export default class Template {

  constructor(elementID, stylesObj, dataArr) {
    this.markup = document.createElement('div');
    this.markup.classList.add('chart-view-port');

    this.markup.innerHTML += this.createControls(dataArr);
    this.markup.innerHTML += this.createViewPort(elementID, stylesObj);
  }

  get controlsList() {
    return this.markup.querySelector('[data-chart-controls].tabs-list');
  }

  get active() {
    return this.markup.querySelector(`[data-chart].active`);
  }

  getButton(name) {
    return this.markup.querySelector(`[data-chart=${name}]`);
  }

  createViewPort(elementID, stylesObj) {
    let styles = '';

    for (let styleName in stylesObj) {
      styles += `${styleName}: ${stylesObj[styleName]}; `;
    }

    return `\n<div id="${elementID}" style="${styles}"></div>`;
  }

  createControls(dataArr) {
    return `
<ul class="tabs-list" data-chart-controls>
  ${dataArr.reduce((acc, el, i) => `${acc}\n${createListItem(el, i)}`, '')}
</ul>`;

    function createListItem(element, index) {
      return `
<li class="tabs-list__item">
  <button class="tabs-list__item-btn ${index === 0 ? 'active' : ''}" type="button" data-chart="${element.name}">${utils.capitalize(element.name)}</button>
</li>`;
    }
  }

}
