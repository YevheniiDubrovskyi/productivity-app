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
    return new RegExp('^'+pattern.replace(/:\w+/, '(\\w+)')+
      '/?$');
  }

};

export default utils;
