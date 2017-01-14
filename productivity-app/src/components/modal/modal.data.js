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

const confirmMessages = {
  removeMode: 'Are you sure you want<br>to remove selected<br>task(s)?',
  edit: 'Are you sure you want<br>to remove current<br>task(s)?'
};

export {defaultInputsData, confirmMessages};
