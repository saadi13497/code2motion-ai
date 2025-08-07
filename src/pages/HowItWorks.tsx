import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles, Zap, Play, Download, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Describe Your Animation",
      description: "Simply type what you want in plain English. For example: 'A bouncing ball with rainbow trails' or 'Smooth card hover effect with shadow'.",
      example: "floating button with glow effect"
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "AI Generates Code",
      description: "Our AI analyzes your description and creates optimized CSS, JavaScript, or React code that brings your animation to life.",
      example: "CSS animations + JavaScript logic"
    },
    {
      icon: <Play className="w-8 h-8 text-primary-glow" />,
      title: "Preview & Customize",
      description: "See your animation in real-time. Make adjustments by refining your description or tweaking the generated parameters.",
      example: "Live preview with controls"
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Export & Use",
      description: "Download clean, production-ready code that works with any modern framework. Copy-paste into your project and you're done!",
      example: "Ready-to-use code snippets"
    }
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multiple Frameworks",
      description: "Generate code for vanilla CSS, React, Vue, Angular, and more"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customizable Output",
      description: "Adjust timing, easing, colors, and other animation properties"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimized",
      description: "All animations use hardware acceleration and best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your ideas into professional web animations in just a few simple steps. 
            No coding experience required.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {step.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 border border-muted-foreground/20">
                  <p className="text-sm text-muted-foreground mb-2">Example:</p>
                  <p className="font-mono text-sm">{step.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already creating amazing animations with Createa.
              </p>
              <Button size="lg" asChild>
                <Link to="/auth">
                  <Sparkles className="w-5 h-5" />
                  Start Creating Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;