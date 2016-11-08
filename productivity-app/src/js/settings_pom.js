import {settingsData} from './settings_pom_data';
import getSettingsInput from '../wrappers/settings_input/main';
import Cycle from '../components/cycle/main';

const main = document.querySelector('.main');
const controls = document.querySelector('.controls.common-state');
const settingsList = document.createElement('ul');
const defaultValues = [];

settingsList.classList.add('settings-list');
settingsData.forEach((el) => {
  let listItem = document.createElement('li');
  let section = getSettingsInput(el.title,
                                 el.afterClass,
                                 el.text,
                                 el.defaultValue,
                                 el.step,
                                 el.min,
                                 el.limit,
                                 el.suffix,
                                 el.name);

  listItem.classList.add('settings-list-item');
  listItem.appendChild(section);
  settingsList.appendChild(listItem);

  defaultValues.push(el.defaultValue);
});

const cycle = new Cycle(30, ...defaultValues);

// Handle all custom events from actions
settingsList.addEventListener('actionValueChanged', (event) => {
  const detail = event.detail;

  cycle.updateData(detail.name, detail.value);
});

main.insertBefore(settingsList, controls);
main.insertBefore(cycle.markup, controls);
