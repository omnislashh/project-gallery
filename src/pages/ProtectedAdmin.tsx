import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";

export default function ProtectedAdmin() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthorized(false);
        return;
      }

      const tokenResult = await user.getIdTokenResult(true);

      if (tokenResult.claims.admin) {
        setAuthorized(true);
      } else {
        alert("⛔ You are not an admin");
        navigate("/");
        setAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (authorized === null)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Checking permissions...
      </div>
    );

  if (!authorized) return <AdminLogin />;

  return <Admin />;
}
