/* eslint-disable import/no-cycle, import/no-named-default */
import { default as taskFact } from './tasks';

export default function projectFact(arr = null) {
  let projectsArr = [taskFact('simple')];
  if (arr) { projectsArr = arr; }
  function addProject(name) {
    if (name.length < 1) { return; }
    const project = taskFact(name);
    projectsArr.push(project);
  }

  function removeProject(index) {
    projectsArr.splice(index, 1);
  }

  return {
    removeProject, addProject, projectsArr,
  };
}
