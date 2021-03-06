/* eslint-disable import/no-extraneous-dependencies
, no-use-before-define */
import projectFact from './scripts/project';
import taskFact from './scripts/tasks';

import 'bootstrap';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

let mainProjects = projectFact();

if (localStorage.getItem('project')) {
  const restoredProjectArr = JSON.parse(
    localStorage.getItem('project'),
  );
  const restoredProjectArrWithFunction = restoredProjectArr.map(
    taskObject => taskFact(taskObject.taskName, taskObject.tasksArr),
  );

  const mainProjectsWithFunctions = projectFact(restoredProjectArrWithFunction);
  mainProjects = mainProjectsWithFunctions;
}

let projectId = 0;

function addEventListenerToEditTaskForm() {
  const editBtn = document.querySelector('#taskSaveBtn');
  const editTaskLabel = document.querySelector('#editTaskLabel');
  editBtn.addEventListener('click', () => {
    const taskId = editTaskLabel.querySelector('span').innerText;
    const editTaskForm = document.querySelector('#task-form');
    const titleInput = editTaskForm.querySelector('#list-title');
    const descriptionInput = editTaskForm.querySelector('#list-description');
    const dateInput = editTaskForm.querySelector('#list-date');
    const priorityInput = editTaskForm.querySelector('input[name="priority"]:checked');
    const nameValue = titleInput.value;

    const descriptionValue = descriptionInput.value;
    const priorityValue = priorityInput.value;
    const dateValue = dateInput.value;

    mainProjects.projectsArr[projectId].editTask(
      taskId,
      nameValue,
      descriptionValue,
      dateValue,
      priorityValue,
    );
    renderTask(
      mainProjects.projectsArr[projectId].tasksArr,
      mainProjects.projectsArr[projectId].taskName,
    );
  });
}

