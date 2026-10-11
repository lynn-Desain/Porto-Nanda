import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Award, BookOpen, Trophy, Star, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SignatureMark } from "../ui/SignatureMark";
import { MagneticButton } from "../ui/MagneticButton";
import { siteConfig } from "../../data/site-config";
import profileImg from "../../assets/profile.png";

// ─── Edit stats that appear below the photo ───────────────────────────────────
const heroStats = [
  { icon: Trophy, value: "1st", label: "Int'l Competition", color: "#FACC15" },
  { icon: BookOpen, value: "3.74", label: "GPA / 4.0", color: "#2563EB" },
  { icon: Award, value: "18+", label: "Certificates", color: "#22C55E" },
  { icon: Star, value: "04+", label: "Research Projects", color: "#EF4444" },
];

const socials = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Mail, href: siteConfig.social.email, label: "Email" },
  { icon: MessageCircle, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

const roles = [
  "Frontend Engineer",
  "Creative Developer",
  "UI/UX Designer",
  "Motion Designer",
];

const bubblePositions = [
  { top: "4%", left: "-8%", rotate: -6, delay: 0 },
  { top: "68%", left: "-14%", rotate: 4, delay: 0.6 },
  { top: "-6%", left: "58%", rotate: 5, delay: 1.1 },
  { top: "72%", left: "62%", rotate: -4, delay: 1.6 },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="font-body text-body-lg font-semibold absolute left-0 whitespace-nowrap"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function MouseScrollIndicator() {
  return (
    <button
      onClick={() =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
      }
      className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      aria-label="Scroll to about section"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-9 rounded-full border-[2.5px] border-current flex items-start justify-center pt-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0, 1], y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-current"
        />
      </motion.div>
      <motion.svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <path
          d="M1 1L6 6L11 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <span className="font-terminal text-[10px] uppercase tracking-widest">scroll</span>
    </button>
  );
}

function TiltPhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Photo with tilt */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
        className="relative w-60 h-60 md:w-72 md:h-72 cursor-pointer"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        {/* Floating bubbles */}
        {bubblePositions.map((b, i) => (
          <motion.div
            key={i}
            className="absolute z-10 hidden sm:block"
            style={{ top: b.top, left: b.left }}
            animate={{ y: [0, -10, 0], rotate: [b.rotate, b.rotate + 3, b.rotate] }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
            whileHover={{ scale: 1.12, y: -14, transition: { duration: 0.2 } }}
          >
            <BrutalistCard
              shadow="sm"
              rounded="sm"
              hover={false}
              className="px-3 py-1.5 bg-[#FACC15]"
            >
              <span className="font-terminal text-[11px] font-bold whitespace-nowrap">
                {siteConfig.bubbles[i]}
              </span>
            </BrutalistCard>
          </motion.div>
        ))}

        {/* Photo card */}
        <BrutalistCard
          rounded="lg"
          shadow="lg"
          hover={false}
          className="w-full h-full -rotate-3 relative overflow-hidden p-0"
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full object-cover object-top rounded-[inherit] select-none"
            draggable={false}
          />
          <div className="absolute bottom-4 right-4 z-10">
            <BrutalistCard
              shadow="sm"
              rounded="sm"
              hover={false}
              className="bg-[#22C55E] w-3.5 h-3.5 p-0"
              aria-hidden="true"
            >
              <span />
            </BrutalistCard>
          </div>
        </BrutalistCard>
      </motion.div>

      {/* Stats 2×2 grid — below the photo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-2 gap-2 w-full max-w-[288px]"
      >
        {heroStats.map(({ icon: Icon, value, label, color }) => (
          <BrutalistCard
            key={label}
            shadow="sm"
            rounded="sm"
            hover={false}
            className="flex items-center gap-2 px-3 py-2"
          >
            <Icon size={14} style={{ color }} strokeWidth={2.5} className="shrink-0" />
            <div className="min-w-0">
              <p className="font-terminal text-[11px] font-bold leading-none">{value}</p>
              <p className="font-body text-[9px] opacity-60 leading-tight truncate">{label}</p>
            </div>
          </BrutalistCard>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-20 md:pb-28"
    >
      {/* Two-column grid: photo LEFT, text RIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

        {/* LEFT — Photo card + stats */}
        <motion.div
          initial={{ opacity: 0, x: -32, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-start"
        >
          <TiltPhotoCard />
        </motion.div>

        {/* RIGHT — Text content */}
        <div className="flex flex-col justify-center">

          {/* Status badge */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -3, transition: { duration: 0.18 } }}
            className="font-terminal text-[12px] uppercase tracking-widest mb-5 inline-flex items-center gap-2 px-3 py-1.5 border-2 brut-border rounded-[8px] w-fit cursor-default select-none"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#22C55E] inline-block animate-pulse"
              aria-hidden="true"
            />
            AVAILABLE FOR NEW PROJECTS
          </motion.p>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mb-5"
          >
            <h1 className="font-display font-extrabold leading-[0.92]">
              <span className="block text-display-xl">Halo,</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)] leading-none mt-1">
                Saya{" "}
                <SignatureMark color="#FACC15">{siteConfig.name}</SignatureMark>
              </span>
            </h1>
          </motion.div>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5"
          >
            <RotatingRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="font-body text-body opacity-80 mb-8 max-w-md leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <MagneticButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Portfolio
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire Me
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.54 }}
            className="flex gap-3"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{
                  rotate: 10,
                  scale: 1.18,
                  y: -4,
                  color: "#2563EB",
                  boxShadow: "4px 4px 0px 0px #000",
                  transition: { duration: 0.18 },
                }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-[8px] border-[3px] brut-border brut-surface brut-shadow-sm flex items-center justify-center"
              >
                <Icon size={16} strokeWidth={2.25} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:flex justify-center mt-14"
        aria-hidden="true"
      >
        <MouseScrollIndicator />
      </motion.div>
    </section>
  );
}