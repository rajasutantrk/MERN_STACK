import { useState } from "react";

function Projects() {
  const [showDesc, setShowDesc] = useState(false);

  const projects = [
    { name: "Portfolio Website", desc: "A personal portfolio built with React." },
    { name: "Todo App", desc: "Task management app with React Hooks." },
    { name: "Weather App", desc: "Displays live weather using API." }
  ];

  return (
    <section style={{ padding: "40px" }}>
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div key={index} style={cardStyle}>
          <h3>{project.name}</h3>

          {showDesc && <p>{project.desc}</p>} {/* Conditional Rendering */}

          <button onClick={() => setShowDesc(!showDesc)}>
            {showDesc ? "Show Less" : "Show More"}
          </button>
        </div>
      ))}
    </section>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "8px"
};

export default Projects;