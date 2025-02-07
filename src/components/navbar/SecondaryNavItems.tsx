
import {
  Home,
  Component,
  FolderKanban,
  BarChart3,
  BookOpen,
  Mail,
  SunMoon
} from "lucide-react";

export const secondaryNavItems = [
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "/" },
  { icon: <Component className="w-4 h-4" />, label: "Components", href: "/components" },
  { icon: <FolderKanban className="w-4 h-4" />, label: "Projects", href: "/projects" },
  { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics", href: "/analytics" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Documentation", href: "/docs" },
  { icon: <Mail className="w-4 h-4" />, label: "Contact", href: "/contact" },
  { icon: <SunMoon className="w-4 h-4" />, label: "Theme", href: "#" },
];
