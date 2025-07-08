import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Download, FileText, Sparkles, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContentGeneratorProps {
  onSave?: (input: any, output: string) => void;
  userTier?: 'free' | 'pro';
}

const ContentGenerator = ({ onSave, userTier = 'free' }: ContentGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your content.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate content based on length selection
    let mockContent = '';
    
    if (length === 'short') {
      // 300-500 words
      mockContent = `# ${topic}

## Introduction

${topic} has become increasingly important in today's digital landscape. Understanding its fundamentals is crucial for success.

## Key Points

**Understanding the Basics**: The foundation of ${topic} lies in grasping its core principles and practical applications in real-world scenarios.

**Best Practices**: Implementing effective strategies requires careful planning, thorough research, and consistent execution of proven methodologies.

**Common Challenges**: Many practitioners face obstacles when working with ${topic}, but these can be overcome with the right approach and mindset.

## Implementation

To successfully implement ${topic}:
- Start with clear objectives
- Research current trends
- Create structured plans
- Monitor your progress regularly

## Conclusion

${topic} offers significant opportunities for those willing to invest time and effort. By following these guidelines and maintaining consistency, you'll be well-positioned to achieve your goals and see meaningful results.

---
*Generated with ${tone} tone - Short format*`;
    } else if (length === 'medium') {
      // 500-800 words
      mockContent = `# ${topic}

## Introduction

${topic} has become increasingly important in today's rapidly evolving digital landscape. This comprehensive guide will explore the essential aspects you need to understand to succeed in this field. Whether you're a beginner or looking to enhance your existing knowledge, this overview will provide valuable insights.

## Understanding the Fundamentals

The foundation of ${topic} lies in understanding its core principles and applications. These fundamentals serve as building blocks for more advanced concepts and practical implementations. By mastering these basics, you create a solid foundation for future growth and development.

### Core Principles

The essential principles include systematic approaches, strategic thinking, and practical application of theoretical knowledge. These elements work together to create a comprehensive framework for success.

## Best Practices and Strategies

Implementing effective strategies for ${topic} requires careful planning, thorough research, and consistent execution. The most successful practitioners follow proven methodologies while remaining adaptable to changing circumstances and emerging trends.

### Strategic Planning

- Conduct thorough research and analysis
- Set clear, measurable objectives
- Develop detailed implementation timelines
- Create contingency plans for potential challenges

### Execution Excellence

Focus on consistent implementation of your strategies. Regular monitoring and adjustment ensure that you stay on track toward your goals while remaining flexible enough to adapt to new opportunities or obstacles.

## Common Challenges and Solutions

Many face obstacles when working with ${topic}, but these can be overcome with the right approach and mindset. Understanding potential pitfalls helps you prepare effective solutions and maintain momentum toward your objectives.

The key is to view challenges as learning opportunities rather than roadblocks. This perspective shift enables continuous improvement and long-term success.

## Conclusion

${topic} offers tremendous opportunities for those willing to invest the time and effort to master it. By following these guidelines, maintaining consistency, and staying committed to continuous learning, you'll be well-positioned to achieve success and make meaningful progress in your endeavors.

---
*Generated with ${tone} tone - Medium format*`;
    } else {
      // 1000+ words (long)
      mockContent = `# ${topic}

## Introduction

${topic} has become increasingly important in today's rapidly evolving digital landscape, fundamentally transforming how we approach business, technology, and innovation. This comprehensive guide will explore the essential aspects you need to understand to succeed in this complex and dynamic field. Whether you're a complete beginner taking your first steps or an experienced professional looking to enhance your existing knowledge and skills, this detailed overview will provide valuable insights, practical strategies, and actionable recommendations.

The landscape of ${topic} continues to evolve at an unprecedented pace, driven by technological advancement, changing consumer behaviors, and emerging market opportunities. Understanding these dynamics is crucial for anyone looking to make a meaningful impact in this space.

## Understanding the Fundamentals

The foundation of ${topic} lies in understanding its core principles, methodologies, and practical applications across various contexts and industries. These fundamentals serve as essential building blocks for more advanced concepts and sophisticated implementations. By thoroughly mastering these basics, you create a solid foundation that supports future growth, development, and innovation.

### Core Principles and Frameworks

The essential principles include systematic approaches to problem-solving, strategic thinking methodologies, and the practical application of theoretical knowledge in real-world scenarios. These elements work synergistically to create a comprehensive framework for sustainable success and continuous improvement.

Understanding these frameworks requires dedicated study, hands-on practice, and consistent application across different scenarios. The most successful practitioners develop a deep intuitive understanding that goes beyond surface-level knowledge.

### Historical Context and Evolution

The development of ${topic} has been influenced by numerous factors, including technological breakthroughs, economic shifts, and changing social dynamics. This historical perspective provides valuable context for understanding current trends and anticipating future developments.

## Best Practices and Strategic Approaches

Implementing effective strategies for ${topic} requires careful planning, thorough research, systematic execution, and continuous optimization. The most successful practitioners follow proven methodologies while remaining adaptable to changing circumstances, emerging trends, and unexpected opportunities or challenges.

### Strategic Planning and Analysis

Effective strategic planning begins with comprehensive research and analysis of the current landscape, competitive environment, and market dynamics. This foundational work includes:

- Conducting thorough market research and competitive analysis
- Setting clear, measurable, and achievable objectives
- Developing detailed implementation timelines with realistic milestones
- Creating comprehensive contingency plans for potential challenges
- Establishing key performance indicators and measurement frameworks

### Implementation Excellence and Optimization

Focus on consistent, high-quality implementation of your strategies while maintaining flexibility to adapt and optimize based on results and feedback. Regular monitoring, analysis, and adjustment ensure that you stay on track toward your goals while remaining responsive to new opportunities or obstacles that may emerge.

Successful implementation requires attention to detail, consistent execution, and the ability to learn from both successes and failures. The most effective practitioners develop systems and processes that support sustainable growth and continuous improvement.

## Advanced Strategies and Techniques

Beyond the fundamentals, mastering ${topic} requires understanding advanced strategies and sophisticated techniques that can provide competitive advantages and accelerate progress toward your objectives. These advanced approaches often involve:

### Innovation and Creative Problem-Solving

Developing innovative solutions requires thinking beyond conventional approaches and exploring new possibilities. This involves fostering creativity, encouraging experimentation, and creating environments that support innovation and calculated risk-taking.

### Technology Integration and Optimization

Leveraging technology effectively can significantly enhance your capabilities and efficiency. This includes staying current with emerging technologies, understanding their potential applications, and implementing them strategically to support your objectives.

## Common Challenges and Comprehensive Solutions

Many practitioners face significant obstacles when working with ${topic}, but these challenges can be overcome with the right approach, mindset, and strategic planning. Understanding potential pitfalls helps you prepare effective solutions and maintain momentum toward your objectives, even when facing unexpected difficulties.

Common challenges include resource constraints, technical complexity, market volatility, and competitive pressures. The key is to view these challenges as learning opportunities rather than insurmountable roadblocks. This perspective shift enables continuous improvement, resilience, and long-term success.

### Risk Management and Mitigation

Developing comprehensive risk management strategies helps minimize potential negative impacts while positioning you to capitalize on opportunities. This includes identifying potential risks, assessing their likelihood and impact, and developing appropriate mitigation strategies.

## Future Trends and Opportunities

The future of ${topic} promises exciting developments and new opportunities for those who stay informed and adaptable. Emerging trends suggest continued growth, innovation, and evolution in this space, creating numerous opportunities for forward-thinking practitioners.

Staying ahead of these trends requires continuous learning, strategic networking, and active participation in relevant communities and discussions. The most successful practitioners position themselves at the forefront of emerging developments.

## Conclusion and Next Steps

${topic} offers tremendous opportunities for those willing to invest the time, effort, and dedication required to master its complexities and nuances. By following these comprehensive guidelines, maintaining consistency in your approach, and staying committed to continuous learning and improvement, you'll be well-positioned to achieve significant success and make meaningful progress in your endeavors.

The journey toward mastery is ongoing, requiring persistence, adaptability, and a commitment to excellence. Success in ${topic} comes not from perfection, but from consistent effort, continuous learning, and the courage to take calculated risks and learn from both successes and failures.

Remember that expertise develops over time through deliberate practice, thoughtful reflection, and persistent effort. Stay focused on your long-term objectives while remaining flexible in your approach and open to new learning opportunities.

---
*Generated with ${tone} tone - Long format (1000+ words)*`;
    }

    setGeneratedContent(mockContent);
    setIsGenerating(false);
    
    toast({
      title: "Content Generated!",
      description: "Your AI-powered content is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-content.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Content saved as markdown file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Content Generator</h1>
            <p className="text-muted-foreground">Generate SEO-optimized blog posts and articles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Content Settings
              </CardTitle>
              <CardDescription>
                Configure your content generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Digital Marketing Strategies, Sustainable Living Tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
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
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Content Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (300-500 words)</SelectItem>
                    <SelectItem value="medium">Medium (500-1000 words)</SelectItem>
                    <SelectItem value="long">Long (1000+ words)</SelectItem>
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
                    Generate Content
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
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>
                    Your AI-generated content will appear here
                  </CardDescription>
                </div>
                {generatedContent && (
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
              {generatedContent ? (
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-border/50 focus:border-primary resize-none"
                  placeholder="Generated content will appear here..."
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Fill in the details and click "Generate Content" to see your AI-powered content here
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

export default ContentGenerator;