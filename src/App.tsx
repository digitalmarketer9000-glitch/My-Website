/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  BarChart3, 
  Database, 
  Target, 
  LineChart, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink,
  Globe,
  Zap,
  TrendingUp,
  Layers,
  Server,
  ClipboardCheck,
  LayoutDashboard,
  Rocket,
  Briefcase,
  ArrowLeft,
  Folder,
  Send,
  Loader2,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Attempting to submit form with data:", data);
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json() as { success?: boolean; error?: string; message?: string };
      console.log("Server response:", result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSuccessMessage(result.message || 'Thank you for reaching out. We\'ll be in touch shortly.');
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        setSuccessMessage(null);
      }, 8000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black text-brand-black mb-8 leading-tight">
              Let's Scale Your <span className="text-brand-red">Business</span> Together
            </h3>
            <p className="text-gray-600 text-lg mb-10">
              Ready to turn your data into revenue? Fill out the form and our experts will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                  <Mail className="text-brand-red w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</div>
                  <div className="text-lg font-bold text-brand-black">adstrackingexpert@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                  <Globe className="text-brand-red w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office</div>
                  <div className="text-lg font-bold text-brand-black">Global Remote Agency</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-brand-black mb-4">Message Sent!</h4>
                  <p className="text-gray-600">{successMessage}</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-brand-red font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-red" /> Name
                      </label>
                      <input
                        {...register('name')}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-red transition-colors`}
                      />
                      {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-brand-red" /> Email
                      </label>
                      <input
                        {...register('email')}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-red transition-colors`}
                      />
                      {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Target className="w-4 h-4 text-brand-red" /> Service Interested In
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.service ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-red transition-colors appearance-none`}
                    >
                      <option value="">Select a service</option>
                      <option value="Server-Side Tracking">Server-Side Tracking</option>
                      <option value="Conversion API (CAPI)">Conversion API (CAPI)</option>
                      <option value="GA4 & GTM Audit">GA4 & GTM Audit</option>
                      <option value="Google Ads Expert">Google Ads Expert</option>
                      <option value="Meta Ads Scaling">Meta Ads Scaling</option>
                      <option value="Reporting Dashboards">Reporting Dashboards</option>
                    </select>
                    {errors.service && <p className="text-xs text-red-500 font-bold">{errors.service.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-brand-red" /> Message
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your project goals..."
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-red transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold flex items-center gap-2">
                      <X className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Portfolio', href: 'https://drive.google.com/drive/folders/10KyHitthH_x23mCGUcvoOfCJJk3srd67?usp=sharing', target: '_blank' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm transition-transform group-hover:scale-110">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-extrabold tracking-tighter text-white">
            DATA<span className="text-brand-red">SCALE</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              target={link.target}
              rel={link.target ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-gray-300 hover:text-brand-red transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/8801705289000?text=Hello!%20I'm%20interested%20in%20a%20Free%20Audit%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-sm text-sm font-bold transition-all transform hover:scale-105"
          >
            BOOK FREE AUDIT
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-black border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-white hover:text-brand-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/8801705289000?text=Hello!%20I'm%20interested%20in%20a%20Free%20Audit%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-red text-white w-full py-4 rounded-sm font-bold mt-4 text-center block"
              >
                BOOK FREE AUDIT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-brand-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold tracking-widest uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            Premium Analytics Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-6">
            Scale Your Business with <span className="text-brand-red">Data-Driven</span> Advertising
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
            Expert in GA4, Server-Side Tracking, and High-Performance Meta & Google Ads. We turn complex data into predictable revenue streams.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a 
              href="https://wa.me/8801705289000?text=Hello!%20I'm%20interested%20in%20a%20Free%20Audit%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-red-700 text-white px-10 py-5 rounded-sm font-black text-xl flex items-center justify-center gap-3 transition-all group shadow-xl shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-1 active:scale-95"
            >
              Book a Free Audit
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://drive.google.com/drive/folders/10KyHitthH_x23mCGUcvoOfCJJk3srd67?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-red font-bold text-lg transition-all flex items-center justify-center gap-2 group py-4 px-2"
            >
              View Case Studies
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-black bg-gray-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-brand-red">
                {[1, 2, 3, 4, 5].map((i) => <CheckCircle2 key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-400 mt-1">Trusted by <span className="text-white font-bold">250+</span> global businesses</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                  <div className="text-2xl font-bold text-white">+24.8%</div>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, delay: 1 }}
                      className="bg-brand-red h-full" 
                    />
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-gray-500 mb-1">ROAS</div>
                  <div className="text-2xl font-bold text-brand-red">8.4x</div>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '90%' }}
                      transition={{ duration: 2, delay: 1.2 }}
                      className="bg-brand-red h-full" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-white">Revenue Growth</div>
                  <TrendingUp className="text-brand-red w-5 h-5" />
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1.5 + (i * 0.1) }}
                      className="flex-1 bg-brand-red/40 hover:bg-brand-red transition-colors rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-red/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-brand-red text-white px-6 py-2 rounded-full mb-8 shadow-lg shadow-brand-red/20">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black">4+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest leading-tight text-left">Years of<br />Experience</div>
            </div>
          </div>
          
          <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4">About Me</h2>
          <h3 className="text-4xl md:text-6xl font-display font-black text-brand-black mb-8 leading-tight">
            Md Sohel Rana
          </h3>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p className="font-bold text-brand-black text-xl">
              Hello, I’m Md Sohel Rana — a Web Analytics and Digital Advertising Specialist with over 4 years of experience helping businesses grow through data-driven strategies.
            </p>
            <p>
              I specialize in setting up advanced tracking systems that allow businesses to accurately measure performance, understand user behavior, and optimize marketing campaigns.
            </p>
            <p>
              My expertise includes Google Ads, Facebook Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), server-side tracking, and conversion tracking across multiple platforms like Meta, TikTok, and others.
            </p>
            <p>
              I focus on delivering clean, reliable data because without proper tracking, scaling a business becomes guesswork.
            </p>
            <p>
              My goal is to help you improve ad performance, make smarter decisions, and maximize ROI through accurate data and effective tracking solutions.
            </p>
            <p className="text-brand-red font-black text-2xl pt-4">
              Let’s work together to turn your data into real business growth.
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a 
              href="#contact" 
              className="bg-brand-black text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-brand-red transition-all shadow-xl shadow-brand-black/10"
            >
              Work With Me
            </a>
            <a 
              href="https://wa.me/8801705289000" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-brand-black text-brand-black px-10 py-5 rounded-sm font-bold text-lg hover:bg-brand-black hover:text-white transition-all"
            >
              Contact via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ selectedService, setSelectedService }: { selectedService: number | null, setSelectedService: (id: number | null) => void }) => {
  const services = [
    {
      title: "Server-Side Tracking",
      desc: "GTM Server Container, Stape.io, and Cloudflare setup for superior data accuracy and speed.",
      longDesc: "In today's privacy-first digital landscape, traditional browser-side tracking is becoming increasingly unreliable. With the rise of ad-blockers, Intelligent Tracking Prevention (ITP), and the phasing out of third-party cookies, businesses are losing up to 30-40% of their conversion data. Server-side tracking moves the data collection process from the user's browser to a secure server you control. This not only restores data accuracy but also improves website performance by reducing the number of scripts running in the browser. Our implementation ensures you capture every critical touchpoint while maintaining strict compliance with privacy regulations like GDPR and CCPA.",
      icon: <Server className="w-8 h-8" />,
      details: [
        "Implementation of Google Tag Manager (GTM) Server-Side container.",
        "Setup on Stape.io or Google Cloud Platform (GCP) for optimal performance.",
        "Bypassing ad-blockers and ITP restrictions to recover lost data.",
        "Reduced client-side processing for faster page load speeds.",
        "Enhanced data security by controlling what data is sent to third-party vendors."
      ]
    },
    {
      title: "Conversion API (CAPI)",
      desc: "Meta, TikTok, and Reddit CAPI implementation for 100% attribution in a cookieless world.",
      longDesc: "Conversion APIs (CAPI) represent the next generation of advertising measurement. By creating a direct link between your server and the advertising platform's server, CAPI allows you to share web events that browser-based pixels might miss. This is particularly crucial for Meta (Facebook), where iOS 14.5+ restrictions have significantly hampered traditional tracking. Our CAPI setup includes advanced deduplication logic to ensure you don't double-count conversions, and we focus on maximizing your Event Match Quality (EMQ) score, which directly impacts the efficiency of the platform's optimization algorithms.",
      icon: <Zap className="w-8 h-8" />,
      details: [
        "Direct server-to-server integration for Meta (Facebook), TikTok, and Reddit.",
        "Redundant tracking setup (Browser + Server) with advanced deduplication.",
        "Improved Event Match Quality (EMQ) scores for better ad targeting.",
        "Attribution recovery in a post-iOS 14.5 and cookieless environment.",
        "Real-time signal sharing for faster algorithm optimization."
      ]
    },
    {
      title: "GA4 & GTM Audit",
      desc: "Advanced e-commerce tracking and data layer schema design for actionable insights.",
      longDesc: "Data is only useful if it's accurate. Many businesses make critical decisions based on flawed Google Analytics 4 (GA4) data due to improper setup or legacy configurations. Our comprehensive audit process deep-dives into your entire tracking ecosystem. We don't just look for errors; we redesign your data architecture to align with your specific business goals. From custom Data Layer implementations for complex e-commerce flows to advanced cross-domain tracking for multi-site brands, we ensure your GA4 property becomes a source of truth that powers growth.",
      icon: <ClipboardCheck className="w-8 h-8" />,
      details: [
        "Comprehensive audit of existing GA4 and GTM configurations.",
        "Custom Data Layer schema design for e-commerce (Purchase, Add to Cart, etc.).",
        "Setup of custom dimensions, metrics, and calculated properties.",
        "Cross-domain and cross-device tracking implementation.",
        "Data cleaning and filter setup to remove internal traffic and spam."
      ]
    },
    {
      title: "Google Ads Expert",
      desc: "Search, Shopping, and PMax campaigns with a relentless focus on ROAS and profit.",
      longDesc: "Google Ads has evolved into a highly automated, AI-driven platform. To succeed today, you need more than just keyword research; you need to feed the algorithm the right signals. We specialize in high-performance Google Ads management that prioritizes bottom-line profit over vanity metrics. Whether it's dominating search results with intent-based campaigns or leveraging the power of Performance Max (PMax) with high-quality creative assets and first-party data, our approach is always data-driven and ROI-focused.",
      icon: <Target className="w-8 h-8" />,
      details: [
        "Strategic setup of Search, Display, and Performance Max (PMax) campaigns.",
        "Advanced keyword research and negative keyword management.",
        "Smart bidding optimization (Target ROAS, Target CPA).",
        "Dynamic Remarketing setup to bring back high-intent visitors.",
        "Relentless A/B testing of ad copy and landing pages."
      ]
    },
    {
      title: "Meta Ads Scaling",
      desc: "Creative testing frameworks and precision audience targeting to scale your brand.",
      longDesc: "Scaling on Meta (Facebook & Instagram) requires a delicate balance of technical precision and creative excellence. As the platform moves towards broad targeting, your creative becomes the new 'targeting'. We implement a rigorous creative testing framework to identify high-performing assets before scaling spend. Combined with our technical tracking expertise, we ensure Meta's algorithm has the data it needs to find your ideal customers at the lowest possible cost, allowing for consistent, profitable scaling.",
      icon: <Rocket className="w-8 h-8" />,
      details: [
        "Proprietary creative testing framework to find winning ads fast.",
        "Lookalike and Interest-based audience research and segmentation.",
        "Scaling strategies (Horizontal & Vertical) for consistent growth.",
        "Catalog sales and Advantage+ shopping campaign optimization.",
        "Full-funnel strategy from awareness to high-value conversions."
      ]
    },
    {
      title: "Reporting Dashboards",
      desc: "Real-time Looker Studio dashboards for transparent ROI tracking and data visualization.",
      longDesc: "Stop logging into five different platforms to see how your marketing is performing. We build custom, real-time Looker Studio dashboards that aggregate data from all your marketing channels into a single, easy-to-understand view. Our dashboards are designed for decision-makers, highlighting the KPIs that actually matter—like blended ROAS, customer acquisition cost (CAC), and lifetime value (LTV). With automated reporting, you'll always have your finger on the pulse of your business growth.",
      icon: <LayoutDashboard className="w-8 h-8" />,
      details: [
        "Custom Looker Studio (formerly Data Studio) dashboard design.",
        "Integration of multiple data sources (GA4, Ads, Shopify, CRM).",
        "Real-time ROI and ROAS tracking for immediate decision making.",
        "Automated weekly and monthly performance reports.",
        "Visualizing complex data into easy-to-understand business insights."
      ]
    },
  ];

  const activeService = selectedService !== null ? services[selectedService] : null;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!activeService ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-display font-black text-brand-black mb-6">
                  Specialized Services for High-Growth Brands
                </h3>
                <p className="text-gray-600 text-lg">
                  We don't just run ads; we build the technical infrastructure that makes your marketing profitable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="p-10 bg-gray-50 border border-gray-100 rounded-sm hover:border-brand-red/30 transition-all group"
                  >
                    <div className="w-16 h-16 bg-brand-black text-white flex items-center justify-center mb-8 group-hover:bg-brand-red transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-4 text-brand-black">{service.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <button 
                      onClick={() => setSelectedService(index)}
                      className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all cursor-pointer"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Case Studies Row */}
              <div className="mt-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div>
                    <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4">Success Stories</h2>
                    <h3 className="text-3xl md:text-4xl font-display font-black text-brand-black">Proven Results in Action</h3>
                  </div>
                  <a 
                    href="https://drive.google.com/drive/folders/10KyHitthH_x23mCGUcvoOfCJJk3srd67?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-black hover:text-brand-red font-bold flex items-center gap-2 transition-colors group"
                  >
                    View All Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Fashion Brand Scale",
                      desc: "Achieved a 150% increase in ROAS and 3x revenue growth through server-side tracking and creative testing.",
                      icon: <TrendingUp className="w-6 h-6" />,
                      metric: "150% ROAS Boost",
                      slug: "fashion-brand-scale"
                    },
                    {
                      title: "SaaS Attribution Fix",
                      desc: "Resolved 40% data leakage for a B2B SaaS platform using Meta CAPI and advanced GTM server-side setup.",
                      icon: <ShieldCheck className="w-6 h-6" />,
                      metric: "100% Accuracy",
                      slug: "saas-attribution-fix"
                    },
                    {
                      title: "Global Market Entry",
                      desc: "Scaled a wellness brand from $10k to $250k monthly spend with a 4.5x ROAS across 12 countries.",
                      icon: <Globe className="w-6 h-6" />,
                      metric: "25x Revenue Scale",
                      slug: "global-market-entry"
                    }
                  ].map((study, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-brand-black p-8 rounded-sm group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-brand-red/20 transition-colors" />
                      <div className="text-brand-red mb-6">{study.icon}</div>
                      <div className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">{study.metric}</div>
                      <h4 className="text-xl font-display font-bold text-white mb-4">{study.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8">{study.desc}</p>
                      <a 
                        href={`/case-studies/${study.slug}`}
                        className="block w-full py-3 border border-white/10 hover:border-brand-red hover:bg-brand-red text-white text-sm font-bold transition-all text-center"
                      >
                        View Details
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors mb-12 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-sm">Back to Services</span>
              </button>

              <div className="bg-gray-50 p-8 md:p-16 rounded-sm border border-gray-100">
                <div className="w-20 h-20 bg-brand-red text-white flex items-center justify-center mb-10 shadow-xl shadow-brand-red/20">
                  {activeService.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-brand-black mb-6 leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-brand-red pl-6">
                  {activeService.desc}
                </p>
                
                <div className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed">
                  <p>{activeService.longDesc}</p>
                </div>
                
                <div className="space-y-8">
                  <h4 className="text-2xl font-display font-bold text-brand-black">What's Included:</h4>
                  <ul className="grid gap-4">
                    {activeService.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-700 text-lg">
                        <CheckCircle2 className="w-6 h-6 text-brand-red flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col sm:flex-row gap-6 items-center">
                  <a 
                    href={`https://wa.me/8801705289000?text=Hello!%20I'm%20interested%20in%20your%20Service:%20${activeService.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-red hover:bg-red-700 text-white px-10 py-5 rounded-sm font-bold text-xl transition-all w-full sm:w-auto text-center"
                  >
                    Discuss This Service
                  </a>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="text-brand-black hover:text-brand-red font-bold text-lg transition-all"
                  >
                    View Other Services
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const TechStack = () => {
  const techs = [
    { name: "Google Tag Manager", icon: <Layers className="w-10 h-10" /> },
    { name: "GA4", icon: <BarChart3 className="w-10 h-10" /> },
    { name: "Meta Pixel", icon: <Target className="w-10 h-10" /> },
    { name: "Shopify", icon: <Globe className="w-10 h-10" /> },
    { name: "WordPress", icon: <Zap className="w-10 h-10" /> },
    { name: "BigQuery", icon: <Database className="w-10 h-10" /> },
  ];

  return (
    <section id="tech-stack" className="py-20 bg-brand-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-500 font-bold uppercase tracking-[0.3em] text-xs mb-12">
          Our Technology Stack
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-50 hover:opacity-100 transition-opacity">
          {techs.map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="text-white group-hover:text-brand-red transition-colors">
                {tech.icon}
              </div>
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: "250+", label: "Projects Completed" },
    { value: "10+", label: "Years Experience" },
    { value: "95%", label: "Client Retention" },
    { value: "$50M+", label: "Ad Spend Managed" },
  ];

  return (
    <section className="py-24 bg-brand-red relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-5xl md:text-6xl font-display font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/80 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      phase: "Phase 1",
      title: "Tracking Audit & Data Layer Setup",
      desc: "We analyze your current setup and build a robust data layer schema to capture every critical user action."
    },
    {
      phase: "Phase 2",
      title: "Technical Implementation",
      desc: "Our engineers implement Web and Server-side tracking to ensure 100% data accuracy and bypass ad-blockers."
    },
    {
      phase: "Phase 3",
      title: "Campaign Launch & Scaling",
      desc: "We launch high-performance campaigns using our proprietary creative testing and bidding frameworks."
    },
    {
      phase: "Phase 4",
      title: "Data-Driven Optimization",
      desc: "Continuous refinement based on real-time ROI data to maximize your ROAS and scale your business."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4">Our Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black text-brand-black mb-8 leading-tight">
              A Systematic Approach to <span className="text-brand-red">Digital Growth</span>
            </h3>
            <p className="text-gray-600 text-lg mb-10">
              We follow a rigorous, technical process to ensure your marketing is built on a foundation of clean, reliable data.
            </p>
            <a 
              href="https://wa.me/8801705289000?text=Hello!%20I'd%20like%20to%20start%20a%20project%20with%20DataScale."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-black text-white px-8 py-4 rounded-sm font-bold hover:bg-brand-red transition-colors inline-block"
            >
              Start Your Project
            </a>
          </div>

          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gray-200 hidden md:block" />
            
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative md:pl-20"
              >
                <div className="absolute left-0 top-0 w-12 h-12 bg-brand-red text-white flex items-center justify-center font-black rounded-sm z-10 hidden md:flex">
                  {i + 1}
                </div>
                <div className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">{step.phase}</div>
                <h4 className="text-2xl font-display font-bold text-brand-black mb-3">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900 to-black p-12 md:p-20 rounded-sm border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 blur-3xl rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm mb-6">Our Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
              Explore Our <span className="text-brand-red">Success Stories</span>
            </h3>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              We've helped hundreds of businesses scale through technical precision and data-driven strategies. View our full portfolio of tracking implementations and ad campaigns on Google Drive.
            </p>
            <a 
              href="https://drive.google.com/drive/folders/10KyHitthH_x23mCGUcvoOfCJJk3srd67?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-red-700 text-white px-12 py-6 rounded-sm font-black text-2xl inline-flex items-center gap-4 transition-all transform hover:scale-105 shadow-2xl shadow-brand-red/20"
            >
              View Full Portfolio on Drive
              <ExternalLink className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ 
  setSelectedService, 
  setIsCookieModalOpen, 
  setIsTermsModalOpen,
  setIsPrivacyModalOpen
}: { 
  setSelectedService: (id: number | null) => void,
  setIsCookieModalOpen: (isOpen: boolean) => void,
  setIsTermsModalOpen: (isOpen: boolean) => void,
  setIsPrivacyModalOpen: (isOpen: boolean) => void
}) => {
  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm transition-transform group-hover:scale-110">
                <BarChart3 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tighter">
                DATA<span className="text-brand-red">SCALE</span>
              </span>
            </a>
            <p className="text-gray-400 leading-relaxed mb-8">
              Premium Web Analytics and Advertising Agency. We turn data into revenue through technical precision and creative excellence.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/20 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-8">Services</h5>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => { setSelectedService(0); window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' }); }} className="hover:text-brand-red transition-colors">Server-Side Tracking</button></li>
              <li><button onClick={() => { setSelectedService(1); window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' }); }} className="hover:text-brand-red transition-colors">Conversion API</button></li>
              <li><button onClick={() => { setSelectedService(2); window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' }); }} className="hover:text-brand-red transition-colors">GA4 & GTM Audit</button></li>
              <li><button onClick={() => { setSelectedService(3); window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' }); }} className="hover:text-brand-red transition-colors">Google Ads Scaling</button></li>
              <li><button onClick={() => { setSelectedService(4); window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' }); }} className="hover:text-brand-red transition-colors">Meta Ads Strategy</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-8">Company</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-brand-red transition-colors">About Us</a></li>
              <li><a href="https://drive.google.com/drive/folders/10KyHitthH_x23mCGUcvoOfCJJk3srd67?usp=sharing" target="_blank" className="hover:text-brand-red transition-colors">Case Studies</a></li>
              <li><a href="#process" className="hover:text-brand-red transition-colors">Our Process</a></li>
              <li><a href="#contact" className="hover:text-brand-red transition-colors">Contact</a></li>
              <li><button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-brand-red transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-8">Newsletter</h5>
            <p className="text-gray-400 mb-6">Get the latest data-driven marketing insights.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-sm flex-1 focus:outline-none focus:border-brand-red transition-colors"
              />
              <button className="bg-brand-red px-4 py-3 rounded-sm hover:bg-red-700 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2026 DataScale Analytics & Ads. All rights reserved.</p>
          <div className="flex gap-8">
            <button 
              onClick={() => setIsTermsModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setIsCookieModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalModal = ({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-sm p-8 md:p-12 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-red transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-3xl font-display font-black text-brand-black mb-8 border-b-4 border-brand-red inline-block pb-2">
              {title}
            </h2>
            <div className="prose prose-brand max-w-none text-gray-600 leading-relaxed space-y-6">
              {content}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-brand-black text-white px-8 py-3 rounded-sm font-bold hover:bg-brand-red transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services selectedService={selectedService} setSelectedService={setSelectedService} />
        <Process />
        <TechStack />
        <Stats />
        <Portfolio />
        <AboutUs />
        <ContactForm />
        
        <LegalModal 
          isOpen={isCookieModalOpen} 
          onClose={() => setIsCookieModalOpen(false)} 
          title="Cookie Policy"
          content={
            <>
              <p>This Cookie Policy explains how DataScale Analytics & Ads ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">What are cookies?</h3>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">Why do we use cookies?</h3>
              <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">How can I control cookies?</h3>
              <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
            </>
          }
        />

        <LegalModal 
          isOpen={isPrivacyModalOpen} 
          onClose={() => setIsPrivacyModalOpen(false)} 
          title="Privacy Policy"
          content={
            <>
              <p>At DataScale, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us via WhatsApp or email.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">2. How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new products and services.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">3. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">4. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Please contact us at adstrackingexpert@gmail.com if you wish to exercise these rights.</p>
            </>
          }
        />

        <LegalModal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)} 
          title="Terms of Service"
          content={
            <>
              <p>Welcome to DataScale Analytics & Ads. By accessing our website, you agree to be bound by these Terms of Service.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">1. Services</h3>
              <p>DataScale provides web analytics, tracking implementation, and digital advertising management services. The specific scope of work for any project will be outlined in a separate agreement or proposal.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">2. Intellectual Property</h3>
              <p>The content on this website, including text, graphics, logos, and images, is the property of DataScale and is protected by copyright and other intellectual property laws.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">3. Limitation of Liability</h3>
              <p>DataScale shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
              <h3 className="text-xl font-bold text-brand-black mt-6">4. Governing Law</h3>
              <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DataScale operates, without regard to its conflict of law provisions.</p>
            </>
          }
        />
        
        {/* CTA Section */}
        <section className="py-24 bg-brand-black text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-red/5 blur-3xl rounded-full translate-y-1/2" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
              Ready to Turn Your Data Into <span className="text-brand-red">Revenue?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Book a free 30-minute tracking and ads audit with our experts. No strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://wa.me/8801705289000?text=Hello!%20I'm%20interested%20in%20a%20Free%20Audit%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-red hover:bg-red-700 text-white px-10 py-5 rounded-sm font-bold text-xl transition-all transform hover:scale-105 inline-block"
              >
                Book My Free Audit
              </a>
              <a 
                href="#contact"
                className="border border-white/20 hover:border-white/40 text-white px-10 py-5 rounded-sm font-bold text-xl transition-all inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer 
        setSelectedService={setSelectedService} 
        setIsCookieModalOpen={setIsCookieModalOpen}
        setIsTermsModalOpen={setIsTermsModalOpen}
        setIsPrivacyModalOpen={setIsPrivacyModalOpen}
      />
    </div>
  );
}

