import ComponentModel from '../components.model';

/**
 * Component model
 */
export default class Model extends ComponentModel {

  /**
   * Create component model
   */
  constructor() {
    super();
    this.modelAlias = 'tasks';

    this.subscribe((data) => {
      if (!data) return;

      this.update(data);
    });
  }

}
