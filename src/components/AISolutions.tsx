import { Brain, Database, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const solutions = [
  {
    icon: <Database className="w-12 h-12 text-cyber-purple" />,
    title: "Enterprise AI",
    description: "Custom AI agents designed for enterprise-scale operations and decision-making",
  },
  {
    icon: <Brain className="w-12 h-12 text-cyber-purple" />,
    title: "Neural Operations",
    description: "Automated workflow optimization through distributed neural networks",
  },
  {
    icon: <Shield className="w-12 h-12 text-cyber-purple" />,
    title: "Secure Intelligence",
    description: "Privacy-first AI solutions with military-grade security protocols",
  },
];

export const AISolutions = () => {
  return (
    <section className="py-20 px-4" id="solutions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent"
        >
          AI Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-center text-cyber-white/80 mb-12"
        >
          Transforming industries with intelligent agents
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="bg-cyber-black/50 border-cyber-purple/20 hover:border-cyber-purple/50 transition-colors neo-brutalism">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{solution.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-cyber-white">{solution.title}</h3>
                  <p className="text-cyber-white/70">{solution.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};