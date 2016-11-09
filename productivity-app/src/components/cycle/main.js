export default class Cycle {

  constructor(title, ruleStep, initParams) {
    this.title = title;
    this.ruleStep = ruleStep;
    this.params = initParams;

    this.timeAmount = null;
    this.firstCycle = null;
    this.markup = createSection();
    this.percents = {};

    this.render();

    function createSection() {
      let section = document.createElement('section');

      section.classList.add('cycle-chart');
      return section;
    }
  }

  updateData(name, value) {
    this.params[name] = value;
    this.render();
  }

  render() {
    this.calcPercents();
    this.markup.innerHTML = '';
    this.markup.appendChild(this.createMarkup());
  }

  calcPercents() {
    let params = this.params;

    this.timeAmount = params['work-time'] * params['work-iteration'] * 2 +
                      params['short-break'] * (params['work-iteration'] - 1) * 2 +
                      params['long-break'];
    this.firstCycle = params['work-time'] * params['work-iteration'] +
                      params['short-break'] * (params['work-iteration'] - 1) +
                      params['long-break'];

    this.percents['work-time'] = params['work-time'] / this.timeAmount * 100;
    this.percents['short-break'] = params['short-break'] / this.timeAmount * 100;
    this.percents['long-break'] = params['long-break'] / this.timeAmount * 100;
    this.percents['rule-step'] = this.ruleStep / this.timeAmount * 100;
  }

  createMarkup() {
    const fragment = document.createDocumentFragment();
    const heading = document.createElement('h2');

    fragment.appendChild(heading);
    createChartList.call(this, fragment);
    createRuleList.call(this, fragment);

    heading.classList.add('cycle-chart-heading');
    heading.innerHTML = this.title;

    return fragment;

    function createChartList(fragment) {
      const chartList = document.createElement('ul');

      fragment.appendChild(chartList);
      chartList.classList.add('cycle-chart__chart');

      const length = this.params['work-iteration'] * 2 +
                     (this.params['work-iteration'] - 1) * 2 +
                     1;
      const half = ~~(length / 2);
      let i = -1;
      while(++i < length) {
        const li = document.createElement('li');

        if (i % 2 === 0) {
          li.classList.add('cycle-chart__chart-work');
          li.style.width = `${this.percents['work-time']}%`;
        } else {
          li.classList.add('cycle-chart__chart-break');
          li.style.width = `${this.percents['short-break']}%`;
        }

        if (i === half) {
          const span = document.createElement('span');
          const hours = ~~(this.firstCycle / 60);
          const minutes = (this.firstCycle % 60);

          li.appendChild(span);
          li.style.width = `${this.percents['long-break']}%`;
          li.classList.add('long-break');
          span.classList.add('long-break-span');

          span.innerHTML = minutes ?
            `Full cycle: ${hours}h ${minutes}m` :
            `Full cycle: ${hours}h`;
        }

        chartList.appendChild(li);
      }
    }

    function createRuleList(fragment) {
      const ruleList = document.createElement('ul');

      fragment.appendChild(ruleList);
      ruleList.classList.add('cycle-chart__rule');

      const length = ~~(this.timeAmount / this.ruleStep);
      let i = -1;
      let tempHours, tempMinutes, minutesAmount;
      while(++i < length) {
        const li = document.createElement('li');
        const span = document.createElement('span');

        minutesAmount = (i + 1) * this.ruleStep;
        tempHours = ~~(minutesAmount / 60);
        tempMinutes = minutesAmount % 60;

        li.style.width = `${this.percents['rule-step']}%`;
        li.classList.add('cycle-chart__rule-point');
        span.classList.add('point-value-span');
        if (tempHours && tempMinutes) {
          span.innerHTML = `${tempHours}h ${tempMinutes}m`;
        } else if (!tempHours) {
          span.innerHTML = `${tempMinutes}m`;
        } else {
          span.innerHTML = `${tempHours}h`;
        }

        li.appendChild(span);
        ruleList.appendChild(li);
      }
    }
  }

}
