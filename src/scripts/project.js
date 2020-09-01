import { renderProjects, renderTask, projectId } from './render';
import { default as taskFact } from './tasks';

export default function projectFact(arr = null) {
  let projectsArr = [taskFact('simple')];
  if (arr) { projectsArr = arr; }
  function addProject(name) {
    if (name.length < 1) { return; }
    const project = taskFact(name);
    projectsArr.push(project);
    renderProjects(projectsArr);
    renderTask(this.projectsArr[projectId].tasksArr, this.projectsArr[projectId].taskName);
  }

  function removeProject(index) {
    projectsArr.splice(index, 1);
    projectId -= 1;
    renderProjects(projectsArr);
    if (projectsArr > 0) { renderTask(projectsArr[0].tasksArr, projectsArr[0].taskName); }
    localStorage.setItem('project', JSON.stringify(projectsArr));
  }

  function renderPage(testArr) {
    renderProjects(testArr);
    if (testArr[projectId]) {
      renderTask(testArr[projectId].tasksArr, testArr[projectId].taskName);
    }
  }
  return {
    removeProject, addProject, projectsArr, renderPage,
  };
}
