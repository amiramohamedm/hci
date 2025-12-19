// src/utils/taskStorage.jsx
export function getAllTasks () {
  try {
    const data = localStorage.getItem("tasks");
    console.log(`Data  ${data}`);
    console.log("Type of data:", typeof data); // يطبع نوع المتغير

    const returnedData = data ? JSON.parse(data) : [];
    console.log("Type of data:", typeof returnedData); // يطبع نوع المتغير
    console.log(Array.isArray(returnedData)); // true (لأنها مصفوفة)
    

    return returnedData;
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
  return allTasks.filter((task) => task.projectId === projectId);
};

export const saveProjectTasks = (projectId, tasks) => {
  const allTasks = getAllTasks();
  allTasks[projectId] = tasks;
  saveAllTasks(allTasks);
};

export const addTaskLocal = (newTask) => {
  const allTasks = getAllTasks();
  console.log(`allTasks : ${allTasks}`);
  
  saveAllTasks([...allTasks, newTask]);
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



export const updateTaskLocal = (taskId, newStatus) => {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTasks = allTasks.map((task) =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
};
