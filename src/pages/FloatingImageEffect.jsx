import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const images = [
 "/images/front_page/1.jpeg",
  "/images/front_page/2.jpeg",
  "/images/front_page/3.jpeg",
  "/images/front_page/4.webp",
  "/images/front_page/5.jpeg",
  "/images/front_page/6.jpeg",
];

const MIN_Z = 1;
const MAX_Z = 100;

const FloatingImageEffect = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textRefs = useRef([]);
  const borderRef = useRef(null);
  const texts = ["Design", "Develop", "Build"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    const animateBorder = () => {
      if (borderRef.current && textRefs.current[currentTextIndex]) {
        const textWidth = textRefs.current[currentTextIndex].offsetWidth;
        borderRef.current.style.width = `${textWidth + 1}px`; // Padding for border
      }
    };

    animateBorder();
    const resizeObserver = new ResizeObserver(animateBorder);

    if (textRefs.current[currentTextIndex]) {
      resizeObserver.observe(textRefs.current[currentTextIndex]);
    }

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [currentTextIndex, texts.length]);

  const [flyingImages, setFlyingImages] = useState([]);
  const zIndexRef = useRef(MAX_Z);

  const getNextZIndex = () => {
    zIndexRef.current--;
    if (zIndexRef.current < MIN_Z) {
      zIndexRef.current = MAX_Z;
    }
    return zIndexRef.current;
  };

  const points = [];
  for (let t = 0; t < 10 * Math.PI; t += 0.1) {
    // t ka step chota rakho for smoothness
    const r = 50 + 5 * t; // radius badhta rahe
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    points.push({ x, y });
  }

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      const img = images[counter % images.length];
      counter++;

      setFlyingImages((prev) => [
        ...prev,
        {
          id: Date.now(),
          src: img,
          zIndex: getNextZIndex(),
        },
      ]);

      setFlyingImages((prev) => prev.slice(-25));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className=" w-full  bg-black flex flex-col justify-center items-center overflow-hidden  h-screen">
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden no-scrollbar ">
      {/* Background glow (like Cosmos.so) */}
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,128,128,0.25)_0%,rgba(0,0,0,1)_70%)] blur-2xl"></div>


     
        <h1 className=" z-20 text-white text-6xl font-bold ">Warnal Lab</h1>

        <div className="mt-4 text-[16px] md:text-3xl text-gray-300 relative">
          <span className="text-[16px] ">We </span>
          <span className="relative inline-block">
            {/* Animated Border */}
            <div
              className="h-full absolute top-0 left-0 border-2 border-gray-400 rounded-md transition-all duration-500"
              ref={borderRef}
            ></div>

            {/* Animated Words */}
            {texts.map((text, index) => (
              <span
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={`inline-block px-2 py-0 font-bold text-white transition-opacity duration-700 text-[16px] ${
                  index === currentTextIndex
                    ? "opacity-100"
                    : "opacity-0 absolute left-0"
                }`}
              >
                {text}
              </span>
            ))}
          </span>
          <span className="px-1 text-[16px]"> AI Devices</span>
        </div>
      

      {/* 1-> top-left */}
      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: -150,
            y: -400,
            scale: 1.5,
            opacity: 0,
            rotate: 50,
          }}
          animate={{
            x: [-150, -245, -315, -50],
            y: [-400, -340, -280, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.5, 1, 0],
            rotate: [50, 40, 30, 30],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            delay:0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 2 top-middle */}
      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: 200,
            y: -325,
            scale: 1.1,
            opacity: 0,
            rotate: 120,
          }}
          animate={{
            x: [200, 140, 80, 0],
            y: [-325, -350, -375, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.8, 1, 0],
            rotate: [120, 110, 100, 90],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay:0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3 right-middle */}
      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: 400,
            y: 110,
            scale: 1.2,
            opacity: 0,
            rotate: 20,
          }}
          animate={{
            x: [400, 420, 400, 50],
            y: [110, 0, -130, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.8, 1, 0],
            rotate: [120, 110, 70, 60],

            // rotate: [50, 40, 30, 30],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay: 0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 4 left-middle */}
      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: -400,
            y: -100,
            scale: 1.2,
            opacity: 0,
            rotate: 20,
          }}
          animate={{
            x: [-400, -420, -400, 0],
            y: [-100, 20, 120, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.8, 1, 0],
            rotate: [120, 110, 70, 60],

            // rotate: [50, 40, 30, 30],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay:0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}
      {/* 5 right-bottom */}

      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: 120,
            y: 400,
            scale: 1.2,
            opacity: 0,
            rotate: -20,
          }}
          animate={{
            x: [120, 215, 285, 20],
            y: [400, 340, 280, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.8, 1, 0],
            rotate: [-20, -20, -20, -20],

            // rotate: [50, 40, 30, 30],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay:0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 6 left-bottom*/}
      {flyingImages.map((img, index) => (
        <motion.img
          key={img.id}
          src={img.src}
          alt={`floating-${index}`}
          initial={{
            x: -240,
            y: 325,
            scale: 1.2,
            opacity: 0,
            rotate: 30,
          }}
          animate={{
            x: [-240, -160, -80, 20],

            y: [325, 350, 375, 0],
            scale: [1.5, 1.2, 0.9, 0],
            opacity: [0, 0.8, 1, 0],

            rotate: [45, 30, 15, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay:0,
          }}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            position: "absolute",
            zIndex: img.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}

    </div>
  );
};

export default FloatingImageEffect;