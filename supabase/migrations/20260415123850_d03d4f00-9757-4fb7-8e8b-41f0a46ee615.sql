
CREATE TABLE public.cases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id text NOT NULL UNIQUE,
  type text NOT NULL,
  priority text NOT NULL DEFAULT 'high',
  status text NOT NULL DEFAULT 'open',
  incident_date date,
  location text DEFAULT 'Not specified',
  description text NOT NULL,
  files text[] DEFAULT '{}',
  updates jsonb DEFAULT '[]'::jsonb,
  reporter_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a case (anonymous reporting)
CREATE POLICY "Anyone can report a case"
  ON public.cases FOR INSERT
  TO public
  WITH CHECK (true);

-- Anyone can look up cases (for tracking by case_id)
CREATE POLICY "Anyone can view cases"
  ON public.cases FOR SELECT
  TO public
  USING (true);

-- Investigators/admins can update cases
CREATE POLICY "Investigators can update cases"
  ON public.cases FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'investigator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));
