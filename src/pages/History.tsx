import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Search,
  Clock,
  Trash2,
  Download,
  Copy,
  History as HistoryIcon
} from 'lucide-react';

interface Generation {
  id: string;
  tool_type: string;
  input: any;
  output: string;
  created_at: string;
}

const tools = [
  { id: "content-generator", title: "Content Generator", icon: FileText, gradient: "bg-gradient-primary" },
  { id: "script-generator", title: "Script Generator", icon: Video, gradient: "bg-gradient-secondary" },
  { id: "rap-generator", title: "Rap Generator", icon: Music, gradient: "bg-gradient-primary" },
  { id: "ad-copy-generator", title: "Ad Copy Generator", icon: Megaphone, gradient: "bg-gradient-secondary" },
  { id: "social-media-generator", title: "Social Media Generator", icon: Share2, gradient: "bg-gradient-primary" },
  { id: "story-generator", title: "Story Generator", icon: BookOpen, gradient: "bg-gradient-secondary" }
];

const History = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [filteredGenerations, setFilteredGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");

  useEffect(() => {
    fetchGenerations();
  }, [user]);

  useEffect(() => {
    filterGenerations();
  }, [generations, searchTerm, selectedTool]);

  const fetchGenerations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGenerations(data || []);
    } catch (error) {
      console.error('Error fetching generations:', error);
      toast({
        title: "Error",
        description: "Failed to load your generation history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterGenerations = () => {
    let filtered = generations;

    if (selectedTool !== "all") {
      filtered = filtered.filter(gen => gen.tool_type === selectedTool);
    }

    if (searchTerm) {
      filtered = filtered.filter(gen => 
        gen.output.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(gen.input).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGenerations(filtered);
  };

  const deleteGeneration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('generations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGenerations(generations.filter(g => g.id !== id));
      toast({
        title: "Deleted",
        description: "Generation deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting generation:', error);
      toast({
        title: "Error",
        description: "Failed to delete generation",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const downloadGeneration = (generation: Generation) => {
    const toolConfig = getToolConfig(generation.tool_type);
    const filename = `${toolConfig.title.replace(/\s+/g, '-').toLowerCase()}-${new Date(generation.created_at).toISOString().split('T')[0]}.txt`;
    
    const blob = new Blob([generation.output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Content saved as text file.",
    });
  };

  const getToolConfig = (toolType: string) => {
    return tools.find(t => t.id === toolType) || tools[0];
  };

  const groupedGenerations = filteredGenerations.reduce((acc, generation) => {
    const toolType = generation.tool_type;
    if (!acc[toolType]) {
      acc[toolType] = [];
    }
    acc[toolType].push(generation);
    return acc;
  }, {} as Record<string, Generation[]>);

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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <HistoryIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Generation History</h1>
            <p className="text-muted-foreground">
              View and manage all your AI-generated content
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search your generations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedTool} onValueChange={setSelectedTool}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Filter by tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    {tools.map((tool) => (
                      <SelectItem key={tool.id} value={tool.id}>
                        {tool.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{generations.length}</div>
              <div className="text-sm text-muted-foreground">Total Generated</div>
            </CardContent>
          </Card>
          {tools.slice(0, 3).map((tool) => {
            const count = generations.filter(g => g.tool_type === tool.id).length;
            return (
              <Card key={tool.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground">{tool.title.split(' ')[0]}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generations */}
        {filteredGenerations.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedGenerations).map(([toolType, toolGenerations]) => {
              const toolConfig = getToolConfig(toolType);
              return (
                <div key={toolType}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${toolConfig.gradient} flex items-center justify-center`}>
                      <toolConfig.icon className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold">{toolConfig.title}</h2>
                    <Badge variant="secondary">{toolGenerations.length}</Badge>
                  </div>
                  
                  <div className="grid gap-4">
                    {toolGenerations.map((generation) => (
                      <Card key={generation.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {new Date(generation.created_at).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(generation.output)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => downloadGeneration(generation)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Link to={`/tool/${generation.tool_type}`}>
                                <Button variant="ghost" size="sm">
                                  Create Similar
                                </Button>
                              </Link>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteGeneration(generation.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-sm text-foreground line-clamp-4 whitespace-pre-wrap">
                              {generation.output.substring(0, 300)}...
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <HistoryIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {searchTerm || selectedTool !== "all" ? "No matching content found" : "No content generated yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedTool !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Start creating amazing content with our AI tools"
                }
              </p>
              <div className="flex gap-2 justify-center">
                {searchTerm || selectedTool !== "all" ? (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTool("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Link to="/tool/content-generator">
                    <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      Create Your First Content
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;