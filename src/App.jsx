import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')
  const heroRef = useRef(null)

  // Personal information - UPDATE THIS WITH YOUR DETAILS
  const personalInfo = {
    name: "Shivam Patwa",
    title: "IT Student & Frontend Developer",
    email: "shivam.patwa@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    birthDate: "15 March 2004",
    college: "Vivekanand Education Society's Institute of Technology",
    collegeYear: "2022-2026",
    collegeCgpa: "8.7 CGPA",
    jrCollege: "Ramniranjan Jhunjhunwala College",
    jrCollegeYear: "2020-2022",
    jrCollegePercentage: "85%",
    school: "St. Xavier's High School",
    schoolYear: "2010-2020",
    schoolPercentage: "92%",
    // Update these with your actual image paths
    profileImage: "/images/profile.jpg", // Place your image in public/images/profile.jpg
    resumeLink: "/resume.pdf", // Place your resume in public/resume.pdf
    socialMedia: {
      github: { url: "https://github.com/shivampatwa190", icon: "🐙", name: "GitHub" },
      linkedin: { url: "https://linkedin.com/in/shivampatwa", icon: "🔗", name: "LinkedIn" },
      twitter: { url: "https://twitter.com/shivampatwa", icon: "🐦", name: "Twitter" },
      instagram: { url: "https://instagram.com/shivampatwa", icon: "📷", name: "Instagram" },
      facebook: { url: "https://facebook.com/shivampatwa", icon: "📘", name: "Facebook" },
      leetcode: { url: "https://leetcode.com/shivampatwa", icon: "⚡", name: "LeetCode" },
      hackerrank: { url: "https://hackerrank.com/shivampatwa", icon: "💻", name: "HackerRank" },
      whatsapp: { url: "https://wa.me/919876543210", icon: "📱", name: "WhatsApp" },
      telegram: { url: "https://t.me/shivampatwa", icon: "✈️", name: "Telegram" }
    }
  }

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Portfolio Website 3D",
      description: "Interactive 3D portfolio with animations and modern design",
      fullDescription: "A cutting-edge portfolio website featuring 3D animations, particle effects, and interactive elements. Built with React, Three.js, and Framer Motion.",
      technologies: ["React", "Three.js", "Framer Motion", "CSS3"],
      github: "https://github.com/shivampatwa/3d-portfolio",
      live: "https://shivam-portfolio-3d.vercel.app",
      image: "/images/portfolio.jpg", // Place image in public/images/
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

  // Mouse move effect for 3D background
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

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 200 // Offset for navbar

      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
        }
      })
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

    // Simulate form submission - In production, send to your backend
    setFormStatus('sending')

    // Create mailto link with form data
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    // Open default email client
    window.location.href = mailtoLink

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    setFormStatus('sent')

    // Reset status after 3 seconds
    setTimeout(() => setFormStatus(''), 3000)
  }

  // Handle resume download
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement('a')
    link.href = personalInfo.resumeLink
    link.download = 'Shivam_Patwa_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle contact click (phone, email, etc.)
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
                  <span className="nav-indicator"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-content">
          {/* Profile Image Container - Fixed positioning */}
          <div className="hero-image-wrapper">
            <div
              className="hero-image-container"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
              }}
            >
              <div className="hero-image">
                {/* Replace with your actual image */}
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/300x300?text=Shivam+Patwa'
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
          <div className="mouse">
            <div className="mouse-wheel"></div>
          </div>
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

            {/* Stats Counter */}
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number" data-count="50">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" data-count="10">10+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" data-count="5">5+</span>
                <span className="stat-label">Open Source</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" data-count="3">3+</span>
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
              <p className="timeline-desc">B.E. in Information Technology</p>
              <div className="timeline-details">
                <span className="timeline-grade">CGPA: {personalInfo.collegeCgpa}</span>
                <span className="timeline-activities">• Web Dev Club Lead</span>
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
                <span className="timeline-activities">• Science Stream</span>
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
                <span className="timeline-activities">• Computer Topper</span>
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

        {/* Skills Cloud */}
        <div className="skills-cloud">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="cloud-tag"
              style={{
                fontSize: `${0.8 + skill.level / 100}rem`,
                opacity: 0.6 + skill.level / 200,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {skill.name}
            </span>
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

                {/* Technologies */}
                <div className="project-tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Features */}
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
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

            {/* Contact Methods */}
            <div className="contact-methods">
              {/* Email */}
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

              {/* Phone */}
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

              {/* WhatsApp */}
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

              {/* Location */}
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

            {/* Name Input */}
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

            {/* Email Input */}
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

            {/* Subject Input */}
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

            {/* Message Textarea */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="btn primary submit-btn"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              {formStatus !== 'sending' && <span className="btn-icon">✈️</span>}
            </button>

            {/* Form Status */}
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
          {/* Brand Section */}
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

          {/* Quick Links */}
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

          {/* Social Links */}
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

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p>Made with <span className="heart">❤️</span> by Shivam</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

// ==============================================
// CSS STYLES - You can modify these in App.css
// ==============================================
const css = `
/* ===== CSS VARIABLES ===== */
:root {
  /* Dark Theme (Default) */
  --dark-bg-primary: #0a0a0a;
  --dark-bg-secondary: #111111;
  --dark-bg-card: rgba(255, 255, 255, 0.05);
  --dark-text-primary: #ffffff;
  --dark-text-secondary: #cccccc;
  --dark-text-muted: #888888;
  --dark-border: rgba(255, 255, 255, 0.1);
  --dark-shadow: rgba(0, 0, 0, 0.3);
  
  /* Light Theme */
  --light-bg-primary: #f5f5f5;
  --light-bg-secondary: #ffffff;
  --light-bg-card: rgba(0, 0, 0, 0.02);
  --light-text-primary: #333333;
  --light-text-secondary: #666666;
  --light-text-muted: #999999;
  --light-border: rgba(0, 0, 0, 0.1);
  --light-shadow: rgba(0, 0, 0, 0.1);
  
  /* Gradient Colors */
  --gradient-1: linear-gradient(45deg, #667eea, #764ba2);
  --gradient-2: linear-gradient(135deg, #ff6b6b, #feca57);
  --gradient-3: linear-gradient(90deg, #00b09b, #96c93d);
  
  /* Accent Colors */
  --accent-primary: #667eea;
  --accent-secondary: #764ba2;
  --accent-success: #10b981;
  --accent-warning: #f59e0b;
  --accent-danger: #ef4444;
}

/* ===== THEME VARIABLES ===== */
.dark-theme {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --bg-card: var(--dark-bg-card);
  --text-primary: var(--dark-text-primary);
  --text-secondary: var(--dark-text-secondary);
  --text-muted: var(--dark-text-muted);
  --border-color: var(--dark-border);
  --shadow-color: var(--dark-shadow);
}

.light-theme {
  --bg-primary: var(--light-bg-primary);
  --bg-secondary: var(--light-bg-secondary);
  --bg-card: var(--light-bg-card);
  --text-primary: var(--light-text-primary);
  --text-secondary: var(--light-text-secondary);
  --text-muted: var(--light-text-muted);
  --border-color: var(--light-border);
  --shadow-color: var(--light-shadow);
}

/* ===== GLOBAL STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  transition: background-color 0.3s, color 0.3s;
}

/* ===== THEME TOGGLE BUTTON ===== */
.theme-toggle {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.theme-toggle:hover {
  transform: rotate(180deg);
  background: var(--gradient-1);
  color: white;
}

/* ===== NAVBAR STYLES ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 20px var(--shadow-color);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styles */
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
}

.logo-text {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-dot {
  color: var(--accent-success);
  animation: pulse 2s infinite;
}

/* Mobile Menu Icon */
.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1001;
  background: none;
  border: none;
  padding: 5px;
}

.menu-icon span {
  width: 25px;
  height: 3px;
  background: var(--text-primary);
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 3px;
}

.menu-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
}

.menu-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu li a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: 0.3s;
  position: relative;
  padding: 0.5rem 0;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-1);
  transition: width 0.3s ease;
}

.nav-menu li a:hover .nav-indicator,
.nav-menu li a.active .nav-indicator {
  width: 100%;
}

.nav-menu li a.active {
  color: var(--accent-primary);
}

/* ===== HERO SECTION ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 2rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

/* Hero Image */
.hero-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-container {
  position: relative;
  width: 350px;
  height: 350px;
  transition: transform 0.1s ease;
}

.hero-image {
  width: 100%;
  height: 100%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  animation: morphing 10s ease-in-out infinite;
  box-shadow: 0 20px 40px var(--shadow-color);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hero-image:hover img {
  transform: scale(1.1);
}

.hero-image-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: inherit;
  background: var(--gradient-1);
  filter: blur(20px);
  opacity: 0.5;
  animation: glowPulse 3s ease-in-out infinite;
  z-index: 1;
}

/* Hero Text */
.hero-text {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  max-width: 500px;
}

/* Buttons */
.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn.primary {
  background: var(--gradient-1);
  color: white;
}

.btn.secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--shadow-color);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-muted);
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid var(--border-color);
  border-radius: 20px;
  position: relative;
}

.mouse-wheel {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 10px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: scrollWheel 2s infinite;
}

/* ===== SECTION STYLES ===== */
.section {
  padding: 5rem 2rem;
  position: relative;
}

.section.gray {
  background: var(--bg-secondary);
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title-text {
  font-size: 2.5rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.section-title-line {
  display: block;
  width: 80px;
  height: 4px;
  background: var(--gradient-1);
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* ===== ABOUT SECTION ===== */
.about-container {
  max-width: 1000px;
  margin: 0 auto;
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.info-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: 0.3s;
  border: 1px solid var(--border-color);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--shadow-color);
}

.info-icon {
  font-size: 2rem;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-1);
  border-radius: 12px;
  color: white;
}

.info-details h4 {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.info-details p,
.info-link {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.info-link {
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 0.3s;
}

.info-link:hover {
  text-decoration-color: var(--accent-primary);
  color: var(--accent-primary);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 15px;
  border: 1px solid var(--border-color);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.stat-label {
  color: var(--text-muted);
  margin-top: 0.5rem;
  display: block;
}

/* ===== TIMELINE SECTION ===== */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: var(--gradient-1);
  top: 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gradient-1);
  box-shadow: 0 0 20px var(--accent-primary);
  z-index: 2;
}

.timeline-content {
  position: relative;
  width: calc(50% - 50px);
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
}

.timeline-item:nth-child(odd) .timeline-content {
  left: calc(50% + 50px);
}

.timeline-item:nth-child(even) .timeline-content {
  left: 0;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.timeline-badge {
  background: var(--gradient-1);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.timeline-content h3 {
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.timeline-date {
  color: var(--accent-primary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.timeline-desc {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.timeline-details {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.timeline-grade {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.timeline-activities {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ===== SKILLS SECTION ===== */
.skills-container {
  max-width: 800px;
  margin: 0 auto 4rem;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  color: var(--text-primary);
  font-weight: 500;
}

.skill-category {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.skill-bar-container {
  width: 100%;
  height: 10px;
  background: var(--bg-card);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.skill-progress {
  position: relative;
  height: 100%;
  border-radius: 5px;
  transition: width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
}

.skill-level {
  font-size: 0.7rem;
  color: white;
  opacity: 0.9;
}

.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.cloud-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--gradient-1);
  color: white;
  border-radius: 50px;
  animation: float 3s ease-in-out infinite;
}

/* ===== PROJECTS SECTION ===== */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: var(--bg-card);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  transition: 0.3s;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px var(--shadow-color);
}

.project-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
}

.project-date {
  background: var(--gradient-1);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.3rem 0.8rem;
  background: var(--bg-secondary);
  color: var(--accent-primary);
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid var(--border-color);
}

.project-features {
  margin: 1rem 0;
}

.project-features h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.project-features ul {
  list-style: none;
  padding-left: 0;
}

.project-features li {
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
  padding-left: 1.2rem;
  position: relative;
  font-size: 0.9rem;
}

.project-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent-success);
}

.project-links {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.project-link {
  flex: 1;
  padding: 0.8rem;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.project-link.github {
  background: #333;
}

.project-link.live {
  background: var(--gradient-1);
}

.project-link:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 5px 15px var(--shadow-color);
}

.link-icon {
  font-size: 1.1rem;
}

/* ===== CONTACT SECTION ===== */
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.contact-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  transition: 0.3s;
}

.contact-method:hover {
  transform: translateX(10px);
  border-color: var(--accent-primary);
}

.method-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-1);
  border-radius: 10px;
  font-size: 1.5rem;
  color: white;
}

.method-details h4 {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.method-value {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  padding: 0;
}

.method-value:hover {
  color: var(--accent-primary);
}

/* Social Media Grid */
.social-media-grid {
  margin-top: 2rem;
}

.social-media-grid h4 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.8rem;
}

.social-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  background: var(--bg-card);
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: 0.3s;
}

.social-grid-item:hover {
  transform: translateY(-3px);
  background: var(--gradient-1);
  color: white;
  border-color: transparent;
}

.social-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.social-name {
  font-size: 0.7rem;
  text-align: center;
}

/* Contact Form */
.contact-form {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
}

.contact-form h3 {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  justify-content: center;
}

.form-success {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-success);
  border-radius: 8px;
  text-align: center;
  border: 1px solid var(--accent-success);
}

/* ===== FOOTER ===== */
.footer {
  background: var(--bg-secondary);
  padding: 4rem 2rem 1rem;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-contact-link {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  text-align: left;
  padding: 0.3rem 0;
  transition: 0.3s;
}

.footer-contact-link:hover {
  color: var(--accent-primary);
  transform: translateX(5px);
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: var(--text-muted);
  text-decoration: none;
  transition: 0.3s;
}

.footer-section ul li a:hover {
  color: var(--accent-primary);
  padding-left: 5px;
}

.footer-social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: 0.3s;
  padding: 0.3rem 0;
}

.footer-social-link:hover {
  color: var(--accent-primary);
  transform: translateX(5px);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.heart {
  color: var(--accent-danger);
  animation: heartbeat 1.5s ease-in-out infinite;
  display: inline-block;
}

/* ===== BACK TO TOP BUTTON ===== */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-1);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--shadow-color);
}

/* ===== ANIMATIONS ===== */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes morphing {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes scrollWheel {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  80% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  100% { opacity: 0; transform: translateX(-50%) translateY(0); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.05); }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .hero-description {
    margin: 0 auto 2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .timeline::before {
    left: 30px;
  }
  
  .timeline-dot {
    left: 30px;
  }
  
  .timeline-content {
    width: calc(100% - 80px);
    left: 80px !important;
  }
}

@media (max-width: 768px) {
  .menu-icon {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: var(--bg-secondary);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    gap: 2rem;
  }

  .nav-menu.active {
    left: 0;
  }
  
  .hero-image-container {
    width: 280px;
    height: 280px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .section-title-text {
    font-size: 2rem;
  }
  
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-contact {
    align-items: center;
  }
  
  .footer-social {
    align-items: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .theme-toggle {
    top: 80px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero-image-container {
    width: 220px;
    height: 220px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section {
    padding: 3rem 1rem;
  }
  
  .info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .info-icon {
    margin-bottom: 0.5rem;
  }
  
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact-method {
    flex-direction: column;
    text-align: center;
  }
  
  .method-details {
    text-align: center;
  }
  
  .method-value {
    text-align: center;
  }
}

/* ===== UTILITY CLASSES ===== */
.hidden {
  display: none !important;
}

.visible {
  display: block !important;
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.mt-5 { margin-top: 3rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }
.mb-5 { margin-bottom: 3rem; }
`

export default App