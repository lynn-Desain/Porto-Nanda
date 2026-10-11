import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { siteConfig } from "../../data/site-config";

const links = [
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Skill" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Sertifikat" },
  { href: "#testimonials", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "brut-surface border-b-[3px] brut-border" : ""
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-4"
      >
        <a
          href="#home"
          className="font-terminal font-bold text-lg tracking-tight"
        >
          {"> "}
          {siteConfig.name.toLowerCase()}.dev
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-utility text-sm font-semibold uppercase tracking-wide hover:text-[#2563EB] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="lg:hidden w-11 h-11 rounded-[8px] border-[3px] brut-border brut-surface flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden brut-surface border-t-[3px] brut-border"
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-utility text-base font-semibold uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}