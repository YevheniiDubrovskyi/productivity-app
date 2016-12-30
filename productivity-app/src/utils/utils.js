import Promise from 'bluebird';

const utils = {

  /**
   * Capitalize first string letter
   * @param  {String} word - String wich will be capitalized
   * @return {String} Capitalized string;
   */
  capitalize: function(word) {
    return word.slice(0,1).toUpperCase() + word.slice(1);
  },

  /**
   * Return regular expression formed from string
   * @param {String} pattern - Pattern string
   * @return {RegExp} Regular expression for string
   */
  fromPatternToRegular: function(pattern) {
    return new RegExp(`^${pattern.replace(/:\w+/g, '([A-z0-9-]+)')}/?$`);
  },

  /**
   * Return unique id
   * @return {string} - id
   */
  getID() {
    return `${this.getIDpart()}${this.getIDpart()}-${this.getIDpart()}-${this.getIDpart()}-${this.getIDpart()}-${this.getIDpart()}${this.getIDpart()}${this.getIDpart()}`;
  },

  /**
   * Return id part
   * @returns {string} - id part
   */
  getIDpart() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },

  /**
   * Slides component
   * @param {ComponentController} component - Component to slide
   * @param {boolean} animationFlag - If true animation will be apply
   * @param {string} horizontal - Horizontal shift
   * @param {string} vertical - Vertical shift
   */
  slide(component, animationFlag, horizontal = '0%', vertical = '0%') {
    const animation = animationFlag ? 'transition: .3s ease-in-out;' : '';
    const transform = `transform: translate(${horizontal}, ${vertical});`;

    component.inlineStyles = `${transform} ${animation}`;
    this.timeout(300)
      .then(() => {
        component.inlineStyles = transform;
      });
  },

  /**
   * Promisification for setTimeout
   * @param {number} milliseconds - Time to wait till call resolve callback
   * @return {Promise} Promise which will be resolve in milliseconds variable
   */
  timeout(milliseconds = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    }, milliseconds);
  },

};

export default utils;
