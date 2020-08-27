let tasksArr = [{
    name: 'fix the sink',
    complited: false
  },
  {
    name: 'pay rent',
    complited: true
  }];
const addTask = () => {
    let newTask = {
        name: name,
        complited: false
      }
      tasksArr.push(newTask);
}

let removeTask = function removeTask(name) {
    tasksArr = tasksArr.filter(function (el) { return el.name != name; });
  }
// export default