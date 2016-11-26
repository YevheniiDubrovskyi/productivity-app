import EventBus from './utils/eventbus.js';

export default class Router {

  constructor(viewport, routes) {
    this.viewport = viewport;
    this.routes = routes;
    this.events = new EventBus();
  }

}
