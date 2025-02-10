
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return false;
    }
    return location.pathname === href;
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ duration: 0.3 }}
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
              onClick={() => onItemClick(item.href)}
              className={cn(
                "flex items-center gap-2 w-full transition-colors py-3 px-4 rounded-lg",
                isActive(item.href)
                  ? "text-cyber-cyan bg-cyber-purple/10"
                  : "text-cyber-white/70 hover:text-cyber-cyan hover:bg-cyber-purple/10"
              )}
            >
              {item.icon}
              <span className="text-left">{item.label}</span>
            </button>
          </motion.div>
        ))}
        <Button
          onClick={() => onItemClick("/marketplace")}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg mt-4"
        >
          Launch Console
        </Button>
      </div>
    </motion.div>
  );
};
