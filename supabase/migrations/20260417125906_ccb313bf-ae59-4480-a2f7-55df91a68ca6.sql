-- Create public bucket for evidence
INSERT INTO storage.buckets (id, name, public)
VALUES ('evidence', 'evidence', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload evidence (anonymous reporting)
CREATE POLICY "Anyone can upload evidence"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'evidence');

-- Anyone can view evidence files
CREATE POLICY "Anyone can view evidence"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'evidence');