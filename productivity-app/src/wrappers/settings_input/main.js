import Action from '../../components/action/main';

export default function getSettingsInput(title, afterClass, text, defaultValue, step, min, limit, suffix, name) {

  const section = document.createElement('section');
  const headingElement = document.createElement('h3');
  const textElement = document.createElement('p');

  // Create new Action and get MARKUP
  const action = new Action(defaultValue, step, min, limit, suffix, name).markup;

  section.classList.add('settings-input');
  section.classList.add(afterClass);
  headingElement.classList.add('settings-input-heading');
  textElement.classList.add('settings-input-text');

  headingElement.innerHTML = title;
  textElement.innerHTML = text;

  section.appendChild(headingElement);
  section.appendChild(action);
  section.appendChild(textElement);

  return section;
}
