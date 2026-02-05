'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageSquare, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const contactInfo = [
    { 
      icon: Mail, 
      text: 'omar.spiderofse@gmail.com', 
      onClick: () => window.open('mailto:omar.spiderofse@gmail.com?subject=Portfolio%20Inquiry', '_blank')
    },
    { 
      icon: Phone, 
      text: '+962 782 329 277', 
      onClick: () => window.open('tel:+962782329277', '_blank')
    },
    { 
      icon: MapPin, 
      text: 'Amman, Jordan 11934'
    },
  ]

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub',
      onClick: () => window.open('https://github.com/omaraburub-byte', '_blank')
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn',
      onClick: () => window.open('https://www.linkedin.com/in/omar-aburub-profile/', '_blank')
    },
    { 
      icon: MessageSquare, 
      label: 'Email',
      onClick: () => window.open('mailto:omar.spiderofse@gmail.com', '_blank')
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send as JSON to Formspree
      const response = await fetch('https://formspree.io/f/xrelnwgy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setShowSuccess(false)
          setIsSubmitting(false)
        }, 5000)
      } else {
        console.error('Formspree error:', await response.text())
        // Fallback to redirect method
        const form = e.target as HTMLFormElement
        form.submit()
      }
    } catch (error) {
      console.error('Submit error:', error)
      // Fallback to regular form submission
      const form = e.target as HTMLFormElement
      form.submit()
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barrio text-5xl text-center mb-4 text-foreground">
            SEND A WEB SIGNAL
          </h2>
          <p className="font-montserrat text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Got a project? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.button
                  key={index}
                  className={`w-full flex items-center p-4 bg-card border border-border rounded-xl hover:border-spider-red transition-all duration-300 group ${info.onClick ? 'cursor-pointer' : 'cursor-default'}`}
                  whileHover={{ x: info.onClick ? 10 : 0 }}
                  onClick={info.onClick}
                  disabled={!info.onClick}
                >
                  <div className="p-3 rounded-lg bg-background text-spider-red mr-4 group-hover:bg-spider-red group-hover:text-white transition-colors">
                    <info.icon size={20} />
                  </div>
                  <span className="text-card-foreground group-hover:text-foreground text-left">{info.text}</span>
                </motion.button>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Connect with me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-spider-red hover:border-spider-red transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={social.onClick}
                  >
                    <social.icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Dual approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg mb-6"
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {/* Hidden form for fallback submission */}
            <form 
              id="fallback-form"
              action="https://formspree.io/f/xrelnwgy" 
              method="POST"
              className="hidden"
            >
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="message" value={formData.message} />
            </form>

            {/* Visible form for user interaction */}
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors"
                  placeholder="Peter Parker"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors"
                  placeholder="peter@dailybugle.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors resize-none"
                  placeholder="With great power comes great responsibility..."
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-spider-red text-white rounded-lg font-medium flex items-center justify-center hover:bg-spider-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending Web...
                  </>
                ) : (
                  <>
                    Shoot Web
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </motion.button>
              
              {/* Fallback Email Option */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  I typically respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => window.open('mailto:omar.spiderofse@gmail.com', '_blank')}
                  className="text-sm text-spider-red underline hover:text-spider-blue transition-colors"
                >
                  ↗ Or email me directly
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}