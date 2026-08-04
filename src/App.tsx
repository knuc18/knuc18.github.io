import { HexFloat } from './components/canvasui/HexFloat'
import './portfolio.css'

const NAV_LINKS = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Certifications', '#certs'],
  ['Contact', '#contact'],
] as const

const STATS = [
  ['14+', 'Years Shipping'],
  ['5', 'Global Companies'],
  ['3', 'Platforms Mastered'],
  ['2', 'Microsoft Certs'],
] as const

const EXPERIENCE = [
  {
    range: 'Feb 2023 — Present',
    title: 'Associate Director',
    org: 'SGV & Co.',
    sub: 'EY Philippines',
    body: 'Technical Architect & Low-code Manager — leading delivery teams, architecture and project management for enterprise clients.',
  },
  {
    range: 'Oct 2021 — Jan 2023',
    title: 'OutSystems Developer',
    org: 'Go Car Finance',
    sub: 'Auckland, NZ · offshore',
    body: 'Built and supported the Customer Care View portal, a native mobile app, a Payment Holiday workflow (SMS API, Zapier, Typeform) and a license-mitigation sync tool — plus production support and root-cause analysis.',
  },
  {
    range: 'Jul 2019 — Oct 2021',
    title: 'Intelligent Automation Developer',
    org: 'SGV & Co.',
    sub: 'EY Philippines',
    body: 'OutSystems Developer and Robotics Process Automation Lead. Lead developer of the Client Monitoring Database — used by 3,000 client-serving employees; ran UiPath hothousing for a global tire company and Blue Prism solution design for external clients.',
  },
  {
    range: 'Aug 2017 — Mar 2019',
    title: 'RPA Specialist (Blue Prism)',
    org: 'Sony Global Business Services',
    sub: '',
    body: 'Built and ran the robotic workforce for financial processes across regions — AP invoice processing, SAP automation, and RPA integration with internal web systems.',
  },
  {
    range: 'Oct 2015 — Jun 2017',
    title: 'EUDA Developer (External Consultant)',
    org: 'Deutsche Bank',
    sub: '',
    body: 'Process Optimization Program — designed, built and enhanced End-User Developed Applications (EUDA) tools on MS Access, Excel and VBA, working with business analysts and project managers.',
  },
  {
    range: 'Jan 2011 — Jan 2015',
    title: 'End User Computing Management Lead',
    org: 'Citi',
    sub: '',
    body: 'Solutions Specialist (Assistant Manager), Citibank NA ROHQ — primary contact for global EUC standards across Financial Reporting Operations Manila Centre; designed, developed and supported EUC apps for business units.',
  },
]

const PROJECTS = [
  {
    org: 'Go Car Finance',
    title: 'Customer Care View Portal',
    body: 'Customer-service portal for a NZ vehicle-finance company, with a Payment Holiday workflow integrating SMS, Zapier and Typeform.',
    tags: ['OutSystems', 'SMS API', 'Zapier'],
  },
  {
    org: 'Go Car Finance',
    title: 'Native Mobile App',
    body: 'Customer-facing native mobile application for the lending business — built, enhanced and supported in production.',
    tags: ['OutSystems', 'Native Mobile'],
  },
  {
    org: 'SGV & Co.',
    title: 'Client Monitoring Database',
    body: "Workflow tool tracking clients' financial statements from preparation to release — used by 3,000 client-serving employees. Lead developer.",
    tags: ['OutSystems', 'Lead Dev'],
  },
  {
    org: 'Sony GBS',
    title: 'AP Invoice Automation',
    body: 'Robotic workforce automating invoice processing, SAP tasks and internal web systems across multiple regions.',
    tags: ['Blue Prism', 'SAP'],
  },
]

const SKILLS = [
  ['Low-Code', ['OutSystems', 'Power Apps', 'Power Automate']],
  ['Cloud & AI', ['Azure', 'Azure AI', 'OpenAI Codex', 'Claude Code']],
  ['Automation', ['Blue Prism · UiPath', 'VBA / MS Access', 'SQL']],
  ['Leadership', ['Architecture', 'Project Management', 'Agile · Scrum · RAD']],
] as const

const CERTS = [
  ['Microsoft Certified: Power Platform Fundamentals', 'PL-900 · Microsoft'],
  ['Microsoft Certified: Azure Fundamentals', 'AZ-900 · Microsoft'],
] as const

