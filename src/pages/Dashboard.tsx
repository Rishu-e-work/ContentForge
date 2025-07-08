import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import {
  FileText,
  Video,
  Music,
  Megaphone,
  Share2,
  BookOpen,
  Plus,
  Clock,
  Trash2
} from 'lucide-react';

interface Generation {
  id: string;
  tool_type: string;
  input: any;
  output: string;
  created_at: string;
}

interface Profile {
  tier: 'free' | 'pro';
  full_name: string;
}

const tools = [
  { id: "content-generator", title: "Content Generator", icon: FileText, gradient: "bg-gradient-primary" },
  { id: "script-generator", title: "Script Generator", icon: Video, gradient: "bg-gradient-secondary" },
  { id: "rap-generator", title: "Rap Generator", icon: Music, gradient: "bg-gradient-primary" },
  { id: "ad-copy-generator", title: "Ad Copy Generator", icon: Megaphone, gradient: "bg-gradient-secondary" },
  { id: "social-media-generator", title: "Social Media Generator", icon: Share2, gradient: "bg-gradient-primary" },
  { id: "story-generator", title: "Story Generator", icon: BookOpen, gradient: "bg-gradient-secondary" }
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    if (user) fetchUserData();
    else setLoading(false);
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    try {
      const { data: profileData, error: pe } = await supabase
        .from('profiles')
        .select('tier, full_name')
        .eq('user_id', user.id)
        .single();
      if (pe) throw pe;
      setProfile(profileData as Profile);

      const { data: gens, error: ge } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (ge) throw ge;
      setGenerations(gens || []);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteGeneration = async (id: string) => {
    try {
      const { error } = await supabase.from('generations').delete().eq('id', id);
      if (error) throw error;
      setGenerations(g => g.filter(x => x.id !== id));
      toast({ title: "Deleted", description: "Generation deleted" });
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Delete failed", variant: "destructive" });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getToolConfig = (tt: string) => {
    return tools.find(t => t.id === tt) || tools[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Start Creating Amazing Content
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators using AI to generate blog posts, scripts, social media content, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/50">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map(tool => (
              <Card key={tool.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elevated transition">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg ${tool.gradient} flex items-center justify-center`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">Create with AI</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-card/30 backdrop-blur-sm rounded-xl border-border/50">
            <h3 className="text-2xl font-bold mb-4">Why Choose AI ContentForge?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                ["🚀 Lightning Fast", "Generate high-quality content in seconds, not hours"],
                ["🎯 6 Powerful Tools", "Everything from blog posts to rap lyrics"],
                ["💡 Easy to Use", "Designed for creators of all skill levels"]
              ].map(([h, desc]) => (
                <div key={h}>
                  <h4 className="font-semibold mb-2">{h}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'Creator'}!</h1>
            <p className="text-muted-foreground">Continue creating amazing content with AI</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={profile?.tier === 'pro' ? 'default' : 'secondary'} className={profile?.tier === 'pro' ? 'bg-gradient-primary' : ''}>
              {profile?.tier === 'pro' ? 'PRO' : 'FREE'} Plan
            </Badge>
            {profile?.tier === 'free' && (
              <Link to="/pricing">
                <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map(tool => (
              <Link key={tool.id} to={`/tool/${tool.id}`}>
                <Card className="group hover:shadow-elevated hover:scale-105 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${tool.gradient} flex items-center justify-center group-hover:shadow-glow`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Generations</h2>
            {generations.length === 0 && <p className="text-muted-foreground text-sm">No content generated yet</p>}
          </div>

          <div className="grid gap-4">
            {generations.map(gen => {
              const cfg = getToolConfig(gen.tool_type);
              const expanded = expandedIds.includes(gen.id);
              return (
                <Card key={gen.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${cfg.gradient} flex items-center justify-center`}>
                          <cfg.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{cfg.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {new Date(gen.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/tool/${gen.tool_type}`}>
                          <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4 mr-2" />Create Similar
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => deleteGeneration(gen.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className={`text-sm text-foreground whitespace-pre-wrap ${!expanded ? 'line-clamp-3' : ''}`}>
                        {gen.output}
                      </p>
                      <Button variant="ghost" size="sm" onClick={() => toggleExpanded(gen.id)} className="mt-2 text-primary hover:underline">
                        {expanded ? 'Show Less' : 'Show More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
