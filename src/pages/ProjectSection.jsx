import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "p1",
    title: "SmartCampus Portal",
    short: "A unified dashboard for campus events, labs and project tracking.",
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1200&auto=format&fit=crop",
    fullDescription:
      "SmartCampus Portal brings together event scheduling, lab bookings, and real-time project dashboards. We integrated auth, role-based access and a lightweight notifications system. Built with React, Tailwind and a node-based backend.",
    team: [
      {
        name: "Anita Sharma",
        role: "Frontend Lead",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Rohit Verma",
        role: "Backend Engineer",
        avatar:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "p2",
    title: "GreenEnergy Monitor",
    short: "IoT dashboard to monitor solar microgrids and usage analytics.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
    fullDescription:
      "GreenEnergy Monitor collects sensor data from microgrids and visualizes performance, predicting maintenance windows and optimizing output. We worked on hardware integration, data pipelines and realtime charts.",
    team: [
      {
        name: "Priya Gupta",
        role: "IoT Engineer",
        avatar:
          "https://images.unsplash.com/photo-1545996124-1f7f3ba9d0f6?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Anuj Kumar",
        role: "Data Scientist",
        avatar:
          "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f7?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "p3",
    title: "EduMatch",
    short: "AI-driven mentor-student matching for projects & internships.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    fullDescription:
      "EduMatch uses profile embeddings and preferences to suggest best-fit mentors and project roles. We implemented the matching engine and a polished UI for reviews and scheduling.",
    team: [
      {
        name: "Kavya Singh",
        role: "ML Engineer",
        avatar:
          "https://images.unsplash.com/photo-1545996124-1f7f3ba9d0f6?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Nitesh Kumar",
        role: "Frontend Dev",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      },
    ],
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};
const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalContent = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState(null);

  return (
    <section className="py-12 bg-black px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Ongoing Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Highlights of projects we are actively working on — click Read More to see details and team.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.id}
              className="bg-[#1D2737] rounded-xl overflow-hidden border border-[#3B82F6] shadow-[0_0_15px_#3B82F6]/40 transition-all"
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow: "0 0 25px #3B82F6",
                scale: 1.02,
              }}
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                  {p.short}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setOpenProject(p)}
                    className="text-sm font-medium px-3 py-2 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] transition text-white"
                  >
                    Read More
                  </button>

                  <div className="flex -space-x-2">
                    {p.team.map((m, i) => (
                      <img
                        key={i}
                        src={m.avatar}
                        alt={m.name}
                        className="w-8 h-8 rounded-full ring-1 ring-gray-700 object-cover"
                        title={`${m.name} — ${m.role}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpenProject(null)}
            />
            <motion.div
              className="relative w-full max-w-3xl mx-4 md:mx-0 rounded-2xl overflow-hidden"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={openProject.image}
                    alt={openProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6" style={{ backgroundColor: "#1D2737" }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {openProject.title}
                      </h3>
                      <p className="text-gray-300 mt-2">
                        {openProject.fullDescription.slice(0, 180)}...
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenProject(null)}
                      className="ml-4 text-gray-300 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-5 text-gray-200">
                    <p>{openProject.fullDescription}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-white font-semibold mb-3">Team</h4>
                    <div className="flex flex-col gap-3">
                      {openProject.team.map((member, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
                          />
                          <div>
                            <div className="text-white font-medium">
                              {member.name}
                            </div>
                            <div className="text-gray-300 text-sm">
                              {member.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setOpenProject(null)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}