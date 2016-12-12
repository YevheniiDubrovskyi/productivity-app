import PageTemplate from '../pages.template';
import '../../assets/img/Logo_1.svg';

/**
 * Page template
 */
export default class Template extends PageTemplate {

  /**
   * Create page template
   */
  constructor() {
    super();
    this.markup.innerHTML = this.staticTemplate();
  }

  /**
   * Return static template
   */
  staticTemplate() {
    return [`<main class="login">`,
            `<figure class="login-logo">`,
              `<img class="login-logo-image" src="img/Logo_1.svg" alt="Logo image" title="Logo"/>`,
            `</figure>`,
            `<div class="login-sect">`,
              `<input class="login-sect-inpt" id="username" type="text" placeholder="Username" pattern=".{4,}"/>`,
              `<i class="login-sect-icon icon-login"></i>`,
              `<span class="login-sect-hint">Lorem ipsum dolor sit amet.</span>`,
            `</div>`,
            `<div class="login-sect">`,
              `<input class="login-sect-inpt" id="password" type="password" placeholder="Password" pattern="[A-Za-z0-9]{6,}"/>`,
              `<i class="login-sect-icon icon-password"></i>`,
              `<span class="login-sect-hint">Lorem ipsum dolor.</span>`,
            `</div>`,
            `</main>\n`].join('\n');
  }

}
