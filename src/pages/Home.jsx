import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom' // Added Link and useNavigate
import { motion, useAnimationControls, useInView } from 'framer-motion'
import './Home.css'
import { 
  FiChevronDown, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail,
  FiCode,
  FiArrowRight,
  FiDownload
} from 'react-icons/fi'
import { 
  FaReact, 
  FaNodeJs, 
  FaPython,
  FaAws,
  FaGitAlt,
  FaDocker
} from 'react-icons/fa'

export default function Home() {
  const profile = useSelector(state => state.profile)
  const [typedText, setTypedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [colorIndex, setColorIndex] = useState(0)
  const controls = useAnimationControls()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const navigate = useNavigate() // Added navigate
  
  const texts = [
    "Software Engineer",
    "Full Stack Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Tech Innovator"
  ]

  // Resume path
  const resumePath = "/assets/resume.pdf"

  const colorThemes = [
    {
      name: "Ocean",
      primary: '#2563EB',
      secondary: '#059669',
      accent: '#F59E0B',
      text: '#FFFFFF',
      textSecondary: '#E5E7EB',
      background: '#0F172A',
    },
    {
      name: "Sunset",
      primary: '#DC2626',
      secondary: '#EA580C',
      accent: '#FBBF24',
      text: '#FFFFFF',
      textSecondary: '#F3F4F6',
      background: '#1F2937',
    },
    {
      name: "Forest",
      primary: '#10B981',
      secondary: '#3B82F6',
      accent: '#8B5CF6',
      text: '#FFFFFF',
      textSecondary: '#D1D5DB',
      background: '#111827',
    },
    {
      name: "Royal",
      primary: '#7C3AED',
      secondary: '#EC4899',
      accent: '#06B6D4',
      text: '#FFFFFF',
      textSecondary: '#E5E7EB',
      background: '#1E1B4B',
    }
  ]

  const currentTheme = colorThemes[colorIndex]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorThemes.length)
    }, 12000)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(colorInterval)
    }
  }, [])

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    let text = ''
    let timeoutId

    const typeText = () => {
      const currentText = texts[currentTextIndex]
      
      if (!isDeleting && text.length < currentText.length) {
        text = currentText.substring(0, text.length + 1)
        setTypedText(text)
        timeoutId = setTimeout(typeText, 100)
      } else if (isDeleting && text.length > 0) {
        text = text.substring(0, text.length - 1)
        setTypedText(text)
        timeoutId = setTimeout(typeText, 50)
      } else if (!isDeleting && text.length === currentText.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true
          typeText()
        }, 1500)
      } else if (isDeleting && text.length === 0) {
        isDeleting = false
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        timeoutId = setTimeout(typeText, 500)
      }
    }

    timeoutId = setTimeout(typeText, 1000)

    return () => clearTimeout(timeoutId)
  }, [currentTextIndex])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const techIcons = [
    { Icon: FaReact, color: currentTheme.primary, name: 'React' },
    { Icon: FaNodeJs, color: currentTheme.secondary, name: 'Node.js' },
    { Icon: FaPython, color: currentTheme.accent, name: 'Python' },
    { Icon: FaAws, color: '#F59E0B', name: 'AWS' },
    { Icon: FaGitAlt, color: currentTheme.primary, name: 'Git' },
    { Icon: FaDocker, color: currentTheme.secondary, name: 'Docker' }
  ]

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/gaurav7090", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/gauravkumar", label: "LinkedIn" },
    { icon: <FiTwitter />, href: "https://twitter.com/gauravkumar", label: "Twitter" },
    { icon: <FiMail />, href: "mailto:gaurav@example.com", label: "Email" }
  ]

  const scrollToAbout = () => {
    navigate('/about');
  }

  // Function to navigate to projects page
  const navigateToProjects = () => {
    navigate('/projects');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const gradientBackground = {
    background: `linear-gradient(135deg, ${currentTheme.background} 0%, ${currentTheme.secondary}20 50%, ${currentTheme.background} 100%)`
  }

  return (
    <section className="home-section" id="home" style={gradientBackground}>
      <div className="bg-animation">
        <div className="bg-circle circle-1" style={{ background: currentTheme.primary, opacity: 0.2 }}></div>
        <div className="bg-circle circle-2" style={{ background: currentTheme.secondary, opacity: 0.15 }}></div>
        <div className="bg-circle circle-3" style={{ background: currentTheme.accent, opacity: 0.1 }}></div>
        <div className="bg-circle circle-4" style={{ background: currentTheme.primary, opacity: 0.2 }}></div>
        
        <div className="floating-shapes">
          <div className="shape triangle" style={{ borderColor: `${currentTheme.primary}30` }}></div>
          <div className="shape square" style={{ backgroundColor: `${currentTheme.secondary}30` }}></div>
          <div className="shape circle-small" style={{ backgroundColor: `${currentTheme.accent}30` }}></div>
          <div className="shape hexagon" style={{ borderColor: `${currentTheme.primary}30` }}></div>
        </div>
      </div>

      <div className="container">
        <motion.div 
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={ref}
        >
          <div className="home-left">
            <motion.div 
              variants={itemVariants} 
              className="greeting"
              style={{ color: currentTheme.accent }}
            >
              <span className="wave" style={{ filter: `drop-shadow(0 0 5px ${currentTheme.accent})` }}>👋</span> Hello, I'm
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="name"
              style={{ 
                color: currentTheme.text,
                textShadow: `0 2px 10px ${currentTheme.primary}80`
              }}
            >
              {profile?.name || 'Gaurav Kumar'}
              <span 
                className="name-underline"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                  boxShadow: `0 0 10px ${currentTheme.primary}`
                }}
              ></span>
            </motion.h1>

            <motion.div variants={itemVariants} className="typing-container">
              <h2 className="typing-text" style={{ color: currentTheme.textSecondary }}>
                {typedText}
                <span 
                  className={`cursor ${showCursor ? 'blink' : ''}`}
                  style={{ color: currentTheme.accent }}
                >|</span>
              </h2>
              <p className="location" style={{ color: currentTheme.accent }}>
                <span className="pin">📍</span> {profile?.location || 'Vadodara, India'}
              </p>
            </motion.div>

            <motion.p 
              variants={itemVariants} 
              className="intro"
              style={{ color: currentTheme.textSecondary }}
            >
              Passionate Software Engineer specializing in creating elegant, 
              efficient solutions for complex problems. I build scalable web applications 
              with modern technologies and AI integration.
            </motion.p>

            <motion.div variants={itemVariants} className="cta-buttons">
              {/* Method 1: Using navigate function */}
              <motion.button
                onClick={navigateToProjects}
                className="cta-btn primary"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                  boxShadow: `0 10px 30px ${currentTheme.primary}40`,
                  color: currentTheme.text
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 15px 40px ${currentTheme.primary}60`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <FiArrowRight className="arrow-icon" />
              </motion.button>
              
              {/* OR Method 2: Using Link wrapper (better for accessibility) */}
              {/* 
              <Link to="/projects" style={{ textDecoration: 'none' }}>
                <motion.div
                  className="cta-btn primary"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                    boxShadow: `0 10px 30px ${currentTheme.primary}40`,
                    color: currentTheme.text
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 15px 40px ${currentTheme.primary}60`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View My Work</span>
                  <FiArrowRight className="arrow-icon" />
                </motion.div>
              </Link>
              */}
              
              <motion.a 
                href={resumePath}
                download="Gaurav_Kumar_Resume.pdf"
                className="cta-btn secondary"
                style={{ 
                  background: `${currentTheme.background}80`,
                  borderColor: currentTheme.accent,
                  color: currentTheme.accent,
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: `${currentTheme.background}`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download CV</span>
                <FiDownload className="download-icon" />
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="social-links">
              <span className="connect-text" style={{ color: currentTheme.textSecondary }}>
                Connect with me:
              </span>
              <div className="social-icons">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.label}
                    style={{ 
                      background: `${currentTheme.background}80`,
                      borderColor: index === 0 ? '#333' : index === 1 ? '#0077B5' : index === 2 ? '#1DA1F2' : '#EA4335',
                      color: index === 0 ? '#333' : index === 1 ? '#0077B5' : index === 2 ? '#1DA1F2' : '#EA4335',
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.1
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="home-right">
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="tech-orbits">
                {techIcons.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="tech-orbit"
                    style={{
                      '--rotation': `${(360 / techIcons.length) * index}deg`,
                      '--color': tech.color
                    }}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 20 + index * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div 
                      className="tech-icon-wrapper"
                      style={{ 
                        background: `${currentTheme.background}80`,
                        borderColor: tech.color,
                        boxShadow: `0 0 20px ${tech.color}80`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <tech.Icon className="tech-icon" style={{ color: tech.color }} />
                    </div>
                  </motion.div>
                ))}
                
                <div 
                  className="profile-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                    boxShadow: `0 0 50px ${currentTheme.primary}80`
                  }}
                >
                  <div 
                    className="profile-glow"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                      filter: 'blur(20px)'
                    }}
                  ></div>
                  <div className="profile-initial" style={{ color: currentTheme.text }}>
                    {profile?.name?.charAt(0) || 'G'}
                  </div>
                  <div className="pulse-ring ring-1" style={{ borderColor: currentTheme.primary }}></div>
                  <div className="pulse-ring ring-2" style={{ borderColor: currentTheme.secondary }}></div>
                  <div className="pulse-ring ring-3" style={{ borderColor: currentTheme.accent }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="tech-indicators"
              variants={itemVariants}
            >
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-indicator"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <tech.Icon className="indicator-icon" style={{ color: tech.color }} />
                  <span className="indicator-name" style={{ color: currentTheme.textSecondary }}>{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        >
          <span className="scroll-text" style={{ color: currentTheme.textSecondary }}>
            Scroll to explore
          </span>
          <FiChevronDown 
            className="scroll-arrow" 
            style={{ color: currentTheme.accent }} 
          />
          <div 
            className="scroll-line"
            style={{ 
              background: `linear-gradient(to bottom, ${currentTheme.accent}, transparent)` 
            }}
          ></div>
        </motion.div>

        <div className="floating-elements">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--delay': `${i * 0.5}s`,
                '--size': `${20 + Math.random() * 40}px`,
                '--color': i % 3 === 0 ? currentTheme.primary : i % 3 === 1 ? currentTheme.secondary : currentTheme.accent
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiCode style={{ color: 'var(--color)', opacity: 0.3 }} />
            </motion.div>
          ))}
        </div>

        <div className="color-theme-indicator">
          {colorThemes.map((theme, index) => (
            <button
              key={index}
              className={`theme-dot ${index === colorIndex ? 'active' : ''}`}
              onClick={() => setColorIndex(index)}
              style={{
                backgroundColor: theme.primary,
                borderColor: index === colorIndex ? theme.accent : 'transparent'
              }}
              aria-label={`${theme.name} theme`}
              title={`${theme.name} theme`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}