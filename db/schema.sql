CREATE TABLE IF NOT EXISTS contact_leads (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  integration text NOT NULL DEFAULT '',
  platform text NOT NULL DEFAULT '',
  maturity text NOT NULL DEFAULT '',
  priority text NOT NULL DEFAULT '',
  employees text NOT NULL DEFAULT '',
  deadline text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  message text NOT NULL,
  diagnostic_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS integration text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS platform text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS maturity text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS employees text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS deadline text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS details text NOT NULL DEFAULT '';
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS diagnostic_data jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx
  ON contact_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_leads_email_idx
  ON contact_leads (email);

CREATE INDEX IF NOT EXISTS contact_leads_project_type_idx
  ON contact_leads (project_type);
