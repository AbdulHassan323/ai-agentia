
import { motion } from "framer-motion";
import { Cpu, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "./navbar/NavItems";
import { MobileMenu } from "./navbar/MobileMenu";
import { SecondaryNav } from "./navbar/SecondaryNav";

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

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (!href.startsWith('#')) {
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
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-cyber-white flex items-center gap-1"
            >
              <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan">Agentia</span>
            </motion.div>

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

            <div className="hidden md:block">
              <Button
                onClick={() => navigate("/marketplace")}
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white px-4 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg"
              >
                Launch Console
              </Button>
            </div>
          </div>

          <MobileMenu 
            items={mainNavItems}
            isOpen={isMobileMenuOpen}
            onItemClick={handleNavClick}
          />
        </div>
      </motion.nav>

      <SecondaryNav onItemClick={handleNavClick} />
    </>
  );
};
