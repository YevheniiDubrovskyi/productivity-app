export default class Action {

  constructor(defaultValue, step, min, limit, suffix, name) {
    this.incrementButton = null;
    this.decrementButton = null;
    this.viewport = null;

    this.step = step;
    this.min = min;
    this.limit = limit;
    this.suffix = suffix;
    this.name = name;

    this.markup = this.createMarkup();
    this.value = defaultValue;
    this.current = this.value; // Variable for check that prevent useless reflow

    this.eventObj = {
      bubbles: true,
      cancelable: true,
      detail: {
        name: this.name,
        value: null, // This property may be not changed by link
      },
    };

    this.event = new CustomEvent('actionValueChanged', this.eventObj);
  }

  createMarkup() {
    const div = document.createElement('div');
    this.incrementButton = document.createElement('button');
    this.decrementButton = document.createElement('button');
    this.viewport = document.createElement('span');

    div.classList.add('action');
    this.incrementButton.classList.add('action-btn');
    this.incrementButton.classList.add('action-add');

    this.decrementButton.classList.add('action-btn');
    this.decrementButton.classList.add('action-minus');

    this.viewport.classList.add('action-viewport');

    this.incrementButton.setAttribute('type', 'button');
    this.decrementButton.setAttribute('type', 'button');

    this.incrementButton.innerHTML = '&#xe900;';
    this.decrementButton.innerHTML = '&#xe911;';

    this.incrementButton.addEventListener('click', () => {
      this.increment();
    });
    this.decrementButton.addEventListener('click', () => {
      this.decrement();
    });

    div.appendChild(this.decrementButton);
    div.appendChild(this.incrementButton);
    div.appendChild(this.viewport);

    return div;
  }

  increment() {
    let value = this.value;

    value = value + this.step < this.limit ?
      value + this.step :
      this.limit;

    if (value === this.current) return;
    this.current = value;

    this.value = value;
    this.eventObj.detail.value = value;
    this.markup.dispatchEvent(this.event);
  }

  decrement() {
    let value = this.value;

    value = value - this.step > this.min ?
      value - this.step :
      this.min;

    if (value === this.current) return;
    this.current = value;

    this.value = value;
    this.eventObj.detail.value = value;
    this.markup.dispatchEvent(this.event);
  }

  set value(number) {
    this.viewport.innerHTML = `${number} ${this.suffix}`;
  }

  get value() {
    return parseInt(this.viewport.innerHTML, 10);
  }
}
