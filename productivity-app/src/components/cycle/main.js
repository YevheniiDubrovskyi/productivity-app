import Template from './template';

export default class Cycle {

  constructor(title, ruleStep, initParams) {
    this.ruleStep = ruleStep;
    this.params = initParams;

    this.template = new Template(title);

    this.render();
  }

  updateData(name, value) {
    this.params[name] = value;
    this.render();
  }

  get markup() {
    return this.template.markup;
  }

  render() {
    this.template.render(this.calcParams());
  }

  calcParams() {
    const params = this.params;
    const ruleStep = this.ruleStep;
    const percents = {};

    let timeAmount = 0;
    let firstCycle = 0;
    let chartSegmentsCount = 0;

    timeAmount = params['work-time'] * params['work-iteration'] * 2 +
                      params['short-break'] * (params['work-iteration'] - 1) * 2 +
                      params['long-break'];
    firstCycle = params['work-time'] * params['work-iteration'] +
                      params['short-break'] * (params['work-iteration'] - 1) +
                      params['long-break'];
    chartSegmentsCount = params['work-iteration'] * 2 +
                              (params['work-iteration'] - 1) * 2 +
                              1;

    percents['work-time'] = params['work-time'] / timeAmount * 100;
    percents['short-break'] = params['short-break'] / timeAmount * 100;
    percents['long-break'] = params['long-break'] / timeAmount * 100;
    percents['rule-step'] = ruleStep / timeAmount * 100;

    return {
      ruleStep: ruleStep,
      percents: percents,
      timeAmount: timeAmount,
      firstCycle: firstCycle,
      chartSegmentsCount: chartSegmentsCount,
    };
  }

}
