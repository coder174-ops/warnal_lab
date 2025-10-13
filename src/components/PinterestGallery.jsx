import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Download } from 'lucide-react';

// --- Data Structure for Gallery Items ---
const galleryItems = [
    { id: 1, src: "https://picsum.photos/400/600?random=1", title: "Forest Retreat", category: "Nature" },
    { id: 2, src: "https://picsum.photos/600/400?random=2", title: "City Lights", category: "Urban" },
    { id: 3, src: "https://picsum.photos/400/550?random=3", title: "Abstract Art", category: "Art" },
    { id: 4, src: "https://picsum.photos/400/450?random=4", title: "Coffee Break", category: "Lifestyle" },
    { id: 5, src: "https://picsum.photos/400/500?random=5", title: "Mountain View", category: "Nature" },
    { id: 6, src: "https://picsum.photos/400/700?random=6", title: "Minimal Decor", category: "Design" },
    { id: 7, src: "https://picsum.photos/600/500?random=7", title: "Desert Landscape", category: "Nature" },
    { id: 8, src: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", category: "Style" },
    // Add more items for a full scrollable page experience
    { id: 9, src: "https://picsum.photos/400/650?random=9", title: "Coastal Sunset", category: "Travel" },
    { id: 10, src: "https://picsum.photos/400/400?random=10", title: "Geometric Shapes", category: "Abstract" },
    { id: 11, src: "https://picsum.photos/400/520?random=11", title: "Book Nook", category: "Lifestyle" },
      { id: 12, src: "https://plus.unsplash.com/premium_photo-1719943510748-4b4354fbcf56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "Style" },
];

// --- Sub-Component: Gallery Item ---
const GalleryItem = ({ item, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Alternate the direction of the horizontal movement (parallax effect)
    const direction = index % 2 === 0 ? 1 : -1;
    
    // Transform scroll progress (0 to 1) into a small horizontal shift (e.g., -50px to +50px)
    const x = useTransform(scrollYProgress, [0, 1], [-50 * direction, 50 * direction]);

    // Initial and whileInView animation variants (Fade-in)
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            style={{ x }} // Apply the parallax horizontal transform
            className="w-full relative group cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Animate when 30% of item is visible
            variants={itemVariants}
            transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: index * 0.05 // Subtle staggered effect
            }}
        >
            {/* Image Container with Hover Effects */}
            <motion.div
                className="rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Content */}
                <motion.div
                    className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }} // Keep initial state until hover
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-semibold">{item.category}</span>
                        <div className="flex space-x-2">
                            <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition">
                                <Heart size={16} />
                            </button>
                            <button className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// --- Main Component: PinterestGallery ---
const PinterestGallery = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-black">
            <h1 className="text-5xl font-extrabold text-center mb-10 text-white">
                Inspiration Board
            </h1>
            
            {/* Responsive Masonry Grid using Tailwind CSS columns utility */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {galleryItems.map((item, index) => (
                    <GalleryItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default PinterestGallery;