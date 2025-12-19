import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects } from "../utils/crud_operations";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects when component mounts
    async function fetchProjects () {
      try {
        const data = await getAllProjects(); // call the async function
        setProjects(data); // set the state with the fetched projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

      fetchProjects();
  }, []); // empty dependency array = runs once on mount

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Your Projects</h2>
      </header>

      
      <div className="projects-grid">
        
        {projects.map((project) => (
        
          <ProjectCard key={project.id} project={project} />
        ))}

        <Link to="/add-project" className="placeholder-card add-new">
          Create New Board
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;