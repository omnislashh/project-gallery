import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { Project } from "../types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useVoteSystem } from "../hooks/useVoteSystem";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { voteForProject, hasVoted } = useVoteSystem();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      const ref = doc(db, "projects", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setProject({
          id: snapshot.id,
          ...(snapshot.data() as Omit<Project, "id">),
        } as Project);
      }
    };
    fetchProject();
  }, [id]);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );

  const voted = hasVoted(project.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="mb-4 text-gray-300">{project.description}</p>

          {/* 🌐 Bouton Visit ajouté ici */}
          {project.externalLink && (
            <a
              href={
                project.externalLink && project.externalLink.startsWith("http")
                  ? project.externalLink
                  : `https://${project.externalLink}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition mb-6"
            >
              🌐 Visit
            </a>
          )}

          {project.category === "code" && project.codeSnippet && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Technical snippet
              </h3>
              <div className="rounded-lg overflow-hidden border border-gray-700 shadow-inner">
                <SyntaxHighlighter
                  language="tsx"
                  style={oneDark}
                  wrapLines
                  wrapLongLines
                  className="max-h-96 overflow-auto text-sm font-mono"
                >
                  {project.codeSnippet.trim()}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => voteForProject(project.id)}
              disabled={voted}
              className={`px-4 py-2 rounded transition ${
                voted
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              👍 {project.votes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
