/**
 * Abstract class for component controller
 */
export default class ComponentController {

  /**
   * Create component controller
   */
  constructor() {
    this.view = null;
  }

  /**
   * Fire view method to render component
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
