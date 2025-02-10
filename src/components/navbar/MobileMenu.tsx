
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  items: Array<{
    icon: JSX.Element;
    label: string;
    href: string;
  }>;
  isOpen: boolean;
  onItemClick: (href: string) => void;
}

export const MobileMenu = ({ items, isOpen, onItemClick }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // For hash links, use the onItemClick handler
      onItemClick(href);
    } else {
      // For regular routes, use navigate
      navigate(href);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0 }}
      className="md:hidden overflow-hidden bg-cyber-black/95 backdrop-blur-lg fixed w-full left-0 top-[70px] z-50"
    >
      <div className="py-4 space-y-2 px-4">
        {items.map((item) => (
          <motion.div
            key={item.label}
            className="w-full"
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => handleNavigation(item.href)}
              className="flex items-center gap-2 w-full text-cyber-white/70 hover:text-cyber-cyan transition-colors py-3 px-4 rounded-lg hover:bg-cyber-purple/10"
            >
              {item.icon}
              <span className="text-left">{item.label}</span>
            </button>
          </motion.div>
        ))}
        <Button
          onClick={() => navigate("/marketplace")}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg mt-4"
        >
          Launch Console
        </Button>
      </div>
    </motion.div>
  );
};
