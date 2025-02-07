
import { motion } from "framer-motion";
import { secondaryNavItems } from "./SecondaryNavItems";

interface SecondaryNavProps {
  onItemClick: (href: string) => void;
}

export const SecondaryNav = ({ onItemClick }: SecondaryNavProps) => {
  return (
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
            onClick={() => onItemClick(item.href)}
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
  );
};
