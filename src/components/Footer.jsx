import { useEffect, useState } from 'react'
import './Footer.css'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiDownload } from 'react-icons/fi'
import { FaReact } from 'react-icons/fa'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [isVisible, setIsVisible] = useState(false)

  // Resume path
  const resumePath = "/assets/resume.pdf"

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    
    const handleScroll = () => {
      const backToTopBtn = document.querySelector('.back-to-top')
      if (window.scrollY > 300) {
        backToTopBtn?.classList.add('visible')
      } else {
        backToTopBtn?.classList.remove('visible')
      }
    }

    setTimeout(() => setIsVisible(true), 100)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: "https://github.com/gauravkumar",
      label: "GitHub",
      color: "#6e5494"
    },
    {
      icon: <FiLinkedin />,
      href: "https://linkedin.com/in/gauravkumar",
      label: "LinkedIn",
      color: "#0077b5"
    },
    {
      icon: <FiTwitter />,
      href: "https://twitter.com/gauravkumar",
      label: "Twitter",
      color: "#1da1f2"
    },
    {
      icon: <FiMail />,
      href: "mailto:gk76095@gmail.com",
      label: "Email",
      color: "#ea4335"
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand" onClick={scrollToTop}>
            <span className="footer-logo">G</span>
            <span className="footer-brand-text">
              <span className="brand-name">Gaurav</span>
              <span className="brand-title">Portfolio</span>
            </span>
          </div>
          
          <p className="footer-tagline">
            Crafting digital experiences with passion & precision
          </p>
        </div>

        <div className="social-section">
          <div className="social-wrapper">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label={social.label}
                style={{ '--hover-color': social.color }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-tooltip">{social.label}</span>
              </a>
            ))}
            <a
              href={resumePath}
              download="Gaurav_Kumar_Resume.pdf"
              className="social-icon-link"
              aria-label="Download Resume"
              style={{ '--hover-color': '#10b981' }}
            >
              <span className="social-icon"><FiDownload /></span>
              <span className="social-tooltip">Download Resume</span>
            </a>
          </div>
        </div>

        <div className="footer-divider">
          <div className="divider-line"></div>
          <FaReact className="divider-icon" />
          <div className="divider-line"></div>
        </div>

        <div className="footer-content">
          <div className="footer-column">
            <h3 className="column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="column-title">Technologies</h3>
            <div className="tech-stack">
              <span className="tech-tag">React</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">AWS</span>
              <span className="tech-tag">Docker</span>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="column-title">Contact Info</h3>
            <div className="contact-info">
              <p><FiMail /> gk76095@gmail.com</p>
              <p>📍Vadodra,Gujrat, India</p>
              <p>Available for freelance work</p>
            </div>
          </div>
        </div>

        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span className="arrow-up">↑</span>
        </button>

        <div className="footer-bottom">
          <div className="copyright">
            <p>
              © {currentYear} <span className="highlight">Gaurav Kumar</span>. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FiHeart className="heart-icon" /> using <FaReact className="react-icon" />
            </p>
          </div>
          
          <div className="footer-legal">
            <a href={resumePath} download="Gaurav_Kumar_Resume.pdf">Download Resume</a>
            <span className="separator">•</span>
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bg-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${i * 0.1}s`,
                '--duration': `${10 + Math.random() * 10}s`,
                '--random': Math.random()
              }}
            ></div>
          ))}
        </div>
      </div>
    </footer>
  )
}