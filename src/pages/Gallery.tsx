import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, Code, Heart, Zap, MousePointer, Loader, Menu } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const animationExamples = [
    {
      id: 1,
      title: "Glow Button Hover",
      description: "A button that glows and scales on hover with smooth transitions",
      category: "buttons",
      tags: ["hover", "glow", "scale"],
      likes: 127,
      code: `.glow-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.glow-button:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.6);
}`,
      preview: "button"
    },
    {
      id: 2,
      title: "Typewriter Effect",
      description: "Text appears character by character with a blinking cursor",
      category: "text",
      tags: ["typewriter", "text", "cursor"],
      likes: 89,
      code: `.typewriter {
  overflow: hidden;
  border-right: 3px solid #8b5cf6;
  white-space: nowrap;
  animation: typing 3s steps(40), blink 0.75s infinite;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink {
  50% { border-color: transparent }
}`,
      preview: "text"
    },
    {
      id: 3,
      title: "Floating Cards",
      description: "Cards that gently float up and down with subtle shadows",
      category: "cards",
      tags: ["float", "shadow", "smooth"],
      likes: 156,
      code: `.floating-card {
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
@keyframes float {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-10px) }
}`,
      preview: "card"
    },
    {
      id: 4,
      title: "Ripple Loading",
      description: "Expanding circles that create a ripple effect for loading states",
      category: "loaders",
      tags: ["loading", "ripple", "pulse"],
      likes: 203,
      code: `.ripple-loader {
  position: relative;
  width: 40px;
  height: 40px;
}
.ripple-loader::after {
  content: '';
  position: absolute;
  border: 2px solid #8b5cf6;
  border-radius: 50%;
  animation: ripple 1.5s infinite;
}
@keyframes ripple {
  to { transform: scale(2); opacity: 0; }
}`,
      preview: "loader"
    },
    {
      id: 5,
      title: "Slide-in Navigation",
      description: "Menu items slide in from the left with staggered timing",
      category: "navigation",
      tags: ["slide", "stagger", "menu"],
      likes: 134,
      code: `.slide-nav li {
  transform: translateX(-100%);
  animation: slideIn 0.5s forwards;
}
.slide-nav li:nth-child(2) { animation-delay: 0.1s; }
.slide-nav li:nth-child(3) { animation-delay: 0.2s; }
@keyframes slideIn {
  to { transform: translateX(0); }
}`,
      preview: "navigation"
    },
    {
      id: 6,
      title: "Morphing Button",
      description: "Button that smoothly transforms its shape and color on interaction",
      category: "buttons",
      tags: ["morph", "transform", "interactive"],
      likes: 91,
      code: `.morph-button {
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.morph-button:hover {
  border-radius: 8px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  transform: scale(1.1) rotate(-2deg);
}`,
      preview: "button"
    }
  ];

  const categories = [
    { id: "all", label: "All", icon: Menu },
    { id: "buttons", label: "Buttons", icon: MousePointer },
    { id: "loaders", label: "Loaders", icon: Loader },
    { id: "text", label: "Text", icon: Code },
    { id: "cards", label: "Cards", icon: Heart },
    { id: "navigation", label: "Navigation", icon: Zap }
  ];

  const filteredAnimations = selectedCategory === "all" 
    ? animationExamples 
    : animationExamples.filter(item => item.category === selectedCategory);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const renderPreview = (type: string, id: number) => {
    switch (type) {
      case "button":
        return (
          <div className="flex items-center justify-center h-full">
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-glow transition-all duration-300">
              Hover me!
            </button>
          </div>
        );
      case "text":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="typewriter-demo font-mono text-lg">
              Typing effect...
            </div>
          </div>
        );
      case "card":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-24 h-24 bg-card border border-border rounded-lg shadow-card animate-bounce">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case "loader":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-2 border-accent rounded-full animate-ping delay-100"></div>
            </div>
          </div>
        );
      case "navigation":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="space-y-2">
              <div className="w-16 h-2 bg-primary rounded animate-slide-up"></div>
              <div className="w-12 h-2 bg-accent rounded animate-slide-up delay-100"></div>
              <div className="w-14 h-2 bg-primary-glow rounded animate-slide-up delay-200"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
                Animation Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of ready-to-use web animations. Copy the code and use it in your projects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-card text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Animation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimations.map((animation) => (
              <Card key={animation.id} className="bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group">
                {/* Preview Area */}
                <div className="h-48 bg-background/50 border-b border-border relative overflow-hidden">
                  {renderPreview(animation.preview, animation.id)}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(animation.code)}>
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {animation.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{animation.likes}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {animation.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {animation.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => handleCopy(animation.code)}>
                    <Code className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Animations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;