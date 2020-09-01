import { addEventListenerToTasksForm, addEventListenerToProjectsForm } from './scripts/render';
import { default as projectFact } from './scripts/project';
import { default as taskFact } from './scripts/tasks';

import 'bootstrap';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

// let projectId = 0;

addEventListenerToTasksForm();
addEventListenerToProjectsForm();

// project area
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

mainProjects.renderPage(mainProjects.projectsArr);
export { mainProjects };
