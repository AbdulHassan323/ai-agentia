import { motion } from "framer-motion";
import { Rocket, Brain, Users, DollarSign, MessageSquare, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Rocket className="w-5 h-5" />, label: "Features", href: "#features" },
    { icon: <Brain className="w-5 h-5" />, label: "Technology", href: "#technology" },
    { icon: <Users className="w-5 h-5" />, label: "Agents", href: "#agents" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Pricing", href: "#pricing" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-lg border-b border-cyber-purple/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-cyber-white flex items-center gap-2"
          >
            <Cpu className="w-8 h-8 text-cyber-cyan animate-pulse" />
            <span className="text-cyber-cyan">Agentia</span>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-cyber-white/70 hover:text-cyber-cyan transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.a>
          ))}
        </div>

        <Button
          onClick={() => navigate("/marketplace")}
          className="bg-cyber-purple hover:bg-cyber-purple/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 animate-glow shadow-lg"
        >
          Launch Console
        </Button>
      </div>
    </motion.nav>
  );
};