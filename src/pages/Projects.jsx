import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import './Projects.css'
import { 
  FiGithub, 
  FiExternalLink, 
  FiFilter,
  FiCode,
  FiFolder,
  FiStar,
  FiEye
} from 'react-icons/fi'
import { 
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws
} from 'react-icons/fa'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const controls = useAnimationControls()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Personal portfolio built using React, Redux and Vite with modern animations and responsive design.',
      tech: ['React', 'Redux', 'Bootstrap', 'Framer Motion'],
      github: 'https://github.com/gaurav7090',
      live: 'https://gauravkumar.dev',
      image: '/images/projects/portfolio.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Student Management System',
      description: 'CRUD based web application for managing student records with authentication and reporting.',
      tech: ['.NET', 'SQL', 'JavaScript', 'Bootstrap'],
      github: '#',
      live: '#',
      image: '/images/projects/student-management.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce website with cart, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
      image: '/images/projects/ecommerce.jpg',
      featured: true
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Real-time task management application with drag-drop functionality and team collaboration.',
      tech: ['React', 'Firebase', 'Material-UI', 'Redux'],
      github: '#',
      live: '#',
      image: '/images/projects/task-manager.jpg',
      featured: false
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'Weather forecasting application with interactive maps and location-based predictions.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
      github: '#',
      live: '#',
      image: '/images/projects/weather-app.jpg',
      featured: true
    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Content management system for blogging with rich text editor and user comments.',
      tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS'],
      github: '#',
      live: '#',
      image: '/images/projects/blog-platform.jpg',
      featured: false
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'react', label: 'React' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'featured', label: 'Featured' }
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

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'featured'
    ? projects.filter(p => p.featured)
    : activeFilter === 'react'
    ? projects.filter(p => p.tech.includes('React'))
    : projects.filter(p => p.tech.length > 2) // For fullstack

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="projects-header"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="section-label">
            <FiFolder className="label-icon" />
            <span>My Work</span>
          </div>
          <h2 className="section-title">
            Featured <span className="highlight">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of my recent work showcasing my skills and expertise
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="project-filters"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <FiFilter />
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <div className="image-overlay">
                  <div className="project-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      title="View Code"
                    >
                      <FiGithub />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      title="Live Demo"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
                <div className="project-badge">
                  {project.featured && <FiStar />}
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-stats">
                  <span className="stat">
                    <FiCode /> {project.tech.length} Tech
                  </span>
                  <span className="stat">
                    <FiEye /> Featured
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="project-stats-section"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="stat-card">
            <div className="stat-icon">
              <FiFolder />
            </div>
            <div className="stat-content">
              <h4>{projects.length}+</h4>
              <p>Projects Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiCode />
            </div>
            <div className="stat-content">
              <h4>15+</h4>
              <p>Technologies Used</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiStar />
            </div>
            <div className="stat-content">
              <h4>{projects.filter(p => p.featured).length}</h4>
              <p>Featured Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiGithub />
            </div>
            <div className="stat-content">
              <h4>100%</h4>
              <p>Code Quality</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}