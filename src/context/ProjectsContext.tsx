import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Project } from '../types';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  increment,
  getDoc} from "firebase/firestore";

type ContextValue = {
  projects: Project[];
  addProject: (p: Omit<Project, 'id' | 'votes' | 'createdAt'>) => Promise<void>;
  vote: (id: string) => Promise<void>;
};

const ProjectsContext = createContext<ContextValue | undefined>(undefined);

export const ProjectsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Écoute Firestore en temps réel
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const data: Project[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
          votes: Number(doc.data().votes) || 0,
        }));
        // Tri décroissant des votes
        setProjects(data.sort((a, b) => b.votes - a.votes));
      },
      (err) => console.error("Erreur onSnapshot:", err)
    );

    return unsubscribe;
  }, []);

  // Ajouter un projet
  const addProject = async (p: Omit<Project, 'id'|'votes'|'createdAt'>) => {
    try {
      const projectData: any = { ...p, votes: 0, createdAt: serverTimestamp() };
      Object.keys(projectData).forEach(key => {
        if (projectData[key] === undefined) delete projectData[key];
      });
      await addDoc(collection(db, "projects"), projectData);
    } catch (err) {
      console.error("Erreur addProject:", err);
      throw err;
    }
  };

  // Voter pour un projet
  const vote = async (id: string) => {
    try {
      const ref = doc(db, "projects", id);

      // Lis les votes actuels depuis Firestore
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) return;
      console.log("Vote pour :", id);
      console.log("Doc ref :", ref.path);
      console.log("Snapshot existe ?", snapshot.exists());
      console.log("Data :", snapshot.data());

      // Atomic increment côté serveur
      await updateDoc(ref, { votes: increment(1) });

      console.log(`✅ Project ${id} voted!`);
    } catch (err) {
      console.error("Erreur vote:", err);
      alert("Vote failed: " + ((err as any)?.message ?? "Unknown error"));
    }
  };


  return (
    <ProjectsContext.Provider value={{ projects, addProject, vote }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider');
  return ctx;
// (Removed custom getDoc implementation; using Firestore's getDoc)
}

