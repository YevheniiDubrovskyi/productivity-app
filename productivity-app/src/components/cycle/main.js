export default class Cycle {

  constructor(ruleStep, workTime, workIteration, shortBreak, longBreak) {

    this.markup = this.createMarkup();

  }

  updateData(name, value) {
    this[name] = value;
    this.render();
  }

  render() {}

  createMarkup() {}

}
