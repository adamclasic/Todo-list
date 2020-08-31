import { mainProjects } from '../index';

let projectId = 0;

function taskItemCreator(index, name, completed) {
  const liElemt = document.createElement('li');
  liElemt.className = 'task-item my-2 d-flex justify-content-between';
  if (!completed) {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label ml-4" for="task${index}">
    ${name}
    </label>
    `;
  } else {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" checked type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label done ml-4" for="task${index}">
    ${name}
    </label>
    <button class='btn btn-link trash p-0 d-inline'><i class="far fa-trash-alt "></i></button>
    `;
    liElemt.children[2].addEventListener('click', function () {
      mainProjects.projectsArr[projectId].removeTask(parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data')) - 1);
      this.parentElement.classList.add('animate-out');
      setTimeout(() => { renderTask(mainProjects.projectsArr[projectId].tasksArr, mainProjects.projectsArr[projectId].taskName); }, 200);
    });
  }
  liElemt.children[0].addEventListener('click', function () { mainProjects.projectsArr[projectId].toggleComplete(parseInt(this.getAttribute('data')) - 1); });
  return liElemt;
}
function renderTask(arr, taskName) {
  const tasksParent = document.querySelector('.task-items-cont');
  tasksParent.innerHTML = '';
  let counter = 0;
  arr.forEach(element => {
    counter += 1;
    const listItemToDom = taskItemCreator(counter, element.name, element.completed);
    tasksParent.appendChild(listItemToDom);
  });
  document.querySelector('#projectName').innerText = taskName.charAt(0).toUpperCase() + taskName.slice(1);

  return arr.length;
}

// rendring project

function createProjectElement(project, index) {
  const projectLi = document.createElement('li');
  projectLi.className = 'projects-item  d-sm-flex justify-content-between px-1 px-sm-4  py-2';

  const a = document.createAttribute('data');
  a.value = index;
  projectLi.setAttributeNode(a);
  projectLi.innerHTML = `<div>${project.taskName.charAt(0).toUpperCase() + project.taskName.slice(1)} <span class="d-inline-block rounded-circle  bg-grey">${project.tasksArr.length}</span></div><button class='btn btn-link trash p-0' ><i id='trashProject' class=" d-none far fa-trash-alt float-right trash"></i>`;
  projectLi.addEventListener('mouseenter', function () { this.lastElementChild.lastElementChild.classList.add('d-inline'); });
  projectLi.addEventListener('mouseleave', function () { this.lastElementChild.lastElementChild.classList.remove('d-inline'); });

  projectLi.addEventListener('click', function () {
    if (mainProjects.projectsArr[this.getAttribute('data')]) { mainProjects.projectsArr[this.getAttribute('data')].render(); }
    projectId = this.getAttribute('data');
  });
  projectLi.lastElementChild.addEventListener('click', function () {
    mainProjects.removeProject(this.parentElement.getAttribute('data'));

    if (mainProjects.projectsArr[0]) {
      renderTask(mainProjects.projectsArr[0].tasksArr, mainProjects.projectsArr[0].taskName);
    }
    projectId = 0;
  });
  return projectLi;
}

function renderProjects(arr) {
  let projectsList = document.querySelector('.projects-list').innerHTML = '';
  if (arr.length === 0) {
    document.querySelector('.card-container').classList.add('d-none');
  } else {
    document.querySelector('.card-container').classList.remove('d-none');
  }
  let count = 0;
  arr.forEach(elem => {
    const projectLi = createProjectElement(elem, count);
    projectsList = document.querySelector('.projects-list').appendChild(projectLi);
    count += 1;
  });
}

function addEventListenerToTasksForm() {
  document.querySelector('#addTaskId').addEventListener('submit', function (e) {
    e.preventDefault();
    mainProjects.projectsArr[projectId].addTask(this.children[0].value);
    this.children[0].value = '';
    renderTask(
      mainProjects.projectsArr[projectId].tasksArr,
      mainProjects.projectsArr[projectId].taskName,
    );
    document.querySelector('.task-items-cont').lastChild.classList.add('animate-in');
  });
}

function addEventListenerToProjectsForm() {
  document.querySelector('#addProjectId').addEventListener('submit', function (e) {
    e.preventDefault();
    mainProjects.addProject(this.children[0].value);
    this.children[0].value = '';
  });
}

export {
  renderProjects, renderTask, addEventListenerToTasksForm,
  addEventListenerToProjectsForm, projectId, mainProjects,
};