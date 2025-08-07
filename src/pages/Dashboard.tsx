import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import DOMPurify from "dompurify";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [generatedAnimation, setGeneratedAnimation] = useState<{
    html: string;
    css: string;
    description: string;
  } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim().slice(0, 1000));
  };

  const handleGenerateAnimation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your animation",
        variant: "destructive",
      });
      return;
    }

    const sanitizedPrompt = sanitizeInput(prompt);
    
    setLoading(true);
    try {
      // Call the edge function to generate animation
      const { data, error } = await supabase.functions.invoke('generate-animation', {
        body: { prompt: sanitizedPrompt }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        toast({
          title: "Error",
          description: "Failed to generate animation. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data.animation) {
        setGeneratedAnimation(data.animation);
        toast({
          title: "Success!",
          description: "Animation generated successfully!",
        });
      }
      
      setPrompt("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Createa Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Animation</CardTitle>
              <CardDescription>
                Describe the animation you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateAnimation} className="space-y-4">
                <Textarea
                  placeholder="Describe your animation (e.g., 'A bouncing ball with rainbow trail')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                  maxLength={1000}
                  rows={4}
                />
                <Button type="submit" disabled={loading || !prompt.trim()}>
                  {loading ? "Generating..." : "Generate Animation"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview & Animation</CardTitle>
              <CardDescription>
                Live preview of your generated animation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedAnimation ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-background">
                    <h3 className="font-medium mb-2">Live Preview</h3>
                    <div 
                      className="border rounded p-4 min-h-[200px] flex items-center justify-center bg-gradient-to-br from-background to-muted"
                      dangerouslySetInnerHTML={{ 
                        __html: `<style>${generatedAnimation.css}</style>${generatedAnimation.html}` 
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">{generatedAnimation.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">HTML</h3>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                        <code>{generatedAnimation.html}</code>
                      </pre>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">CSS</h3>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-[200px] overflow-y-auto">
                        <code>{generatedAnimation.css}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">
                    Enter a prompt above to generate and preview your animation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;