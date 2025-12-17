import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './Contact.css'
import { 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiSend,
  FiCheck,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMessageSquare,
  FiClock,
  FiUser,
  FiAlertCircle
} from 'react-icons/fi'
import { 
  FaWhatsapp,
  FaTelegram,
  FaPaperPlane,
  FaEnvelopeOpen,
  FaMapMarkerAlt
} from 'react-icons/fa'
import { 
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineAccessTime
} from 'react-icons/md'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [animationComplete, setAnimationComplete] = useState(false)
  const controls = useAnimationControls()
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
      setTimeout(() => setAnimationComplete(true), 1000)
    }
  }, [controls, isInView])

  const contactInfo = [
    {
      icon: <MdOutlineEmail />,
      title: 'Email Address',
      details: ['gk76095@gmail.com', ''],
      link: 'mailto:2405112120049@paruluniversity.ac.in',
      color: '#EA4335',
      gradient: 'linear-gradient(135deg, #EA4335 0%, #FF6B6B 100%)'
    },
    {
      icon: <MdOutlinePhone />,
      title: 'Phone Number',
      details: ['+91 7209011742', '+91 8083856118'],
      link: 'tel:+919876543210',
      color: '#34A853',
      gradient: 'linear-gradient(135deg, #34A853 0%, #4CD964 100%)'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      details: ['Vadodara, Gujarat', 'India'],
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4 0%, #5C6BC0 100%)'
    },
    {
      icon: <MdOutlineAccessTime />,
      title: 'Availability',
      details: ['Mon - Fri: 9AM - 6PM', 'Weekends: By Appointment'],
      color: '#FBBC05',
      gradient: 'linear-gradient(135deg, #FBBC05 0%, #FFCA28 100%)'
    }
  ]

  const socialLinks = [
    {
      icon: <FiLinkedin />,
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/gauravkumar',
      color: '#0077B5',
      gradient: 'linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)'
    },
    {
      icon: <FaWhatsapp />,
      name: 'WhatsApp',
      link: 'https://wa.me/917209011742',
      color: '#25D366',
      gradient: 'linear-gradient(135deg, #25D366 0%, #4CD964 100%)'
    },
    {
      icon: <FiGithub />,
      name: 'GitHub',
      link: 'https://github.com/gaurav7090',
      color: '#333333',
      gradient: 'linear-gradient(135deg, #333333 0%, #666666 100%)'
    },
    {
      icon: <FiTwitter />,
      name: 'Twitter',
      link: 'https://twitter.com/gauravkumar',
      color: '#1DA1F2',
      gradient: 'linear-gradient(135deg, #1DA1F2 0%, #5C6BC0 100%)'
    },
    {
      icon: <FaTelegram />,
      name: 'Telegram',
      link: 'https://t.me/shivwansi',
      color: '#0088CC',
      gradient: 'linear-gradient(135deg, #0088CC 0%, #00B2FF 100%)'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Using EmailJS for email sending
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
        to_email: 'gk76095@gmail.com',
        reply_to: formData.email
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      if (response.status === 200) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setErrors({})
        
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Failed to send email')
      }
      
    } catch (error) {
      console.error('Error sending email:', error)
      setErrors({ submit: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
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
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.9 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  }

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const inputFocusVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
      transition: { duration: 0.3 }
    }
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      {/* Animated Background Particles */}
      <div className="contact-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              background: i % 3 === 0 ? '#667eea' : i % 3 === 1 ? '#764ba2' : '#a8edea'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Floating Shapes */}
        <motion.div 
          className="floating-shape shape-1"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="floating-shape shape-2"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="floating-shape shape-3"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container">
        {/* Animated Header */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                stiffness: 100,
                damping: 15 
              }
            }
          }}
        >
          <motion.div 
            className="section-label"
            whileHover={{ scale: 1.05 }}
          >
            <FiMessageSquare className="label-icon" />
            <span>Get In Touch</span>
          </motion.div>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Let's <span className="highlight-text">Connect</span> & Build{' '}
            <span className="highlight-text">Together</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </motion.p>
        </motion.div>

        <div className="contact-content">
          {/* Left Column - Contact Info */}
          <motion.div 
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Main Contact Card */}
            <motion.div 
              className="info-card glass-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)"
              }}
            >
              <div className="card-header">
                <div className="header-icon">
                  <FaEnvelopeOpen />
                </div>
                <div>
                  <h3>Contact Information</h3>
                  <p className="info-description">
                    Feel free to reach out through any channel. I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              {/* Contact Details with Animation */}
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="detail-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 + 0.3 }
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className="detail-icon-wrapper"
                      style={{ background: info.gradient }}
                    >
                      <div className="detail-icon">
                        {info.icon}
                      </div>
                    </div>
                    <div className="detail-content">
                      <h4>{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i}>
                          {info.link ? (
                            <motion.a
                              href={info.link}
                              className="detail-link"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {detail}
                            </motion.a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links with Gradient */}
              <div className="social-section">
                <h4>Connect on Social Media</h4>
                <div className="social-buttons">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button"
                      style={{ background: social.gradient }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        transition: { 
                          delay: index * 0.1 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: `0 10px 30px ${social.color}80`
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                      <motion.span 
                        className="social-tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {social.name}
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats Card with Animation */}
            <motion.div 
              className="stats-card glass-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.8 }
              }}
            >
              {[
                { value: '24h', label: 'Response Time', icon: '⚡' },
                { value: '50+', label: 'Projects', icon: '🚀' },
                { value: '100%', label: 'Satisfaction', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="stat-item"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.9 + index * 0.2 }
                  }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <motion.h4
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 1 + index * 0.2,
                        type: "spring"
                      }}
                    >
                      {stat.value}
                    </motion.h4>
                    <p>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }
            }}
          >
            <div className="form-card glass-card">
              {/* Success Message */}
              {isSubmitted ? (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="success-icon"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 1,
                      ease: "easeInOut"
                    }}
                  >
                    <FiCheck />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thank you for reaching out. I'll get back to you within 24 hours at your email: {formData.email}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="confetti"
                  >
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="confetti-piece"
                        style={{
                          background: i % 3 === 0 ? '#667eea' : i % 3 === 1 ? '#764ba2' : '#a8edea'
                        }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ 
                          y: [0, -30, 0],
                          opacity: [1, 0],
                          x: Math.random() * 100 - 50
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 1,
                          repeatDelay: 2
                        }}
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    className="send-another-btn"
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Form Header */}
                  <motion.div 
                    className="form-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3>Send a Message</h3>
                    <p>Fill in the form below and I'll respond as soon as possible</p>
                  </motion.div>

                  {/* Contact Form */}
                  <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                    {/* Name Field */}
                    <motion.div 
                      className="form-group"
                      variants={itemVariants}
                    >
                      <motion.div 
                        className="input-wrapper"
                        whileFocus="focused"
                        variants={inputFocusVariants}
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-input ${errors.name ? 'error' : ''}`}
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="name" className="form-label">
                          <FiUser /> Your Name *
                        </label>
                        <div className="input-highlight"></div>
                      </motion.div>
                      {errors.name && (
                        <motion.span 
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FiAlertCircle /> {errors.name}
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div 
                      className="form-group"
                      variants={itemVariants}
                    >
                      <motion.div 
                        className="input-wrapper"
                        whileFocus="focused"
                        variants={inputFocusVariants}
                      >
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? 'error' : ''}`}
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="email" className="form-label">
                          <FiMail /> Email Address *
                        </label>
                        <div className="input-highlight"></div>
                      </motion.div>
                      {errors.email && (
                        <motion.span 
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FiAlertCircle /> {errors.email}
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div 
                      className="form-group"
                      variants={itemVariants}
                    >
                      <motion.div 
                        className="input-wrapper"
                        whileFocus="focused"
                        variants={inputFocusVariants}
                      >
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-input"
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="subject" className="form-label">
                          <span role="img" aria-label="subject">📝</span> Subject (Optional)
                        </label>
                        <div className="input-highlight"></div>
                      </motion.div>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div 
                      className="form-group"
                      variants={itemVariants}
                    >
                      <motion.div 
                        className="input-wrapper"
                        whileFocus="focused"
                        variants={inputFocusVariants}
                      >
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-input ${errors.message ? 'error' : ''}`}
                          placeholder=" "
                          rows={6}
                          disabled={isSubmitting}
                        />
                        <label htmlFor="message" className="form-label">
                          <span role="img" aria-label="message">💬</span> Your Message *
                        </label>
                        <div className="input-highlight"></div>
                      </motion.div>
                      {errors.message && (
                        <motion.span 
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FiAlertCircle /> {errors.message}
                        </motion.span>
                      )}
                    </motion.div>

                    {errors.submit && (
                      <motion.div 
                        className="submit-error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <FiAlertCircle /> {errors.submit}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        background: isSubmitting 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <motion.div
                            animate={floatingVariants.float}
                          >
                            <FiSend className="send-icon" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>

                    <p className="form-note">
                      * Required fields. Your email will be kept confidential.
                    </p>
                  </form>

                  {/* Floating Elements */}
                  {animationComplete && (
                    <>
                      <motion.div 
                        className="floating-element floating-1"
                        variants={floatingVariants.float}
                        animate="float"
                      >
                        <FaPaperPlane />
                      </motion.div>
                      <motion.div 
                        className="floating-element floating-2"
                        variants={floatingVariants.float}
                        animate="float"
                        style={{ animationDelay: '1s' }}
                      >
                        <FiMessageSquare />
                      </motion.div>
                      <motion.div 
                        className="floating-element floating-3"
                        variants={floatingVariants.pulse}
                        animate="pulse"
                      >
                        <FiMail />
                      </motion.div>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Location Card */}
        <motion.div 
          className="location-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 0.6,
              type: "spring",
              stiffness: 100
            }
          }}
          whileHover={{ y: -5 }}
        >
          <div className="location-info">
            <motion.div 
              className="location-icon"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <FiMapPin />
            </motion.div>
            <div className="location-details">
              <h3>Based in Vadodara</h3>
              <p>Available for remote work worldwide 🌍</p>
              <p>Open to relocation for exciting opportunities ✈️</p>
            </div>
          </div>
          <motion.a
            href="https://maps.google.com/?q=Vadodara+Gujarat+India"
            target="_blank"
            rel="noopener noreferrer"
            className="view-map-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View on Google Maps
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Email Confirmation Note */}
        <motion.div 
          className="email-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="note-icon">📧</div>
          <p>
            <strong>Note:</strong> All messages are sent to{' '}
            <span className="email-highlight">gk76095@gmail.com</span>. 
            You'll receive a confirmation email once your message is successfully sent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
