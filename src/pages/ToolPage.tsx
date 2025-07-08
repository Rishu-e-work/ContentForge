import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ContentGenerator from '@/components/ContentGenerator';
import ScriptGenerator from '@/components/ScriptGenerator';
import RapGenerator from '@/components/RapGenerator';
import AdCopyGenerator from '@/components/AdCopyGenerator';
import SocialMediaGenerator from '@/components/SocialMediaGenerator';
import StoryGenerator from '@/components/StoryGenerator';
import { 
  FileText, 
  Video, 
  Music, 
  Megaphone, 
  Share2, 
  BookOpen 
} from 'lucide-react';

const toolConfigs = {
  'content-generator': {
    title: 'Content Generator',
    icon: FileText,
    gradient: 'bg-gradient-primary',
    component: ContentGenerator
  },
  'script-generator': {
    title: 'Script Generator', 
    icon: Video,
    gradient: 'bg-gradient-secondary',
    component: ScriptGenerator
  },
  'rap-generator': {
    title: 'Rap Generator',
    icon: Music,
    gradient: 'bg-gradient-primary',
    component: RapGenerator
  },
  'ad-copy-generator': {
    title: 'Ad Copy Generator',
    icon: Megaphone,
    gradient: 'bg-gradient-secondary',
    component: AdCopyGenerator
  },
  'social-media-generator': {
    title: 'Social Media Generator',
    icon: Share2,
    gradient: 'bg-gradient-primary',
    component: SocialMediaGenerator
  },
  'story-generator': {
    title: 'Story Generator',
    icon: BookOpen,
    gradient: 'bg-gradient-secondary',
    component: StoryGenerator
  }
};

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ tier: 'free' | 'pro' } | null>(null);
  const [loading, setLoading] = useState(true);

  const toolConfig = slug ? toolConfigs[slug as keyof typeof toolConfigs] : null;

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('tier')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(data as { tier: 'free' | 'pro' });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGeneration = async (toolType: string, input: any, output: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('generations')
        .insert({
          user_id: user.id,
          tool_type: toolType,
          input,
          output
        });

      if (error) throw error;

      toast({
        title: "Content Saved",
        description: "Your generated content has been saved to your dashboard",
      });
    } catch (error) {
      console.error('Error saving generation:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    }
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

  if (!slug || !toolConfig) {
    return <Navigate to="/dashboard" replace />;
  }

  // If tool doesn't have a component yet, show coming soon
  if (!toolConfig.component) {
    const IconComponent = toolConfig.icon;
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
            <CardContent className="p-12">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${toolConfig.gradient} flex items-center justify-center`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-4">{toolConfig.title}</CardTitle>
              <CardDescription className="text-lg mb-8">
                This tool is coming soon! We're working hard to bring you amazing AI-powered {toolConfig.title.toLowerCase()} capabilities.
              </CardDescription>
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
                className="border-border/50 hover:border-primary/50"
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const ToolComponent = toolConfig.component;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <ToolComponent 
        onSave={(input: any, output: string) => saveGeneration(slug, input, output)}
        userTier={profile?.tier || 'free'}
      />
    </div>
  );
};

export default ToolPage;