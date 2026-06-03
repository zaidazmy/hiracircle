/* Hira Circle — landing app */

const {
  useState, useEffect, useMemo, useRef,
} = React;

/* ── Icons (line, original) ───────────────────────────────── */
const Icon = {
  Spark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" />
    </svg>
  ),
  Network: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v3.6M10.2 12l-4 4.2M13.8 12l4 4.2" />
    </svg>
  ),
  Root: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4v8M9 6c0 1.5 1 2 3 2s3-.5 3-2M12 12c0 5-4 6-7 8M12 12c0 5 4 6 7 8M12 12c0 4 0 6 0 9" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  ),
  Book: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4V4zM20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6V4z" />
    </svg>
  ),
  Infinity: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 12c-2 0-4-1.6-4-4s2-4 4-4c3 0 5 8 8 8s4-1.6 4-4-2-4-4-4-5 8-8 8z" />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" />
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>
    </svg>
  ),
  Bookmark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 4h12v17l-6-4-6 4V4z" />
    </svg>
  ),
  Cog: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </svg>
  ),
};

/* ── Nav ──────────────────────────────────────────────────── */
const Nav = () => (
  <nav className="nav">
    <div className="container nav-inner">
      <a href="#top" className="nav-brand">
        <QMark size={32} className="qmark" />
        <span className="word">Hira<span>Circle</span></span>
      </a>
      <div className="nav-links">
        <a href="#idea">The Idea</a>
        <a href="#masoorat">Masoorat</a>
        <a href="#essence">Essence</a>
        <a href="#subscribe" className="nav-pill">
          Get notified <Icon.Arrow width="14" height="14" />
        </a>
      </div>
    </div>
  </nav>
);

/* ── Hero ─────────────────────────────────────────────────── */
const Hero = ({ motion, variant }) => {
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          A new ecosystem · Quiet launch 2026
        </div>

        <div className="hero-mark-wrap">
          <div className="halo" />
          <QMark size={220} className={`hero-mark motion-${motion}`} />
        </div>

        {variant === 'split' ? (
          <h1>
            <span className="gradient">Hira</span>Circle
          </h1>
        ) : variant === 'mono' ? (
          <h1>Hira Circle</h1>
        ) : (
          <h1 style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Hira Circle
          </h1>
        )}

        <p className="hero-tag">
          Certainty <em>·</em> Connection <em>·</em> Impact
        </p>

        <p className="hero-sub">
          A quiet ecosystem for the modern Muslim — built around what matters,
          designed for how we actually live.
        </p>

        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </div>
    </section>
  );
};

/* ── The Idea ─────────────────────────────────────────────── */
const Idea = () => (
  <section id="idea" className="section idea">
    <div className="section-rule" />
    <div className="container">
      <span className="kicker">The Idea</span>
      <h2>Faith doesn't compete with craft.</h2>
      <p className="lede">
        Hira Circle is a family of tools, spaces, and products built on a simple belief:
        faith doesn't need to compete with beauty, depth, or modern craft. We're building
        things that hold up — for the heart, the mind, and the home.
      </p>
      <p className="lede" style={{ marginTop: 22, color: 'var(--ink-dim)' }}>
        More will be revealed in time. For now, the first piece is almost ready.
      </p>
      <div className="end-mark">◆</div>
    </div>
  </section>
);

