
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#" },
      { label: "API", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-cyber-black border-t border-cyber-purple/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-cyber-cyan"
            >
              <h2 className="text-xl font-bold">Agentia World</h2>
            </motion.div>
            <p className="text-cyber-white/60 text-sm">
              Next-generation AI agents powering the future of enterprise intelligence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-cyber-white/60 hover:text-cyber-cyan transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:col-span-3">
            <LinkSection title="Product" links={footerLinks.product} />
            <LinkSection title="Company" links={footerLinks.company} />
            <LinkSection title="Legal" links={footerLinks.legal} />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-cyber-purple/20">
          <p className="text-center text-sm text-cyber-white/40">
            © 2025 Agentia World. Powered by Panaversity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyber-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-cyber-white/60 hover:text-cyber-cyan transition-colors text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
