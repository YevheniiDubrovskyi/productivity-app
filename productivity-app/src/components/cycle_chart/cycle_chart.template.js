/**
 * Component template
 */
export default class Template {

  /**
   * Create component template
   */
  constructor() {
    this.markup = document.createElement('section');
    this.markup.classList.add('cycle-chart');
    this.markup.innerHTML = this.createMarkupSkeleton();

    this.chartList = this.markup.querySelector('.cycle-chart__chart');
    this.ruleList = this.markup.querySelector('.cycle-chart__rule');
  }

  createMarkupSkeleton() {
    return [`<h2 class="cycle-chart-heading">Your cycle</h2>`,
            `<ul class="cycle-chart__chart"></ul>`,
            `<ul class="cycle-chart__rule"></ul>`].join('\n');
  }

  /**
   * Update component markup
   * @param {Object} data - Object with calculated percents
   */
  update(data) {
    this.chartList.innerHTML = this.createChartList(data);
    this.ruleList.innerHTML = this.createRuleList(data);
  }

  /**
   * Return markup for chart list
   * @param {Object} data - Data object with colors and percents
   * @return {String} Chart list markup
   */
  createChartList(data) {
    const count = data.segmentsCount
    const even = data.chart.even;
    const odd = data.chart.odd;
    const half = ~~(count / 2);

    let chartList = '\n';
    let i = -1;

    while (++i < count) {
      const options = i % 2 ? odd : even;

      if (i === half) {
        const spanText = this.getSpanText(data.firstCycle, 'Full cycle: ');

        chartList += [`<li class="long-break" style="background-color: ${data.chart.middle.color}; width: ${data.chart.middle.percents}%;">`,
                      `<div class="long-break-span">${spanText}`,
                      `<span class="long-break-span-dot" style="background-color: ${data.rule.color}"></span>`,
                      `</div>`,
                      `</li>\n`].join('\n');
        continue;
      }

      chartList += `<li style="background-color: ${options.color}; width: ${options.percents}%;"></li>\n`;
    }

    return chartList;
  }

  /**
   * Return markup for rule list
   * @param {Object} data - Data object with colors and percents
   * @return {String} Rule list markup
   */
  createRuleList(data) {
    const ruleStep = data.rule.step;
    const count = ~~(data.timeAmount / ruleStep);

    let ruleList = '\n';
    let i = -1;

    while (++i < count) {
      const ruleTimeAmount = (i + 1) * ruleStep;
      const spanText = this.getSpanText(ruleTimeAmount);

      ruleList += [`<li class="cycle-chart__rule-point" style="width: ${data.rule.percents}%;">`,
                   `<div class="cycle-chart__rule-text">${spanText}`,
                   `<span class="cycle-chart__rule-dot" style="background-color: ${data.rule.color};"></span>`,
                   `</div>`,
                   `</li>\n`].join('\n');
    }

    return ruleList;
  }

  /**
   * Return span text (example: 3h 25m)
   * @param  {Number} timeAmount - Time amount in minutes
   * @param {String} [prefix] - String which will be insert in the start of the line
   * @return {String} Compiled span text
   */
  getSpanText(timeAmount, prefix = '') {
    const hours = ~~(timeAmount / 60);
    const minutes = timeAmount % 60;
    let spanText;

    if (hours && minutes) {
      spanText = `${hours}h ${minutes}m`;
    } else if (!hours) {
      spanText = `${minutes}m`;
    } else {
      spanText = `${hours}h`;
    }

    return prefix + spanText;
  }

}
