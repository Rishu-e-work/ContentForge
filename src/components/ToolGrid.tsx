import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Video, 
  Music, 
  Megaphone, 
  Share2, 
  BookOpen,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  category: string;
}

const tools: Tool[] = [
  {
    id: "content-generator",
    title: "Content Generator",
    description: "Generate blog posts, articles, and SEO-optimized content for any topic",
    icon: FileText,
    gradient: "bg-gradient-primary",
    category: "Writing"
  },
  {
    id: "script-generator", 
    title: "Script Generator",
    description: "Create engaging YouTube video scripts with intro, body, and outro sections",
    icon: Video,
    gradient: "bg-gradient-primary",
    category: "Video"
  },
  {
    id: "rap-generator",
    title: "Rap Generator", 
    description: "AI-powered rap lyrics with verses, chorus, and customizable style",
    icon: Music,
    gradient: "bg-gradient-primary",
    category: "Music"
  },
  {
    id: "ad-copy-generator",
    title: "Ad Copy Generator",
    description: "Create compelling ad copy for Google, Facebook, and Instagram campaigns",
    icon: Megaphone,
    gradient: "bg-gradient-primary",
    category: "Marketing"
  },
  {
    id: "social-media-generator",
    title: "Social Media Generator",
    description: "Optimize posts for Twitter, LinkedIn, Instagram with platform-specific formatting",
    icon: Share2,
    gradient: "bg-gradient-primary",
    category: "Social"
  },
  {
    id: "story-generator",
    title: "Story Generator",
    description: "Generate creative story ideas, character concepts, and scene outlines",
    icon: BookOpen,
    gradient: "bg-gradient-primary",
    category: "Creative"
  }
];

interface ToolGridProps {
  onToolSelect: (toolId: string) => void;
}

const ToolGrid = ({ onToolSelect }: ToolGridProps) => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your AI Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our suite of powerful AI-driven content generation tools, 
            each designed for specific creative needs.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className="group hover:shadow-elevated transition-all duration-300 hover:transform hover:scale-105 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm"
              onClick={() => onToolSelect(tool.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${tool.gradient} flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {tool.description}
                </CardDescription>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 group/btn"
                >
                  Try This Tool
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to revolutionize your content creation process?
          </p>
          <Link to="/signup">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;