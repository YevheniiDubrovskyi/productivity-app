const utils = {

  /**
   * Capitalize first string letter
   * @param  {String} word - String wich will be capitalized
   * @return {String} Capitalized string;
   */
  capitalize: function(word) {
    return word.slice(0,1).toUpperCase() + word.slice(1);
  },

};

export default utils;
