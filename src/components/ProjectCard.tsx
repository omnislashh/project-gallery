import { useProjects } from "../context/ProjectsContext";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  const { vote } = useProjects();
  const navigate = useNavigate();

  const handleVote = async (e?: React.MouseEvent) => {
    e?.stopPropagation(); // pour la card
    await vote(project.id);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow cursor-pointer hover:scale-105 transition transform"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
        <p className="text-gray-300 mb-2 line-clamp-3">{project.description}</p>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleVote}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            👍 {project.votes}
          </button>

          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              Visit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
