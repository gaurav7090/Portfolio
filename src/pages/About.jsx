import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom' // Added
import './About.css'
import { 
  FiCode, 
  FiCpu, 
  FiDatabase, 
  FiCloud, 
  FiUsers, 
  FiTarget,
  FiChevronDown,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiDownload // Added
} from 'react-icons/fi'
import { 
  FaReact, 
  FaPython, 
  FaJs, 
  FaNodeJs, 
  FaAws,
  FaGitAlt
} from 'react-icons/fa'

export default function About() {
  const navigate = useNavigate() // Added
  const [activeTab, setActiveTab] = useState('skills')
  const [animatedValues, setAnimatedValues] = useState({})
  const aboutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Resume download function
  const downloadResume = () => {
    // Method 1: Using public folder
    const resumeUrl = '/resume.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Gaurav_Kumar_Resume.pdf';
    
    // Append to body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  }

  // Navigate to contact page
  const navigateToContact = () => {
    navigate('/contact');
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const skillsData = [
        { name: "React", level: 85 },
        { name: "Redux", level: 80 },
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 75 },
        { name: "SQL", level: 70 }
      ]
      
      skillsData.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedValues(prev => ({
            ...prev,
            [skill.name]: 0
          }))
          
          let start = 0
          const duration = 1500
          const increment = skill.level / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= skill.level) {
              start = skill.level
              clearInterval(timer)
            }
            setAnimatedValues(prev => ({
              ...prev,
              [skill.name]: Math.round(start)
            }))
          }, 16)
        }, index * 200)
      })
    }
  }, [isVisible])

  const stats = [
    { icon: <FiBriefcase />, value: '0-1', label: 'Years Experience', suffix: '' },
    { icon: <FiCode />, value: '6', label: 'Projects', suffix: '+' },
    { icon: <FiUsers />, value: '2', label: 'Clients', suffix: '+' },
    { icon: <FiAward />, value: '5', label: 'Certifications', suffix: '+' }
  ]

  const expertise = [
    { icon: <FaReact />, title: 'Frontend Development', desc: 'React, Vue, Angular' },
    { icon: <FaNodeJs />, title: 'Backend Development', desc: 'Node.js, Python, Java' },
    { icon: <FiDatabase />, title: 'Database Design', desc: 'MongoDB, PostgreSQL' },
    { icon: <FiCloud />, title: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
    { icon: <FiTarget />, title: 'Problem Solving', desc: 'Algorithms & Data Structures' },
    { icon: <FiUsers />, title: 'Team Leadership', desc: 'Agile & Project Management' }
  ]

  const education = [
    { 
      degree: 'Master of Computer Applications',
      specialization: 'Artificial Intelligence',
      institution: 'Parul University',
      year: '2023 - 2025',
      grade: '8.00/10 CGPA'
    },
    { 
      degree: 'Bachelor of Computer Applications',
      institution: 'Maharaja Sayajirao University',
      year: '2020 - 2023',
      grade: '73.64% Marks'
    }
  ]

  const skillsData = [
    { name: "React", level: 85 },
    { name: "Redux", level: 80 },
    { name: "JavaScript", level: 90 },
    { name: "Python", level: 75 },
    { name: "SQL", level: 70 }
  ]

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="container">
        {/* Header Section */}
        <div className="about-header">
          <div className="section-label">
            <FiBookOpen className="label-icon" />
            <span>About Me</span>
          </div>
          <h2 className={`section-title ${isVisible ? 'animate' : ''}`}>
            Crafting Digital <span className="highlight">Experiences</span> That Inspire
          </h2>
          <p className="section-subtitle">
            Software Engineer specializing in Full Stack Development & AI Solutions
          </p>
        </div>

        <div className="about-content">
          {/* Left Column - Profile & Stats */}
          <div className="about-left">
            <div className="profile-card">
              <div className="profile-image-wrapper">
                <div className="profile-image"></div>
                <div className="profile-badge">
                  <FiCode />
                </div>
              </div>
              
              <div className="profile-info">
                <h3>Gaurav Kumar</h3>
                <p className="profile-role">Software Engineer</p>
                <p className="profile-location">Vadodara, India</p>
                
                <div className="contact-info">
                  <p>📧 gk76095@gmail.com</p>
                  <p>📱 +91 7209011742</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="stat-item"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <h4>{stat.value}<span>{stat.suffix}</span></h4>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="about-right">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <FiCpu /> Skills
              </button>
              <button 
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <FiBriefcase /> Experience
              </button>
              <button 
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <FiAward /> Education
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="tab-pane">
                  <div className="skills-intro">
                    <h3>Technical Expertise</h3>
                    <p>Proficient in modern web technologies with focus on performance and scalability</p>
                  </div>
                  
                  <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-header">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">
                            {animatedValues[skill.name] || 0}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress"
                            style={{ 
                              width: `${animatedValues[skill.name] || 0}%`,
                              transition: 'width 1.5s ease-in-out'
                            }}
                          >
                            <div className="progress-glow"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expertise Grid */}
                  <div className="expertise-section">
                    <h4>Areas of Expertise</h4>
                    <div className="expertise-grid">
                      {expertise.map((item, index) => (
                        <div key={index} className="expertise-card">
                          <div className="expertise-icon">{item.icon}</div>
                          <h5>{item.title}</h5>
                          <p>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="tab-pane">
                  <div className="timeline">
                    {[
                      {
                        title: 'Senior Software Engineer',
                        company: 'Tech Innovations Inc.',
                        period: '2023 - Present',
                        description: 'Led development of scalable web applications using React and Node.js',
                        achievements: ['Improved performance by 40%', 'Mentored 5 junior developers']
                      },
                      {
                        title: 'Full Stack Developer',
                        company: 'Digital Solutions Ltd.',
                        period: '2021 - 2023',
                        description: 'Developed and maintained multiple client projects',
                        achievements: ['Reduced load time by 60%', 'Implemented CI/CD pipeline']
                      },
                      {
                        title: 'Web Developer Intern',
                        company: 'StartUp Hub',
                        period: '2020 - 2021',
                        description: 'Assisted in frontend development and bug fixing',
                        achievements: ['Contributed to 3 major projects', 'Learned Agile methodologies']
                      }
                    ].map((exp, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>{exp.title}</h4>
                          <p className="timeline-company">{exp.company}</p>
                          <span className="timeline-period">{exp.period}</span>
                          <p className="timeline-desc">{exp.description}</p>
                          <ul className="timeline-achievements">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="tab-pane">
                  <div className="education-list">
                    {education.map((edu, index) => (
                      <div key={index} className="education-card">
                        <div className="education-header">
                          <h4>{edu.degree}</h4>
                          {edu.specialization && (
                            <span className="specialization">{edu.specialization}</span>
                          )}
                        </div>
                        <p className="institution">{edu.institution}</p>
                        <div className="education-footer">
                          <span className="year">{edu.year}</span>
                          <span className="grade">{edu.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  
                  <div className="certifications">
                    <h4>Certifications</h4>
                    <div className="cert-grid">
                      {[
                        'AWS Certified Developer',
                        'React Developer Certification',
                        'Python for Data Science',
                        'MongoDB for Developers',
                        'Agile Scrum Master'
                      ].map((cert, index) => (
                        <div key={index} className="cert-badge">
                          <FiAward />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action - UPDATED */}
            <div className="about-cta">
              <button 
                onClick={navigateToContact}
                className="cta-btn primary"
              >
                <span>Get In Touch</span>
                <FiChevronDown className="arrow" />
              </button>
              <button 
                onClick={downloadResume}
                className="cta-btn secondary"
              >
                <FiDownload style={{ marginRight: '8px' }} />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}