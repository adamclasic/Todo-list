import {mainProjects} from '../index'
let projectId = 0;

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
  liElemt.children[2].addEventListener("click", function(){
    mainProjects.projectsArr[projectId].removeTask(parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data'))-1)
    this.parentElement.classList.add('animate-out');
    setTimeout(function(){ renderTask(mainProjects.projectsArr[projectId].tasksArr, mainProjects.projectsArr[projectId].taskName); }, 200);
    // renderTask(mainProjects.projectsArr[projectId].tasksArr, mainProjects.projectsArr[projectId].taskName);

    
  });
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
  document.querySelector('#projectName').innerText = taskName.charAt(0).toUpperCase() + taskName.slice(1)

  return arr.length;
}

// rendring project

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
    console.log(mainProjects.projectsArr);
    if (mainProjects.projectsArr[this.getAttribute('data')]) {mainProjects.projectsArr[this.getAttribute('data')].render()};
    projectId = this.getAttribute('data');
    console.log(projectId);
  });
  projectLi.lastElementChild.addEventListener('click', function() { 
    mainProjects.removeProject(this.parentElement.getAttribute('data')) 
    // mainProjects.projectsArr[0].render();
    if (mainProjects.projectsArr[0]) {renderTask(mainProjects.projectsArr[0].tasksArr, mainProjects.projectsArr[0].taskName)};
    projectId = 0;
  })
  return projectLi;
}

function renderProjects(arr) {
  let projectsList = document.querySelector('.projects-list').innerHTML = '';
  if (arr.length == 0) {
    document.querySelector('.card-container').classList.add('d-none')
  } else {
    document.querySelector('.card-container').classList.remove('d-none')
  }
  let count = 0;
  arr.forEach(elem => {
    let projectLi = createProjectElement(elem, count);
    projectsList = document.querySelector('.projects-list').appendChild(projectLi);
    count++;
  });
}

function addEventListenerToTasksForm() {
  document.querySelector("#addTaskId").addEventListener("submit", function(e){
    e.preventDefault();
    mainProjects.projectsArr[projectId].addTask(this.children[0].value);
    this.children[0].value = '';
    renderTask(mainProjects.projectsArr[projectId].tasksArr, mainProjects.projectsArr[projectId].taskName);
    document.querySelector('.task-items-cont').lastChild.classList.add('animate-in');
  });
}

function addEventListenerToProjectsForm() {
document.querySelector("#addProjectId").addEventListener("submit", function(e){
  e.preventDefault();
  mainProjects.addProject(this.children[0].value);
  this.children[0].value = '';

});
}

export {renderProjects, renderTask, addEventListenerToTasksForm, addEventListenerToProjectsForm, projectId, mainProjects};