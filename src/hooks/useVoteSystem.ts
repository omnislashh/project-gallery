import { useEffect, useState } from "react";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const STORAGE_KEY = "project-gallery:votedProjects";

export function useVoteSystem() {
  const [votedProjects, setVotedProjects] = useState<string[]>([]);

  // Charger les votes locaux
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setVotedProjects(parsed);
    } catch {
      setVotedProjects([]);
    }
  }, []);

  const hasVoted = (id: string) => votedProjects.includes(String(id));

  const addLocalVote = (id: string) => {
    const next = [...votedProjects, String(id)];
    setVotedProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  // Fonction principale de vote
  const voteForProject = async (projectId: string) => {
    if (hasVoted(projectId)) {
      alert("🚫 Tu as déjà voté pour ce projet !");
      return;
    }

    try {
      const ref = doc(db, "projects", projectId);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Projet introuvable");

        console.log("Vote pour :", projectId); 
        console.log("Doc ref :", ref.path); 
        console.log("Snapshot existe ?", snap.exists()); 
        console.log("Data :", snap.data());

      await updateDoc(ref, { votes: increment(1) });
      addLocalVote(projectId);
      console.log(`✅ Vote ajouté pour ${projectId}`);
    } catch (err) {
      console.error("Erreur lors du vote:", err);
      alert("❌ Erreur lors du vote");
    }
  };

  return { votedProjects, hasVoted, voteForProject };
}
