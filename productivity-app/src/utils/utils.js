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
  }

};

export default utils;
