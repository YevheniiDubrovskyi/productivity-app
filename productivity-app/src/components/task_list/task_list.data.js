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
const selectionTabsData = ['select all', 'deselect all'];

const tasksStatusList = {
  INIT: 'init',
  DONE: 'done',
  ACTIVE: 'active'
};

const defaultPriorityData = [
  {
    title: 'urgent',
    alias: 'urgent',
    weight: 4
  },
  {
    title: 'high',
    alias: 'high',
    weight: 3
  },
  {
    title: 'middle',
    alias: 'middle',
    weight: 2
  },
  {
    title: 'low',
    alias: 'low',
    weight: 1
  }
];

export {messagesData, mainFilterTabsData, selectionTabsData, tasksStatusList, defaultPriorityData};
