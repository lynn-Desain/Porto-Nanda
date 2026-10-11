import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "../../data/site-config";

const links = [
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Skill" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Kontak" },
];

const socials = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Mail, href: siteConfig.social.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t-[3px] brut-border mt-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <a href="#home" className="font-terminal font-bold text-lg">
            {"> "}
            {siteConfig.name.toLowerCase()}.dev
          </a>
          <p className="font-body text-sm opacity-70 mt-2 max-w-xs">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-utility text-sm font-semibold uppercase tracking-wide hover:text-[#2563EB] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-[8px] border-[3px] brut-border brut-surface brut-shadow-sm brut-hover flex items-center justify-center"
            >
              <Icon size={16} strokeWidth={2.25} />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-utility text-xs opacity-60">
          © {new Date().getFullYear()} {siteConfig.fullName}. Semua hak dilindungi.
        </p>

        <motion.div
          initial={{ opacity: 0, rotate: -6, y: 10 }}
          whileInView={{ opacity: 1, rotate: -4, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="brut-surface border-[3px] brut-border rounded-[8px] px-4 py-2 brut-shadow-sm"
        >
          <span className="font-terminal text-xs font-bold">
            Made with care in {siteConfig.location.split(",")[0]}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
