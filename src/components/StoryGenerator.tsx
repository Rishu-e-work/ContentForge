import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Copy, Download, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StoryGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const StoryGenerator = ({ onSave, userTier = 'free' }: StoryGeneratorProps) => {
  const [genre, setGenre] = useState("");
  const [protagonist, setProtagonist] = useState("");
  const [setting, setSetting] = useState("");
  const [conflict, setConflict] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!protagonist.trim()) {
      toast({
        title: "Protagonist Required",
        description: "Please enter a main character for your story.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockStory = `# The ${genre || 'Adventure'} of ${protagonist}

## Chapter 1: The Beginning

${protagonist} had always been different from others in ${setting || 'their small town'}. While everyone else seemed content with their ordinary lives, ${protagonist} felt a restless energy, a calling that whispered of greater things to come.

It was on a particularly unremarkable Tuesday morning when everything changed. The conflict that would define ${protagonist}'s journey began with ${conflict || 'a mysterious letter arriving at their doorstep'}.

## Chapter 2: The Call to Adventure

The letter, written in elegant script on parchment that seemed to shimmer in the morning light, contained words that would forever alter ${protagonist}'s destiny:

"Dear ${protagonist},

Your true journey begins now. What you've always known to be real is merely the surface of a much deeper truth. ${setting || 'Your world'} holds secrets that only you can uncover.

Meet me at the old oak tree when the moon is highest tonight. Come alone, and bring only your courage.

A Friend in the Shadows"

${protagonist} read the letter three times, each reading making the words feel more real, more urgent. This was the moment they had been waiting for their entire life, even if they hadn't known it.

## Chapter 3: The First Challenge

As midnight approached, ${protagonist} made their way to the ancient oak tree that stood at the edge of ${setting || 'town'}. The moonlight filtered through its gnarled branches, casting dancing shadows on the ground below.

A figure emerged from behind the massive trunk—someone ${protagonist} had never seen before, yet somehow recognized. 

"You came," the stranger said, their voice carrying the weight of centuries. "I wondered if you would have the courage."

"Who are you?" ${protagonist} asked, surprised by the steadiness of their own voice.

"I am the keeper of secrets, the guardian of truths. And you, ${protagonist}, are the one we've been waiting for. The one who can ${conflict || 'restore the balance that has been broken'}."

## Chapter 4: The Revelation

What followed was a revelation that shook ${protagonist} to their core. Everything they thought they knew about ${setting || 'their world'}, about themselves, was merely the tip of an iceberg floating in an ocean of hidden realities.

The stranger explained that ${conflict || 'an ancient evil was stirring'}, and only someone with ${protagonist}'s unique abilities could prevent disaster. It wouldn't be easy—there would be trials, challenges that would test not just their strength, but their character, their resolve, their very soul.

## Chapter 5: The Journey Begins

As dawn broke over ${setting || 'the horizon'}, ${protagonist} made their choice. They would accept this calling, embrace this destiny that had been thrust upon them.

The stranger smiled, and for the first time, ${protagonist} saw hope in those ancient eyes.

"Then let us begin," the stranger said. "Your true adventure starts now."

And as they walked together into the rising sun, ${protagonist} felt a change within themselves—no longer just an ordinary person from ${setting || 'an ordinary place'}, but a hero whose story was just beginning to unfold.

## Epilogue

Little did ${protagonist} know that this was only the first step in a journey that would take them to the very edges of imagination, where they would discover powers they never knew they possessed and face challenges that would define not just their own fate, but the fate of all who called ${setting || 'this world'} home.

The adventure had begun, and there was no turning back.

---

*Genre: ${genre || 'Adventure'} | Setting: ${setting || 'Small town'} | Conflict: ${conflict || 'Mysterious calling'}*`;

    setGeneratedStory(mockStory);
    setIsGenerating(false);
    
    if (onSave) {
      onSave({ genre, protagonist, setting, conflict }, mockStory);
    }
    
    toast({
      title: "Story Generated!",
      description: "Your AI-powered story is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedStory);
    toast({
      title: "Copied!",
      description: "Story copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedStory], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${protagonist.replace(/\s+/g, '-').toLowerCase()}-story.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Story saved as markdown file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Story Generator</h1>
            <p className="text-muted-foreground">Create captivating stories with AI assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Story Elements
              </CardTitle>
              <CardDescription>
                Configure your story generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="protagonist">Main Character *</Label>
                <Input
                  id="protagonist"
                  placeholder="e.g., Alex, Luna, Captain Reynolds"
                  value={protagonist}
                  onChange={(e) => setProtagonist(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="science-fiction">Science Fiction</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="setting">Setting</Label>
                <Input
                  id="setting"
                  placeholder="e.g., Medieval castle, Space station, Modern city"
                  value={setting}
                  onChange={(e) => setSetting(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conflict">Central Conflict</Label>
                <Input
                  id="conflict"
                  placeholder="e.g., Ancient curse, Robot uprising, Family secret"
                  value={conflict}
                  onChange={(e) => setConflict(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-secondary hover:shadow-glow transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Story
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
                  <CardTitle>Generated Story</CardTitle>
                  <CardDescription>
                    Your AI-generated story will appear here
                  </CardDescription>
                </div>
                {generatedStory && (
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
              {generatedStory ? (
                <Textarea
                  value={generatedStory}
                  onChange={(e) => setGeneratedStory(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Generated story will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill in the story elements and click "Generate Story" to see your creative narrative here
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

export default StoryGenerator;