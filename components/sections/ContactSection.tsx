'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageSquare, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://formspree.io/f/xrelnwgy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection.')
    }
  }

  const contactInfo = [
    { icon: Mail, text: 'omar.spiderofse@gmail.com', href: 'mailto:omar.spiderofse@gmail.com' },
    { icon: Phone, text: '+962 782 329 277', href: 'tel:+962782329277' },
    { icon: MapPin, text: 'Amman, Jordan 11934', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/omaraburub-byte', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/omar-aburub-profile/', label: 'LinkedIn' },
    { icon: MessageSquare, href: 'mailto:omar.spiderofse@gmail.com', label: 'Portfolio' },
  ]

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
            Got a project ? Let's build something amazing together.
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
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center p-4 bg-card border border-border rounded-xl hover:border-spider-red transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 rounded-lg bg-background text-spider-red mr-4 group-hover:bg-spider-red group-hover:text-white transition-colors">
                    <info.icon size={20} />
                  </div>
                  <span className="text-card-foreground group-hover:text-foreground">{info.text}</span>
                </motion.a>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Connect with me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-spider-red hover:border-spider-red transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg"
              >
                ⚠️ {errorMessage || 'Failed to send message. Please try again.'}
              </motion.div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors"
                placeholder="Peter Parker"
                required
                disabled={status === 'loading'}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors"
                placeholder="peter@dailybugle.com"
                required
                disabled={status === 'loading'}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spider-red transition-colors resize-none"
                placeholder="With great power comes great responsibility..."
                required
                disabled={status === 'loading'}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-spider-red text-white rounded-lg font-medium flex items-center justify-center hover:bg-spider-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
            >
              {status === 'loading' ? (
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
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              I typically respond within 24 hours.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}