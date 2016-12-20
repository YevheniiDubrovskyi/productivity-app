/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {object} dataObject - Data object
   */
  constructor(dataObject) {
    this.markup = document.createElement('div');
    this.markup.classList.add('categories-input');
    this.markup.innerHTML = this.createInput(dataObject) +
                            this.createLabel(dataObject);
  }

  /**
   * Create input markup
   * @param {object} dataObject - Data object
   * @return {string} Input markup
   */
  createInput(dataObject) {
    return `\n<input class="categories-input__input categories-input--${dataObject.alias}" id="categories-input-${dataObject.alias}" type="text" value="${dataObject.title}">`;
  }

  /**
   * Create label markup
   * @param {object} dataObject - Data object
   * @return {string} Label markup
   */
  createLabel(dataObject) {
    return `\n<label class="categories-input__label" for="categories-input-${dataObject.alias}"></label>`;
  }

}
