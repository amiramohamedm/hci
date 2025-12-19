import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import { TaskStatus } from "../utils/task_status";
import { getAllTasks, getProjectTasks, saveAllTasks, updateTaskLocal } from "../utils/crud_operations";

function ProjectTasks({searchTerm}) {
  const { id, name } = useParams();
  const projectId = id;
  const projectName = name ? decodeURIComponent(name) : "Project";

  const [groups, setGroups] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

 useEffect(() => {
   const fetchTasks = async () => {
     console.log(`Project id ${projectId}`);
     
     const filtered = getProjectTasks(projectId);

     const grouped = {
       todo: filtered.filter((t) => t.status === TaskStatus.todo),
       inprogress: filtered.filter((t) => t.status === TaskStatus.inprogress),
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

  const moveTask = (taskId, fromColumn, toColumn) => {
    if (!toColumn) return;
      const updatedAllTasks = updateTaskLocal(taskId, toColumn);
  const filtered = updatedAllTasks.filter((t) => t.projectId === projectId);

     const grouped = {
       todo: filtered.filter((t) => t.status === TaskStatus.todo),
       inprogress: filtered.filter((t) => t.status === TaskStatus.inprogress),
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

  // 🔹 1. جلب كل المهام من localStorage
  const allTasks = getAllTasks();

  // 🔹 2. حذف المهمة المطلوبة
  const updatedAllTasks = allTasks.filter((t) => t.id !== taskId);

  // 🔹 3. حفظ التغييرات في localStorage
  saveAllTasks(updatedAllTasks);

  // 🔹 4. تحديث الـ state لمجموعة الأعمدة للمشروع الحالي
  const filtered = updatedAllTasks.filter((t) => t.projectId === projectId);

  const grouped = {
    todo: filtered.filter((t) => t.status === TaskStatus.todo),
    inprogress: filtered.filter((t) => t.status === TaskStatus.inprogress),
    done: filtered.filter((t) => t.status === TaskStatus.done),
  };

  setGroups(grouped);
};

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn && source.index === destination.index)
      return;

    // if (sourceColumn === destColumn) {
    //   const tasks = Array.from(groups[sourceColumn]);
    //   const [movedTask] = tasks.splice(source.index, 1);
    //   tasks.splice(destination.index, 0, movedTask);
    //   const newGroups = { ...groups, [sourceColumn]: tasks };
    //   setGroups(newGroups);
    //   updateLocalStorage(newGroups);
    //   return;
    // }
    if (sourceColumn === destColumn && source.index === destination.index)
      return;

    const movedTask = groups[sourceColumn][source.index];
    moveTask(movedTask.id, sourceColumn, destColumn);
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
            columnKey={TaskStatus.inprogress}
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
