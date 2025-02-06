import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    features: [
      "2 AI Agent Instances",
      "Basic Neural Processing",
      "24/7 Support",
      "Weekly Analytics",
      "Basic Integration Support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$999",
    period: "/month",
    features: [
      "10 AI Agent Instances",
      "Advanced Neural Networks",
      "Priority Support",
      "Real-time Analytics",
      "Custom Integration",
      "API Access",
      "Advanced Security",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited Agents",
      "Full Neural Suite",
      "Dedicated Support Team",
      "Advanced Analytics Dashboard",
      "Custom Development",
      "Full API Access",
      "Enterprise Security",
      "Custom Training",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 px-4" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan mb-4">
            Choose Your Plan
          </h2>
          <p className="text-cyber-white/60 text-lg">
            Scale your AI capabilities with our flexible pricing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`p-8 h-full neo-brutalism ${
                  plan.highlighted
                    ? "bg-cyber-purple/20 border-cyber-purple"
                    : "bg-black/40 border-cyber-purple/20"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-cyber-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-cyber-cyan">
                        {plan.price}
                      </span>
                      <span className="text-cyber-white/60 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-cyber-white/80"
                      >
                        <Check className="w-5 h-5 text-cyber-purple mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}