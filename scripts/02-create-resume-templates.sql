-- Create resume templates table
CREATE TABLE IF NOT EXISTS resume_templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  preview_image VARCHAR(255),
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO resume_templates (id, name, description, is_premium) VALUES
('modern', 'Modern Professional', 'Clean and contemporary design perfect for tech and business roles', false),
('classic', 'Classic Traditional', 'Timeless format suitable for conservative industries', false),
('creative', 'Creative Designer', 'Bold and artistic layout for creative professionals', false),
('minimal', 'Minimal Clean', 'Simple and elegant design focusing on content', false),
('executive', 'Executive Premium', 'Sophisticated layout for senior-level positions', true)
ON CONFLICT (id) DO NOTHING;
