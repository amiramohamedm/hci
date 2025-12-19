// src/utils/taskStorage.jsx

export const getAllTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || {};
};

export const saveAllTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getProjectTasks = (projectId) => {
  const allTasks = getAllTasks();
  return allTasks[projectId] || [];
};

export const saveProjectTasks = (projectId, tasks) => {
  const allTasks = getAllTasks();
  allTasks[projectId] = tasks;
  saveAllTasks(allTasks);
};
