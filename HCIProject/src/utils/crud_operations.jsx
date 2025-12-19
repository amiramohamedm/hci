// src/utils/taskStorage.jsx

export const fetchAndStoreProjects = async() => {
  try{
  const response = await fetch('https://6945bae4ed253f51719c2e54.mockapi.io/api/v1/projects');
  if(!response.ok)
    throw new Error('cannot fetch data from the API');
  const data = await response.json();
  localStorage.setItem("projects", JSON.stringify(data));

    return data;
} catch (error) {
    console.error("Error fetching projects from MockAPI:", error);
    return [];
}};
export function getAllTasks () {
  try {
    const data = localStorage.getItem("tasks");
    console.log(`Data  ${data}`);
    console.log("Type of data:", typeof data); // يطبع نوع المتغير

    const returnedData = data ? JSON.parse(data) : [];
    console.log("Type of data:", typeof returnedData); // يطبع نوع المتغير
    console.log(Array.isArray(returnedData)); // true (لأنها مصفوفة)
    

    return Array.isArray(returnedData) ? returnedData : [];
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
  // 1️⃣ Add to tasks array
  const allTasks = getAllTasks();
  saveAllTasks([...allTasks, newTask]);

  // 2️⃣ Add to the project's tasks array
  const allProjects = getAllProjects();
  const updatedProjects = allProjects.map(project => {
    if (project.id === newTask.projectId) {
      return {
        ...project,
        tasks: [...(project.tasks || []), newTask]
      };
    }
    return project;
  });
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
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
  // 1️⃣ Update tasks array
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = allTasks.map((task) =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // 2️⃣ Update the task inside its project
  const allProjects = getAllProjects();
  const updatedProjects = allProjects.map(project => {
    if (project.tasks && project.tasks.some(t => t.id === taskId)) {
      return {
        ...project,
        tasks: project.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      };
    }
    return project;
  });
  localStorage.setItem("projects", JSON.stringify(updatedProjects));

  return updatedTasks;
};
