import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, Download, Menu, X, ExternalLink, Sun, Moon, Code, Briefcase, GraduationCap, Award, ChevronRight, MapPin, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';


export default function Portfolio() {
  // States
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const [typewriterText, setTypewriterText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode

// Theme toggle 
const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
};
const roles = [
  'Full-Stack Software Engineer',
  'Front-end Engineer',
  'Software Developer',
  'React.js Developer',
  'UI/UX Designer',
];

// Typewriter effect
useEffect(() => {
  const typingSpeed = isDeleting ? 50 : 150;
  const currentRole = roles[roleIndex];
  
  const timer = setTimeout(() => {
    if (!isDeleting) {
      // Typing
      if (typewriterText.length < currentRole.length) {
        setTypewriterText(currentRole.substring(0, typewriterText.length + 1));
      } else {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting
      if (typewriterText.length > 0) {
        setTypewriterText(currentRole.substring(0, typewriterText.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, typingSpeed);

  return () => clearTimeout(timer);
}, [typewriterText, isDeleting, roleIndex]);

// Scroll effect from nav
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
    
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }
};

// Contact Form submission

const handleFormSubmit = (e) => {
  e.preventDefault();
  setFormStatus('Sending...');

  const serviceID = 'service_bfgsave';      
  const templateID = 'template_rm5ehlf';    
  const publicKey = 'a3Big0c5NNHKIY0ZG';      

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  };

  emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setFormStatus('✅ Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setFormStatus('❌ Failed to send message. Please try again.');
      setTimeout(() => setFormStatus(''), 5000);
    });
};

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Atharva_Kulkarni_Resume.pdf';
    link.download = 'Atharva_Kulkarni_Resume.pdf';
    link.click();
  };

const experiences = [
  {
    company: "Syracuse University",
    role: "Software Engineering Intern",
    location: "Syracuse, NY",
    period: "Jun 2025 - Present",
    achievements: [
      "Prototyped an AI-driven resume parser with 70% parsing accuracy across 300+ test resumes using PDFMiner and spaCy",
      "Developed REST APIs in Node.js and designed PostgreSQL schemas to manage 1,000+ parsed records",
      "Integrated a React.js interface with backend APIs for real-time job postings updates"
    ]
  },
  {
    company: "Clutch Delivery LLC",
    role: "Software Engineering Intern",
    location: "Syracuse, NY",
    period: "May 2024 - Aug 2024",
    achievements: [
      "Increased platform engagement by 40% by developing full-stack web and mobile platforms with React.js and TypeScript",
      "Cut backend latency from ~450ms to 130ms by optimizing Node.js APIs and MongoDB queries",
      "Reduced release time by 70% by containerizing backend services with Docker on auto-scaled EC2 instances",
      "Lowered operational costs by 20% with a new route-optimization algorithm scaling to 500+ weekly orders"
    ]
  },
  {
    company: "TCR Innovation",
    role: "Full-Stack Web Developer Intern",
    location: "Mumbai, India",
    period: "Jan 2022 - Jul 2022",
    achievements: [
      "Boosted monthly bookings to 1,000+ by developing a responsive travel agency platform with React.js and Redux",
      "Doubled backend throughput by optimizing Node.js APIs and PostgreSQL queries with caching",
      "Implemented secure payment integration with Stripe API, enabling seamless online transactions for customers",
      "Enhanced user engagement through responsive UI/UX improvements using Tailwind CSS and mobile-first design principles"

    ]
  },
  {
    company: "The Sparks Foundation",
    role: "Web Development Intern",
    location: "Mumbai, India",
    period: "Jul 2021 - Dec 2021",
    achievements: [
      "Scaled a Java Spring Boot backend on AWS EC2 to support 1,000+ concurrent users",
      "Reduced API failures by 20% by implementing secure, rate-limited REST endpoints with OAuth",
      "Optimized database queries and added indexes in PostgreSQL, reducing average query response time by 40%"
    ]
  }
];

const projects = [
  {
    title: "AI-Powered Resume Analyzer & Job Matcher",
    tech: "React.js, Node.js, PostgreSQL, Anthropic Claude API, JWT, OAuth",
    description: "Full-stack platform for AI-driven resume analysis and job matching",
    highlights: [
      "Developed RESTful APIs with Node.js and PostgreSQL to manage parsed resume records with JWT-based and OAuth 2.0 authentication and role-based access control",
      "Integrated Anthropic Claude AI API, providing ATS compatibility scores and actionable optimization feedback",
      "Designed intuitive React.js interface with responsive UI/UX, enabling users to seamlessly upload resumes, view analysis results, and explore matched job opportunities"      ]
  },
  {
    title: "Syracuse University Shuttle Tracker",
    tech: "Java, Spring Boot, Microsoft SQL Server, React.js, WebSocket",
    description: "Real-time shuttle tracking system serving 120+ daily active students",
    highlights: [
      "Architected real-time tracking system using WebSocket connections processing 2,500+ monthly requests, improving campus transportation efficiency",
      "Reduced shuttle wait times by 30% through dynamic route optimization algorithm with intelligent drop-off scheduling and demand prediction",
      "Deployed scalable Java Spring Boot backend with JUnit testing achieving 95% code coverage, ensuring reliable service for concurrent shuttle tracking"
    ]
  },
  {
    title: "Skin Cancer Classification using CNN",
    tech: "Python, TensorFlow, Node.js, React.js, OpenAI",
    description: "Full-stack AI classification platform with 85% prediction accuracy",
    highlights: [
      "Built Convolutional Neural Network using TensorFlow with HAM10000 dataset, achieving 85% classification accuracy across 7 skin lesion types",
      "Integrated OpenAI API to generate detailed diagnostic insights and medical recommendations, enhancing clinical decision-making support",
      "Deployed model via Express.js backend with TensorFlow.js for secure on-device image processing, validated across 500+ test cases for medical reliability"
    ]
  },
  {
    title: "Vocal for Local: E-commerce Platform",
    tech: "MongoDB, Express, React.js, Node.js, Stripe, Material UI",
    description: "E-commerce platform enabling 15+ local businesses to transition to digital storefronts during COVID-19",
    highlights: [
      "Engineered full-stack MERN application supporting 15+ small vendors, enabling seamless digital transformation during COVID-19 pandemic",
      "Integrated Stripe Checkout API for PCI-compliant payment processing, handling secure credit/debit card transactions for 500+ customers",
      "Built responsive React.js interface with Material UI, delivering intuitive product management dashboard that accelerated vendor onboarding by 60%"
    ]
  },
  {
    title: "Blockchain Court Evidence Management",
    tech: "Ethereum, IPFS, React, Node.js, Web3.js, Smart Contracts",
    description: "Blockchain-powered legal evidence system with tamper-proof storage and transparent chain of custody",
    highlights: [
      "Developed Ethereum smart contracts for decentralized evidence submission with immutable audit trails and cryptographic verification of all submissions",
      "Integrated IPFS for distributed document storage and Web3.js with React frontend, providing streamlined interface for legal authorities and investigators",
      "Implemented role-based access control enabling case registration, evidence uploads, and permission management while eliminating document fraud through blockchain immutability"
    ]
  },
  {
    title: "Cryptoverse",
    tech: "React, Redux Toolkit, RapidAPI, Ant Design, Axios",
    description: "Real-time cryptocurrency dashboard displaying prices, market trends, and latest news",
    highlights: [
      "Integrated RapidAPI's CoinRanking and Bing News APIs to deliver real-time cryptocurrency prices, market data, and breaking news in unified dashboard",
      "Implemented Redux Toolkit for centralized state management across 10+ components, ensuring efficient data flow and optimized re-rendering performance",
      "Built responsive UI with Ant Design and React Router, delivering seamless navigation and polished user experience across desktop and mobile devices"
    ]
  }
];

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Python","Java", "JavaScript", "TypeScript", "SQL", "C#", "C/C++", "HTML", "CSS"]
  },
  {
    title: "Frontend",
    icon: Award,
    skills: ["React.js", "Next.js", "Angular", "Redux", "Material UI", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Backend",
    icon: Briefcase,
    skills: ["Node.js", "Express", "Spring Boot", "Django", "Flask", "REST APIs"]
  },
  {
    title: "Databases",
    icon: GraduationCap,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Microsoft SQL Server", "Firebase"]
  },
  {
    title: "DevOps & Tools",
    icon: Terminal,
    skills: ["Docker", "Jenkins", "Git/Github", "AWS (EC2, Lambda, S3, ECS)", "CI/CD", "Webpack", "Postman", "JWT", "OAuth", "Figma", "Stripe"]
  },
  {
    title: "Libraries & Frameworks",
    icon: Award,
    skills: ["TensorFlow", "Pandas", "NumPy", "GraphQL", "Jest", "JUnit", "WebSocket"]
  }
];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950' 
        : 'bg-white'
    }`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl shadow-cyan-500/10 py-3'
            : 'bg-white/95 backdrop-blur-md shadow-xl shadow-gray-200 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent z-10">
              {'<AK />'}
            </div>
            
            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
              {['home', 'about', 'education', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section
                      ? isDarkMode
                        ? 'text-cyan-400 font-semibold'
                        : 'text-cyan-600 font-semibold'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-cyan-400'
                        : 'text-gray-600 hover:text-cyan-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Theme Toggle - Desktop Only */}
            <div className="hidden md:flex items-center z-10">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800 border border-slate-700 hover:border-cyan-500/50'
                    : 'bg-gray-100 border border-gray-300 hover:border-cyan-500'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="text-cyan-400" size={20} />
                ) : (
                  <Moon className="text-gray-700" size={20} />
                )}
              </button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="md:hidden flex items-center gap-3 z-10">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800 border border-slate-700 hover:border-cyan-500/50'
                    : 'bg-gray-100 border border-gray-300 hover:border-cyan-500'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="text-cyan-400" size={20} />
                ) : (
                  <Moon className="text-gray-700" size={20} />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors p-1 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-cyan-400'
                    : 'text-gray-600 hover:text-cyan-600'
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 pb-4 border-t ${
          isDarkMode 
            ? 'border-slate-800 bg-slate-900/95' 
            : 'border-gray-200 bg-white/95'
        } backdrop-blur-md rounded-b-lg`}>
          {['home', 'about', 'education', 'experience', 'skills', 'projects', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block w-full text-left py-3 px-4 capitalize transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      )}
        </div>
      </nav>

    {/* Hero Section */}
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-cyan-500/10 via-slate-950 to-purple-500/10'
            : 'bg-gradient-to-br from-cyan-50 via-white to-purple-50'
        }`}></div>
        {/* Animated gradient orbs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 right-1/3 w-64 h-64 ${
          isDarkMode ? 'bg-magenta-500/20' : 'bg-magenta-400/30'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="animate-fade-in-up">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } mb-6 px-4`}>
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">Atharva Kulkarni</span>
          </h1>
          
          <div className="mb-6 px-4">
            <div className="text-lg sm:text-xl md:text-2xl font-mono flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="text-cyan-400">$whoami</span>
              <span className={`min-w-[250px] sm:min-w-[300px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {typewriterText}
                <span className="animate-pulse text-cyan-400">|</span>
              </span>
            </div>
          </div>

          <div className="mb-6 max-w-2xl mx-auto px-4">
            <p className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            } mb-2 leading-relaxed`}>
              Full-stack engineer who turns complex challenges into elegant solutions.
            </p>
            <p className={`text-sm sm:text-base ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            } leading-relaxed`}>
              Specialized in building scalable platforms with React.js, Node.js, and AWS. Proven track record of 3x performance improvements and systems serving 1,000+ users.
            </p>
          </div>

          {/* Job Status Banner */}
          <div className={`mb-8 mx-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30' 
              : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400'
          } border px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              Open to Full-Time Opportunities
            </span>
            <span className={`hidden sm:inline ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>•</span>
            <span className={`hidden sm:inline ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Available Immediately</span>
            <span className={`hidden md:inline ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>•</span>
            <span className={`hidden md:inline ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Open to Relocation</span>
            <span className={`hidden md:inline ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>•</span>
            <span className={`hidden md:inline ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>No Sponsorship Required</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => window.open('/Atharva_Kulkarni_Resume.pdf', '_blank')}
              className={`px-6 sm:px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                isDarkMode
                  ? 'bg-purple-500/10 border-purple-500 text-purple-400 hover:bg-purple-500/20'
                  : 'bg-purple-50 border-purple-500 text-purple-600 hover:bg-purple-100'
              }`}
            >
              <ExternalLink size={20} />
              <span className="hidden sm:inline">View Resume</span>
              <span className="sm:hidden">View</span>
            </button>
            <button
              onClick={downloadResume}
              className={`px-6 sm:px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                isDarkMode
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                  : 'border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white'
              }`}
            >
              <Download size={20} />
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 px-4">
            <a 
              href="mailto:atharva.kulkarni21@gmail.com" 
              className={`transition-all duration-200 transform hover:scale-110 ${
                isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a 
              href="tel:+17328290453" 
              className={`transition-all duration-200 transform hover:scale-110 ${
                isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}
            >
              <Phone size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/atharvak1708" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-200 transform hover:scale-110 ${
                isDarkMode ? 'text-slate-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-500'
              }`}
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a 
              href="https://github.com/AtharvaK1708" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-200 transform hover:scale-110 ${
                isDarkMode ? 'text-slate-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-500'
              }`}
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>

  {/* About Section */}
  <section id="about" className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
      </h2>
      <p className="text-center text-cyan-400 font-mono mb-12">{'// Who I am'}</p>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-4`}>
            Full-Stack Software Engineer
          </h3>
          <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
          👋 Hey! I’m Atharva — a Master’s in Computer Science graduate from Syracuse University with 1.5+ years of hands-on, result-driven experience, and a passion for building scalable, user-focused software products that make a meaningful impact. My interests lie at the intersection of full-stack development, UI/UX design, and machine learning.

          </p>
          <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
          Through internships and hands-on projects, I’ve built customer-facing platforms, mobile applications, and backend services using tools like React.js, Node.js, MongoDB, SQL, Java Spring Boot, and AWS. I’ve worked on secure APIs, integrated Stripe for payments, and designed intelligent workflows to streamline operations and enhance user experience.

          </p>
          <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} leading-relaxed`}>
          Outside of internships, my projects range from real-time university shuttle tracking systems to e-commerce platforms for local businesses and ML-powered web apps for skin cancer classification — combining technical depth with practical problem-solving.

          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-500/20' 
              : 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-300'
          } border p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
            isDarkMode ? 'hover:border-cyan-400/50 hover:shadow-cyan-500/20' : 'hover:border-cyan-400 hover:shadow-cyan-300/50'
          }`}>
            <div className={`text-4xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-2`}>1.5+</div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Years Experience</div>
          </div>
          
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-500/10 to-magenta-500/10 border-purple-500/20' 
              : 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-300'
          } border p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
            isDarkMode ? 'hover:border-purple-400/50 hover:shadow-purple-500/20' : 'hover:border-purple-400 hover:shadow-purple-300/50'
          }`}>
            <div className={`text-4xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`}>4</div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Internships</div>
          </div>
          
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20' 
              : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-300'
          } border p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
            isDarkMode ? 'hover:border-teal-400/50 hover:shadow-teal-500/20' : 'hover:border-teal-400 hover:shadow-teal-300/50'
          }`}>
            <div className={`text-4xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'} mb-2`}>10+</div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Hands-on Projects</div>
          </div>
          
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-500/10 to-magenta-500/10 border-purple-500/20' 
              : 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-300'
          } border p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
            isDarkMode ? 'hover:border-purple-400/50 hover:shadow-purple-500/20' : 'hover:border-purple-400 hover:shadow-purple-300/50'
          }`}>
            <div className={`text-4xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`}>15+</div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Tools & Technologies</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Education Section */}
  <section id="education" className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Education</span>
      </h2>
      <p className="text-center text-cyan-400 font-mono mb-12">{'// Academic background'}</p>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className={`${
          isDarkMode 
            ? 'bg-slate-900/50 border-cyan-500/20' 
            : 'bg-white border-cyan-300 shadow-md'
        } border p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${
          isDarkMode ? 'hover:border-cyan-400/50 hover:shadow-cyan-500/20' : 'hover:border-cyan-400 hover:shadow-cyan-300/50'
        }`}>
          <div className="flex items-start gap-4">
            <GraduationCap className={`${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} flex-shrink-0`} size={32} />
            <div>
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg`}>
                Master of Science, Computer Science
              </h4>
              <p className={`${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} font-semibold`}>
                Syracuse University
              </p>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mt-1`}>
                Aug 2023 - May 2025 | GPA: 3.67/4.0
              </p>
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-gray-500'} text-sm mt-2`}>
                Courses: Data Mining, Object Oriented Design (Java), Algorithms, Machine Learning
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${
          isDarkMode 
            ? 'bg-slate-900/50 border-purple-500/20' 
            : 'bg-white border-purple-300 shadow-md'
        } border p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${
          isDarkMode ? 'hover:border-purple-400/50 hover:shadow-purple-500/20' : 'hover:border-purple-400 hover:shadow-purple-300/50'
        }`}>
          <div className="flex items-start gap-4">
            <GraduationCap className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} flex-shrink-0`} size={32} />
            <div>
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg`}>
                Bachelor of Eng., Computer Engineering
              </h4>
              <p className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold`}>
                University of Mumbai
              </p>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mt-1`}>
                Aug 2019 - Jun 2023 | GPA: 9.41/10
              </p>
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-gray-500'} text-sm mt-2`}>
                Courses: Operating Systems, Distributed Systems, Data Structures, System Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      
      {/* Experience Section */}
