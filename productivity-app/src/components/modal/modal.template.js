import utils from '../../utils/utils';

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
    this.markup.classList.add('modal-wrapper');
    this.markup.innerHTML = `\n<aside class="modal">${this.createModalMarkup(dataObject)}</aside>\n`;
  }

  /**
   * Return modal markup depends on modal type
   * @param {object} dataObject - Data object
   */
  createModalMarkup(dataObject) {
    const types = {
      add(data) {
        return [this.createHeading('Add'),
                this.createInputWithLabel(data.title),
                this.createInputWithLabel(data.description),
                this.createRadioGroup(data.categories),
                this.createInputWithLabel(data.deadline),
                this.createEstimationRadioGroup(data.estimation),
                this.createRadioGroup(data.priority),
                this.createButtonMarkup('accept', '&#xe90f;'),
                this.createButtonMarkup('cancel', '&#xe910;')].join('\n');
      },

      edit(data) {
        return [this.createHeading('Add'),
                this.createInputWithLabel(data.title),
                this.createInputWithLabel(data.description),
                this.createRadioGroup(data.categories),
                this.createInputWithLabel(data.deadline),
                this.createEstimationRadioGroup(data.estimation),
                this.createRadioGroup(data.priority),
                this.createButtonMarkup('delete', '&#xe912;'),
                this.createButtonMarkup('accept', '&#xe90f;'),
                this.createButtonMarkup('cancel', '&#xe910;')].join('\n');
      },

      remove(data) {
        return [this.createHeading('Remove'),
                this.createParagraphMarkup(data.text),
                this.createButtonsWrapper(),
                this.createButtonMarkup('cancel', '&#xe910;')].join('\n');
      }
    };

    return types[dataObject.type].call(this, dataObject.data);
  }

  /**
   * Create button markup
   * @param {string} type - Button type
   * @param {string} icon - Icon code
   * @return {string} Button markup
   */
  createButtonMarkup(type, icon) {
    return `<button class="modal-btn-${type}" type="button">${icon}</button>`;
  }

  /**
   * Create buttons wrapper markup
   * @return {string} Buttons wrapper markup
   */
  createButtonsWrapper() {
    return '<div class="buttons-wrapper"></div>';
  }

  /**
   * Create paragraph markup
   * @param {string} text - Text which will be append to paragraph
   * @returns {string} Paragraph markup
   */
  createParagraphMarkup(text) {
    return `<p class="modal-question">${text}</p>`;
  }

  /**
   * Hide current inner markup and show confirmation markup
   * @param text
   */
  switchToRemove(text) {}

  /**
   * Create heading
   * @param {string} heading - Data object
   * @return {string} Heading markup
   */
  createHeading(heading) {
    return `<h2 class="modal-heading">${heading} Task</h2>\n`;
  }

  /**
   * Create input with label
   * @param {object} dataProperty - Data object
   */
  createInputWithLabel(dataProperty) {
    const name = dataProperty.name;

    return [`<label for="modal-add-edit-task__${name}" class="modal-lbl">${utils.capitalize(name)}</label>`,
            `<input type="${dataProperty.type}" name="${name}" class="modal-inpt" id="modal-add-edit-task__${name}" placeholder="Add ${name} here" value="${dataProperty.value}">\n`].join('\n');
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
  createRadioGroupList(groupName, dataArray) {
    return dataArray.reduce((acc, el) => {
      const alias = el.alias;

      return [acc,
              `<li class="modal-fset-list-item">`,
              `<input type="radio" class="modal-fset-list-item-radio" name="${groupName}" id="modal-add-edit-task__radio-${alias}">`,
              `<label for="modal-add-edit-task__radio-${alias}" class="modal-fset-list-item-lbl">${utils.capitalize(el.title)}</label>`,
              `</li>`].join('\n');
    }, '');
  }

  /**
   * Create fieldset with estimation radio group
   * @param {number} count - Estimation range
   */
  createEstimationRadioGroup(count) {
    let estimationGroup = [];
    let i = count;

    while (i--) {
      estimationGroup = estimationGroup.concat([`<input type="radio" name="estimation" id="estimation-${i}" class="modal-estimation-list-item-radio">`,
                                                `<label class="modal-estimation-list-item-lbl" for="estimation-${i}"></label>`]);
    }

    return [`<fieldset class="modal-estimation">`,
            `<h4 class="modal-estimation-heading">Estimation</h4>`,
            `<div class="modal-estimation-radio-wrapper">${estimationGroup.join('\n')}</div>`,
            `</fieldset>`].join('\n');
  }

}
