// App.jsx
import React, { useState, useEffect } from 'react';
import { portfolio } from "../../declarations/portfolio";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const result = await portfolio.getAllProjects();
      setProjects(result);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const technologies = newProject.technologies.split(',').map(tech => tech.trim());
      await portfolio.addProject(
        newProject.title,
        newProject.description,
        technologies,
        newProject.imageUrl
      );
      await loadProjects();
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
      
      {/* Add Project Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={newProject.technologies}
            onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.imageUrl}
            onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Project
          </button>
        </div>
      </form>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded p-4">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;