import Template from './template.js';

export default class Action {

  constructor(defaultValue, step, min, limit, suffix, name) {
    this.step = step;
    this.min = min;
    this.limit = limit;
    this.suffix = suffix;
    this.name = name;

    this.template = new Template(defaultValue, this.suffix);
    this.viewport = this.template.viewport;

    this.current = this.value; // Variable for check that prevent useless reflow

    this.eventObj = {
      bubbles: true,
      cancelable: true,
      detail: {
        name: this.name,
        value: null, // This property may be not changed by link
      },
    };

    // Implement Sub/Pub pattern
    this.event = new CustomEvent('actionValueChanged', this.eventObj);

    this.template.markup.addEventListener('click', (event) => {
      const classList = event.target.classList;

      if (classList.contains('action-add')) {
        this.increment();
      } else if (classList.contains('action-minus')) {
        this.decrement();
      }
    });
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

  get markup() {
    return this.template.markup;
  }
}
