import { useEffect, useRef, useState } from 'react'
import profileImage from './assets/Peralta_Profile.png'
import projects from './data/projects.js'
import ProjectCard from './components/ProjectCard.jsx'
import ReflectiveCard from './components/ReflectiveCard.jsx'
import BlurText from './components/BlurText.jsx'
import SkillBadge from './components/SkillBadge.jsx'
import { FORMSPREE_ENDPOINT } from './config/contact.js'
import './components/BlurText.css'

const skillGroups = [
  {
    title: 'Web Development',
    skills: ['HTML & CSS', 'JavaScript', 'React', 'Vue.js', 'Responsive UI'],
  },
  {
    title: 'Backend & Databases',
    skills: ['Laravel', 'PHP', 'Firebase', 'SQL', 'MongoDB'],
  },
  {
    title: 'Mobile Development',
    skills: ['Android', 'CameraX', 'Google ML Kit'],
  },
  {
    title: 'IoT & Tools',
    skills: ['ESP32', 'PZEM-004T', 'Git & GitHub'],
  },
]

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? (
        <path d="M5 19 19 5m-9 0h9v9" />
      ) : (
        <path d="M3 12h18m-6-6 6 6-6 6" />
      )}
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copyError, setCopyError] = useState('')
  const [activeSection, setActiveSection] = useState('top')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const dialogRef = useRef(null)
  const openerRef = useRef(null)
  const professionalEmail = '2301107739@student.buksu.edu.ph'

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.4] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const skillsSection = document.querySelector('#skills')
    if (!skillsSection) return
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        skillsSection.classList.add('skills-visible')
      }
    }, { threshold: 0.25 })
    observer.observe(skillsSection)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedProject) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog?.querySelector('button')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
      if (event.key === 'Tab') {
        const focusable = dialog?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [selectedProject])

  const closeMenu = () => setMenuOpen(false)
  const openProject = (project, opener) => {
    openerRef.current = opener
    setSelectedProject(project)
  }
  const copyEmail = async () => {
    setCopyError('')
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }
      await navigator.clipboard.writeText(professionalEmail)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setCopiedEmail(false)
      setCopyError('Could not copy automatically. Select the email address and copy it manually.')
    }
  }
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: '' }))
    if (submitError) setSubmitError('')
    if (submitSuccess) setSubmitSuccess(false)
  }
  const validateForm = () => {
    const errors = {}
    const name = formValues.name.trim()
    const email = formValues.email.trim()
    const subject = formValues.subject.trim()
    const message = formValues.message.trim()

    if (name.length < 2) errors.name = 'Please enter at least 2 characters.'
    else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
    else if (email.length > 254) errors.email = 'Email must be 254 characters or fewer.'
    if (subject.length < 3) errors.subject = 'Please enter at least 3 characters.'
    else if (subject.length > 120) errors.subject = 'Subject must be 120 characters or fewer.'
    if (message.length < 10) errors.message = 'Please enter at least 10 characters.'
    else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }
  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)

    if (!validateForm()) return
    if (!FORMSPREE_ENDPOINT) {
      setSubmitError('The contact form is not configured yet. Please use the copy email option or try again later.')
      return
    }

    setIsSubmitting(true)
    const formData = new FormData()
    formData.set('name', formValues.name.trim())
    formData.set('email', formValues.email.trim())
    formData.set('subject', formValues.subject.trim())
    formData.set('message', formValues.message.trim())
    formData.set('_replyto', formValues.email.trim())
    formData.set('_subject', `Portfolio contact: ${formValues.subject.trim()}`)
    formData.set('_gotcha', '')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Formspree request failed')
      }

      setSubmitSuccess(true)
      setFormValues({ name: '', email: '', subject: '', message: '' })
      window.setTimeout(() => setSubmitSuccess(false), 8000)
    } catch {
      setSubmitError('Your message could not be sent. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="Go to top">
            <span>DP</span>
            <span className="brand-dot" />
          </a>

          <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
            <a className={activeSection === 'about' ? 'nav-active' : ''} href="#about" onClick={closeMenu}>About</a>
            <a className={activeSection === 'work' ? 'nav-active' : ''} href="#work" onClick={closeMenu}>Projects</a>
            <a className={activeSection === 'skills' ? 'nav-active' : ''} href="#skills" onClick={closeMenu}>Skills</a>
            <a className={activeSection === 'contact' ? 'nav-active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <BlurText as="p" text="Information Technology Student" className="eyebrow" />
            <BlurText as="h1" text="Dexter Ian E. Peralta" className="hero-name" />
            <BlurText as="p" text="I build practical web, mobile, and IoT systems that connect interfaces, databases, and connected devices." className="hero-intro" animateBy="block" />
            <div className="hero-actions" aria-label="Portfolio actions">
              <a className="hero-button hero-button-primary" href="#work"><BlurText as="span" text="View Projects" /></a>
              <a className="hero-button" href="#contact"><BlurText as="span" text="Contact Me" /></a>
            </div>
            <div className="hero-links" aria-label="Contact links">
              <a href={`mailto:${professionalEmail}`}><BlurText as="span" text="Email" /></a>
              <span aria-hidden="true">·</span>
              <BlurText as="span" text="GitHub / LinkedIn available on request" />
            </div>
            <div className="hero-availability">
              <span aria-hidden="true" />
              <BlurText as="span" text="Bukidnon, Philippines · Available for OJT" />
            </div>
          </div>

          <div className="portrait" role="img" aria-label="Dexter Peralta reflective profile card">
            <ReflectiveCard
              name="Dexter Peralta"
              role="Information Technology Student"
              badge="Portfolio"
              status="Available"
              idLabel="Based in"
              idValue="Bukidnon, PH"
              imageSrc={profileImage}
              width="100%"
              height="100%"
              radius={4}
            />
          </div>

          <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
            <BlurText as="span" text="Discover" />
            <span className="scroll-line" />
          </a>
        </section>

        <section className="timeline-section section" id="education">
          <BlurText as="div" text="01 Background" className="section-index" />
          <div className="timeline-grid">
            <article>
              <BlurText as="h2" text="Education" />
              <div className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <div>
                  <BlurText as="p" text="Current" className="timeline-date" />
                  <BlurText as="h3" text="Bachelor of Science in Information Technology" />
                  <BlurText as="p" text="Bukidnon State University" />
                </div>
              </div>
            </article>
            <article>
              <BlurText as="h2" text="Experience" />
              <div className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <div>
                  <BlurText as="p" text="College of Technologies SBO · Current" className="timeline-date" />
                  <BlurText as="h3" text="Technical Officer" />
                  <BlurText as="p" text="Supports technical systems and digital requirements for student organization activities." animateBy="block" />
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <div>
                  <BlurText as="p" text="College of Technologies SBO · Previous role" className="timeline-date" />
                  <BlurText as="h3" text="Property Custodian" />
                  <BlurText as="p" text="Managed responsibility for organization property and supported operational records." animateBy="block" />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="about section" id="about">
          <BlurText as="div" text="01 About me" className="section-index" />
          <div className="about-grid">
            <BlurText as="h2" text="Curious by nature, practical by design." className="about-heading" />
            <div className="about-copy">
              <BlurText as="p" text="I'm a BS Information Technology student at Bukidnon State University." className="lead" />
              <BlurText as="p" text="My projects include an IoT energy monitor, a college lost-and-found system, and an Android attendance app. I enjoy figuring out how the interface, database, and device work together to solve a problem." animateBy="block" />
              <BlurText as="p" text="Currently focused on software development, real-world applications, and finding opportunities to grow with a team." className="about-note" animateBy="block" />
              <a className="text-link" href="#contact">
                <BlurText as="span" text="Get in touch" /> <Arrow />
              </a>
            </div>
          </div>

        </section>

        <section className="work section" id="work">
          <div className="section-heading">
            <BlurText as="div" text="02 Projects" className="section-index" />
            <BlurText as="p" text="Academic projects" />
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.number} project={project} onOpen={openProject} />
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="skills-heading">
            <BlurText as="div" text="04 Capabilities" className="section-index" />
            <BlurText as="h2" text="Tools I'm learning and building with." className="skills-heading-title" />
          </div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <BlurText as="h3" text={group.title} />
                <ul>
                  {group.skills.map((skill) => (
                    <li className="skill-tag" key={skill}>
                      <SkillBadge skill={skill} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <BlurText as="div" text="05 Let's connect" className="section-index" />
          <div className="contact-main">
            <div>
              <BlurText as="h2" text="Open to learning, building, and growing." className="contact-heading" />
              <BlurText as="p" text="Have a project, opportunity, or question? Send me a message." className="contact-intro" animateBy="block" />
              <div className="contact-email">
                <a href={`mailto:${professionalEmail}`}><BlurText as="span" text={professionalEmail} /></a>
                <button type="button" onClick={copyEmail} aria-label="Copy email address">
                  <BlurText as="span" text={copiedEmail ? 'COPIED!' : 'COPY EMAIL'} />
                </button>
                <span className="copy-status" role="status" aria-live="polite">
                  {copiedEmail ? 'COPIED!' : copyError}
                </span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Name
                <input name="name" type="text" autoComplete="name" required minLength="2" maxLength="80"
                  value={formValues.name} onChange={handleFormChange}
                  aria-invalid={Boolean(fieldErrors.name)} aria-describedby="name-error" />
                {fieldErrors.name && <span className="field-error" id="name-error">{fieldErrors.name}</span>}
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required maxLength="254"
                  value={formValues.email} onChange={handleFormChange}
                  aria-invalid={Boolean(fieldErrors.email)} aria-describedby="email-error" />
                {fieldErrors.email && <span className="field-error" id="email-error">{fieldErrors.email}</span>}
              </label>
              <label>
                Subject
                <input name="subject" type="text" required minLength="3" maxLength="120"
                  value={formValues.subject} onChange={handleFormChange}
                  aria-invalid={Boolean(fieldErrors.subject)} aria-describedby="subject-error" />
                {fieldErrors.subject && <span className="field-error" id="subject-error">{fieldErrors.subject}</span>}
              </label>
              <label>
                Message
                <textarea name="message" rows="5" required minLength="10" maxLength="2000"
                  value={formValues.message} onChange={handleFormChange}
                  aria-invalid={Boolean(fieldErrors.message)} aria-describedby="message-error" />
                {fieldErrors.message && <span className="field-error" id="message-error">{fieldErrors.message}</span>}
              </label>
              <label className="honeypot" aria-hidden="true">
                Leave this field empty
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </label>
              <div className="form-status" role="status" aria-live="polite">
                {submitSuccess && <p className="success-status">MESSAGE SENT SUCCESSFULLY!</p>}
                {submitError && <p className="error-status">{submitError}</p>}
              </div>
              <button className="contact-submit" type="submit" disabled={isSubmitting}>
                <BlurText as="span" text={isSubmitting ? 'SENDING...' : submitSuccess ? 'MESSAGE SENT' : 'SEND MESSAGE'} />
                <span className="contact-arrow"><Arrow diagonal /></span>
              </button>
            </form>
          </div>
          <footer>
            <BlurText as="p" text="© 2026 Dexter Ian E. Peralta" />
            <div>
              <a href="#work"><BlurText as="span" text="Projects" /></a>
              <a href="#contact"><BlurText as="span" text="Contact" /></a>
              <a href={`mailto:${professionalEmail}`}><BlurText as="span" text="Email" /></a>
            </div>
          </footer>
        </section>
      </main>

      {selectedProject && (
        <div
          className="project-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null)
          }}
        >
          <div
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            ref={dialogRef}
          >
            <div className="project-dialog-bar">
              <BlurText as="span" text={`${selectedProject.name} / Project details`} />
              <button
                type="button"
                className="project-dialog-close"
                aria-label={`Close ${selectedProject.name} details`}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
            </div>
            <div className="project-dialog-body">
              {selectedProject.image && (
                <div className="project-dialog-image">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.name} project screenshot`}
                  />
                </div>
              )}
              <div className="project-dialog-content">
                <BlurText as="p" text={selectedProject.category} className="project-dialog-category" />
                <BlurText as="h2" text={selectedProject.name} className="project-dialog-heading" id="project-dialog-title" />
                <BlurText as="p" text={selectedProject.title} className="project-dialog-title" />
                <div>
                  <BlurText as="h3" text="Overview" />
                  <BlurText as="p" text={selectedProject.description} animateBy="block" />
                </div>
                <div>
                  <BlurText as="h3" text="My contribution" />
                  <BlurText as="p" text={selectedProject.contribution} animateBy="block" />
                </div>
                <div>
                  <BlurText as="h3" text="Tech stack" />
                  <ul className="project-technologies" aria-label="Technologies">
                    {selectedProject.technologies.map((technology) => (
                      <li key={technology}>
                        <BlurText as="span" text={technology} />
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedProject.links?.length > 0 && (
                  <div className="project-dialog-links">
                    {selectedProject.links.map((link) => (
                      <a
                        className="project-action"
                        href={link.url}
                        key={link.label}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <BlurText as="span" text={link.label} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
