import EventBus from './utils/eventbus.js';
import utils from './utils/utils';

/**
 * Router class
 */
export default class Router {

  /**
   * Create router
   * @param  {HTMLElement} viewport - Append to element
   * @param  {Array} routes
   */
  constructor(viewport, ...routes) {
    this.events = new EventBus();
    this.routes = [];
    this.activePage = null;
    this.viewport = viewport;

    this.pushRoutes(...routes);
    this.page = document.location.hash;

    window.addEventListener('popstate', (event) => {
      this.page = document.location.hash;
    });
  }

  /**
   * Push routes
   * @param {Object} routObject - Object with page module name and pattern
   */
  pushRoutes(...routes) {
    routes.forEach((rout) => {
      this.routes.push({
        path: `./pages/${rout.page}/${rout.page}.controller`,
        regExp: utils.fromPatternToRegular(rout.pattern),
        default: rout.default ? true : false
      });
    });
  }

  /**
   * Get page object
   * @param  {String} hash - Current hash
   * @return {Object | null} Return page object or null if page doesn't exist
   */
  getPageObject(hash) {
    let match = null;

    const matched = this.routes.filter((rout) => {
      let find = hash.match(rout.regExp);

      match = find ?
        find.slice(1) :
        match;

      return find;
    });

    return matched.length ?
      Object.assign(matched[0], { params: match }) :
      null;
  }

  /**
   * Get default page object
   * @return {Object} Return default page object
   */
  get defaultPage() {
    const defaultPage = this.routes.filter((rout) => {
      return rout.default;
    });

    if (!defaultPage.length && defaultPage.length > 1) {
      throw new Error('Default page didn\'t set properly');
    }

    return defaultPage[0];
  }

  /**
   * Set page by hash
   * @param {String} hash - document.location.hash
   */
  set page(hash) {
    if (!hash) {
      this.loadPage(this.defaultPage);
      return;
    }

    let pageObject;

    if (pageObject = this.getPageObject(hash)) {
      this.loadPage(pageObject);
    }
  }

  /**
   * Load and create page
   * @param  {pageObject} pageObject
   */
  loadPage(pageObject) {
    require.ensure([], (require) => {
      const module = require(pageObject.path);
      const Page = module.default;
      const params = pageObject.params ?
        pageObject.params :
        [];

      if (this.activePage) {
        this.activePage.destroy();
      }

      this.activePage = new Page(this.viewport, ...params);
    });
  }

}
