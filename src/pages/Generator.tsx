import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, Download, Play, Pause, Code, Wand2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const examplePrompts = [
    "A smooth hover effect that scales a button and adds a glow",
    "A loading spinner with rotating circles in a modern style",
    "A slide-in animation for navigation menu items with stagger",
    "A floating card effect with subtle shadow and movement",
    "A typewriter text animation that reveals characters one by one",
    "A morphing button that transforms on click with color change"
  ];

  const mockGeneratedCode = {
    css: `.hover-glow-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.hover-glow-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.6);
  filter: brightness(1.1);
}

.hover-glow-button:active {
  transform: translateY(0) scale(0.98);
}`,
    html: `<button class="hover-glow-button">
  Hover me!
</button>`,
    react: `import React from 'react';
import './HoverGlowButton.css';

const HoverGlowButton = ({ children, onClick }) => {
  return (
    <button className="hover-glow-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default HoverGlowButton;`
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your animation");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedCode(JSON.stringify(mockGeneratedCode, null, 2));
      setIsGenerating(false);
      setIsPlaying(true);
      toast.success("Animation generated successfully!");
    }, 2000);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const togglePreview = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Animation Generator
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your animation idea and watch it transform into production-ready code
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6 bg-card border-border shadow-card">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Wand2 className="w-5 h-5 text-primary mr-2" />
                  Describe Your Animation
                </h2>
                
                <Textarea
                  placeholder="Example: Create a smooth button hover effect that scales the element and adds a colorful glow..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-background border-border focus:border-primary transition-colors"
                />

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">
                    {prompt.length}/500 characters
                  </span>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    variant="hero"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Animation
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Example Prompts */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-4">Example Prompts</h3>
                <div className="space-y-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-left w-full p-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {/* Preview */}
              <Card className="p-6 bg-card border-border shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Play className="w-5 h-5 text-primary mr-2" />
                    Live Preview
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePreview}
                    disabled={!generatedCode}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
                
                <div className="bg-background border border-border rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  {generatedCode ? (
                    <div className={`${isPlaying ? 'hover-glow-button' : ''} transition-all duration-300`}>
                      <button 
                        className={`px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold ${isPlaying ? 'transform hover:scale-105 hover:shadow-glow' : ''}`}
                        style={{
                          boxShadow: isPlaying ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none'
                        }}
                      >
                        Hover me!
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Your animation preview will appear here</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Code Output */}
              {generatedCode && (
                <Card className="p-6 bg-card border-border shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Generated Code</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleCopy(mockGeneratedCode.css)}>
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="css" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="react">React</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="css" className="mt-4">
                      <div className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-foreground">
                          <code>{mockGeneratedCode.css}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="html" className="mt-4">
                      <div className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-foreground">
                          <code>{mockGeneratedCode.html}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="react" className="mt-4">
                      <div className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-foreground">
                          <code>{mockGeneratedCode.react}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;