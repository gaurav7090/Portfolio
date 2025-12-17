import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import './Skills.css'
import { 
  FiCode, 
  FiCpu, 
  FiDatabase, 
  FiCloud, 
  FiLayout,
  FiBarChart2,
  FiTool,
  FiStar,
  FiChevronRight
} from 'react-icons/fi'
import { 
  FaReact,
  FaJs,
  FaPython,
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaDocker
} from 'react-icons/fa'

export default function Skills() {
  const profile = useSelector(state => state.profile)
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [progressValues, setProgressValues] = useState({})
  const controls = useAnimationControls()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  useEffect(() => {
    if (activeCategory === 'frontend') {
      const timer = setTimeout(() => {
        setProgressValues({
          'React': 90,
          'JavaScript': 95,
          'HTML/CSS': 92,
          'Bootstrap': 85,
          'Tailwind': 88
        })
      }, 300)
      return () => clearTimeout(timer)
    } else if (activeCategory === 'backend') {
      const timer = setTimeout(() => {
        setProgressValues({
          'Node.js': 88,
          'Python': 82,
          'MongoDB': 85,
          'Express': 80,
          'REST API': 90
        })
      }, 300)
      return () => clearTimeout(timer)
    } else if (activeCategory === 'tools') {
      const timer = setTimeout(() => {
        setProgressValues({
          'Git': 90,
          'Docker': 75,
          'AWS': 70,
          'VS Code': 95,
          'Postman': 85
        })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [activeCategory])

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: <FiLayout />,
      color: '#667eea',
      skills: [
        { name: 'React', level: 90, icon: <FaReact />, experience: '0 or 1 years' },
        { name: 'JavaScript', level: 95, icon: <FaJs />, experience: '0 or 1 years' },
        { name: 'HTML/CSS', level: 92, icon: <FiCode />, experience: '0 or 1 years' },
        { name: 'Bootstrap', level: 85, icon: <FiLayout />, experience: '0 or 1 years' },
        { name: 'Tailwind', level: 88, icon: <FiLayout />, experience: '0 or 1 years' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: <FiCpu />,
      color: '#764ba2',
      skills: [
        { name: 'Node.js', level: 88, icon: <FaNodeJs />, experience: '0 or 1 years' },
        { name: 'Python', level: 82, icon: <FaPython />, experience: '0 or 1 years' },
        { name: 'MongoDB', level: 85, icon: <FiDatabase />, experience: '0 or 1 years' },
        { name: 'Express', level: 80, icon: <FiCode />, experience: '0 or 1 years' },
        { name: 'REST API', level: 90, icon: <FiCode />, experience: '0 or 1 years' }
      ]
    },
    {
      id: 'tools',
      name: 'Tools & DevOps',
      icon: <FiTool />,
      color: '#34A853',
      skills: [
        { name: 'Git', level: 90, icon: <FaGitAlt />, experience: '0 or 1 years' },
        { name: 'Docker', level: 75, icon: <FaDocker />, experience: '0 or 1 years' },
        { name: 'AWS', level: 70, icon: <FaAws />, experience: '0 or 1 years' },
        { name: 'VS Code', level: 95, icon: <FiCode />, experience: '0 or 1 years' },
        { name: 'Postman', level: 85, icon: <FiTool />, experience: '0 or 1 years' }
      ]
    }
  ]

  const softSkills = [
    { name: 'Problem Solving', level: 95, icon: <FiBarChart2 /> },
    { name: 'Team Leadership', level: 85, icon: <FiStar /> },
    { name: 'Communication', level: 90, icon: <FiCode /> },
    { name: 'Project Management', level: 80, icon: <FiTool /> },
    { name: 'Critical Thinking', level: 88, icon: <FiCpu /> },
    { name: 'Creativity', level: 85, icon: <FiLayout /> }
  ]

  const certifications = [
    'AWS Certified Developer',
    'React Professional Certification',
    'Google Cloud Fundamentals',
    'Docker Certified Associate',
    'Scrum Master Certified'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        stiffness: 100,
        damping: 12
      }
    }
  }

  const skillCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  }

  return (
    <section id="skills" className="skills-section" ref={ref}>
      {/* Animated Background */}
      <div className="skills-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      <div className="container">
        {/* Header */}
        <motion.div 
          className="skills-header"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="section-label">
            <FiCode className="label-icon" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="highlight">Proficiencies</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and areas of expertise
          </p>
        </motion.div>

        <div className="skills-content">
          {/* Left Column - Categories & Soft Skills */}
          <motion.div 
            className="skills-left"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Category Navigation */}
            <div className="category-nav">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ '--color': category.color }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-icon">{category.icon}</span>
                  <span className="btn-text">{category.name}</span>
                  {activeCategory === category.id && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Soft Skills */}
            <motion.div 
              className="soft-skills-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="card-header">
                <h3>Soft Skills</h3>
                <FiStar className="header-icon" />
              </div>
              <div className="soft-skills-grid">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="soft-skill-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="soft-skill-icon">{skill.icon}</div>
                    <div className="soft-skill-content">
                      <h4>{skill.name}</h4>
                      <div className="soft-skill-bar">
                        <motion.div 
                          className="soft-skill-progress"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          style={{ backgroundColor: hoveredSkill === skill.name ? '#667eea' : '#ddd' }}
                        />
                      </div>
                      <span className="soft-skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div 
              className="certifications-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="card-header">
                <h3>Certifications</h3>
                <FiCode className="header-icon" />
              </div>
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="cert-item"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                  >
                    <FiChevronRight className="cert-icon" />
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills Visualization */}
          <motion.div 
            className="skills-right"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Selected Category Skills */}
            <motion.div 
              className="skills-visualization"
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="visualization-header">
                <h3>
                  {skillCategories.find(c => c.id === activeCategory)?.name} Skills
                </h3>
                <div className="skill-stats">
                  <div className="stat">
                    <span className="stat-value">
                      {skillCategories.find(c => c.id === activeCategory)?.skills.length}
                    </span>
                    <span className="stat-label">Skills</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">0-1</span>
                    <span className="stat-label">Years Exp</span>
                  </div>
                </div>
              </div>

              <div className="skills-grid">
                {skillCategories
                  .find(c => c.id === activeCategory)
                  ?.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skill-card"
                      variants={skillCardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      custom={index}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="skill-card-header">
                        <div 
                          className="skill-icon"
                          style={{ color: skillCategories.find(c => c.id === activeCategory)?.color }}
                        >
                          {skill.icon}
                        </div>
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-experience">{skill.experience}</span>
                        </div>
                        <div className="skill-level">
                          {progressValues[skill.name] || 0}%
                        </div>
                      </div>

                      <div className="skill-progress-container">
                        <div className="skill-progress-track">
                          <motion.div 
                            className="skill-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressValues[skill.name] || 0}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1 }}
                            style={{ 
                              backgroundColor: skillCategories.find(c => c.id === activeCategory)?.color 
                            }}
                          >
                            <div className="progress-glow"></div>
                          </motion.div>
                        </div>
                        <div className="skill-milestones">
                          {[0, 25, 50, 75, 100].map((milestone) => (
                            <div 
                              key={milestone}
                              className={`milestone ${progressValues[skill.name] >= milestone ? 'active' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      <motion.div 
                        className="skill-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredSkill === skill.name ? 1 : 0,
                          height: hoveredSkill === skill.name ? 'auto' : 0
                        }}
                      >
                        <p>
                          Proficient in {skill.name.toLowerCase()} with {skill.experience} of experience. 
                          Extensive knowledge of best practices and modern methodologies.
                        </p>
                        <div className="skill-tags">
                          <span>Expert</span>
                          <span>Production</span>
                          <span>Testing</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              className="tech-stack"
              variants={itemVariants}
            >
              <h3>Technology Stack</h3>
              <div className="stack-visual">
                <div className="stack-layer">
                  <span className="layer-label">Frontend</span>
                  <div className="layer-tech">
                    {['React', 'JavaScript', 'HTML/CSS', 'Bootstrap'].map((tech, i) => (
                      <motion.span
                        key={i}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="stack-layer">
                  <span className="layer-label">Backend</span>
                  <div className="layer-tech">
                    {['Node.js', 'Python', 'MongoDB', 'Express'].map((tech, i) => (
                      <motion.span
                        key={i}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="stack-layer">
                  <span className="layer-label">Tools</span>
                  <div className="layer-tech">
                    {['Git', 'Docker', 'AWS', 'VS Code'].map((tech, i) => (
                      <motion.span
                        key={i}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skill Metrics */}
        <motion.div 
          className="skill-metrics"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="metric-card"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="metric-icon">
              <FiCpu />
            </div>
            <div className="metric-content">
              <h4>15+</h4>
              <p>Technologies Mastered</p>
            </div>
          </motion.div>
          <motion.div 
            className="metric-card"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="metric-icon">
              <FiDatabase />
            </div>
            <div className="metric-content">
              <h4>50+</h4>
              <p>Projects Completed</p>
            </div>
          </motion.div>
          <motion.div 
            className="metric-card"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="metric-icon">
              <FiCloud />
            </div>
            <div className="metric-content">
              <h4>4+</h4>
              <p>Years Experience</p>
            </div>
          </motion.div>
          <motion.div 
            className="metric-card"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="metric-icon">
              <FiStar />
            </div>
            <div className="metric-content">
              <h4>100%</h4>
              <p>Client Satisfaction</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}