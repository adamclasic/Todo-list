// import Project from './scripts/project';
// import run from './scripts/app.js';
import 'bootstrap';
import './styles/style.scss';
import 'bootstrap/js/dist/dropdown';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

let projectId = 0;

document.querySelector("#addTaskId").addEventListener("submit", function(e){
  e.preventDefault();
  mainProjects.projectsArr[projectId].addTask(this.children[0].value);
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
  liElemt.children[2].addEventListener("click", function(){ mainProjects.projectsArr[projectId].removeTask(parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data'))-1) });
  }
  liElemt.children[0].addEventListener("click", function(){ mainProjects.projectsArr[projectId].toggleComplete(parseInt(this.getAttribute('data'))-1) });
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
  document.querySelector('h5.mb-4').innerText = taskName.charAt(0).toUpperCase() + taskName.slice(1)

  return arr.length;
}

function taskFact(projectName) {
  let taskName = projectName;
  let tasksArr = [];
  const addTask = (name) => {
    if (name.length<1) {return}
    let newTask = {
      name: name,
      completed: false
    };
    tasksArr.push(newTask);
    renderTask(tasksArr, taskName);
    renderProjects(mainProjects.projectsArr);
    return tasksArr;
  }

  const render = function render() {
    renderTask(this.tasksArr, taskName);
    console.log(tasksArr);
  }

  let removeTask = function removeTask(index) {
    this.tasksArr.splice(index, 1);
    renderTask(this.tasksArr, taskName);
    renderProjects(mainProjects.projectsArr);
  }

  let toggleComplete = function completeTask(index) {
    this.tasksArr[index].completed = !this.tasksArr[index].completed;
    renderProjects(mainProjects.projectsArr);
    renderTask(this.tasksArr, taskName);
  }
  return {taskName, tasksArr, addTask, removeTask, render, toggleComplete};
};




// project area



function createProjectElement(project, index) {
  let projectLi = document.createElement('li');
  projectLi.className = 'projects-item  d-flex justify-content-between px-4 py-2';
  //give attribute for indexing
  var a = document.createAttribute("data");
  a.value = index;
  projectLi.setAttributeNode(a);
  projectLi.innerHTML = `<div>${project.taskName.charAt(0).toUpperCase() + project.taskName.slice(1)} <span class="d-inline-block rounded-circle  bg-grey">${project.tasksArr.length}</span></div><button class='btn btn-link trash p-0' ><i id='trashProject' class=" d-none far fa-trash-alt float-right trash"></i>`;
  projectLi.addEventListener('mouseenter', function() { this.lastElementChild.lastElementChild.classList.add("d-inline") });
  projectLi.addEventListener('mouseleave', function() { this.lastElementChild.lastElementChild.classList.remove("d-inline") });

  projectLi.addEventListener('click', function() { 
    mainProjects.projectsArr[this.getAttribute('data')].render();
    projectId = this.getAttribute('data');
  });
  projectLi.lastElementChild.addEventListener('click', function() { mainProjects.removeProject(this.parentElement.getAttribute('data')) })
  return projectLi;
}

function renderProjects(arr) {
  let projectsList = document.querySelector('.projects-list').innerHTML = '';
  let count = 0;
  arr.forEach(elem => {
    let projectLi = createProjectElement(elem, count);
    projectsList = document.querySelector('.projects-list').appendChild(projectLi);
    count++;
  });
}

function projectFact() {
  let projectsArr = [taskFact('work'), taskFact('programing')];
  console.log(projectsArr);

  function addProject(name) {
    if (name.length<1) {return}
    let project = taskFact(name);
    projectsArr.push(project)
    renderProjects(projectsArr);
  }

  function removeProject(index) {
    projectsArr.splice(index, 1);
    renderProjects(projectsArr);
  }
  return { removeProject, addProject, projectsArr }
}

document.querySelector("#addProjectId").addEventListener("submit", function(e){
  e.preventDefault();
  mainProjects.addProject(this.children[0].value);
  this.children[0].value = '';
});

let mainProjects = projectFact();
mainProjects.addProject('home');
mainProjects.projectsArr[0].addTask('get the shit done');
// mainProjects.addProject('sport');
mainProjects.projectsArr[1].render;
// mainProjects.removeProject(1);

// renderProjects(projectsArr);

