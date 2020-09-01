import { renderProjects, renderTask, mainProjects } from './render';

export default function taskFact(projectName, restoredArr = null) {
  const taskName = projectName;
  let tasksArr = [];
  if (restoredArr) { tasksArr = restoredArr; }

  const addTask = (name) => {
    if (name.length < 1) { return; }
    const newTask = {
      name,
      completed: false,
    };
    tasksArr.push(newTask);
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  };

  const render = function render() {
    renderTask(this.tasksArr, taskName);
  };

  const removeTask = function removeTask(index) {
    this.tasksArr.splice(index, 1);
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  };

  const toggleComplete = function completeTask(index) {
    this.tasksArr[index].completed = !this.tasksArr[index].completed;
    renderProjects(mainProjects.projectsArr);
    renderTask(this.tasksArr, taskName);
    localStorage.setItem('project', JSON.stringify(mainProjects.projectsArr));
  };
  return {
    taskName, tasksArr, addTask, removeTask, render, toggleComplete,
  };
}
