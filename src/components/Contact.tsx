import { Mail, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

export function Contact() {
  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan mb-4">
            Get in Touch
          </h2>
          <p className="text-cyber-white/60 text-lg">
            Ready to transform your business with AI?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 bg-black/40 backdrop-blur-sm border-cyber-purple/20 h-full neo-brutalism">
              <h3 className="text-2xl font-bold text-cyber-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-cyber-white/80">
                  <Mail className="w-5 h-5 text-cyber-purple mr-3" />
                  <a href="mailto:contact@agentiaworld.com">
                    contact@agentiaworld.com
                  </a>
                </div>
                <div className="flex items-center text-cyber-white/80">
                  <Globe className="w-5 h-5 text-cyber-purple mr-3" />
                  <a href="https://www.agentiaworld.com">www.agentiaworld.com</a>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className="text-cyber-white/60 hover:text-cyber-purple transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-cyber-white/60 hover:text-cyber-purple transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-cyber-white/60 hover:text-cyber-purple transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 bg-black/40 backdrop-blur-sm border-cyber-purple/20 neo-brutalism">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                  />
                  <Input
                    placeholder="Last Name"
                    className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                />
                <Textarea
                  placeholder="Your Message"
                  className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white h-32"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}