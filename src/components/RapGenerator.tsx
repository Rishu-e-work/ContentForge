import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Copy, Download, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RapGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const RapGenerator = ({ onSave, userTier = 'free' }: RapGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("");
  const [mood, setMood] = useState("");
  const [generatedRap, setGeneratedRap] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your rap.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRap = `[Verse 1]
Started from the bottom, now we talking ${topic}
Every single day, I'm grinding, never gonna stop it
People said I couldn't make it, but I proved them wrong
Now I'm spitting fire, this is my victory song

[Chorus]
${topic} on my mind, ${topic} in my heart
Every single moment, this is just the start
Rise above the noise, never fall apart
${topic} is the flame that lights up in the dark

[Verse 2]
Looking at the mirror, see the hunger in my eyes
${topic} gave me wings, now I'm reaching for the skies
Every single rhyme, every single flow
Telling my story, letting everybody know

[Bridge]
When the world gets heavy, and the path unclear
${topic} keeps me strong, eliminates the fear
This is more than music, this is how I live
${topic} is the reason I got more to give

[Outro]
So remember my name, remember my song
${topic} made me who I am, this is where I belong
Keep the rhythm going, let the music play
This is my anthem, this is my way

---

*Generated with ${style} style and ${mood} mood.*`;

    setGeneratedRap(mockRap);
    setIsGenerating(false);
    
    if (onSave) {
      onSave({ topic, style, mood }, mockRap);
    }
    
    toast({
      title: "Rap Generated!",
      description: "Your AI-powered rap lyrics are ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRap);
    toast({
      title: "Copied!",
      description: "Rap lyrics copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedRap], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-rap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Rap lyrics saved as text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rap Generator</h1>
            <p className="text-muted-foreground">Create original rap lyrics with AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Rap Settings
              </CardTitle>
              <CardDescription>
                Configure your rap generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Success, Love, Struggle, Dreams"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="old-school">Old School</SelectItem>
                    <SelectItem value="trap">Trap</SelectItem>
                    <SelectItem value="boom-bap">Boom Bap</SelectItem>
                    <SelectItem value="mumble">Mumble Rap</SelectItem>
                    <SelectItem value="conscious">Conscious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                    <SelectItem value="chill">Chill</SelectItem>
                    <SelectItem value="motivational">Motivational</SelectItem>
                    <SelectItem value="melancholic">Melancholic</SelectItem>
                    <SelectItem value="party">Party</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Rap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Rap</CardTitle>
                  <CardDescription>
                    Your AI-generated rap lyrics will appear here
                  </CardDescription>
                </div>
                {generatedRap && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="border-border/50 hover:border-primary/50"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="border-border/50 hover:border-primary/50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedRap ? (
                <Textarea
                  value={generatedRap}
                  onChange={(e) => setGeneratedRap(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Generated rap will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Music className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill in the details and click "Generate Rap" to see your AI-powered lyrics here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RapGenerator;