
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Rocket, 
  Brain, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Cpu,
  Menu,
  X,
  Home,
  Component,
  FolderKanban,
  BarChart3,
  BookOpen,
  Mail,
  SunMoon
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const mainNavItems = [
    { icon: <Rocket className="w-4 h-4" />, label: "Features", href: "#features" },
    { icon: <Brain className="w-4 h-4" />, label: "Technology", href: "#technology" },
    { icon: <Users className="w-4 h-4" />, label: "Agents", href: "#agents" },
    { icon: <DollarSign className="w-4 h-4" />, label: "Pricing", href: "#pricing" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Contact", href: "#contact" },
  ];

  const secondaryNavItems = [
    { icon: <Home className="w-4 h-4" />, label: "Home", href: "/" },
    { icon: <Component className="w-4 h-4" />, label: "Components", href: "/components" },
    { icon: <FolderKanban className="w-4 h-4" />, label: "Projects", href: "/projects" },
    { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics", href: "/analytics" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Documentation", href: "/docs" },
    { icon: <Mail className="w-4 h-4" />, label: "Contact", href: "/contact" },
    { icon: <SunMoon className="w-4 h-4" />, label: "Theme", href: "#" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-lg border-b border-cyber-purple/20",
          isMobileMenuOpen && "bg-cyber-black"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Main Navbar */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-cyber-white flex items-center gap-1"
            >
              <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan">Agentia</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {mainNavItems.map((item, index) => (
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-cyber-white hover:text-cyber-cyan"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Launch Console Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => navigate("/marketplace")}
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white px-4 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg"
              >
                Launch Console
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              {mainNavItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-2 w-full text-cyber-white/70 hover:text-cyber-cyan transition-colors py-2"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
              <Button
                onClick={() => navigate("/marketplace")}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white"
              >
                Launch Console
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Secondary Navbar */}
      <div className="fixed bottom-2 left-1/2 max-w-full -translate-x-1/2 z-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto flex gap-1 p-2 rounded-full border border-cyber-purple/20 bg-cyber-black/80 backdrop-blur-lg overflow-x-auto no-scrollbar"
        >
          {secondaryNavItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-cyber-white/70 hover:text-cyber-cyan hover:bg-cyber-purple/20 transition-colors"
              title={item.label}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </>
  );
};
