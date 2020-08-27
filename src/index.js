// import Project from './scripts/project';
// import run from './scripts/app.js';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

function taskItemCreator(index, name, complited) {
  let liElemt = document.createElement('li');
  liElemt.className = 'task-item my-2';
  if (!complited) {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" type="checkbox" value="" id="task${index}">
    <label class="form-check-label ml-4" for="task${index}">
      ${name}
    </label>
    `
  }else {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" checked type="checkbox" value="" id="task${index}">
    <label class="form-check-label done ml-4" for="task${index}">
      ${name}
    </label>
    <i class="far fa-trash-alt float-right trash"></i>
    `
  }
  return liElemt;
}
function renderTask(arr) {
  let tasksParent = document.querySelector('.task-items-cont');
  tasksParent.innerHTML = '';
  let counter = 0;
  arr.forEach(element => {
    counter++;
    let listItemToDom = taskItemCreator(counter, element.name, element.complited)
    tasksParent.appendChild(listItemToDom);
  });
  
}

function taskFact() {
  let tasksArr = [{
    name: 'fix the sink',
    complited: false
  },
  {
    name: 'pay rent',
    complited: true
  }];
  const addTask = (name) => {
    let newTask = {
      name: name,
      complited: false
    };
    tasksArr.push(newTask);
    renderTask(tasksArr);
    return tasksArr;
  }

  const render = renderTask(tasksArr);

  let removeTask = function removeTask(name) {
    this.tasksArr = tasksArr.filter(function (el) { return el.name != name; });
    renderTask(this.tasksArr);
  }

  return {tasksArr, addTask, removeTask, render}
};

let taskFactt = taskFact();

// taskFactt.removeTask('pay rent');
taskFactt.addTask('buy new phone');
taskFactt.addTask('buy new car');
taskFactt.removeTask('pay rent');
// taskFactt.render;
// taskItemCreator(0, 'name', false);
console.log(taskFactt.tasksArr);
