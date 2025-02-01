import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  metrics: {
    timeSaved?: string;
    accuracy?: string;
  };
  onHire: () => void;
}

export function AgentCard({ name, description, icon: Icon, metrics, onHire }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 bg-black/40 backdrop-blur-sm border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-purple/20 group">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 rounded-full bg-cyber-purple/10 group-hover:bg-cyber-purple/20 transition-colors duration-300">
            <Icon className="w-8 h-8 text-cyber-purple" />
          </div>
          <h3 className="text-xl font-semibold text-cyber-white">{name}</h3>
          <p className="text-sm text-cyber-white/60">{description}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {metrics.timeSaved && (
              <div className="text-xs text-cyber-cyan">
                <p>Time Saved</p>
                <p className="font-semibold">{metrics.timeSaved}</p>
              </div>
            )}
            {metrics.accuracy && (
              <div className="text-xs text-cyber-green">
                <p>Accuracy</p>
                <p className="font-semibold">{metrics.accuracy}</p>
              </div>
            )}
          </div>

          <Button
            onClick={onHire}
            className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyber-purple/20"
          >
            Hire
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}