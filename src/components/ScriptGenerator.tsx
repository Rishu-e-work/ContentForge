import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Download, Video, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ScriptGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const ScriptGenerator = ({ onSave, userTier = 'free' }: ScriptGeneratorProps) => {
  const [title, setTitle] = useState("");
  const [niche, setNiche] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [tone, setTone] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a video title.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock generated script based on inputs
    const mockScript = `# ${title}
**Video Script for ${niche} | ${videoLength} Duration**

---

## HOOK / OPENING (0-15 seconds)
**[ENERGY: High, engaging tone]**

"What if I told you that ${title.toLowerCase()} could completely change your perspective? Stick around because in the next ${videoLength === 'short' ? '60 seconds' : videoLength === 'medium' ? '5 minutes' : '15 minutes'}, I'm going to show you exactly how!"

**[Visual cue: Eye-catching graphics/text overlay]**

---

## INTRODUCTION (15-45 seconds)
**[ENERGY: ${tone}, welcoming]**

"Hey everyone! Welcome back to the channel! If you're new here, I'm [YOUR NAME], and I help people [BRIEF CHANNEL DESCRIPTION]. 

Today we're diving deep into ${title.toLowerCase()}, and by the end of this video, you'll have a complete understanding of why this matters and how you can apply it immediately.

But first, if you find value in these videos, please hit that like button - it really helps the channel grow!"

---

## MAIN CONTENT

### Point 1: The Foundation
**[ENERGY: Educational, clear]**

"Let's start with the basics. When we talk about ${title.toLowerCase()}, most people think [COMMON MISCONCEPTION]. But here's what's really happening..."

**[Visual cue: Supporting graphics/examples]**

### Point 2: The Key Insight  
**[ENERGY: Revealing, slightly conspiratorial]**

"Now here's where it gets interesting. The thing that nobody talks about is [KEY INSIGHT]. This is crucial because..."

**[Visual cue: Highlight this section with text/graphics]**

### Point 3: Practical Application
**[ENERGY: Actionable, motivating]**

"Alright, so how do you actually implement this? Here are the three steps you need to follow:

1. **First step**: [SPECIFIC ACTION]
2. **Second step**: [SPECIFIC ACTION]  
3. **Third step**: [SPECIFIC ACTION]

I've personally seen this work for [EXAMPLE/STORY], and I know it can work for you too."

---

## CALL TO ACTION & CLOSING
**[ENERGY: Enthusiastic, community-building]**

"And that's a wrap on ${title.toLowerCase()}! I hope this was helpful and gave you some actionable insights you can use right away.

Now I want to hear from YOU - have you tried this approach before? What were your results? Drop a comment below and let me know!

If this video helped you out, smash that like button, subscribe for more content like this, and ring the notification bell so you never miss an upload.

I've got some amazing videos coming up that I think you'll love, so make sure you're subscribed!

Thanks for watching, and I'll see you in the next one!"

**[End screen: Subscribe button + related videos]**

---

## PRODUCTION NOTES:
- **Tone**: ${tone}
- **Target Duration**: ${videoLength}
- **Niche**: ${niche}
- **Key Focus**: Engagement and value delivery
- **Remember**: Add personal anecdotes and specific examples where indicated`;

    setGeneratedScript(mockScript);
    setIsGenerating(false);
    
    toast({
      title: "Script Generated!",
      description: "Your YouTube video script is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-script.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Script saved as markdown file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Script Generator</h1>
            <p className="text-muted-foreground">Create engaging YouTube video scripts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Video Details
              </CardTitle>
              <CardDescription>
                Tell us about your video and we'll create the perfect script
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., 5 Morning Habits That Changed My Life"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="niche">Niche/Category</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="fitness">Health & Fitness</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="finance">Personal Finance</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Video Length</Label>
                <Select value={videoLength} onValueChange={setVideoLength}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select video length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (1-3 minutes)</SelectItem>
                    <SelectItem value="medium">Medium (5-10 minutes)</SelectItem>
                    <SelectItem value="long">Long (15+ minutes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone & Style</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="energetic">Energetic & Upbeat</SelectItem>
                    <SelectItem value="educational">Educational & Professional</SelectItem>
                    <SelectItem value="casual">Casual & Conversational</SelectItem>
                    <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
                    <SelectItem value="entertaining">Fun & Entertaining</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-secondary hover:shadow-glow transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Script...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Generate Script
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
                  <CardTitle>Your Video Script</CardTitle>
                  <CardDescription>
                    Complete YouTube script with timing and production notes
                  </CardDescription>
                </div>
                {generatedScript && (
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
              {generatedScript ? (
                <Textarea
                  value={generatedScript}
                  onChange={(e) => setGeneratedScript(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Your generated script will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter your video details and click "Generate Script" to create your professional YouTube script
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

export default ScriptGenerator;