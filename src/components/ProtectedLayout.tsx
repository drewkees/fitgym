import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GymLayout } from "@/components/GymLayout";

export function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <GymLayout />;
}