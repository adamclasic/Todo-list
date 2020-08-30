import {renderProjects, renderTask, projectId} from './render'
import {default as taskFact} from './tasks'

export default function projectFact() {
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

  function renderPage(testArr) {
    console.log(testArr[projectId].taskName);
    renderProjects(testArr);
    renderTask(testArr[projectId].tasksArr, testArr[projectId].taskName);
  }
  return { removeProject, addProject, projectsArr , renderPage}
}