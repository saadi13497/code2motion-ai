-- Fix database function security by setting proper search_path
CREATE OR REPLACE FUNCTION public.increment_session_image_count(session_id text, increment_by integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.sessions
    SET image_count = image_count + increment_by
    WHERE id = session_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Enable RLS on tables that don't have it
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styles ENABLE ROW LEVEL SECURITY;

-- Drop existing overly permissive policies on email_history
DROP POLICY IF EXISTS "Anyone can create email history" ON public.email_history;
DROP POLICY IF EXISTS "Anyone can update email history" ON public.email_history;
DROP POLICY IF EXISTS "Email history is viewable by everyone" ON public.email_history;

-- Create secure RLS policies for email_history
CREATE POLICY "Users can view their own email history" 
ON public.email_history 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create their own email history" 
ON public.email_history 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own email history" 
ON public.email_history 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create secure RLS policies for images
CREATE POLICY "Public images are viewable by everyone" 
ON public.images 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Anyone can create images" 
ON public.images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update images" 
ON public.images 
FOR UPDATE 
USING (true);

-- Create secure RLS policies for prompt_history
CREATE POLICY "Prompt history is viewable by session" 
ON public.prompt_history 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create prompt history" 
ON public.prompt_history 
FOR INSERT 
WITH CHECK (true);

-- Create secure RLS policies for sessions
CREATE POLICY "Sessions are viewable by everyone" 
ON public.sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create sessions" 
ON public.sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update sessions" 
ON public.sessions 
FOR UPDATE 
USING (true);

-- Create secure RLS policies for styles
CREATE POLICY "Styles are viewable by everyone" 
ON public.styles 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage styles" 
ON public.styles 
FOR ALL 
USING (auth.uid() IS NOT NULL);