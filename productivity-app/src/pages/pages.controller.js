/**
 * Abstract class for page controller
 */
export default class PageController {

  /**
   * Create page controller
   */
  constructor() {
    this.view = null;
  }

  /**
   * Fire view method to render page
   */
  render() {
    this.view.render();
  }

  /**
   * Fire view method to destroy page
   */
  destroy() {
    this.view.destroy();
  }

}
