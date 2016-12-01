import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   */
  constructor(data) {
    super(data);
  }

  /**
   * Return calculated data for template
   * @return {Object} Calculated data
   */
  calcData() {
    const timeAmount = this.calcTimeAmount();

    return {
      timeAmount: timeAmount,
      firstCycle: this.calcFirstCycleTime(),
      segmentsCount: this.calcChartSegmentsCount(),
      chart: this.calcChartPercents(timeAmount),
      rule: this.calcRulePercents(timeAmount)
    };
  }

  /**
   * Return object with chart segments width in percents
   * @param  {Number} timeAmount - Full cycle time amount
   * @return {Object} Object with chart segments width in percents
   */
  calcChartPercents(timeAmount) {
    const data = this.dataStatic;
    const even = data['iteration/even'];
    const odd = data['iteration/odd'];
    const middle = data['iteration/middle'];

    return {
      even: {
        percents: even.value / timeAmount * 100,
        color: even.color
      },
      odd: {
        percents: odd.value / timeAmount * 100,
        color: odd.color
      },
      middle: {
        percents: middle.value / timeAmount * 100,
        color: middle.color
      },
    };
  }

  /**
   * Return object with rule segments width in percents
   * @param  {Number} timeAmount - Full cycle time amount
   * @return {Object} Object with rule segments width in percents
   */
  calcRulePercents(timeAmount) {
    const ruleObject = this.dataStatic['rule'];

    return {
      percents: ruleObject.step / timeAmount * 100,
      color: this.dataStatic['iteration/count'].color,
      startFrom: ruleObject.value,
      step: ruleObject.step
    };
  }

  /**
   * Return time amount for all chart
   * @return {Number} Time amount in minutes
   */
  calcTimeAmount() {
    const data = this.dataStatic;

    return data['iteration/even'].value * data['iteration/count'].value * 2 +
           data['iteration/odd'].value * (data['iteration/count'].value - 1) * 2 +
           data['iteration/middle'].value;
  }

  /**
   * Return time amount for first work cycle (inner)
   * @return {Number} Time amount in minutes
   */
  calcFirstCycleTime() {
    const data = this.dataStatic;

    return data['iteration/even'].value * data['iteration/count'].value +
           data['iteration/odd'].value * (data['iteration/count'].value - 1) +
           data['iteration/middle'].value;
  }

  /**
   * Return chart segments count
   * @return {Number} Chart segments count
   */
  calcChartSegmentsCount() {
    const data = this.dataStatic;

    return data['iteration/count'].value * 2 +
           (data['iteration/count'].value - 1) * 2 +
           1;
  }

}
