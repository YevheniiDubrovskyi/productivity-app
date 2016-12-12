const initSettingsData = [
  {
    role: 'iteration/even',
    title: 'Work time',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 25,
    step: 5,
    min: 15,
    max: 40,
    suffix: 'min',
    color: '#ffb200'
  },
  {
    role: 'iteration/count',
    title: 'Work iteration',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 5,
    step: 1,
    min: 1,
    max: 5,
    suffix: '',
    color: '#00d4d9'
  },
  {
    role: 'iteration/odd',
    title: 'Short break',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptates, vero.',
    value: 1,
    step: 1,
    min: 1,
    max: 15,
    suffix: 'min',
    color: '#59abe3'
  },
  {
    role: 'iteration/middle',
    title: 'Long break',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 45,
    step: 5,
    min: 30,
    max: 60,
    suffix: 'min',
    color: '#59abe3'
  },
  {
    role: 'rule',
    value: 0,
    step: 30
  }
];

const tabsData = [
  {
    name: 'pomodoros',
    active: true,
  },
  {
    name: 'categories',
    active: false
  }
];

export {initSettingsData, tabsData};
