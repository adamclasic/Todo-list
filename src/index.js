// import Project from './scripts/project';
// import run from './scripts/app.js';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

function taskItemCreator(index, name, completed) {
  let liElemt = document.createElement('li');
  liElemt.className = 'task-item my-2';
  if (!completed) {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" onclick='taskFactt.completeTask(1)' type="checkbox" value="" id="task${index}">
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
    let listItemToDom = taskItemCreator(counter, element.name, element.completed)
    tasksParent.appendChild(listItemToDom);
  });
  
}

function taskFact() {
  let tasksArr = [{
    name: 'fix the sink',
    completed: false
  },
  {
    name: 'pay rent',
    completed: true
  }];
  const addTask = (name) => {
    let newTask = {
      name: name,
      completed: false
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

  let completeTask = function completeTask(index) {
    this.tasksArr[index].completed = true;
    renderTask(this.tasksArr);
  }

  return {tasksArr, addTask, removeTask, render, completeTask}
};

let taskFactt = taskFact();
 
// taskFactt.removeTask('pay rent');
taskFactt.addTask('buy new phone');
taskFactt.addTask('buy new car');
taskFactt.removeTask('pay rent');
taskFactt.completeTask(2);
// taskFactt.render;
// taskItemCreator(0, 'name', false);
console.log(taskFactt.tasksArr);