/* ── Masoorat phone mockup ────────────────────────────────── */
const PhoneMockup = () => (
  <div className="phone">
    <div className="phone-notch" />
    <div className="phone-screen">
      <div className="phone-status">
        <span>5:42 AM</span>
        <span>•••</span>
      </div>
      <div className="phone-body">
        <div className="phone-greet">Adhkār as-Sabāḥ · Morning</div>
        <div className="phone-h">Today's remembrance</div>
        <div className="phone-progress">
          <span className="fill" />
          <span className="fill" />
          <span className="fill" style={{ background: 'linear-gradient(90deg, #6B2FB8, rgba(255,255,255,0.08))' }} />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="dhikr-card">
          <div className="num">3</div>
          <div className="ar">
            بِسْمِ ٱللَّٰهِ ٱلَّذِي لَا يَضُرُّ
          </div>
          <div className="tr">
            In the name of Allah, with whose name nothing on earth or in the heavens can cause harm,
            and He is the All-Hearing, All-Knowing.
          </div>
          <div className="repeat">
            <span>Repeat</span>
            <span className="count">
              <b>2</b> / 3
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>

        <div className="dhikr-card" style={{ opacity: 0.55 }}>
          <div className="num" style={{ background: 'rgba(255,255,255,0.08)' }}>4</div>
          <div className="ar" style={{ fontSize: 22 }}>
            رَضِيتُ بِٱللَّٰهِ رَبًّا
          </div>
          <div className="tr">
            I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my prophet.
          </div>
        </div>
      </div>
      <div className="phone-tabs">
        <div className="tab active"><Icon.Home width="20" height="20" /></div>
        <div className="tab"><Icon.Book width="20" height="20" /></div>
        <div className="tab"><Icon.Bookmark width="20" height="20" /></div>
        <div className="tab"><Icon.Cog width="20" height="20" /></div>
      </div>
    </div>
  </div>
);

const Masoorat = () => (
  <section id="masoorat" className="section masoorat">
    <div className="container masoorat-grid">
      <div className="phone-stage">
        <div className="glow" />
        <div className="float-badge tl">
          <div className="icon"><Icon.Book width="14" height="14" /></div>
          Faithful sources · Al-Maʾthūrāt
        </div>
        <PhoneMockup />
        <div className="float-badge br">
          <div className="icon"><Icon.Globe width="14" height="14" /></div>
          Tamil · English · More to follow
        </div>
      </div>

      <div className="masoorat-meta">
        <span className="kicker">Coming first</span>
        <h2 style={{ marginBottom: 0 }}>Masoorat Global</h2>
        <p className="app-tagline">The daily adhkār, beautifully done.</p>
        <p className="app-body">
          A bilingual companion for the morning and evening remembrances — Sughrā and
          Kubrā — designed to be opened every day without friction. Clean typography,
          faithful sources, and a reading experience that respects both the text and
          your time.
        </p>

        <div className="app-meta-row">
          <span className="meta-chip"><span className="dotg" /> Launching soon</span>
          <span className="meta-chip"><span className="dotg" /> iOS · Android</span>
          <span className="meta-chip"><span className="dotg" /> Bilingual</span>
        </div>

        <p className="app-free">
          <strong>Free at launch.</strong> Built with care by the Hira Circle team.
        </p>
      </div>
    </div>
  </section>
);

