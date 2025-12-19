import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProjectTasks from "./pages/ProjectTasks";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");

  // Sync theme with body classes on mount and when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  const [searchTerm, setSearchTerm] = useState(""); // ← هنا حالة البحث

  // createTask({ projectId: "id", title: "title" });

  return (
    <BrowserRouter>
      <Navbar
        toggleTheme={toggleTheme}
        currentTheme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
          <Route path="/project/:id" element={<ProjectTasks searchTerm={searchTerm}/>} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/add-task/:projectId" element={<AddTask />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;