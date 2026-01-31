'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageSquare } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    alert('Message sent! (In a real app, this would connect to an email service)')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { icon: Mail, text: 'omar.spiderofse@gmail.com', href: 'mailto:omar.spiderofse@gmail.com' },
    { icon: Phone, text: '+962 782 329 277', href: 'tel:+962782329277' },
    { icon: MapPin, text: 'Amman, Jordan 11934', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/omaraburub-byte', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/omar-aburub-profile/', label: 'LinkedIn' },
    { icon: MessageSquare, href: '#', label: 'Portfolio' },
  ]

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barrio text-5xl text-center mb-4 text-white">
            SEND A WEB SIGNAL
          </h2>
          <p className="font-montserrat text-gray-400 text-center mb-12 max-w-2xl mx-auto">
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
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center p-4 bg-spider-gray border border-gray-800 rounded-xl hover:border-spider-red transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 rounded-lg bg-black text-spider-red mr-4 group-hover:bg-spider-red group-hover:text-white transition-colors">
                    <info.icon size={20} />
                  </div>
                  <span className="text-gray-300 group-hover:text-white">{info.text}</span>
                </motion.a>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Connect with me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-3 bg-spider-gray border border-gray-800 rounded-lg text-gray-400 hover:text-spider-red hover:border-spider-red transition-colors"
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-spider-gray border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-spider-red transition-colors"
                placeholder="Peter Parker"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-spider-gray border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-spider-red transition-colors"
                placeholder="peter@dailybugle.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-spider-gray border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-spider-red transition-colors resize-none"
                placeholder="With great power comes great responsibility..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-3 bg-spider-red text-white rounded-lg font-medium flex items-center justify-center hover:bg-spider-red/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shoot Web
              <Send size={16} className="ml-2" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}