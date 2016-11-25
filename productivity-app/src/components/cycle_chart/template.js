export default class Template {

  constructor(title) {
    this.markup = document.createElement('section');
    this.markup.classList.add('cycle-chart');

    this.markup.innerHTML = `
<h2 class="cycle-chart-heading">${title}</h2>
<div class="cycle-chart__viewport"></div>`;
    this.viewport = this.markup.querySelector('.cycle-chart__viewport');
  }

  render(paramsObj) {
    this.viewport.innerHTML = '\n';
    this.viewport.innerHTML += this.createChartList(paramsObj.chartSegmentsCount, paramsObj.firstCycle, paramsObj.percents);
    this.viewport.innerHTML += this.createRuleList(paramsObj.timeAmount, paramsObj.ruleStep, paramsObj.percents);
  }

  createChartList(chartSegmentsCount, firstCycle, percents) {
    const half = ~~(chartSegmentsCount / 2);
    let listItems = '\n';
    let i = -1;

    while (++i < chartSegmentsCount) {
      let options = {
        class: null,
        width: null,
      };

      if (i % 2 === 0) {
        options.class = 'cycle-chart__chart-work';
        options.width = percents['work-time'];
      } else {
        options.class = 'cycle-chart__chart-break';
        options.width = percents['short-break'];
      }

      if (i === half) {
        const hours = ~~(firstCycle / 60);
        const minutes = (firstCycle % 60);
        const spanText = minutes ?
          `Full cycle: ${hours}h ${minutes}m` :
          `Full cycle: ${hours}h`;

        listItems += `  <li class="${options.class} long-break" style="width: ${percents['long-break']}%">
    <span class="long-break-span">${spanText}</span>
  </li>\n`;
        continue;
      }

      listItems += `  <li class="${options.class}" style="width: ${options.width}%"></li>\n`;
    }

    return `<ul class="cycle-chart__chart">${listItems}</ul>\n`;
  }

  createRuleList(timeAmount, ruleStep, percents) {
    const length = ~~(timeAmount / ruleStep);
    let listItems = '\n';
    let i = -1;

    while (++i < length) {
      const minutesAmount = (i + 1) * ruleStep;
      const tempHours = ~~(minutesAmount / 60);
      const tempMinutes = minutesAmount % 60;
      let spanText;

      if (tempHours && tempMinutes) {
        spanText = `${tempHours}h ${tempMinutes}m`;
      } else if (!tempHours) {
        spanText = `${tempMinutes}m`;
      } else {
        spanText = `${tempHours}h`;
      }

      listItems += `  <li class="cycle-chart__rule-point" style="width: ${percents['rule-step']}%">
    <span class="point-value-span">${spanText}</span>
  </li>\n`;
    }

    return `<ul class="cycle-chart__rule">${listItems}</ul>\n`;
  }

}
