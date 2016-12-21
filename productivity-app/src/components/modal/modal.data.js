const defaultInputsData = {
  title: {
    name: 'title',
    type: 'text',
    value: ''
  },
  description: {
    name: 'description',
    type: 'text',
    value: ''
  },
  deadline: {
    name: 'deadline',
    type: 'date',
    value: ''
  }
};

const defaultPriorityData = [
  {
    alias: 'urgent',
    title: 'urgent'
  },
  {
    alias: 'high',
    title: 'high'
  },
  {
    alias: 'middle',
    title: 'middle',
  },
  {
    alias: 'low',
    title: 'low'
  }
];

export {defaultInputsData, defaultPriorityData};
