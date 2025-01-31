import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

export const AnimatedTestimonials = ({ testimonials, autoplay = true }: AnimatedTestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [autoplay, testimonials.length]);

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-cyber-black/40 backdrop-blur-lg rounded-xl p-8 neo-brutalism"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src={testimonials[currentIndex].src}
            alt={testimonials[currentIndex].name}
            className="w-20 h-20 rounded-full object-cover border-2 border-cyber-purple"
          />
          <p className="text-lg md:text-xl text-cyber-white/90 italic">
            "{testimonials[currentIndex].quote}"
          </p>
          <div>
            <h4 className="text-cyber-cyan font-semibold">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-cyber-white/60 text-sm">
              {testimonials[currentIndex].designation}
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-cyber-purple" : "bg-cyber-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};