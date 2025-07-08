import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2, Copy, Download, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialMediaGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const SocialMediaGenerator = ({ onSave, userTier = 'free' }: SocialMediaGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your social media post.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatePlatformSpecificPost = () => {
      const baseContent = {
        linkedin: `🚀 Excited to share insights about ${topic}!

In today's fast-paced world, understanding ${topic} has become more crucial than ever. Here's what I've learned:

📈 Key takeaway #1: The importance of staying informed and adapting to changes
💡 Key takeaway #2: Building meaningful connections within the community  
🎯 Key takeaway #3: Implementing practical strategies that deliver results

What's your experience with ${topic}? I'd love to hear your thoughts in the comments!

${includeHashtags ? `#${topic.replace(/\s+/g, '')} #Innovation #Growth #ProfessionalDevelopment #Networking` : ''}`,

        twitter: `🔥 Hot take on ${topic}:

The landscape is shifting faster than ever. Those who adapt win, those who don't... well, you know.

3 things that matter right now:
→ Stay curious
→ Build relationships  
→ Take action

What's your take? 👇

${includeHashtags ? `#${topic.replace(/\s+/g, '')} #Growth #Innovation` : ''}`,

        instagram: `✨ Let's talk about ${topic} ✨

Swipe to see why this matters more than you think! 📸

Life has taught me that ${topic} isn't just a trend—it's a game changer. Whether you're just starting out or you've been at this for years, there's always something new to discover.

💫 Remember: Progress over perfection
🌟 Your journey is unique
🔥 Small steps lead to big changes

Tag someone who needs to see this! 👇

${includeHashtags ? `#${topic.replace(/\s+/g, '')} #Motivation #Growth #Inspiration #LifeLessons #Mindset` : ''}`,

        facebook: `Hey everyone! 👋

I've been thinking a lot about ${topic} lately, and I wanted to share some thoughts with you all.

${topic} has been such an important part of my journey, and I know many of you are on similar paths. The thing that strikes me most is how much we can learn from each other's experiences.

Here's what I've discovered:
• The power of community support
• The importance of staying consistent
• How small changes can lead to big results

I'm curious - what's been your biggest lesson with ${topic}? Drop a comment below! I read every single one. 💬

Hope everyone's having an amazing day! ❤️

${includeHashtags ? `#${topic.replace(/\s+/g, '')} #Community #Growth #Sharing` : ''}`
      };

      return baseContent[platform as keyof typeof baseContent] || baseContent.linkedin;
    };

    const mockPost = generatePlatformSpecificPost();

    setGeneratedPost(mockPost);
    setIsGenerating(false);
    
    if (onSave) {
      onSave({ topic, platform, tone, includeHashtags }, mockPost);
    }
    
    toast({
      title: "Post Generated!",
      description: "Your AI-powered social media post is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({
      title: "Copied!",
      description: "Social media post copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPost], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-${platform}-post.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Social media post saved as text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Social Media Generator</h1>
            <p className="text-muted-foreground">Create engaging posts optimized for each platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Post Settings
              </CardTitle>
              <CardDescription>
                Configure your social media post parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Digital Marketing, Productivity Tips, Startup Journey"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hashtags"
                  checked={includeHashtags}
                  onChange={(e) => setIncludeHashtags(e.target.checked)}
                  className="rounded border-border/50"
                />
                <Label htmlFor="hashtags">Include relevant hashtags</Label>
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
                    Generate Post
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
                  <CardTitle>Generated Post</CardTitle>
                  <CardDescription>
                    Your AI-generated social media post will appear here
                  </CardDescription>
                </div>
                {generatedPost && (
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
              {generatedPost ? (
                <Textarea
                  value={generatedPost}
                  onChange={(e) => setGeneratedPost(e.target.value)}
                  className="min-h-[400px] text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Generated post will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Share2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill in the details and click "Generate Post" to see your platform-optimized content here
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

export default SocialMediaGenerator;