/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param  {object} dataObject - Data object
   */
  constructor(dataObject) {
    this.markup = document.createElement('button');
    this.markup.classList.add('btn')
    this.markup.classList.add(`btn-${dataObject.theme}`);
    this.markup.innerHTML = dataObject.name;
  }

}
