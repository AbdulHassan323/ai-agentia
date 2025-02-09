
import { motion } from "framer-motion";
import { Cpu, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "./navbar/NavItems";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false); // Close mobile menu first

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      navigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return false; // Hash links don't have active state
    }
    return location.pathname === href;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] h-[70px] bg-cyber-black/95 backdrop-blur-lg border-b border-cyber-purple/20 shadow-lg shadow-cyber-purple/10",
          isMobileMenuOpen && "bg-cyber-black"
        )}
      >
        <div className="h-full max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-cyber-white flex items-center gap-1 cursor-pointer"
              onClick={() => handleNavClick("/")}
            >
              <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan">Agentia</span>
            </motion.button>

            <div className="hidden md:flex items-center gap-6">
              {mainNavItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center gap-1 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-cyber-cyan"
                      : "text-cyber-white/70 hover:text-cyber-cyan"
                  )}
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
                onClick={() => handleNavClick("/marketplace")}
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white px-4 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg"
              >
                Launch Console
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <MobileMenu 
        items={mainNavItems}
        isOpen={isMobileMenuOpen}
        onItemClick={handleNavClick}
      />
    </>
  );
};
