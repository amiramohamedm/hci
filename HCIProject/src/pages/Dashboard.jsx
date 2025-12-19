import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects ,fetchAndStoreProjects} from "../utils/crud_operations";

function Dashboard({ searchTerm }) {
  const [projects, setProjects] = useState([]);

useEffect(() => {
  const loadProjects = async () => {
    let allProjects = getAllProjects();
    console.log("Projects from localStorage:", allProjects);

    if (allProjects.length === 0) {
      console.log("Fetching from MockAPI...");
      allProjects = await fetchAndStoreProjects();
      console.log("Projects fetched:", allProjects);
    }

    setProjects(allProjects);
  };

  loadProjects();
}, []);
  // فلترة المشاريع حسب searchTerm
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Your Projects</h2>
      </header>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <Link to="/add-project" className="placeholder-card add-new">
          + Create New Project
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
