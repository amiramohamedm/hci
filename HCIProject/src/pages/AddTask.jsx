import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatus } from "../utils/task_status";

function AddTask() {
  const {projectId} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatus.todo);
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    if (!projectId) {
      alert("Please select a project!");
      return;
    }

    // هنا الداتا كلها بتتبعت معًا، بما فيها projectId
    const newTask = {
      title,
      description,
      projectId: projectId,
      status,
    };

    const response = await fetch("http://localhost:3000/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!(response.status == 200 || response.status == 201)) {
        throw new Error("Failed to add task");
      }
      const data = await response.json();
      console.log("Task added:", data);
      console.log("New Task Submitted:", newTask);

      navigate(`/project/${projectId}`);


        

    // اختياري: إعادة تعيين النموذج بعد الإضافة
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.todo);
  };

  return (
    <div className="add-form-container">
      <h2 className="form-header">Add New Task</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title <span className="required">*</span></label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Task Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Initial Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={TaskStatus.todo}>To Do</option>
            <option value={TaskStatus.inprogress}>In Progress</option>
            <option value={TaskStatus.done}>Done</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit" >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;