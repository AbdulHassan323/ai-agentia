import { SplineSceneBasic } from "@/components/SplineSceneBasic";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      quote: "AI Agentia has transformed our workflow completely. The efficiency gains are remarkable.",
      name: "Sophia Lee",
      designation: "Customer Success Manager",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    },
    {
      quote: "The AI agents have revolutionized how we handle customer support and data analysis.",
      name: "Liam Carter",
      designation: "Operations Director",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote: "Incredible AI solutions that have helped us scale our operations effortlessly.",
      name: "Emma Jones",
      designation: "Tech Lead",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <header className="text-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm mb-4"
          >
            Welcome to the Future
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-glow shadow-cyber-cyan"
          >
            Next-Generation AI Agents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-cyber-white/80 max-w-2xl mx-auto mb-8"
          >
            Powering the future of enterprise intelligence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4"
          >
            <Button
              onClick={() => navigate("/marketplace")}
              className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg neo-brutalism"
            >
              Launch Console
            </Button>
            <Button
              variant="outline"
              className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10 px-8 py-6 text-lg rounded-full transition-all duration-300 neo-brutalism"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Features
            </Button>
          </motion.div>
        </header>

        {/* 3D Scene */}
        <div className="relative w-full h-[600px] mt-12">
          <SplineSceneBasic />
        </div>

        {/* Features Section */}
        <Features />

        {/* Pricing Section */}
        <Pricing />

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent"
          >
            What Our Clients Say
          </motion.h2>
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </section>

        {/* Contact Section */}
        <Contact />
      </motion.div>
    </div>
  );
};

export default Index;