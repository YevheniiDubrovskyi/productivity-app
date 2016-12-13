import utils from '../../utils/utils';

/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   * @param {boolean} dataFlag - Data existence flag
   * @param {object} dataObject - Data object
   */
  constructor(dataFlag, dataObject) {
    this.markup = document.createElement('div');
    this.markup.classList.add('modal-wrapper');
    this.markup.innerHTML = '\n<aside class="modal">\n' +
                            this.createHeading(dataFlag) +
                            this.createInputWithLabel(dataObject.title) +
                            this.createInputWithLabel(dataObject.description) +
                            this.createRadioGroup(dataObject.categories) +
                            this.createInputWithLabel(dataObject.deadline) +
                            this.createEstimationRadioGroup(5) +
                            this.createRadioGroup(dataObject.priority) +
                            '</aside>\n';
  }

  // TODO: сделать возможным вызов модалки подтверждения (если сначала была отрисована обычная учитывать это display: none)

  createAddEditMarkup(dataFlag, dataObject) {
    return
  }

  /**
   * Create heading
   * @param {object} dataFlag - Data object
   * @return {string} Heading markup
   */
  createHeading(dataFlag) {
    return `<h2 class="modal-heading">${dataFlag ? 'Edit' : 'Add'} Task</h2>\n`;
  }

  /**
   * Create input with label
   * @param {object} dataProperty - Data object
   */
  createInputWithLabel(dataProperty) {
    const name = dataProperty.name;

    return [`<label for="modal-add-edit-task__${name}" class="modal-lbl">${utils.capitalize(name)}</label>`,
            `<input type="${dataProperty.type}" class="modal-inpt" id="modal-add-edit-task__${name} placeholder="Add ${name} here">\n`].join('\n');
  }

  /**
   * Create fieldset with radio group
   * @param {object} dataProperty - Data object
   */
  createRadioGroup(dataProperty) {
    return [`<fieldset class="modal-fset">`,
            `<h4 class="modal-fset-heading">${utils.capitalize(dataProperty.name)}</h4>`,
            `<ul class="modal-fset-list">`,
            this.createRadioGroupList(dataProperty.name, dataProperty.value),
            `</ul>`,
            `</fieldset>`].join('\n');
  }

  /**
   * Create radio group list
   * @param {string} groupName - Group name
   * @param {array} dataArray - Data array
   */
  createRadionGroupList(groupName, dataArray) {
    return dataArray.reduce((acc, el) => {
      const name = el.name;

      return [acc,
              `<li class="modal-fset-list-item">`,
              `<input type="radio" class="modal-fset-list-item-radio" name="${groupName}" id="modal-add-edit-task__radio-${name}">`,
              `<label for="modal-add-edit-task__radio-${name}" class="modal-fset-list-item-lbl">${utils.capitalize(el.title)}</label>`,
              `</li>`].join('\n');
    }, '');
  }

  /**
   * Create fieldset with estimation radio group
   * @param {number} count - Estimation range
   */
  createEstimationRadioGroup(count) {
    let estimationGroup = '\n';
    let i = count + 1;

    while (--i) {
      estimationGroup += [`<input type="radio" name="estimation" id="estimation-${i}" class="modal-estimation-list-item-radio">`,
                          `<label class="modal-estimation-list-item-lbl" for="estimation-${i}"></label>\n`].join('\n');
    }

    return [`<fieldset class="modal-estimation">`,
            `<h4 class="modal-estimation-heading>Estimation</h4>`,
            `<div class="modal-estimation-radio-wrapper">${estimationGroup}</div>`,
            `</fieldset>`].join('\n');
  }

}
