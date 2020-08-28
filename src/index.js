// import Project from './scripts/project';
// import run from './scripts/app.js';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

document.querySelector("#addTaskId").addEventListener("submit", function(e){
  e.preventDefault();
  // alert(this.children[0].value);
  taskFactt.addTask(this.children[0].value);
  this.children[0].value = '';

});

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
  // liElemt.children[2].addEventListener("click", function(){ alert(parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data'))-1) });
  liElemt.children[2].addEventListener("click", function(){ taskFactt.removeTask(parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data'))-1) });
  }
  // liElemt.children[0].style.display = 'none';
  liElemt.children[0].addEventListener("click", function(){ taskFactt.toggleComplete(parseInt(this.getAttribute('data'))-1) });
  return liElemt;
}
function renderTask(arr, taskName) {
  let tasksParent = document.querySelector('.task-items-cont');
  tasksParent.innerHTML = '';
  let counter = 0;
  arr.forEach(element => {
    counter++;
    let listItemToDom = taskItemCreator(counter, element.name, element.completed)
    tasksParent.appendChild(listItemToDom);
  });
  document.querySelector('h5.mb-4').innerText = taskName + ' ' + arr.length

  return arr.length;
}

function taskFact(projectName) {
  let taskName = projectName;
  let tasksArr = [{
    name: 'fix the sink',
    completed: false
  },
  {
    name: 'pay rent',
    completed: true
  },
  {
    name: 'build a website',
    completed: true
  }];
  const addTask = (name) => {
    if (name.length<1) {return}
    let newTask = {
      name: name,
      completed: false
    };
    tasksArr.push(newTask);
    renderTask(tasksArr, taskName);
    return tasksArr;
  }

  const render = renderTask(tasksArr, taskName);

  let removeTask = function removeTask(index) {
    this.tasksArr.splice(index, 1);
    // this.tasksArr = tasksArr.filter(function (el) { return el.name != name; });
    renderTask(this.tasksArr, taskName);
  }

  let toggleComplete = function completeTask(index) {
    this.tasksArr[index].completed = !this.tasksArr[index].completed;
    renderTask(this.tasksArr, taskName);
  }

  // let numOfItems = returnLength(tasksArr);

  return {taskName, tasksArr, addTask, removeTask, render, toggleComplete};
};



let taskFactt = taskFact('work');
 
// taskFactt.removeTask('pay rent');
taskFactt.addTask('buy new phone');
taskFactt.addTask('buy new car');
// taskFactt.removeTask('pay rent');
// taskFactt.completeTask(2);
// taskFactt.render;
// taskItemCreator(0, 'name', false);
console.log(taskFactt.tasksArr.length);
// document.querySelector('.form-check-input').ch
document.querySelector('h5.mb-4').innerText = taskFactt.taskName + ' ' + taskFactt.tasksArr.length ;
document.querySelector(".form-check-input").style.backgroundColor = 'red';
// document.querySelectorAll(".form-check-input").addEventListener("click", function(){ alert("Hello World!"); });