/* ── Brand essence ────────────────────────────────────────── */
const Essence = () => {
  const items = [
    { icon: <Icon.Spark width="32" height="32" />,    title: 'Certainty',             body: 'Calm conviction rooted in source, not surface.' },
    { icon: <Icon.Network width="32" height="32" />,  title: 'Connected Ecosystem',   body: 'A family of products that speak to each other, by design.' },
    { icon: <Icon.Root width="32" height="32" />,     title: 'Rooted in Faith',        body: 'Every choice — from copy to craft — sits on a deep root.' },
    { icon: <Icon.Globe width="32" height="32" />,    title: 'Global Vision',          body: 'Built for the global ummah; starting from where we are.' },
    { icon: <Icon.Book width="32" height="32" />,     title: 'Knowledge & Growth',     body: 'Daily use, lasting depth. Tools that move you forward.' },
    { icon: <Icon.Infinity width="32" height="32" />, title: 'Infinite Possibilities', body: 'A platform, not a product. The first piece is almost here.' },
  ];
  return (
    <section id="essence" className="section">
      <div className="container">
        <span className="kicker">Brand Essence</span>
        <h2>Six ideas, one direction.</h2>
        <p className="lede">
          These aren't features. They're the posture we design from — the quiet
          standards every product in Hira Circle is measured against.
        </p>
        <div className="essence-grid">
          {items.map((it) => (
            <div className="essence-cell" key={it.title}>
              <div className="icon">{it.icon}</div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Subscribe ────────────────────────────────────────────── */
const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email.'); return;
    }
    setError('');
    setSubmitted(true);
  };
  return (
    <section id="subscribe" className="section subscribe">
      <div className="container">
        <span className="kicker">Stay in the loop</span>
        <h2>Be there on day one.</h2>
        <p className="lede" style={{ margin: '0 auto' }}>
          We'll send one email when Masoorat Global is live. No newsletter, no noise —
          just the launch, and the occasional note when something new is ready.
        </p>

        <div className="subscribe-card">
          {!submitted ? (
            <>
              <h3>Notify me when it's live.</h3>
              <p>One email. That's the whole promise.</p>
              <form className="subscribe-form" onSubmit={onSubmit}>
                <input
                  type="email"
                  placeholder="you@somewhere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  Notify me <Icon.Arrow width="14" height="14" />
                </button>
              </form>
              <p className="subscribe-fine">
                {error ? <span style={{ color: '#FFB0B0' }}>{error}</span> : <>We respect your inbox. Unsubscribe anytime.</>}
              </p>
            </>
          ) : (
            <>
              <h3>You're on the list.</h3>
              <p>We'll write once — when Masoorat Global goes live. Until then, salām and quiet seasons.</p>
              <div className="subscribe-success">
                <Icon.Check />
                <span>{email}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Footer ───────────────────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="row">
            <QMark size={28} />
            <span className="footer-word">Hira<em>Circle</em></span>
          </div>
          <small>Mawanella, Sri Lanka</small>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <strong>Soon</strong>
            <a href="#masoorat">Masoorat Global</a>
            <a href="#">More to follow</a>
          </div>
          <div className="footer-col">
            <strong>Brand</strong>
            <a href="#idea">The Idea</a>
            <a href="#essence">Essence</a>
          </div>
          <div className="footer-col">
            <strong>Contact</strong>
            <a href="mailto:hello@hiracircle.com">hello@hiracircle.com</a>
            <a href="#">Instagram · X</a>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <span>© 2026 Hira Circle. Built with care.</span>
        <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
      </div>
    </div>
  </footer>
);

/* ── App ──────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "background": "aurora",
  "motion": "float",
  "heroVariant": "gradient",
  "accent": ["#6B2FB8", "#8A4FE0", "#C9B0FF"]
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  ["#6B2FB8", "#8A4FE0", "#C9B0FF"], // violet
  ["#3A4BD6", "#5B6CF0", "#AEB8FF"], // indigo
  ["#8E2F9A", "#B14FBE", "#E1B0E8"], // plum
];

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.theme);
    const accent = tweaks.accent || ACCENT_OPTIONS[0];
    const [c600, c500, c300] = accent;
    root.style.setProperty('--violet-300', c300);
    root.style.setProperty('--violet-400', c500);
    root.style.setProperty('--violet-500', c500);
    root.style.setProperty('--violet-600', c600);
    root.style.setProperty('--violet-700', c600);
    root.style.setProperty('--grad', `linear-gradient(135deg, ${c600} 0%, ${c500} 45%, ${c300} 100%)`);
  }, [tweaks.theme, tweaks.accent]);

  return (
    <div className={`page ${tweaks.background === 'grid' ? 'bg-grid' : ''}`}>
      {tweaks.background !== 'solid' && <div className="aurora" />}
      <Nav />
      <main>
        <Hero motion={tweaks.motion} variant={tweaks.heroVariant} />
        <Idea />
        <Masoorat />
        <Essence />
        <Subscribe />
      </main>
      <Footer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Surface">
          <window.TweakRadio
            label="Theme"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
          />
          <window.TweakRadio
            label="Background"
            value={tweaks.background}
            onChange={(v) => setTweak('background', v)}
            options={[
              { value: 'aurora', label: 'Aurora' },
              { value: 'grid',   label: 'Grid' },
              { value: 'solid',  label: 'Solid' },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection label="Brand">
          <window.TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
        </window.TweakSection>

        <window.TweakSection label="Hero">
          <window.TweakRadio
            label="Wordmark"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
            options={[
              { value: 'gradient', label: 'Gradient' },
              { value: 'split',    label: 'Split' },
              { value: 'mono',     label: 'Mono' },
            ]}
          />
          <window.TweakRadio
            label="Mark motion"
            value={tweaks.motion}
            onChange={(v) => setTweak('motion', v)}
            options={[
              { value: 'float',  label: 'Float' },
              { value: 'rotate', label: 'Rotate' },
              { value: 'pulse',  label: 'Pulse' },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