function taskItemCreator(index, name, completed) {
  const liElemt = document.createElement('li');
  liElemt.className = 'task-item my-2 d-flex justify-content-between';
  if (!completed) {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label ml-4 position-relative" for="task${index}">
    ${name}
    <button data-toggle="modal" data-target="#editTask" class='btn expand-btn btn-link p-0 d-none'><i class="fas fa-pen"></i></button>
    </label>
    `;
  } else {
    liElemt.innerHTML = `
    <input class="form-check-input ml-1" checked type="checkbox" data="${index}" value="" id="task${index}">
    <label class="form-check-label done ml-4 position-relative" for="task${index}">
    ${name}
    <button data-toggle="modal" data-target="#editTask" class='btn expand-btn btn-link p-0 d-none'><i class="fas fa-pen"></i></button>
    </label>
    <button class='btn btn-link trash p-0 d-inline'><i class="far fa-trash-alt "></i></button>
    `;
    liElemt.children[2].addEventListener('click', function removeATask() {
      mainProjects.projectsArr[projectId].removeTask(
        parseInt(this.previousElementSibling.previousElementSibling.getAttribute('data'), 10) - 1,
      );
      this.parentElement.classList.add('animate-out');
      renderProjects(mainProjects.projectsArr);
      setTimeout(() => {
        renderTask(
          mainProjects.projectsArr[projectId].tasksArr,
          mainProjects.projectsArr[projectId].taskName,
        );
      }, 200);
      localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
    });
  }
  liElemt.children[0].addEventListener('click', function toggleCompleteOnATask() {
    mainProjects.projectsArr[projectId].toggleComplete(parseInt(this.getAttribute('data'), 10) - 1);
    renderProjects(mainProjects.projectsArr);
    renderTask(
      mainProjects.projectsArr[projectId].tasksArr,
      mainProjects.projectsArr[projectId].taskName,
    );
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  });
  liElemt.addEventListener('mouseenter', () => {
    const editBtn = liElemt.querySelector("[data-toggle='modal']");
    editBtn.classList.add('d-inline');
    editBtn.classList.remove('d-none');
  });

  liElemt.addEventListener('mouseleave', () => {
    const editBtn = liElemt.querySelector("[data-toggle='modal']");
    editBtn.classList.add('d-none');
    editBtn.classList.remove('d-inline');
  });
  liElemt.querySelector('.expand-btn').addEventListener('click', function expandBtn() {
    const indexOfTask = parseInt(this.parentElement.previousElementSibling.getAttribute('data') - 1, 10);
    const { name } = mainProjects.projectsArr[projectId].tasksArr[indexOfTask];
    const { description } = mainProjects.projectsArr[projectId].tasksArr[indexOfTask];
    const { date } = mainProjects.projectsArr[projectId].tasksArr[indexOfTask];
    fillEditTaskForm(indexOfTask, name, description, 'low', date);
  });
  return liElemt;
}
addEventListenerToEditTaskForm();

function renderTask(arr, taskName) {
  const tasksParent = document.querySelector('.task-items-cont');
  tasksParent.innerHTML = '';
  let indexCounter = 0;
  arr.forEach(element => {
    indexCounter += 1;
    const listItemToDom = taskItemCreator(indexCounter, element.name, element.completed);
    tasksParent.appendChild(listItemToDom);
  });
  document.querySelector('#projectName').innerText = taskName.charAt(0).toUpperCase() + taskName.slice(1);
  return arr.length;
}

function createProjectElement(project, index) {
  const projectLi = document.createElement('li');
  projectLi.className = 'projects-item  d-sm-flex justify-content-between px-1 px-sm-4  py-2';
  const a = document.createAttribute('data');
  a.value = index;
  projectLi.setAttributeNode(a);
  projectLi.innerHTML = `<div>${project.taskName.charAt(0).toUpperCase() + project.taskName.slice(1)} <span class="d-inline-block rounded-circle  bg-grey">${project.tasksArr.length}</span></div><button class='btn btn-link trash p-0' ><i id='trashProject' class=" d-none far fa-trash-alt float-right trash"></i>`;
  projectLi.addEventListener('mouseenter', function showTrash() { this.lastElementChild.lastElementChild.classList.add('d-inline'); });
  projectLi.addEventListener('mouseleave', function hideTrash() { this.lastElementChild.lastElementChild.classList.remove('d-inline'); });

  projectLi.addEventListener('click', function renderProjectArea() {
    projectId = this.getAttribute('data');
    renderProjects(mainProjects.projectsArr);
    renderTask(
      mainProjects.projectsArr[projectId].tasksArr,
      mainProjects.projectsArr[projectId].taskName,
    );
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  });
  projectLi.lastElementChild.addEventListener('click', function runderAfterRemove() {
    mainProjects.removeProject(this.parentElement.getAttribute('data'));
    if (mainProjects.projectsArr[0]) {
      renderProjects(mainProjects.projectsArr);
      renderTask(
        mainProjects.projectsArr[0].tasksArr,
        mainProjects.projectsArr[0].taskName,
      );
    }
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));

    projectId = 0;
  });
  return projectLi;
}

function renderProjects(arr) {
  let projectsList = document.querySelector('.projects-list');
  projectsList.innerHTML = '';
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
  document.querySelector('#addTaskId').addEventListener('submit', function findSubmitOfTask(e) {
    e.preventDefault();
    mainProjects.projectsArr[projectId].addTask(this.children[0].value);
    this.children[0].value = '';
    renderTask(
      mainProjects.projectsArr[projectId].tasksArr,
      mainProjects.projectsArr[projectId].taskName,
    );
    renderProjects(mainProjects.projectsArr);
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));

    document.querySelector('.task-items-cont').lastChild.classList.add('animate-in');
  });
}

function addEventListenerToProjectsForm() {
  document.querySelector('#addProjectId').addEventListener('submit', function findSubmitOfProject(e) {
    e.preventDefault();
    mainProjects.addProject(this.children[0].value);
    this.children[0].value = '';
    renderProjects(mainProjects.projectsArr);
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  });
}

function fillEditTaskForm(indexOfTask, title, description, priority, date) {
  const editTaskForm = document.querySelector('#task-form');
  const taskIdSpan = editTaskForm.querySelector('span');
  const titleInput = editTaskForm.querySelector('#list-title');
  const descriptionInput = editTaskForm.querySelector('#list-description');
  const dateInput = editTaskForm.querySelector('#list-date');
  taskIdSpan.innerText = indexOfTask;
  titleInput.value = title;
  descriptionInput.value = description;
  dateInput.value = date;
}

renderTask(
  mainProjects.projectsArr[projectId].tasksArr,
  mainProjects.projectsArr[projectId].taskName,
);
renderProjects(mainProjects.projectsArr);
addEventListenerToTasksForm();
addEventListenerToProjectsForm();