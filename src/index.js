// import run from './scripts/app.js';
import {addEventListenerToTasksForm, addEventListenerToProjectsForm} from './scripts/render'
import {default as projectFact} from './scripts/project'

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
mainProjects.renderPage(mainProjects.projectsArr);
export {mainProjects};