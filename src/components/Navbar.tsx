
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Brain, Users, DollarSign, MessageSquare, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const navItems = [
    { icon: <Rocket className="w-4 h-4" />, label: "Features", href: "#features" },
    { icon: <Brain className="w-4 h-4" />, label: "Technology", href: "#technology" },
    { icon: <Users className="w-4 h-4" />, label: "Agents", href: "#agents" },
    { icon: <DollarSign className="w-4 h-4" />, label: "Pricing", href: "#pricing" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-lg border-b border-cyber-purple/20"
    >
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-cyber-white flex items-center gap-1"
          >
            <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <span className="text-cyber-cyan">Agentia</span>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-1 text-sm text-cyber-white/70 hover:text-cyber-cyan transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        <Button
          onClick={() => navigate("/marketplace")}
          className="bg-cyber-purple hover:bg-cyber-purple/90 text-white px-4 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg"
        >
          Launch Console
        </Button>
      </div>
    </motion.nav>
  );
};
