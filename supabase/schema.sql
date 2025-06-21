CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE disasters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  location_name TEXT,
  location GEOGRAPHY(Point),
  description TEXT,
  tags TEXT[],
  owner_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  audit_trail JSONB
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  disaster_id INTEGER REFERENCES disasters(id),
  user_id TEXT,
  content TEXT,
  image_url TEXT,
  verification_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  disaster_id INTEGER REFERENCES disasters(id),
  name TEXT,
  location_name TEXT,
  location GEOGRAPHY(Point),
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cache (
  key TEXT PRIMARY KEY,
  value JSONB,
  expires_at TIMESTAMPTZ
);

CREATE INDEX disasters_location_idx ON disasters USING GIST(location);
CREATE INDEX resources_location_idx ON resources USING GIST(location);
CREATE INDEX disasters_tags_idx ON disasters USING GIN(tags);
CREATE INDEX disasters_owner_idx ON disasters(owner_id);
