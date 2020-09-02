
export default function taskFact(projectName, restoredArr = null) {
  const taskName = projectName;
  let tasksArr = [];
  if (restoredArr) { tasksArr = restoredArr; }

  const addTask = (name) => {
    if (name.length < 1) { return; }
    const newTask = {
      name,
      description: null,
      priority: 1,
      date: null,
      completed: false,
    };
    tasksArr.push(newTask);
  };

  const editTask = (index, name, description, date, priority) => {
    const editedTask = {
      name,
      description: description || null,
      priority: priority || null,
      date: date || null,
      completed: false,
    };
    tasksArr[index] = editedTask;
  };

  const removeTask = function removeTask(index) {
    this.tasksArr.splice(index, 1);
  };

  const toggleComplete = function completeTask(index) {
    this.tasksArr[index].completed = !this.tasksArr[index].completed;
  };
  return {
    taskName, tasksArr, addTask, removeTask, toggleComplete, editTask,
  };
}
