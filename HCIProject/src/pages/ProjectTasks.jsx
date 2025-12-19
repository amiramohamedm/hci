import {useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import  {TaskStatus}  from "../utils/task_status";

function ProjectTasks() {
  //* projectId, projectName
  const { id, name } = useParams();
  const projectId = id;
  const projectName = name ? decodeURIComponent(name) : "Project";

  const [groups, setGroups] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/tasks?projectId=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        // data هو already grouped object
        setGroups({
          todo: data.todo || [],
          inprogress: data.inprogress || [],
          done: data.done || [],
        });
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
        setGroups({ todo: [], inprogress: [], done: [] });
      });
  }, [projectId]);

  const mapColumnToStatus = (columnKey) => {
    switch (columnKey) {
      case TaskStatus.todo:
        return TaskStatus.todo;
      case TaskStatus.inprogress:
        return TaskStatus.inprogress;
      case TaskStatus.done:
        return TaskStatus.done;
      default:
        return "";
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${taskId}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update task status statusCode ${response} `);
    }

    return response.json();
  };

  const moveTask = async (taskId, fromColumn, toColumn) => {
    if (!toColumn) return;

    const newStatus = mapColumnToStatus(toColumn);

    try {
      // 🔹 POST request
      await updateTaskStatus(taskId, newStatus);

      // 🔹 Update UI only if request succeeds
      setGroups((prev) => {
        const task = prev[fromColumn].find((t) => t._id === taskId);
        if (!task) return prev;

        const updatedTask = { ...task, status: newStatus };

        return {
          ...prev,
          [fromColumn]: prev[fromColumn].filter((t) => t._id !== taskId),
          [toColumn]: [...prev[toColumn], updatedTask],
        };
      });
    } catch (error) {
      console.error(error);
      alert("Failed to move task");
    }
  };

  const deleteTaskRequest = async (taskId) => {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  };

  const deleteTask = async (taskId, fromColumn) => {
    try {
      if (!window.confirm("Are you sure you want to delete this task?")) return;

      //  DELETE request
      await deleteTaskRequest(taskId);

      //  Update UI after success
      setGroups((prev) => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter((t) => t._id !== taskId),
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn && source.index === destination.index) {
      return;
    }

    // إعادة ترتيب داخل نفس العمود
    if (sourceColumn === destColumn) {
      setGroups((prev) => {
        const tasks = Array.from(prev[sourceColumn]);
        const [movedTask] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, movedTask);

        return {
          ...prev,
          [sourceColumn]: tasks,
        };
      });
      return;
    }

    //  نقل بين أعمدة مختلفة
    const movedTask = groups[sourceColumn][source.index];

    const newStatus = mapColumnToStatus(destColumn);

    try {
      //  API request
      await updateTaskStatus(movedTask._id || movedTask._id, newStatus);

      // Update UI
      setGroups((prev) => {
        const sourceTasks = Array.from(prev[sourceColumn]);
        sourceTasks.splice(source.index, 1);

        const destTasks = Array.from(prev[destColumn]);
        destTasks.splice(destination.index, 0, {
          ...movedTask,
          status: newStatus,
        });

        return {
          ...prev,
          [sourceColumn]: sourceTasks,
          [destColumn]: destTasks,
        };
      });
    } catch (error) {
      console.error(error);
      alert("Failed to move task");
    }
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
            tasks={groups.todo}
            columnKey="todo"
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column
            title="In Progress"
            tasks={groups.inprogress}
            columnKey="inprogress"
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column
            title="Done"
            tasks={groups.done}
            columnKey="done"
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        </div>
      </DragDropContext>
    </>
  );
}

export default ProjectTasks;
