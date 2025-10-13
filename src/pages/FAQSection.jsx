import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data: Sample FAQs ---
const faqsData = [
  {
    id: 'tech1',
    category: 'Technology',
    question: 'What technologies do you specialize in for web development?',
    answer: 'We specialize in modern web technologies including React, Next.js, Node.js, and various database solutions like PostgreSQL and MongoDB. We also have expertise in cloud platforms such as AWS and Vercel.',
  },
  {
    id: 'tech2',
    category: 'Technology',
    question: 'Do you offer ongoing maintenance and support for websites?',
    answer: 'Yes, we provide comprehensive post-launch support and maintenance packages, including security updates, performance monitoring, and feature enhancements to ensure your website remains robust and up-to-date.',
  },
  {
    id: '3d1',
    category: '3D Design',
    question: 'What software do you use for 3D design projects?',
    answer: 'Our 3D design team primarily utilizes industry-standard software like Blender, ZBrush, Autodesk Maya, and Substance Painter to deliver high-quality models and renders.',
  },
  {
    id: '3d2',
    category: '3D Design',
    question: 'Can you create custom 3D models for product visualization?',
    answer: 'Absolutely! We can design and render bespoke 3D models perfect for product visualization, marketing materials, and interactive experiences, tailored to your specifications.',
  },
  {
    id: 'medical1',
    category: 'Medical',
    question: 'How do you ensure data privacy in medical applications?',
    answer: 'Data privacy is paramount in medical applications. We adhere strictly to HIPAA compliance standards and implement robust encryption, access controls, and regular security audits to protect sensitive patient information.',
  },
  {
    id: 'medical2',
    category: 'Medical',
    question: 'Do you develop mobile applications for healthcare providers?',
    answer: 'Yes, we develop custom mobile applications for healthcare providers, ranging from patient management systems to telemedicine platforms, designed for both iOS and Android.',
  },
  {
    id: 'general1',
    category: 'General',
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on complexity and scope. After an initial consultation and detailed requirements gathering, we provide a clear project roadmap with estimated timelines for each phase.',
  },
  {
    id: 'general2',
    category: 'General',
    question: 'How do you handle client communication during a project?',
    answer: 'We prioritize clear and consistent communication. We use dedicated project management tools, schedule regular updates (weekly or bi-weekly), and are always available for urgent queries.',
  },
];

// --- Framer Motion Variants for Accordion Items ---
const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // Standard Material Design easing
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const iconVariants = {
  rotated: { rotate: 180 },
  normal: { rotate: 0 },
};

// --- FAQItem Component ---
const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <motion.div
      className="mb-4 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden cursor-pointer"
      // Hover animation for the entire item
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.button
        className="flex justify-between items-center w-full text-left p-5 focus:outline-none"
        onClick={toggleOpen}
        // Background highlight on hover for the question area
        whileHover={{ backgroundColor: '#1f2937' }} // Slightly lighter gray on hover
      >
        <h3 className="text-lg font-semibold flex-grow" style={{ color: 'whitesmoke'}}>
          {faq.question}
        </h3>
        <motion.span
          variants={iconVariants}
          animate={isOpen ? "rotated" : "normal"}
          transition={{ duration: 0.2 }}
          className="text-white text-2xl ml-4"
        >
          {isOpen ? '−' : '＋'} {/* Simple +/- icon */}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden" // Essential for height animation
          >
            <p className="text-white px-5 pb-5 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- FAQ Section Component ---
const FAQSection = () => {
  const [openId, setOpenId] = useState(null); // State to manage which FAQ is open
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', '3D Design', 'Medical', 'General'];

  const filteredFaqs = faqsData.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 md:mb-16 text-white"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenId(null); // Close any open FAQ when changing category
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                          ${activeCategory === category
                              ? 'bg-[#3B82F6] text-white shadow-lg'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#3B82F6] placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpenId(null); // Close any open FAQ when searching
            }}
          />
        </motion.div>

        {/* FAQ Items Grid/List */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  toggleOpen={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-white text-center text-lg">No FAQs found matching your criteria.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;