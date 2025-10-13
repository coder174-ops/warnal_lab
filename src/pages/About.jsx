import React, { useState, useEffect, useRef } from 'react';
import { Users, Rocket, MessageCircle, Brain, GraduationCap, Code, Award, Globe, X, Sparkles, TrendingUp, Briefcase, Trophy } from 'lucide-react';

// Custom hook for counter animation
const useCounter = (endValue, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime = null;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(endValue * percentage));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, startCounting]);
  
  return count;
};

// Custom hook for intersection observer
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return [ref, isInView];
};

// Main Component
const WhyChooseUs = () => {
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <HeaderSection />
        <FeatureCards />
        <StatsCounter />
        <AlumniSuccessStories onOpenModal={() => setShowAlumniModal(true)} />
      </div>
      
      {showAlumniModal && <AlumniSuccessModal onClose={() => setShowAlumniModal(false)} />}
    </div>
  );
};

// Header Section Component
const HeaderSection = () => {
  const [headerRef, isHeaderVisible] = useInView();
  
  return (
    <div ref={headerRef} className={`text-center mb-20 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-lg border border-white/20 rounded-full px-6 py-2 mb-6">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-cyan-400 font-semibold text-sm">Why DevCluster</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Where Developers
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
          Connect, Collaborate, and Create
        </span>
      </h1>
      
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        DevCluster is more than just a platform—it's a thriving community where students and developers come together to build, learn, and grow. Join us to collaborate on real-world projects, showcase your skills, and connect with peers across domains.
      </p>
    </div>
  );
};

// Feature Cards Component
const FeatureCards = () => {
  const [cardsRef, areCardsVisible] = useInView();
  
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborate & Grow",
      description: "Work with talented peers on innovative projects. Build meaningful connections that last beyond graduation.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Showcase Your Skills",
      description: "Create an impressive portfolio. Display your projects, achievements, and technical expertise to stand out.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-Time Engagement",
      description: "Connect instantly with developers across domains. Chat, share ideas, and collaborate in real-time.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Learn Together",
      description: "Access workshops, webinars, and mentorship. Grow your skills through community-driven learning.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Alumni Network",
      description: "Connect with successful alumni. Build professional relationships that open doors to opportunities.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];
  
  return (
    <div ref={cardsRef} className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group transition-all duration-700 ${
              areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="relative h-full bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer">
              <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Counter Component
const StatsCounter = () => {
  const [statsRef, areStatsVisible] = useInView();
  
  const membersCount = useCounter(500, 2000, areStatsVisible);
  const projectsCount = useCounter(30, 2000, areStatsVisible);
  const eventsCount = useCounter(8, 2000, areStatsVisible);
  const domainsCount = useCounter(12, 2000, areStatsVisible);
  
  const stats = [
    { icon: <Users className="w-7 h-7" />, label: "Active Members", value: membersCount, suffix: "+", color: "text-cyan-400" },
    { icon: <Code className="w-7 h-7" />, label: "Projects Showcased", value: projectsCount, suffix: "+", color: "text-purple-400" },
    { icon: <Award className="w-7 h-7" />, label: "Tech Events", value: eventsCount, suffix: "+", color: "text-pink-400" },
    { icon: <Globe className="w-7 h-7" />, label: "Domains", value: domainsCount, suffix: "+", color: "text-green-400" }
  ];
  
  return (
    <div ref={statsRef} className="mb-24">
      <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-500 hover:scale-110 ${
                areStatsVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-lg border border-white/10 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Alumni Success Stories Component
const AlumniSuccessStories = ({ onOpenModal }) => {
  const [ctaRef, isCtaVisible] = useInView();
  
  return (
    <div ref={ctaRef} className={`text-center transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-lg rounded-3xl p-16 border border-white/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alumni Success Stories
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how DevCluster alumni transformed their careers from students to industry professionals
          </p>
          
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-lg font-bold rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span>View Success Stories</span>
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Alumni Success Modal Component
const AlumniSuccessModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const alumniStories = [
    {
      name: "Priya Sharma",
      emoji: "👩‍💻",
      year: "Class of 2023",
      before: "Computer Science Student",
      after: "Senior Developer at Google",
      journey: "Started with small projects on DevCluster, collaborated with 10+ teams, and built a portfolio that landed her dream job. Now mentoring the next generation of developers.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Rahul Verma",
      emoji: "🚀",
      year: "Class of 2022",
      before: "Aspiring Entrepreneur",
      after: "Founder of TechVenture AI",
      journey: "Found his co-founder on DevCluster, launched 3 successful projects, and raised $2M in seed funding. His startup now serves 50K+ users globally.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Ananya Reddy",
      emoji: "🎨",
      year: "Class of 2023",
      before: "Frontend Developer",
      after: "Lead Designer at Adobe",
      journey: "Showcased her UI/UX projects on DevCluster, won 5 hackathons, and caught the attention of top tech companies. Now leading design for Adobe's flagship products.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Arjun Patel",
      emoji: "🔐",
      year: "Class of 2022",
      before: "Security Enthusiast",
      after: "Cybersecurity Expert at Microsoft",
      journey: "Built open-source security tools on DevCluster with 1K+ stars on GitHub. His contributions led to a role at Microsoft's Security Response Center.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Sneha Kumar",
      emoji: "📱",
      year: "Class of 2024",
      before: "Mobile Dev Student",
      after: "iOS Engineer at Apple",
      journey: "Published 8 mobile apps through DevCluster collaborations. Her innovative approach to user experience secured her position at Apple's iOS team.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Vikram Singh",
      emoji: "🤖",
      year: "Class of 2023",
      before: "AI/ML Beginner",
      after: "ML Engineer at OpenAI",
      journey: "Learned machine learning through DevCluster workshops, contributed to AI projects, and published research papers. Now building next-gen AI models at OpenAI.",
      gradient: "from-pink-500 to-purple-500"
    }
  ];
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 rounded-3xl max-w-6xl w-full my-8 border border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Alumni Success Stories</h2>
            <p className="text-gray-400">From DevCluster to Industry Leaders</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Alumni Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {alumniStories.map((alumni, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`text-4xl w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${alumni.gradient} bg-opacity-20`}>
                    {alumni.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{alumni.name}</h3>
                    <p className="text-sm text-gray-400">{alumni.year}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                    BEFORE
                  </div>
                  <p className="text-gray-300 text-sm">{alumni.before}</p>
                </div>
                
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold">
                    AFTER
                  </div>
                  <p className="text-white text-sm font-semibold">{alumni.after}</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">{alumni.journey}</p>
            </div>
          ))}
        </div>
        
        {/* Modal Footer */}
        <div className="bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-6">
          <div className="text-center mb-4">
            <p className="text-gray-300 mb-4">Ready to write your own success story?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300">
              Join DevCluster Today
            </button>
          </div>
          <div className="text-center pt-4 border-t border-white/10">
            <button 
              onClick={onClose}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-all duration-300"
            >
              <span>← Return to Why Choose Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

<style>{`
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -50px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(50px, 50px) scale(1.05); }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-scale-in {
    animation: scale-in 0.3s ease-out;
  }
  
  /* Custom scrollbar for modal */
  .overflow-y-auto::-webkit-scrollbar {
    width: 10px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 10px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.7);
  }
  
  body.modal-open {
    overflow: hidden;
  }
`}</style>