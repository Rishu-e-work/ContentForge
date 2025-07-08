import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "@/components/HeroSection";
import ToolGrid from "@/components/ToolGrid";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToolSelect = (toolId: string) => {
    if (user) {
      navigate(`/tool/${toolId}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />  
      <ToolGrid onToolSelect={handleToolSelect} />
    </div>
  );
};

export default Index;
