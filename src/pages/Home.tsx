import { useState } from "react";
import { useProjects } from "../context/ProjectsContext";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { projects } = useProjects();
  const [showCV, setShowCV] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex flex-col items-center py-8">
        <img
          src="/elk_logo_black copie.jpg"
          alt="Logo"
          className="h-32 w-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">Project Gallery</h1>
        <p className="text-gray-400 max-w-xl text-center mb-6">
          Explore creative works — from design to code.  
          Vote for your favorites and discover new ideas!
        </p>

        <button
          onClick={() => setShowCV(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition"
        >
          View CV
        </button>
      </header>

      {/* Gallery */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </main>

      {/* CV Modal */}
      {showCV && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-5xl relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowCV(false)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              ✕ Close
            </button>

            {/* PDF Viewer */}
            <iframe
              src="/cv.pdf"
              title="CV"
              className="w-full h-[80vh] rounded-b-xl"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
