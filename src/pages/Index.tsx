import { SplineSceneBasic } from "@/components/SplineSceneBasic";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm mb-4"
          >
            Welcome to the Future
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-glow shadow-cyber-cyan"
          >
            Agentia World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-cyber-white/80 max-w-2xl mx-auto"
          >
            Where AI Agents Shape Reality
          </motion.p>
        </header>

        <SplineSceneBasic />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Neural Networks",
              description: "Advanced AI processing units",
              color: "cyber-cyan",
            },
            {
              title: "Quantum Logic",
              description: "Next-gen decision making",
              color: "cyber-purple",
            },
            {
              title: "Swarm Intelligence",
              description: "Collective AI consciousness",
              color: "cyber-green",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className={`p-6 rounded-lg neo-brutalism bg-${item.color}/10 hover:bg-${item.color}/20 transition-colors duration-300`}
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-cyber-white/60">{item.description}</p>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Index;