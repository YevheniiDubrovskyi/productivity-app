const messagesData = [
  {
    class: 'first-task',
    text: 'Add your first task',
    icon: 'before'
  },
  {
    class: 'drag-to-top',
    text: 'Task added,<br>drag it to the top 5 in daily task list',
    icon: 'after'
  },
  {
    class: 'all-done',
    text: 'Excellent,<br>all daily tasks done! :)'
  }
];

const mainFilterTabsData = [
  {
    name: 'to do',
    active: true
  },
  {
    name: 'done',
    active: false
  }
];

// TODO: Переписать табы так чтобы можно было не указывать
// TODO: активный таб, в таком случае на табы при клике не вешается
// TODO: класс .active
// TODO: Также добавить флаг при котором происходит капитализация каждого слова
const selectionTabsData = [
  {
    name: 'select all',
  },
  {
    name: 'deselect all'
  }
];

const tasksStatusList = {
  INIT: 'init',
  DONE: 'done',
  FAILED: 'failed',
  ACTIVE: 'active'
};

export {messagesData, mainFilterTabsData, selectionTabsData, tasksStatusList};
