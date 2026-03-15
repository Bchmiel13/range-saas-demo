INSERT INTO organizations (id, name, slug, status)
VALUES ('11111111-1111-1111-1111-111111111111', 'Strzelnica Alpha', 'strzelnica-alpha', 'active')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO subscriptions (organization_id, billing_period, status, price_gross)
SELECT '11111111-1111-1111-1111-111111111111', 'YEARLY', 'active', 1999.00
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE organization_id = '11111111-1111-1111-1111-111111111111');

INSERT INTO users (organization_id, email, password_hash, role, first_name, last_name)
VALUES
  (NULL, 'admin@system.pl', 'demo', 'SUPERADMIN', 'Super', 'Admin'),
  ('11111111-1111-1111-1111-111111111111', 'admin@alpha.pl', 'demo', 'RANGE_ADMIN', 'Jan', 'Kowalski'),
  ('11111111-1111-1111-1111-111111111111', 'user@alpha.pl', 'demo', 'USER', 'Anna', 'Nowak')
ON CONFLICT (email) DO NOTHING;
