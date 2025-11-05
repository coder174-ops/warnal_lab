import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import img1 from '../assets/Service/service_photo1.jpg'; // Example image imports
import img2 from '../assets/Service/service_photo2.jpg';
import img3 from '../assets/Service/service_photo3.jpg';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const servicesData = [
  {
    title: "Web Development",
    description: "Building fast, modern, and scalable web applications using the latest technologies. We focus on performance and user experience.",
    link: "/service1",
    image: img1
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive, beautiful, and user-centered designs that drive engagement and conversions for your digital products.",
    link: "/service2",
    image: img2
  },
  {
    title: "Digital Marketing",
    description: "Strategic planning and execution of online campaigns to boost your visibility, traffic, and revenue across all platforms.",
    link: "/service3",
    image: img3
  },
];

// --- Framer Motion Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- ServiceBox Component ---
const ServiceBox = ({ title, description, link, image }) => {
  return (
    <motion.div
      variants={itemVariants}
      // Outer container handles overall scale and shadow
      className="bg-[#1D2737] rounded-lg shadow-xl border-t-2 border-[#3B82F6] transform-gpu transition-all duration-300
                 flex flex-col justify-between h-full overflow-hidden" 
      
      // Apply overall scale effect to the container
      whileHover={{
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)", 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Inner motion.div for the Content Area (Image, Title, Description) */}
      <motion.div
          className="px-6 md:px-8 pt-6 md:pt-8 pb-0 flex flex-col justify-start" 
          style={{ transformStyle: 'preserve-3d' }} // Enable 3D rotation
          
          // Apply the flip effect only to this content section
          whileHover={{
              rotateY: 30, // Tilt/Flip effect (30 degrees in 3D)
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
          {/* Image section: Full width and fixed height (rectangular) */}
          {image && (
              // Adjust image container to compensate for inner padding, allowing image to hit side edges
              <div className="-mx-9 md:-mx-8 -mt-6 md:-mt-8 mb-6"> 
                  <img
                      src={image}
                      alt={title}
                      // w-full and h-60 define the full-width rectangular shape
                      className="w-full h-60 object-cover rounded-t-lg" 
                  />
              </div>
          )}
          
          <div> 
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#3B82F6' }}>
                  {title}
              </h3>
              <p className="text-white mb-6 leading-relaxed text-center">
                  {description}
              </p>
          </div>
      </motion.div>

      {/* Button Section - This remains STATIC (no rotateY applied) */}
      <div className="p-6 md:p-8 pt-0">
          <Link to={link}>
              <button
                  className="w-full px-6 py-3 mt-0 text-center font-semibold text-white bg-[#3B82F6] rounded-md transition duration-300 ease-in-out cursor-pointer
                             hover:bg-[#2563EB] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50"
              >
                  Explore Service
              </button>
          </Link>
      </div>
    </motion.div>
  );
};

// --- Main Services Component ---
const Services = () => {
  const titleRef = useRef(null);

  // GSAP Animation for Scroll Reveal (Applied to the section title)
  useEffect(() => {
    // GSAP Scroll Reveal for the main heading
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    // Section background: #000000 (black)
    <section className="py-16 md:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with GSAP Animation */}
        <h2 ref={titleRef} className="text-4xl sm:text-5xl font-extrabold text-center mb-12 md:mb-16 text-white">
          Our Services
        </h2>

        {/* Services Grid Layout with Framer Motion Entrance */}
        <motion.div
          className="grid gap-8 md:grid-cols-3 service-box-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service, index) => (
            <ServiceBox 
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
              image={service.image}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;