// src/utils/taskStorage.jsx
export const getAllTasks = () => {
  try {
    const data = localStorage.getItem("tasks");
    console.log(data);
    return data ? JSON.parse(data) : [];
    
  } catch (error) {
    console.error("Error parsing projects from localStorage:", error);
    localStorage.removeItem("tasks"); // remove corrupted data
    return [];
  }
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

export const addTaskLocal = (newTask) => {
  var allTasks = getAllTasks();
  
      allTasks = [...allTasks, newTask];
  
      saveAllTasks(allTasks);
};


export const getAllProjects = () => {
  try {
    const data = localStorage.getItem("projects");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing projects from localStorage:", error);
    localStorage.removeItem("projects"); // remove corrupted data
    return [];
  }
};


export const addProject = (newProject) => {
  var allProjects = getAllProjects();
  allProjects = [...allProjects, newProject];

  localStorage.setItem("projects", JSON.stringify(allProjects)); // save as JSON
};

