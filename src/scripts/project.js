export default function Poject() {
  let tasksArr = [{
    name: 'fix the sink',
    complited: false
  },
  {
    name: 'pay rent',
    complited: true
  }];

  let addTask = function addTask(name) {
    let newTask = {
      name: name,
      complited: false
    }
    tasksArr.push(newTask);
  }

  let tasksNum = tasksArr.length;

  let removeTask = function removeTask(name) {
    tasksArr = tasksArr.filter(function (el) { return el.name != name; });
  }

  return { tasksArr, addTask, tasksNum, removeTask }
}