// import run from './scripts/app.js';
import {addEventListenerToTasksForm, addEventListenerToProjectsForm} from './scripts/render'
import {default as projectFact} from './scripts/project'
import taskFact, {default as tastkFact} from './scripts/tasks'

import 'bootstrap';
import './styles/style.scss';
import 'bootstrap/js/dist/dropdown';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// let projectId = 0;

addEventListenerToTasksForm();
addEventListenerToProjectsForm();

// project area
let mainProjects = projectFact();

if (localStorage.getItem('project')) {
  console.log('---------------restored json----------------');
  console.log(JSON.parse(localStorage.getItem('project')));
  console.log('-------------------------------');
  let restoredProjectArr = JSON.parse(localStorage.getItem('project'));
//   let workingTasks = restoredProjects.projectsArr.forEach(taskCard => {
//     return tastkFact(taskCard.taskName, taskCard.tasksArr)
//   });
  let restoredProjectArrWithFunction = restoredProjectArr.map(taskObject => {
    return taskFact(taskObject.taskName, taskObject.tasksArr)
  });
//   restoredProjects.projectsArr = workingTasks;
//   mainProjects = restoredProjects;
console.log('----saved-restored json---------');
console.log(restoredProjectArrWithFunction);
console.log('-------------------------------');
  let mainProjectsWithFunctions = projectFact(restoredProjectArrWithFunction );
  console.log('----mainProjectsWithFunctions---------');
  console.log(mainProjectsWithFunctions);
  console.log('------------------------------------------');
  mainProjects = mainProjectsWithFunctions;
}
// localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
// Then to retrieve it from the store and convert to an object again:

mainProjects.renderPage(mainProjects.projectsArr);
export {mainProjects};
