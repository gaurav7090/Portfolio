import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import './Education.css'
import { 
  FiBookOpen, 
  FiAward, 
  FiCalendar, 
  FiMapPin, 
  FiChevronRight,
  FiStar,
  FiDownload,
  FiExternalLink
} from 'react-icons/fi'
import { 
  FaGraduationCap, 
  FaUniversity, 
  FaRegCalendarAlt,
  FaChartLine
} from 'react-icons/fa'

export default function Education() {
  const [activeTimeline, setActiveTimeline] = useState('academic')
  const [hoveredCard, setHoveredCard] = useState(null)
  const controls = useAnimationControls()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  // Resume path
  const resumePath = "/assets/resume.pdf"

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const academicEducation = [
    {
      id: 1,
      degree: 'Master of Computer Applications',
      specialization: 'Artificial Intelligence',
      institution: 'Parul Institute of Engineering & Technology',
      location: 'Vadodara, Gujarat',
      year: '2024 - 2026',
      duration: '2 Years',
      grade: '8.00/10 CGPA',
      description: 'Specialized in AI, Machine Learning, and Advanced Data Structures. Completed thesis on "AI-Powered Predictive Analytics for Healthcare".',
      achievements: [
        'Best Project Award 2024',
        'Published 2 Research Papers',
        'Google Developer Student Club Lead'
      ],
      courses: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Big Data Analytics'],
      icon: <FaGraduationCap />
    },
    {
      id: 2,
      degree: 'Bachelor of Computer Applications',
      specialization: 'Core',
      institution: 'R N College',
      location: 'Hajipur,Vaishali,Bihar',
      year: '2021 - 2024',
      duration: '3 Years',
      grade: '73.64% Marks',
      description: 'Focused on Software Development, Database Management, and Web Technologies. Led multiple college tech events.',
      achievements: [
        'Hackathon Winner 2022',
        'Technical Club President',
        'Best Student Developer Award'
      ],
      courses: ['Data Structures', 'Web Development', 'DBMS', 'Operating Systems'],
      icon: <FiBookOpen />
    }
  ]

  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2024',
      duration: 'Valid for 3 Years',
      credentialId: 'AWS-SA-2024-12345',
      description: 'Designing and deploying scalable systems on AWS',
      skills: ['Cloud Architecture', 'AWS Services', 'Security', 'Cost Optimization']
    },
    {
      id: 2,
      title: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      year: '2023',
      duration: 'Valid for 2 Years',
      credentialId: 'GCP-DE-2023-67890',
      description: 'Designing data processing systems and machine learning models',
      skills: ['BigQuery', 'Dataflow', 'Machine Learning', 'Data Security']
    },
    {
      id: 3,
      title: 'Meta Front-End Developer',
      issuer: 'Meta',
      year: '2023',
      duration: 'Lifetime',
      credentialId: 'META-FE-2023-54321',
      description: 'Advanced React, Redux, and modern frontend development',
      skills: ['React', 'Redux', 'JavaScript', 'UI/UX']
    }
  ]

  const skillsDevelopment = [
    {
      category: 'Technical Skills',
      skills: [
        { name: 'React & Redux', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'AWS Cloud', level: 75 },
        { name: 'MongoDB', level: 85 },
        { name: 'Docker', level: 70 }
      ]
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 95 },
        { name: 'Team Leadership', level: 85 },
        { name: 'Communication', level: 90 },
        { name: 'Project Management', level: 80 },
        { name: 'Critical Thinking', level: 88 },
        { name: 'Creativity', level: 85 }
      ]
    }
  ]

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section id="education" className="education-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="education-header"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="section-label">
            <FaGraduationCap className="label-icon" />
            <span>Academic Journey</span>
          </div>
          <h2 className="section-title">
            Education & <span className="highlight">Certifications</span>
          </h2>
          <p className="section-subtitle">
            My academic background and professional certifications that shape my expertise
          </p>
        </motion.div>

        <motion.div 
          className="timeline-nav"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <button 
            className={`nav-btn ${activeTimeline === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTimeline('academic')}
          >
            <FaGraduationCap /> Academic
          </button>
          <button 
            className={`nav-btn ${activeTimeline === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTimeline('certifications')}
          >
            <FiAward /> Certifications
          </button>
          <button 
            className={`nav-btn ${activeTimeline === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTimeline('skills')}
          >
            <FaChartLine /> Skills Development
          </button>
        </motion.div>

        {activeTimeline === 'academic' && (
          <motion.div 
            className="timeline-container"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="timeline-line">
              <div className="line-progress"></div>
            </div>

            {academicEducation.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className={`timeline-card ${index % 2 === 0 ? 'left' : 'right'}`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(edu.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="timeline-marker">
                  <div className="marker-icon">{edu.icon}</div>
                  <div className="marker-ring"></div>
                </div>

                <div className={`card-content ${hoveredCard === edu.id ? 'hovered' : ''}`}>
                  <div className="card-header">
                    <h3 className="degree">{edu.degree}</h3>
                    {edu.specialization && (
                      <span className="specialization">{edu.specialization}</span>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="institution-info">
                      <div className="institution">
                        <FaUniversity />
                        <span>{edu.institution}</span>
                      </div>
                      <div className="location">
                        <FiMapPin />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    <div className="timeline-info">
                      <div className="year">
                        <FiCalendar />
                        <span>{edu.year}</span>
                        <span className="duration">({edu.duration})</span>
                      </div>
                      <div className="grade">
                        <FiStar />
                        <span>{edu.grade}</span>
                      </div>
                    </div>

                    <p className="description">{edu.description}</p>

                    <div className="achievements">
                      <h4>Key Achievements</h4>
                      <div className="achievement-list">
                        {edu.achievements.map((achievement, i) => (
                          <span key={i} className="achievement-tag">
                            <FiChevronRight />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="courses">
                      <h4>Key Courses</h4>
                      <div className="course-tags">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button className="view-certificates">
                      View Certificates
                      <FiExternalLink />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTimeline === 'certifications' && (
          <motion.div 
            className="certifications-grid"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="certification-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="cert-badge">
                  <FiAward />
                </div>
                <div className="cert-content">
                  <h3>{cert.title}</h3>
                  <p className="issuer">{cert.issuer}</p>
                  <p className="cert-description">{cert.description}</p>
                  
                  <div className="cert-info">
                    <div className="info-item">
                      <FaRegCalendarAlt />
                      <span>{cert.year}</span>
                    </div>
                    <div className="info-item">
                      <FiCalendar />
                      <span>{cert.duration}</span>
                    </div>
                  </div>

                  <div className="cert-skills">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  <div className="cert-id">
                    ID: <span>{cert.credentialId}</span>
                  </div>
                </div>
                <button className="verify-btn">
                  Verify Credential
                  <FiExternalLink />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTimeline === 'skills' && (
          <motion.div 
            className="skills-development"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="skills-intro">
              <h3>Continuous Skill Development</h3>
              <p>Tracking my progress and growth in technical and soft skills</p>
            </div>

            <div className="skills-categories">
              {skillsDevelopment.map((category, index) => (
                <motion.div 
                  key={index}
                  className="category-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="category-title">{category.category}</h4>
                  <div className="skills-list">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="skill-item">
                        <div className="skill-header">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div 
                            className="skill-progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="progress-glow"></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="learning-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <FiBookOpen />
                </div>
                <div className="stat-content">
                  <h4>1500+</h4>
                  <p>Learning Hours</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FiAward />
                </div>
                <div className="stat-content">
                  <h4>25+</h4>
                  <p>Online Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaChartLine />
                </div>
                <div className="stat-content">
                  <h4>12</h4>
                  <p>Skills Mastered</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="download-section"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="download-content">
            <div className="download-text">
              <h3>Want to see my complete academic profile?</h3>
              <p>Download my detailed resume with all certifications and academic records</p>
            </div>
            <motion.a 
              href={resumePath}
              download="Gaurav_Kumar_Resume.pdf"
              className="download-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              Download Full Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}