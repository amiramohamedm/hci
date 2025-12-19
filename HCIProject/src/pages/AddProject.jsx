import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addProject } from "../utils/crud_operations";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Project title is required!");
      return;
    }

    const newProject = {
      id: uuidv4(),
      name: title,
      description: description || "No description",
    };


    addProject(newProject);
    // إضافة المشروع للحالة
    // setProjects([...projects, newProject]);
    
    // رجوع للـ Dashboard
    navigate("/");
  };

  return (
    <div className="add-form-container">
      <h2 className="form-header">Create New Project</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description (optional)"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;