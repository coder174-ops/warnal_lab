import { motion } from 'framer-motion';
import { useState } from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import img1 from '../assets/meet_our_team1.png';
import img2 from '../assets/meet_our_team2.jpeg';
import img3 from '../assets/meet_our_team3.jpeg';

const teamMembers = [
  {
    name: 'Junaid Maqbool',
    role: 'Founder',
    description: 'Passionate about building beautiful and responsive web interfaces using React and Tailwind.',
    image: img1,
  },
  {
    name: 'Tanvir Singh Mann',
    role: 'Founder',
    description: 'Designs intuitive user experiences with attention to detail and modern design principles.',
    image: img2,
  },
  {
    name: 'Gurjot Singh',
    role: 'CEO, Chief Scientist Officer',
    description: 'Enjoys working across the stack and integrating frontend with backend seamlessly.',
    image: img3,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: 'spring' },
  }),
};

export default function MeetOurTeam() {
  return (
    <section className="py-16 bg-black">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-2"
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#3B82F6] font-medium"
        >
          The creative minds behind our success
        </motion.p>
      </div>

      <div className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative w-full h-96 perspective"
          >
            <FlipCard member={member} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FlipCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer [transform-style:preserve-3d]"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      {/* Front Side */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 backface-hidden border border-gray-700 transition-transform duration-500 hover:border-[#3B82F6]/60">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[#3B82F6]/50 shadow-md">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-[#3B82F6] text-sm mb-3">{member.role}</p>
        <div className="w-16 h-[2px] bg-[#3B82F6] mb-3"></div>
        <p className="text-gray-300 text-center text-sm px-2">Click to know more about {member.name.split(' ')[0]}!</p>
      </div>

      {/* Back Side */}
      <div className="absolute inset-0 bg-black border border-[#3B82F6] text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center [transform:rotateY(180deg)] backface-hidden">
        <p className="text-center text-sm mb-6 text-white">{member.description}</p>
        <div className="flex space-x-6">
          <motion.a
            href="#"
            className="text-[#0077B5]"
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Linkedin />
          </motion.a>
          <motion.a
            href="#"
            className="text-[#171515] bg-white p-1 rounded-full"
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Github />
          </motion.a>
          <motion.a
            href="#"
            className="text-[#1DA1F2]"
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Twitter />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}