import { motion } from "framer-motion";
import { Search, Edit, Brain, Play, BarChart, MessageSquare, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AgentCard } from "@/components/AgentCard";
import { AgentTaskDialog } from "@/components/AgentTaskDialog";

const agents = [
  {
    icon: Search,
    name: "Competitor Analyst",
    description: "Track market competition insights in real-time",
    metrics: {
      timeSaved: "5h/week",
      accuracy: "92%"
    },
    tags: ["Marketing", "Analytics"]
  },
  {
    icon: Edit,
    name: "Web Page Copy Editor",
    description: "Polish web content fast",
    metrics: {
      timeSaved: "3h/page",
      accuracy: "95%"
    },
    tags: ["Content", "Writing"]
  },
  {
    icon: Brain,
    name: "AI Content Generator",
    description: "Create engaging AI content",
    metrics: {
      timeSaved: "4h/article",
      accuracy: "89%"
    },
    tags: ["Content", "AI"]
  },
  {
    icon: Play,
    name: "Video Script Generator",
    description: "Write compelling video scripts",
    metrics: {
      timeSaved: "6h/script",
      accuracy: "91%"
    },
    tags: ["Video", "Content"]
  },
  {
    icon: BarChart,
    name: "Analytics Expert",
    description: "Analyze data with precision",
    metrics: {
      timeSaved: "8h/report",
      accuracy: "97%"
    },
    tags: ["Analytics", "Technical"]
  },
  {
    icon: MessageSquare,
    name: "Chat Assistant",
    description: "Smart conversation support",
    metrics: {
      timeSaved: "20h/month",
      accuracy: "94%"
    },
    tags: ["Support", "Communication"]
  },
  {
    icon: Code,
    name: "Code Generator",
    description: "Generate code automatically",
    metrics: {
      timeSaved: "10h/week",
      accuracy: "88%"
    },
    tags: ["Technical", "Development"]
  },
  {
    icon: Lightbulb,
    name: "Innovation Assistant",
    description: "Create innovative solutions",
    metrics: {
      timeSaved: "15h/project",
      accuracy: "85%"
    },
    tags: ["Innovation", "Strategy"]
  }
];

const Marketplace = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleHire = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || agent.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const uniqueTags = Array.from(new Set(agents.flatMap(agent => agent.tags)));

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

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border-cyber-purple/20 text-cyber-white placeholder:text-cyber-white/40"
            />
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`${
                    selectedTag === tag
                      ? "bg-cyber-purple text-white"
                      : "bg-black/40 text-cyber-white/60"
                  } border-cyber-purple/20 hover:border-cyber-purple/40`}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentCard
                name={agent.name}
                description={agent.description}
                icon={agent.icon}
                metrics={agent.metrics}
                onHire={() => handleHire(agent)}
              />
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