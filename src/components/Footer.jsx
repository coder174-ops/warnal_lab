import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MessageSquare, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  message: yup.string().min(10, "Message must be at least 10 characters"),
});

const footerData = {
  navLinks: [
    { title: "Pricing", href: "/pricing" },
    { title: "Careers", href: "/careers" },
    { title: "Blog", href: "/blog" },
    { title: "Support", href: "/support" },
  ],
  socialLinks: [
    {
      Icon: Linkedin,
      href: "#",
      name: "LinkedIn",
      color: "text-blue-400",
      bg: "hover:bg-blue-600",
    },
    {
      Icon: Github,
      href: "#",
      name: "GitHub",
      color: "text-gray-400",
      bg: "hover:bg-gray-700",
    },
    {
      Icon: MessageSquare,
      href: "#",
      name: "Message",
      color: "text-blue-400",
      bg: "hover:bg-blue-700",
    },
  ],
  emailAddress: "hello@fusion.com",
};

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    alert("Message sent successfully!");
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* 🌟 FOOTER SECTION */}
      <motion.footer
        className="relative bg-black text-white pt-16 pb-10 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* 🌀 Animated Gradient Top Border */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.49 bg-gradient-to-r from-blue-400 via-sky-400 to-blue-300"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 💌 Call-to-Action Section */}
          <motion.div
            className="rounded-2xl p-6 md:p-10 shadow-2xl mb-12"
            style={{ backgroundColor: "#1D2737" }}
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-white">
                  Ready to start a project?
                </h3>
                <p className="text-gray-300 mt-2">
                  Let’s collaborate and build something extraordinary together.
                </p>
              </div>
              <motion.button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-3 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 🌐 Footer Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
            {/* Brand */}
            <motion.div
              className="col-span-2 lg:col-span-1"
              variants={itemVariants}
            >
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent mb-3">
                Warnal Lab
              </h3>
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Warnal Lab. All rights reserved.
              </p>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                Company
              </h4>
              <ul className="space-y-2">
                {footerData.navLinks.map((link, i) => (
                  <motion.li key={i} variants={itemVariants}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Legal</h4>
              <ul className="space-y-2">
                <motion.li variants={itemVariants}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                    Privacy Policy
                  </a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                    Terms of Service
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                Connect
              </h4>
              <div className="flex space-x-3">
                {footerData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-gray-800 ${social.bg} transition duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <social.Icon className={`w-5 h-5 ${social.color}`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="h-px bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800 my-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-gray-500 text-xs">
              Built with <span className="text-blue-400">React</span>,{" "}
              <span className="text-sky-400">Vite</span>, and{" "}
              <span className="text-blue-500">Tailwind CSS</span>.
            </p>
          </motion.div>
        </div>
      </motion.footer>

      {/* 📨 CONTACT MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-center text-[#1D2737] mb-6">
                Contact Us
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    {...register("name")}
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    {...register("email")}
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    {...register("message")}
                    rows="4"
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Your Message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-[#1D2737] text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;