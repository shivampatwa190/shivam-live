import { useState, useEffect, useRef } from 'react'
import './App.css'  // Make sure this import is present

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

  // Personal information - UPDATE THIS WITH YOUR DETAILS
  const personalInfo = {
    name: "Shivam Patwa",
    title: "IT Student & Fullstack Developer",
    email: "shivam.patwa5062736@ves.ac.in",
    phone: "+91 9594535360",
    location: "Mumbai, India",
    birthDate: "15 March 2004",
    college: "Vivekanand Education Society's Institute of Technology",
    collegeYear: "2022-2026",
    collegeCgpa: "8.7 CGPA",
    jrCollege: "Swami Vivekanand Vidyalaya",
    jrCollegeYear: "2020-2022",
    jrCollegePercentage: "85%",
    school: "St. Xavier's High School",
    schoolYear: "2010-2020",
    schoolPercentage: "92%",
    // Update these with your actual image paths
    profileImage: "/images/profile.jpeg",
    resumeLink: "/resume.pdf",
    socialMedia: {
      github: { url: "https://github.com/shivampatwa190", icon: "🐙", name: "GitHub" },
      linkedin: { url: "https://linkedin.com/in/shivampatwa", icon: "🔗", name: "LinkedIn" },
      twitter: { url: "https://twitter.com/shivampatwa", icon: "🐦", name: "Twitter" },
      instagram: { url: "https://instagram.com/kabir_v5", icon: "📷", name: "Instagram" },
      facebook: { url: "https://facebook.com/shivampatwa", icon: "📘", name: "Facebook" },
      leetcode: { url: "https://leetcode.com/shivampatwa", icon: "⚡", name: "LeetCode" },
      hackerrank: { url: "https://hackerrank.com/shivampatwa", icon: "💻", name: "HackerRank" },
      whatsapp: { url: "https://wa.me/919876543210", icon: "📱", name: "WhatsApp" }
    }
  }

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Portfolio Website 3D",
      description: "Interactive 3D portfolio with animations and modern design",
      fullDescription: "A cutting-edge portfolio website featuring 3D animations, particle effects, and interactive elements.",
      technologies: ["React", "Three.js", "Framer Motion", "CSS3"],
      github: "https://github.com/shivampatwa/3d-portfolio",
      live: "https://shivam-portfolio-3d.vercel.app",
      image: "/images/portfolio.webp",
      date: "Jan 2026",
      features: [
        "3D animated background",
        "Interactive particle effects",
        "Smooth scroll animations",
        "Fully responsive design"
      ]
    },
    {
      id: 2,
      title: "E-Learning Platform",
      description: "Full-stack educational platform with course management",
      fullDescription: "Developed a comprehensive e-learning platform with user authentication and course management.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/shivampatwa/elearning",
      live: "https://elearn-shivam.vercel.app",
      image: "/images/elearning.jpg",
      date: "Dec 2025",
      features: [
        "User authentication",
        "Course creation",
        "Video streaming",
        "Payment integration"
      ]
    },
    {
      id: 3,
      title: "Smart Task Manager",
      description: "AI-powered task management application",
      fullDescription: "An intelligent task management app that uses machine learning to prioritize tasks.",
      technologies: ["React", "Python", "TensorFlow.js", "Firebase"],
      github: "https://github.com/shivampatwa/taskmanager",
      live: "https://tasksmart.vercel.app",
      image: "/images/taskmanager.jpg",
      date: "Oct 2025",
      features: [
        "AI task prioritization",
        "Smart scheduling",
        "Productivity analytics"
      ]
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather app with interactive maps",
      fullDescription: "Comprehensive weather application with real-time data and forecasts.",
      technologies: ["React", "D3.js", "OpenWeather API"],
      github: "https://github.com/shivampatwa/weather",
      live: "https://weather-shivam.vercel.app",
      image: "/images/weather.jpg",
      date: "Aug 2025",
      features: [
        "Real-time weather",
        "Interactive maps",
        "7-day forecast"
      ]
    }
  ]

  // Skills data
  const skills = [
    { name: "HTML5", level: 95, category: "Frontend", color: "#E44D26" },
    { name: "CSS3", level: 90, category: "Frontend", color: "#1572B6" },
    { name: "JavaScript", level: 88, category: "Frontend", color: "#F7DF1E" },
    { name: "React", level: 85, category: "Frontend", color: "#61DAFB" },
    { name: "Node.js", level: 75, category: "Backend", color: "#339933" },
    { name: "Python", level: 80, category: "Backend", color: "#3776AB" },
    { name: "Java", level: 82, category: "Backend", color: "#007396" },
    { name: "MongoDB", level: 70, category: "Database", color: "#47A248" },
    { name: "SQL", level: 75, category: "Database", color: "#4479A1" },
    { name: "Git", level: 88, category: "Tools", color: "#F05032" },
    { name: "Docker", level: 65, category: "Tools", color: "#2496ED" },
    { name: "AWS", level: 60, category: "Cloud", color: "#FF9900" }
  ]

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll spy and back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 200

      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
        }
      })

      // Show/hide back to top button
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')

    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    window.location.href = mailtoLink
    setFormData({ name: '', email: '', subject: '', message: '' })
    setFormStatus('sent')
    setTimeout(() => setFormStatus(''), 3000)
  }

  // Handle resume download
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = personalInfo.resumeLink
    link.download = 'Shivam_Patwa_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle contact click
  const handleContactClick = (type, value) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${value}`
        break
      case 'phone':
        window.location.href = `tel:${value}`
        break
      case 'whatsapp':
        window.open(`https://wa.me/${value.replace(/\D/g, '')}`, '_blank')
        break
      default:
        break
    }
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        aria-label="Toggle theme"
      >
        {isDarkTheme ? '☀️' : '🌙'}
      </button>

      {/* Navbar */}
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-container">
          <h1 className="logo">
            <span className="logo-text">{personalInfo.name}</span>
            <span className="logo-dot">.</span>
          </h1>

          {/* Mobile Menu Button */}
          <button
            className={`menu-icon ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'education', 'skills', 'projects', 'contact'].map(item => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={activeSection === item ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          {/* Profile Image */}
          <div className="hero-image-wrapper">
            <div
              className="hero-image-container"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
              }}
            >
              <div className="hero-image">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x400?text=Shivam+Patwa'
                  }}
                />
              </div>
              <div className="hero-image-glow"></div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
            </h1>

            <h2 className="hero-subtitle">{personalInfo.title}</h2>

            <p className="hero-description">
              Passionate about creating beautiful and interactive web experiences.
              Currently exploring advanced React patterns and 3D web development.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button className="btn primary" onClick={handleDownloadResume}>
                <span className="btn-icon">📄</span>
                <span>Download Resume</span>
              </button>
              <button className="btn secondary" onClick={() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
              }}>
                <span className="btn-icon">📬</span>
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="section-title">
          <span className="section-title-text">About Me</span>
          <span className="section-title-line"></span>
        </h2>

        <div className="about-container">
          <div className="about-content">
            <p className="about-text">
              I'm an IT student with a passion for creating innovative web solutions.
              My journey in technology started when I built my first website at age 15,
              and since then, I've been constantly learning and evolving.
            </p>

            {/* Personal Info Grid */}
            <div className="info-grid">
              <div className="info-card">
                <span className="info-icon">📧</span>
                <div className="info-details">
                  <h4>Email</h4>
                  <button
                    className="info-link"
                    onClick={() => handleContactClick('email', personalInfo.email)}
                  >
                    {personalInfo.email}
                  </button>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">📱</span>
                <div className="info-details">
                  <h4>Phone</h4>
                  <button
                    className="info-link"
                    onClick={() => handleContactClick('phone', personalInfo.phone)}
                  >
                    {personalInfo.phone}
                  </button>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">📍</span>
                <div className="info-details">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon">🎂</span>
                <div className="info-details">
                  <h4>Birth Date</h4>
                  <p>{personalInfo.birthDate}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Open Source</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section gray">
        <h2 className="section-title">
          <span className="section-title-text">Education</span>
          <span className="section-title-line"></span>
        </h2>

        <div className="timeline">
          {/* College */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{personalInfo.college}</h3>
                <span className="timeline-badge">Current</span>
              </div>
              <p className="timeline-date">{personalInfo.collegeYear}</p>
              <p className="timeline-desc">BSC in Information Technology</p>
              <div className="timeline-details">
                <span className="timeline-grade">CGPA: {personalInfo.collegeCgpa}</span>
              </div>
            </div>
          </div>

          {/* Junior College */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{personalInfo.jrCollege}</h3>
              <p className="timeline-date">{personalInfo.jrCollegeYear}</p>
              <p className="timeline-desc">Higher Secondary Education (HSC)</p>
              <div className="timeline-details">
                <span className="timeline-grade">Percentage: {personalInfo.jrCollegePercentage}</span>
              </div>
            </div>
          </div>

          {/* School */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{personalInfo.school}</h3>
              <p className="timeline-date">{personalInfo.schoolYear}</p>
              <p className="timeline-desc">Secondary Education (SSC)</p>
              <div className="timeline-details">
                <span className="timeline-grade">Percentage: {personalInfo.schoolPercentage}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2 className="section-title">
          <span className="section-title-text">Skills & Expertise</span>
          <span className="section-title-line"></span>
        </h2>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-category">{skill.category}</span>
              </div>
              <div className="skill-bar-container">
                <div
                  className="skill-progress"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color
                  }}
                >
                  <span className="skill-level">{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section gray">
        <h2 className="section-title">
          <span className="section-title-text">Featured Projects</span>
          <span className="section-title-line"></span>
        </h2>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x200?text=Project+Image'
                    }}
                  />
                </div>
                <div className="project-overlay">
                  <span className="project-date">{project.date}</span>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <span className="link-icon">🐙</span>
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live"
                  >
                    <span className="link-icon">🚀</span>
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2 className="section-title">
          <span className="section-title-text">Get In Touch</span>
          <span className="section-title-line"></span>
        </h2>

        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Let's work together!</h3>
            <p>I'm always interested in hearing about new opportunities and interesting projects.</p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-details">
                  <h4>Email</h4>
                  <button
                    className="method-value"
                    onClick={() => handleContactClick('email', personalInfo.email)}
                  >
                    {personalInfo.email}
                  </button>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📱</div>
                <div className="method-details">
                  <h4>Phone</h4>
                  <button
                    className="method-value"
                    onClick={() => handleContactClick('phone', personalInfo.phone)}
                  >
                    {personalInfo.phone}
                  </button>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-details">
                  <h4>WhatsApp</h4>
                  <button
                    className="method-value"
                    onClick={() => handleContactClick('whatsapp', personalInfo.phone)}
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-details">
                  <h4>Location</h4>
                  <p className="method-value">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="social-media-grid">
              <h4>Connect with me</h4>
              <div className="social-grid">
                {Object.entries(personalInfo.socialMedia).map(([key, social]) => (
                  <a
                    key={key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-grid-item"
                    title={social.name}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project Inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn primary submit-btn"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              {formStatus !== 'sending' && <span className="btn-icon">✈️</span>}
            </button>

            {formStatus === 'sent' && (
              <div className="form-success">
                Message sent! Your email client will open shortly.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{personalInfo.name}</h3>
            <p>Creating amazing digital experiences with code and creativity.</p>
            <div className="footer-contact">
              <button
                className="footer-contact-link"
                onClick={() => handleContactClick('email', personalInfo.email)}
              >
                📧 {personalInfo.email}
              </button>
              <button
                className="footer-contact-link"
                onClick={() => handleContactClick('phone', personalInfo.phone)}
              >
                📱 {personalInfo.phone}
              </button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
                <li key={item}>
                  <a href={`#${item}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Me</h4>
            <div className="footer-social">
              {Object.entries(personalInfo.socialMedia).slice(0, 6).map(([key, social]) => (
                <a
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p>Made with <span className="heart">❤️</span> by Shivam</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App