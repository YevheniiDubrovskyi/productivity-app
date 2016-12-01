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
    return `  <main class="main">
    <figure class="logo">
      <img class="logo-image" src="img/Logo_1.svg" alt="Logo image" title="Logo"/>
    </figure>

      <form class="login-form" action="/" method="POST">
        <section class="login-form-sect">
          <input class="login-form-inpt" id="username" type="text" placeholder="Username" pattern="[A-Za-z0-9]{4,}"/>
          <i class="login-form-icon icon-login"></i>
          <span class="login-form-hint">Lorem ipsum dolor sit amet.</span>
        </section>

        <section class="login-form-sect">
          <input class="login-form-inpt" id="password" type="password" placeholder="Password" pattern="[A-Za-z0-9]{6,}"/>
          <i class="login-form-icon icon-password"></i>
          <span class="login-form-hint">Lorem ipsum dolor.</span>
        </section>

        <button class="login-form-btn btn btn-niagara" type="submit" onclick="history.pushState({}, '', '#!/task_list')">Log In</button>
      </form>
  </main>`;
  }

}
