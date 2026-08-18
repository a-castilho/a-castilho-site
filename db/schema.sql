CREATE TABLE IF NOT EXISTS contact_leads (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  message text NOT NULL,
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx
  ON contact_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_leads_email_idx
  ON contact_leads (email);
