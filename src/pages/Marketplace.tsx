import { motion } from "framer-motion";
import { Search, Edit, Brain, Play, BarChart, MessageSquare, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AgentTaskDialog } from "@/components/AgentTaskDialog";

const agents = [
  {
    icon: Search,
    name: "Competitor Analyst",
    description: "Track market competition insights",
  },
  {
    icon: Edit,
    name: "Web Page Copy Editor",
    description: "Polish web content fast",
  },
  {
    icon: Brain,
    name: "AI Content Generator",
    description: "Create engaging AI content",
  },
  {
    icon: Play,
    name: "Video Script Generator",
    description: "Write compelling video scripts",
  },
  {
    icon: BarChart,
    name: "Analytics Expert",
    description: "Analyze data with precision",
  },
  {
    icon: MessageSquare,
    name: "Chat Assistant",
    description: "Smart conversation support",
  },
  {
    icon: Code,
    name: "Code Generator",
    description: "Generate code automatically",
  },
  {
    icon: Lightbulb,
    name: "Innovation Assistant",
    description: "Create innovative solutions",
  },
];

const Marketplace = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleHire = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-green bg-clip-text text-transparent"
        >
          Agent Marketplace
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-black/40 backdrop-blur-sm border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-purple/20 group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-cyber-purple/10 group-hover:bg-cyber-purple/20 transition-colors duration-300">
                    <agent.icon className="w-8 h-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyber-white">{agent.name}</h3>
                  <p className="text-sm text-cyber-white/60">{agent.description}</p>
                  <Button
                    onClick={() => handleHire(agent)}
                    className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyber-purple/20"
                  >
                    Hire
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedAgent && (
        <AgentTaskDialog
          agent={selectedAgent}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
};

export default Marketplace;