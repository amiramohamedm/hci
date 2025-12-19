import { Link } from "react-router-dom";


export default function ProjectCard({ project }) {
    console.log(`ProjectCard id = ${project.id}`);
    
    return (
        <Link to={`/project/${project.id}`}  className="placeholder-card">{project.name}
                </Link>
    );
}