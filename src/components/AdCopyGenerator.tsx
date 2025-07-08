import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Copy, Download, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdCopyGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const AdCopyGenerator = ({ onSave, userTier = 'free' }: AdCopyGeneratorProps) => {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [generatedAd, setGeneratedAd] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!product.trim()) {
      toast({
        title: "Product Required",
        description: "Please enter a product or service name.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAd = `🚀 **${product} - Transform Your Life Today!**

**Headline:** Get ${product} and See Results in Just 7 Days!

**Primary Text:**
Tired of struggling with ${audience}-related challenges? ${product} is here to change everything.

✅ Proven results backed by thousands of satisfied customers
✅ Easy to use - perfect for busy ${audience}
✅ 30-day money-back guarantee
✅ Join over 10,000+ happy customers

**Why Choose ${product}?**
- Industry-leading solution designed specifically for ${audience}
- Fast, reliable, and effective
- Expert customer support 24/7
- Limited-time special pricing

**Call to Action:** 
${goal === 'sales' ? 'Order Now - 50% Off Today Only!' : 
  goal === 'leads' ? 'Get Your Free Quote in 60 Seconds!' :
  goal === 'awareness' ? 'Learn More About Our Revolutionary Solution!' :
  'Take Action Today!'}

**Secondary Headlines:**
• "The #1 Choice for ${audience}"
• "Don't Wait - Limited Time Offer!"
• "Thousands Already Transformed Their Lives"

**Platform-Specific Optimization (${platform}):**
${platform === 'facebook' ? '📱 Mobile-optimized with eye-catching visuals\n🎯 Targeted to your exact demographic\n💬 Engaging format that drives comments and shares' :
  platform === 'google' ? '🔍 SEO-optimized for search relevance\n📊 Data-driven headlines for maximum CTR\n💡 Keyword-rich content for better quality scores' :
  platform === 'instagram' ? '📸 Visual-first approach with story integration\n#️⃣ Trending hashtags included\n✨ Influencer-style authentic messaging' :
  '📈 Multi-platform compatible format'}

**Trust Signals:**
⭐⭐⭐⭐⭐ "Best purchase I've ever made!" - Sarah M.
🏆 Winner of 2024 Excellence Award
🔒 Secure checkout with SSL encryption

---

*Optimized for ${platform} targeting ${audience} with focus on ${goal}*`;

    setGeneratedAd(mockAd);
    setIsGenerating(false);
    
    if (onSave) {
      onSave({ product, platform, audience, goal }, mockAd);
    }
    
    toast({
      title: "Ad Copy Generated!",
      description: "Your AI-powered ad copy is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAd);
    toast({
      title: "Copied!",
      description: "Ad copy copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedAd], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.replace(/\s+/g, '-').toLowerCase()}-ad-copy.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Ad copy saved as text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ad Copy Generator</h1>
            <p className="text-muted-foreground">Create compelling ad copy that converts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Ad Campaign Settings
              </CardTitle>
              <CardDescription>
                Configure your ad copy generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product">Product/Service *</Label>
                <Input
                  id="product"
                  placeholder="e.g., Fitness App, Online Course, Software Tool"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
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
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Working professionals, Fitness enthusiasts"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Campaign Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="traffic">Website Traffic</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ad Copy
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
                  <CardTitle>Generated Ad Copy</CardTitle>
                  <CardDescription>
                    Your AI-generated ad copy will appear here
                  </CardDescription>
                </div>
                {generatedAd && (
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
              {generatedAd ? (
                <Textarea
                  value={generatedAd}
                  onChange={(e) => setGeneratedAd(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Generated ad copy will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Megaphone className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill in the details and click "Generate Ad Copy" to see your compelling copy here
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

export default AdCopyGenerator;