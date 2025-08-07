import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Zap, Users, Heart, Github, Twitter, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Production Ready",
      description: "All generated animations are optimized for real-world use. Clean, semantic code that follows best practices and works across all modern browsers."
    },
    {
      icon: Zap,
      title: "AI Powered",
      description: "Our advanced AI understands natural language and translates your creative ideas into professional web animations with incredible accuracy."
    },
    {
      icon: Users,
      title: "Developer Focused",
      description: "Built by developers, for developers. We understand the pain points and create solutions that actually improve your workflow."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Join thousands of developers sharing animations, providing feedback, and pushing the boundaries of what's possible on the web."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "AI Engineer",
      bio: "Former Google engineer passionate about making AI accessible to developers worldwide."
    },
    {
      name: "Sarah Kim",
      role: "Frontend Architect",
      bio: "10+ years crafting beautiful web experiences. Expert in CSS animations and modern frameworks."
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Designer",
      bio: "Design systems enthusiast who believes great tools should be intuitive and powerful."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About Code2Motion
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize web animation creation. By harnessing the power of AI, 
              we make it possible for any developer to create stunning, professional animations without 
              the steep learning curve traditionally required.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 mb-16 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Web animations shouldn't be a luxury reserved for specialists. Every developer should have 
                the tools to bring their interfaces to life, create engaging user experiences, and stand out 
                in today's competitive digital landscape. We're building the bridge between creative vision 
                and technical implementation.
              </p>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Code2Motion?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <Card className="p-8 mb-16 bg-card border-border shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Animations Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">2.5K+</div>
                <div className="text-muted-foreground">Active Developers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-glow mb-2">500+</div>
                <div className="text-muted-foreground">Companies Using</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                contact@code2motion.dev
              </Button>
              <Button variant="outline" size="lg">
                <Twitter className="w-5 h-5 mr-2" />
                @code2motion
              </Button>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <Button variant="hero" size="lg" asChild>
                <Link to="/generator">
                  Start Creating Animations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;