import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary-glow rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">AI-Powered Animation Generation</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
          <span className="block text-foreground mt-16">Transform Words into</span>
          <span className="block mt-4 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-glow-pulse px-4 py-2 rounded-2xl">
            Web Animations
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up">
          Generate professional CSS, JavaScript, and React animations using natural language. 
          Perfect for developers who want to create stunning web effects without the complexity.
        </p>

        {/* Hero Illustration */}
        <div className="mb-12 max-w-4xl mx-auto">
          <img 
            src={heroIllustration} 
            alt="Code transforming into animated web elements" 
            className="w-full h-auto rounded-2xl shadow-elegant opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in">
          <Button variant="hero" size="lg" asChild>
            <Link to="/auth">
              <Sparkles className="w-5 h-5" />
              Try Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              <Code className="w-5 h-5" />
              View Examples
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
            <p className="text-muted-foreground">Clean, optimized code that you can use directly in your projects</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
            <p className="text-muted-foreground">Describe your animation in plain English and watch it come to life</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-primary-glow/10 border border-primary-glow/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
              <Zap className="w-8 h-8 text-primary-glow" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Framework Agnostic</h3>
            <p className="text-muted-foreground">Works with vanilla CSS, React, Vue, or any modern framework</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;