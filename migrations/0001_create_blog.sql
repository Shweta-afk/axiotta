CREATE TABLE IF NOT EXISTS posts (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL DEFAULT '',
  content     TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'General',
  tags        TEXT NOT NULL DEFAULT '[]',   -- JSON array stored as text
  author      TEXT NOT NULL DEFAULT 'Axiotta Team',
  cover_image TEXT,
  published   INTEGER NOT NULL DEFAULT 0,   -- 0 = draft, 1 = published
  reading_time INTEGER NOT NULL DEFAULT 1,
  published_at TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_slug      ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at);

-- Seed data
INSERT OR IGNORE INTO posts VALUES (
  '1',
  'ai-powered-npa-recovery',
  'How AI is Transforming NPA Recovery in India',
  'Discover how machine-learning models are cutting average time-to-recovery by 40% while keeping every step RBI-compliant.',
  '<p>Non-Performing Assets (NPAs) remain one of the most pressing challenges for Indian banks, NBFCs, and fintechs. Traditional recovery methods are slow, paper-heavy, and often legally fragile. Artificial intelligence is changing that equation dramatically.</p><h2>Predictive Risk Scoring</h2><p>Modern AI models ingest hundreds of data signals — repayment history, bureau scores, cash-flow patterns, even behavioural metadata — to produce a real-time risk score for each borrower account. This lets recovery teams triage intelligently: high-propensity payers receive digital nudges, while complex cases are routed to specialist agents immediately.</p><h2>Automated Compliance Guardrails</h2><p>RBI guidelines require specific notice timelines, language standards, and channel protocols. AI-driven workflow engines enforce these guardrails automatically, generating audit-ready logs for every interaction — eliminating the compliance risk that sinks manual operations.</p><h2>Results We Are Seeing</h2><p>Across our client portfolio, AI-assisted recovery has delivered a 38% reduction in Days-Past-Due (DPD) and a 95%+ legal compliance rate. The technology does not replace field agents — it makes each agent 3x more effective by surfacing the right action at the right moment.</p><p>If you would like to explore what an AI-native recovery stack could look like for your institution, <a href="/#contact">reach out to our team</a>.</p>',
  'Technology',
  '["AI","NPA","Recovery","Fintech"]',
  'Axiotta Team',
  NULL,
  1,
  4,
  datetime('now', '-7 days'),
  datetime('now', '-7 days')
);

INSERT OR IGNORE INTO posts VALUES (
  '2',
  'rbi-compliance-guide-2025',
  'RBI Compliance for Recovery Teams: A Plain-Language Guide',
  'A clear breakdown of what your recovery operation must do to stay on the right side of the regulator — no jargon.',
  '<p>The Reserve Bank of India sets strict rules for ethical recovery practice. Non-compliance is not just a reputational risk — it can lead to regulatory action, licence suspension, and civil liability. Here is what every recovery manager needs to know.</p><h2>Notice Requirements</h2><p>Before initiating any outreach, lenders must issue a formal demand notice with a minimum seven-day response window. The notice must be in the borrower preferred language (if declared), reference the specific account, and clearly state the outstanding amount inclusive of all charges.</p><h2>Contact Hour Restrictions</h2><p>Agent contact is permitted only between 07:00 and 19:00 local time. Calls outside this window, regardless of consent, are a per-se violation. Automated diallers must carry timezone intelligence to enforce this.</p><h2>Documentation and Audit Trails</h2><p>Every communication — SMS, email, call, physical notice — must be logged with timestamps, content summaries, and agent IDs. Audit records must be retained for a minimum of five years.</p><h2>How Axiotta Helps</h2><p>Our platform was built compliance-first. Every workflow has RBI guardrails baked in, and our reporting module produces regulator-ready audit packages on demand. <a href="/#contact">Book a demo</a> to see it in action.</p>',
  'Compliance',
  '["RBI","Compliance","Regulation"]',
  'Axiotta Legal Desk',
  NULL,
  1,
  5,
  datetime('now', '-14 days'),
  datetime('now', '-14 days')
);

INSERT OR IGNORE INTO posts VALUES (
  '3',
  'digital-channels-recovery',
  'Digital Channels Are Winning the Recovery Race — Here Is Why',
  'WhatsApp, email, and app-based nudges are outperforming phone calls in settlement rate. The data tells a clear story.',
  '<p>For decades, the telephone call dominated debt recovery. In 2024 and 2025, that dynamic has reversed — and the data is striking.</p><h2>Why Digital Wins</h2><p>Borrowers increasingly prefer async communication. A WhatsApp message can be read at a convenient moment; a phone call demands immediate attention and often triggers defensive reactions. Our tests across 50,000+ recovery contacts show digital-first outreach achieves a 22% higher promise-to-pay rate compared to call-first sequences.</p><h2>The Channel Stack That Works</h2><p>The highest-performing recovery journeys layer channels intelligently: an initial SMS with a payment link, followed by a WhatsApp message 48 hours later if unpaid, an in-app notification at day 5, and a human call only at day 8.</p><h2>Personalisation Is the Differentiator</h2><p>Generic messages convert poorly. Personalised messages — referencing the borrower name, the specific loan product, and the exact amount due — convert 3x better. Modern CRM platforms make this personalisation automatic, not manual.</p><p>Axiotta orchestrates these multi-channel journeys automatically, with full RBI compliance at every step. <a href="/#contact">Get in touch</a> to learn more.</p>',
  'Strategy',
  '["Digital","WhatsApp","Recovery Strategy","Fintech"]',
  'Axiotta Team',
  NULL,
  1,
  4,
  datetime('now', '-21 days'),
  datetime('now', '-21 days')
);
