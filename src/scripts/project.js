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
    // if (projectId) {console.log('true')}else {console.log('false')}

    renderTask(this.projectsArr[projectId].tasksArr, this.projectsArr[projectId].taskName);
    
  }

  function removeProject(index) {
    projectsArr.splice(index, 1);
    projectId--;
    if (projectId) {console.log('the selectedProjectId is:' + projectId)}else {console.log('false')}
    console.log(projectsArr);
    console.log(projectsArr);
    renderProjects(projectsArr);
    if (projectsArr>0){renderTask(projectsArr[0].tasksArr, projectsArr[0].taskName)};
  }

  function renderPage(testArr) {
    console.log(testArr[projectId].taskName);
    renderProjects(testArr);
    renderTask(testArr[projectId].tasksArr, testArr[projectId].taskName);
  }
  return { removeProject, addProject, projectsArr , renderPage}
}