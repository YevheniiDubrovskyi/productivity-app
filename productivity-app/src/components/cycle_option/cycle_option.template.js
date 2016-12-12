/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {Object} dataObject - Data object
   */
  constructor(dataObject) {
    this.markup = document.createElement('section');
    this.markup.classList.add('cycle-option');
    this.markup.innerHTML = this.createHeading(dataObject.title) +
                            this.createAction(dataObject.value, dataObject.suffix) +
                            this.createText(dataObject.text) +
                            this.createDot(dataObject.color);
  }

  /**
   * Create heading
   * @param  {String} title - Heading text
   * @return {String} Heading markup
   */
  createHeading(title) {
    return `<h3 class="cycle-option-heading">${title}</h3>\n`;
  }

  /**
   * Create action
   * @param  {Number} value - Default action value
   * @param  {String} suffix - Suffix for value
   * @return {String} Action markup
   */
  createAction(value, suffix) {
    return [`<div class="action">`,
            `<button class="action-btn action-add" type="button">&#xe900;</button>`,
            `<button class="action-btn action-minus" type="button">&#xe911;</button>`,
            `<span class="action-viewport">${value} ${suffix}</span>`,
            `</div>\n`].join('\n');
  }

  /**
   * Create paragraph
   * @param {String} text - Text for paragraph
   * @return {String} Paragraph markup
   */
  createText(text) {
    return `<p class="cycle-option-text">${text}</p>\n`;
  }

  /**
   * Create dot
   * @param {String} color - Dot background color
   * @return {String} Dot markup
   */
  createDot(color) {
    return `<div class="cycle-option-dot" style="background-color: ${color};"></div>\n`;
  }

}