function App() {
  return (
    <HexFloat
      size={150}
      tilt={10}
      perspective={0.25}
      float={0.15}
      shine={0.5}
      radius={280}
      flow={1.2}
      swirl={5}
      trail={0.4}
      bloom={0.25}
      grain={0.4}
      iridescence={0.3}
      gapColor="auto"
      style={{ height: '100vh', width: '100%', background: 'var(--surface-page)' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '22px 44px',
          background: 'var(--surface-page)',
          borderBottom: 'var(--border-w) solid var(--border-color)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: 2,
            color: 'var(--text-body)',
          }}
        >
          KEVIN NUCUM
        </span>
        <div style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 'none' }}>
          <span className="op-badge" style={{ whiteSpace: 'nowrap', flex: 'none' }}>
            Open to work
          </span>
        </div>
      </div>

      <div style={{ padding: '64px 44px', maxWidth: 1100, margin: '0 auto' }}>
        <span className="op-kicker">Software Developer · AI Automation · Consulting</span>
        <h1 className="op-display" style={{ margin: '16px 0 8px' }}>
          Kevin Nucum
        </h1>
        <span className="op-accent" style={{ fontSize: 'var(--fs-accent-word)' }}>
          Vibe Coder
        </span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '18px 0' }}>
          {['Software Developer', 'AI Automation Builder', 'Technical Architect', 'Engineering Lead'].map((r) => (
            <span key={r} className="op-tag">
              {r}
            </span>
          ))}
        </div>
        <p className="op-body" style={{ maxWidth: 680, margin: '18px 0 32px' }}>
          I turn messy business processes into scalable systems. 14+ years building enterprise apps, automation
          platforms and AI-powered workflows across finance, consulting and global teams — with OutSystems, Azure,
          Power Platform, and AI-assisted engineering.
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 56 }}>
          <a href="#projects" className="op-btn">
            View Projects
          </a>
          <a href="mailto:kjnucum@gmail.com" className="op-btn ghost">
            Get In Touch
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 96 }}>
          {STATS.map(([num, lbl]) => (
            <div key={lbl} className="op-stat">
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>

        <section id="experience" style={{ marginBottom: 96 }}>
          <span className="op-kicker">01 / Experience</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
            {EXPERIENCE.map((e) => (
              <div key={e.title + e.range} className="op-card">
                <span className="op-kicker">{e.range}</span>
                <h3 className="op-heading" style={{ margin: '8px 0 2px' }}>
                  {e.title}
                </h3>
                <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 10 }}>
                  {e.org}
                  {e.sub ? ` · ${e.sub}` : ''}
                </div>
                <p className="op-body">{e.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" style={{ marginBottom: 96 }}>
          <span className="op-kicker">02 / Projects</span>
          <h2 className="op-heading" style={{ margin: '8px 0 24px' }}>
            Selected client work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {PROJECTS.map((p) => (
              <div key={p.title} className="op-card">
                <span className="op-kicker">{p.org}</span>
                <h3 className="op-heading" style={{ margin: '8px 0' }}>
                  {p.title}
                </h3>
                <p className="op-body" style={{ marginBottom: 14 }}>
                  {p.body}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tags.map((t) => (
                    <span key={t} className="op-tag accent">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" style={{ marginBottom: 96 }}>
          <span className="op-kicker">03 / Skills & Education</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '24px 0' }}>
            {SKILLS.map(([cat, items]) => (
              <div key={cat} className="op-card">
                <h3 className="op-heading" style={{ fontSize: 18, marginBottom: 12 }}>
                  {cat}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {items.map((i) => (
                    <span key={i} className="op-body" style={{ fontSize: 14 }}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="op-body">
            Holy Angel University — B.Sc. Information Technology
            <br />
            <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>2005 – 2009 · Pampanga, Philippines</span>
          </p>
        </section>

        <section id="certs" style={{ marginBottom: 96 }}>
          <span className="op-kicker">04 / Certifications</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 24 }}>
            {CERTS.map(([title, sub]) => (
              <div key={title} className="op-card">
                <h3 className="op-heading" style={{ fontSize: 18, marginBottom: 6 }}>
                  {title}
                </h3>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{sub}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" style={{ marginBottom: 64 }}>
          <span className="op-kicker">05 / What's Next</span>
          <h2 className="op-display" style={{ fontSize: 40, margin: '8px 0 12px' }}>
            Let's build something.
          </h2>
          <p className="op-body" style={{ maxWidth: 560, marginBottom: 24 }}>
            Open to consulting, architecture and AI-automation work — for recruiters and clients alike.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="mailto:kjnucum@gmail.com" className="op-btn">
              kjnucum@gmail.com
            </a>
            <a href="https://github.com/kevinnucum">GitHub</a>
            <a href="https://www.linkedin.com/in/kevin-nucum">LinkedIn</a>
          </div>
        </section>

        <footer
          style={{
            borderTop: 'var(--border-w) solid var(--border-color)',
            paddingTop: 24,
            color: 'var(--text-muted)',
            fontSize: 13,
          }}
        >
          Designed & built by Kevin Nucum · © 2026
        </footer>
      </div>
    </HexFloat>
  )
}

export default App
