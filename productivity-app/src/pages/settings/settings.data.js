const settingsData = [
  {
    title: 'Work time',
    afterClass: 'after-orange',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 25,
    step: 5,
    min: 15,
    max: 40,
    suffix: 'min',
    name: 'work-time',
    role: 'iteration/1-part-duration',
    color: '#ffb200'
  },
  {
    title: 'Work iteration',
    afterClass: 'after-dark-turquoise',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 5,
    step: 1,
    min: 1,
    max: 5,
    suffix: '',
    name: 'work-iteration',
    role: 'iteration/count',
    color: '#00d4d9'
  },
  {
    title: 'Short break',
    afterClass: 'after-picton-blue',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, voluptates, vero.',
    value: 1,
    step: 1,
    min: 1,
    max: 15,
    suffix: 'min',
    name: 'short-break',
    role: 'iteration/2-part-duration',
    color: '#59abe3'
  },
  {
    title: 'Long break',
    afterClass: 'after-picton-blue',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
    value: 45,
    step: 5,
    min: 30,
    max: 60,
    suffix: 'min',
    name: 'long-break',
    role: 'iteration/middle-duration'
    color: '#59abe3'
  },
  {
    value: 0,
    step: 30,
    role: 'rule'
  }
];

const tempTabsData = [
  {
    name: 'pomodoros',
    active: true,
  },
  {
    name: 'categories',
    active: false
  }
];

export {settingsData, tempTabsData};
