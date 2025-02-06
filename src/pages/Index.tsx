import { SplineSceneBasic } from "@/components/SplineSceneBasic";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { AISolutions } from "@/components/AISolutions";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto pt-20"
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

        {/* AI Solutions Section */}
        <AISolutions />

        {/* Pricing Section */}
        <Pricing />

        {/* Contact Section */}
        <Contact />
      </motion.div>
    </div>
  );
};

export default Index;