<section id="experience" className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Work Experience</span>
    </h2>
    <p className="text-center text-cyan-400 font-mono mb-12">{'// My professional journey'}</p>
    
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div 
          key={index} 
          className={`${
            isDarkMode 
              ? 'bg-slate-900/50 border-slate-800' 
              : 'bg-white border-gray-200 shadow-md'
          } border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
            isDarkMode ? 'hover:border-cyan-500/50 hover:shadow-cyan-500/10' : 'hover:border-cyan-400 hover:shadow-cyan-300/50'
          }`}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {exp.role}
              </h3>
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                {exp.company}
              </p>
              <div className={`flex items-center gap-2 text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                <MapPin size={16} />
                {exp.location}
              </div>
            </div>
            <div className={`text-sm mt-2 md:mt-0 px-4 py-2 rounded-full ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-400' 
                : 'bg-gray-100 border-gray-300 text-gray-700'
            } border`}>
              {exp.period}
            </div>
          </div>
          <ul className="space-y-2">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className={`flex items-start gap-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                <ChevronRight className={`${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} flex-shrink-0 mt-1`} size={20} />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Skills Section */}
<section id="skills" className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills & Technologies</span>
    </h2>
    <p className="text-center text-cyan-400 font-mono mb-12">{'// My tech stack'}</p>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => {
        const Icon = category.icon;
        return (
          <div 
            key={index} 
            className={`${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white border-gray-200 shadow-md'
            } border p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${
              isDarkMode ? 'hover:border-purple-500/50 hover:shadow-purple-500/10' : 'hover:border-purple-400 hover:shadow-purple-300/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg">
                <Icon className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
                    isDarkMode
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-purple-500/50 hover:text-purple-400'
                      : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Projects Section */}
<section id="projects" className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Featured Projects</span>
    </h2>
    <p className="text-center text-cyan-400 font-mono mb-12">{'// Things I\'ve built'}</p>
    
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={`${
            isDarkMode 
              ? 'bg-slate-900/50 border-slate-800' 
              : 'bg-white border-gray-200 shadow-md'
          } border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${
            isDarkMode ? 'hover:border-purple-500/50 hover:shadow-purple-500/10' : 'hover:border-purple-400 hover:shadow-purple-300/50'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className={`text-xl font-bold ${
              isDarkMode 
                ? 'text-white group-hover:text-cyan-400' 
                : 'text-gray-900 group-hover:text-cyan-600'
            } transition-colors`}>
              {project.title}
            </h3>
            <ExternalLink 
              className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} cursor-pointer hover:scale-110 transition-transform`} 
              size={20} 
            />
          </div>
          <p className={`font-semibold text-sm mb-3 font-mono ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            {project.tech}
          </p>
          <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            {project.description}
          </p>
          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                <ChevronRight 
                  className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} flex-shrink-0 mt-0.5`} 
                  size={16} 
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Contact Section */}
<section id="contact" className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Get In Touch</span>
    </h2>
    <p className="text-center text-cyan-400 font-mono mb-4">{'// Let\'s connect'}</p>
    <p className={`text-center mb-12 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
    Have an exciting project or opportunity? Drop me a message and let's turn ideas into reality.
    </p>
    
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div>
        <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 group">
            <div className={`p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20' 
                : 'bg-cyan-50 border border-cyan-200 group-hover:bg-cyan-100'
            }`}>
              <Mail className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Email</p>
              <a 
                href="mailto:atharva.kulkarni21@gmail.com" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-cyan-400' 
                    : 'text-gray-700 hover:text-cyan-600'
                }`}
              >
                atharva.kulkarni21@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 group">
            <div className={`p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-teal-500/10 border border-teal-500/20 group-hover:bg-teal-500/20' 
                : 'bg-teal-50 border border-teal-200 group-hover:bg-teal-100'
            }`}>
              <Phone className={isDarkMode ? 'text-teal-400' : 'text-teal-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Phone</p>
              <a 
                href="tel:+17328290453" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-teal-400' 
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                +1 (732) 829-0453
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 group">
            <div className={`p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20' 
                : 'bg-purple-50 border border-purple-200 group-hover:bg-purple-100'
            }`}>
              <Linkedin className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>LinkedIn</p>
              <a 
                href="https://linkedin.com/in/atharvak1708" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-purple-400' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                linkedin.com/in/atharvak1708
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 group">
            <div className={`p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20' 
                : 'bg-purple-50 border border-purple-200 group-hover:bg-purple-100'
            }`}>
              <Github className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>GitHub</p>
              <a 
                href="https://github.com/AtharvaK1708" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-purple-400' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                github.com/AtharvaK1708
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          Send a Message
        </h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                isDarkMode
                  ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                isDarkMode
                  ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-700'}`}>
              Message
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none ${
                isDarkMode
                  ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className={`w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${
              isDarkMode ? 'hover:shadow-purple-500/50' : 'hover:shadow-purple-400/50'
            }`}
          >
            Send Message
          </button>
          {formStatus && (
  <p className={`text-sm text-center mt-2 ${
    formStatus.includes('✅') 
      ? 'text-green-400' 
      : formStatus.includes('❌')
        ? 'text-red-400'
        : 'text-cyan-400'
  }`}>
    {formStatus}
  </p>
)}
        </form>
      </div>
    </div>
  </div>
</section>

{/* Footer */}
<footer className={`${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-gray-100 border-gray-200'} border-t py-8`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className={`text-sm mb-4 md:mb-0 ${isDarkMode ? 'text-slate-500' : 'text-gray-600'}`}>
        <span className="text-cyan-400">©</span> 2025 Atharva Kulkarni. 
        <span className={isDarkMode ? 'text-slate-600' : 'text-gray-500'}> All rights reserved.</span>
      </p>
      <div className="flex gap-6">
        <a 
          href="mailto:atharva.kulkarni21@gmail.com" 
          className={`transition-colors transform hover:scale-110 duration-200 ${
            isDarkMode 
              ? 'text-slate-500 hover:text-cyan-400' 
              : 'text-gray-500 hover:text-cyan-600'
          }`}
        >
          <Mail size={20} />
        </a>
        <a 
          href="https://linkedin.com/in/atharvak1708" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`transition-colors transform hover:scale-110 duration-200 ${
            isDarkMode 
              ? 'text-slate-500 hover:text-purple-400' 
              : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Linkedin size={20} />
        </a>
        <a 
          href="https://github.com/AtharvaK1708" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`transition-colors transform hover:scale-110 duration-200 ${
            isDarkMode 
              ? 'text-slate-500 hover:text-purple-400' 
              : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  </div>
</footer>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}



  