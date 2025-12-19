import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import { TaskStatus } from "../utils/task_status";
import { getAllTasks, getAllProjects, saveAllTasks, updateTaskLocal } from "../utils/crud_operations";

function ProjectTasks({searchTerm}) {
  const { id } = useParams();
  const projectId = id;
  const project = getAllProjects().find(p => p.id === projectId);
  const projectName = project?.name || "Project";
  const [groups, setGroups] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

 useEffect(() => {
   const fetchTasks = async () => {
     console.log(`Project id ${projectId}`);
     const project = getAllProjects().find(p => p.id === projectId);
     console.log(`Project fetched: ${JSON.stringify(project)}`);
     const filtered = project?.tasks || [];

     const grouped = {
       todo: filtered.filter((t) => t.status === TaskStatus.todo),
       inprogress: filtered.filter((t) => t.status === TaskStatus.inProgress),
       done: filtered.filter((t) => t.status === TaskStatus.done),
     };

     setGroups(grouped);
   };

   fetchTasks();
 }, [projectId]);


  // const updateLocalStorage = (newGroups) => {
  //   const allTasks = [
  //     ...newGroups.todo,
  //     ...newGroups.inprogress,
  //     ...newGroups.done,
  //   ];
  //   localStorage.setItem("tasks", JSON.stringify(allTasks));
  // };

const moveTask = (taskId, toStatus) => {
  if (!toStatus) return;

  // 1️⃣ Update task status in both localStorage locations
  updateTaskLocal(taskId, toStatus);

  // 2️⃣ Re-fetch the UPDATED project (not just tasks)
  const allProjects = getAllProjects();
  const updatedProject = allProjects.find(p => p.id === projectId);
  
  // 3️⃣ Filter only this project's tasks from the project object
  const filtered = updatedProject?.tasks || [];

  // 4️⃣ Regroup
  const grouped = {
    todo: filtered.filter((t) => t.status === TaskStatus.todo),
    inprogress: filtered.filter((t) => t.status === TaskStatus.inProgress),
    done: filtered.filter((t) => t.status === TaskStatus.done),
  };


  setGroups(grouped);
};

  const filteredGroups = {
    todo: groups.todo.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    inprogress: groups.inprogress.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    done: groups.done.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

const deleteTask = (taskId) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  // 🔹 1. Delete from tasks array
  const allTasks = getAllTasks();
  const updatedAllTasks = allTasks.filter((t) => t.id !== taskId);
  saveAllTasks(updatedAllTasks);

  // 🔹 2. Delete from project
  const allProjects = getAllProjects();
  const updatedProjects = allProjects.map(project => {
    if (project.id === projectId && project.tasks) {
      return {
        ...project,
        tasks: project.tasks.filter(t => t.id !== taskId)
      };
    }
    return project;
  });
  localStorage.setItem("projects", JSON.stringify(updatedProjects));

  // 🔹 3. Re-fetch the UPDATED project (not getAllTasks)
  const updatedProject = updatedProjects.find(p => p.id === projectId);
  const filtered = updatedProject?.tasks || [];

  // 🔹 4. Update UI
  const grouped = {
    todo: filtered.filter((t) => t.status === TaskStatus.todo),
    inprogress: filtered.filter((t) => t.status === TaskStatus.inProgress),
    done: filtered.filter((t) => t.status === TaskStatus.done),
  };
  setGroups(grouped);
};
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
  if (!destination) return;

  const sourceColumn = source.droppableId;
  const destColumn = destination.droppableId;

  if (sourceColumn === destColumn && source.index === destination.index) return;

  const movedTask = groups[sourceColumn][source.index];
  moveTask(movedTask.id, destColumn); 
    // if (sourceColumn === destColumn) {
    //   const tasks = Array.from(groups[sourceColumn]);
    //   const [movedTask] = tasks.splice(source.index, 1);
    //   tasks.splice(destination.index, 0, movedTask);
    //   const newGroups = { ...groups, [sourceColumn]: tasks };
    //   setGroups(newGroups);
    //   updateLocalStorage(newGroups);
    //   return;
    // }

  };

  return (
    <>
      <div className="project-header">
        <h1 className="project-title">{projectName}</h1>
        <Link to={`/add-task/${projectId}`} className="add-task-button">
          + Add Task
        </Link>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board-container">
          <Column
            title="To Do"
            tasks={filteredGroups.todo}
            columnKey={TaskStatus.todo}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column
            title="In Progress"
            tasks={filteredGroups.inprogress}
            columnKey={TaskStatus.inProgress}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column
            title="Done"
            tasks={filteredGroups.done}
            columnKey={TaskStatus.done}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        </div>
      </DragDropContext>
    </>
  );
}

export default ProjectTasks;
