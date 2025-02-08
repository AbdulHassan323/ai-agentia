
import { SplineSceneBasic } from "@/components/SplineSceneBasic";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { AISolutions } from "@/components/AISolutions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
        className="pt-[70px]" // Add padding top to account for fixed navbar
      >
        {/* Hero Section */}
        <header className="min-h-[calc(100vh-70px)] flex items-center justify-center py-12 px-4">
          <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm mb-6"
            >
              Welcome to the Future
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-glow shadow-cyber-cyan leading-tight"
            >
              Next-Generation AI Agents
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-cyber-white/80 max-w-2xl mx-auto mb-10"
            >
              Powering the future of enterprise intelligence
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Button
                onClick={() => navigate("/marketplace")}
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white px-10 py-7 text-xl rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg neo-brutalism"
              >
                Launch Console
              </Button>
              <Button
                variant="outline"
                className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10 px-10 py-7 text-xl rounded-full transition-all duration-300 neo-brutalism"
                onClick={() => {
                  const element = document.getElementById("features");
                  if (element) {
                    const navHeight = 70;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                Explore Features
              </Button>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {/* 3D Scene */}
          <div className="relative w-full h-[600px] mt-12">
            <SplineSceneBasic />
          </div>

          {/* Features Section with ID for scrolling */}
          <section id="features">
            <Features />
          </section>

          {/* Technology Section */}
          <section id="technology">
            <AISolutions />
          </section>

          {/* Agents Section */}
          <section id="agents">
            <Features />
          </section>

          {/* Pricing Section */}
          <section id="pricing">
            <Pricing />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <Contact />
          </section>
        </main>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;
