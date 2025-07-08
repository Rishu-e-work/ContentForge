import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8 shadow-card">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by Advanced AI Technology
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-none pb-3">
  AI ContentForge
</h1>




        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
          Create Amazing Content with AI-Powered Tools
        </p>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Generate blog posts, video scripts, rap lyrics, ad copy, social media content, 
          and creative stories with our suite of intelligent content generation tools.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/signup">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6 group"
          >
            Start Creating
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
      </Link>


      
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            View Tools
          </Button>
     
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground text-center">
              Generate high-quality content in seconds, not hours
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">6 Powerful Tools</h3>
            <p className="text-muted-foreground text-center">
              Everything from blog posts to rap lyrics in one platform
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-muted-foreground text-center">
              Simple interface designed for creators of all skill levels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;