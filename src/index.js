// import Project from './scripts/project';
// import run from './scripts/app.js';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

function taskItemCreator(index, name, completed) {
  let liElemt = document.createElement('li');
  liElemt.className = 'task-item my-2 d-flex justify-content-between';
  if (!completed) {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label ml-4" for="task${index}">
    ${name}
    </label>
    `
  }else {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" checked type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label done ml-4" for="task${index}">
    ${name}
    </label>
    <button class='btn btn-link trash p-0 d-inline'><i class="far fa-trash-alt "></i></button>
    `
  // liElemt.children[2].addEventListener("click", function(){ alert('this.innerHTML') });
  liElemt.children[2].addEventListener("click", function(){ taskFactt.removeTask(parseInt(this.getAttribute('data'))-1) });
  }
  // liElemt.children[0].style.display = 'none';
  liElemt.children[0].addEventListener("click", function(){ taskFactt.toggleComplete(parseInt(this.getAttribute('data'))-1) });
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

  let toggleComplete = function completeTask(index) {
    this.tasksArr[index].completed = !this.tasksArr[index].completed;
    renderTask(this.tasksArr);
  }

  return {tasksArr, addTask, removeTask, render, toggleComplete};
};

let taskFactt = taskFact();
 
// taskFactt.removeTask('pay rent');
taskFactt.addTask('buy new phone');
taskFactt.addTask('buy new car');
// taskFactt.removeTask('pay rent');
// taskFactt.completeTask(2);
// taskFactt.render;
// taskItemCreator(0, 'name', false);
console.log(taskFactt.tasksArr);

// document.querySelector('.form-check-input').ch

document.querySelector(".form-check-input").style.backgroundColor = 'red';
// document.querySelectorAll(".form-check-input").addEventListener("click", function(){ alert("Hello World!"); });