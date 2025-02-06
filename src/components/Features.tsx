import { Brain, MessageSquare, Terminal, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

const features = [
  {
    title: "Autonomous Learning",
    description: "Self-evolving neural networks that continuously adapt to your business needs through reinforcement learning",
    icon: Brain,
  },
  {
    title: "Multi-Modal Intelligence",
    description: "Advanced agents capable of processing text, voice, and visual data for comprehensive understanding",
    icon: MessageSquare,
  },
  {
    title: "Cognitive Integration",
    description: "Seamless integration with existing systems through advanced cognitive APIs and neural bridges",
    icon: Terminal,
  },
  {
    title: "Ethical AI Framework",
    description: "Built-in ethical guidelines and safety protocols ensuring responsible AI deployment",
    icon: Shield,
  },
];

export function Features() {
  return (
    <section className="py-20 px-4" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan mb-4">
            Neural Capabilities
          </h2>
          <p className="text-cyber-white/60 text-lg">
            Powered by next-generation artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-black/40 backdrop-blur-sm border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 h-full neo-brutalism">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-lg bg-cyber-purple/10">
                    <feature.icon className="w-8 h-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyber-white">
                    {feature.title}
                  </h3>
                  <p className="text-cyber-white/60 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}