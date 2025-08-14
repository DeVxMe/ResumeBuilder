-- Simplified resumes table without user authentication
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
  slug VARCHAR(255) UNIQUE,
  
  -- Personal Information
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  website VARCHAR(255),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  summary TEXT,
  
  -- Professional Data (stored as JSONB for flexibility)
  experience JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  
  -- Template and styling
  template_id VARCHAR(50) DEFAULT 'modern',
  theme_color VARCHAR(7) DEFAULT '#2563eb',
  
  -- SEO and sharing
  is_public BOOLEAN DEFAULT false,
  meta_description TEXT,
  view_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_resumes_slug ON resumes(slug);
CREATE INDEX IF NOT EXISTS idx_resumes_public ON resumes(is_public) WHERE is_public = true;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_resumes_updated_at 
    BEFORE UPDATE ON resumes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
