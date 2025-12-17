import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'
import { FiDownload } from 'react-icons/fi' // Import download icon

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Progress bar effect
  useEffect(() => {
    const updateProgressBar = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      const progressBar = document.querySelector('.scroll-progress')
      if (progressBar) {
        progressBar.style.width = scrolled + '%'
      }
    }
    
    window.addEventListener('scroll', updateProgressBar)
    return () => window.removeEventListener('scroll', updateProgressBar)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]

  // Resume PDF path - Choose one option:

  // Option 1: Agar public/assets/ mein hai
  const resumePath = "/assets/resume.pdf"
  
  // Option 2: Agar src/assets/ mein hai
  // import resumePdf from '../assets/resume.pdf';
  // const resumePath = resumePdf;

  // Option 3: External URL agar online hai
  // const resumePath = "https://drive.google.com/your-resume-link";

  const handleDownload = (e) => {
    // Optional: Analytics ya tracking ke liye
    console.log('Resume download started');
    // Agar aapko koi extra logic add karna ho
  }

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Gaurav</span>
          <span className="brand-dot">.</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {navItems.map((item, index) => (
              <li className="nav-item" key={item.name} style={{ '--item-index': index }}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-text">{item.name}</span>
                  <span className="nav-underline"></span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="nav-cta ms-lg-4 mt-3 mt-lg-0">
            <a 
              href={resumePath} 
              download="Gaurav_Kumar_Resume.pdf" 
              className="btn-download"
              onClick={handleDownload}
            >
              <span className="btn-text">Download CV</span>
              <FiDownload className="btn-icon" /> {/* Icon use karein */}
            </a>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="scroll-progress"></div>
    </nav>
  )
}