
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

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0 }}
      className="md:hidden overflow-hidden"
    >
      <div className="py-4 space-y-4">
        {items.map((item) => (
          <motion.button
            key={item.label}
            onClick={() => onItemClick(item.href)}
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
  );
};
