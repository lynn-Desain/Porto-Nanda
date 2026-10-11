import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck } from "lucide-react";
import { BrutalistCard } from "./BrutalistCard";
import { categoryColors, type Certificate } from "../../data/certificates";
import { cn } from "../../lib/utils";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  featured?: boolean;
  onOpen: () => void;
}

function initialsOf(text: string) {
  return text
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Thumbnail({
  certificate,
  className,
}: {
  certificate: Certificate;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const color = categoryColors[certificate.category];

  if (failed) {
    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center relative overflow-hidden",
          className
        )}
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${color}22 0px, ${color}22 14px, transparent 14px, transparent 28px)`,
          backgroundColor: "var(--surface)",
        }}
      >
        <span
          className="font-display font-extrabold text-6xl md:text-7xl opacity-90"
          style={{ color }}
        >
          {initialsOf(certificate.issuer)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={certificate.thumbnail}
      alt={certificate.title}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn(
        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
        className
      )}
    />
  );
}

export function CertificateCard({
  certificate,
  index,
  featured = false,
  onOpen,
}: CertificateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const color = categoryColors[certificate.category];

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -5, y: px * 5 });
  };

  const dateLabel = new Date(certificate.issueDate).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, delay: featured ? 0 : index * 0.05 }}
      style={{ perspective: 900 }}
      className={featured ? "w-full" : "break-inside-avoid mb-6"}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <BrutalistCard
          as="article"
          shadow={featured ? "lg" : "md"}
          rounded="md"
          className={cn(
            "group overflow-hidden p-0 flex flex-col cursor-pointer",
            featured && "md:grid md:grid-cols-2 md:items-stretch"
          )}
        >
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Buka sertifikat ${certificate.title}`}
            className={cn(
              "relative w-full overflow-hidden border-b-[3px] md:border-b-0 brut-border bg-[#F4F0E8]",
              featured ? "aspect-video md:aspect-auto md:border-r-[3px]" : "aspect-[4/3]"
            )}
          >
            <Thumbnail certificate={certificate} />
            <span
              className="absolute top-3 left-3 font-terminal text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-[6px] border-2 brut-border text-white shadow-sm"
              style={{ backgroundColor: color }}
            >
              {certificate.category}
            </span>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-utility text-xs font-bold text-white uppercase tracking-widest border-2 border-white rounded-[8px] px-3 py-1.5 backdrop-blur-sm">
                View
              </span>
            </div>
          </button>

          <div
            className={cn(
              "flex flex-col gap-3",
              featured ? "p-6 md:p-8 justify-center" : "p-5"
            )}
          >
            <h3
              className={cn(
                "font-display font-extrabold leading-tight",
                featured ? "text-2xl md:text-3xl" : "text-lg"
              )}
            >
              {certificate.title}
            </h3>

            <div className="flex items-center gap-2 font-utility text-sm opacity-80">
              <span
                className="w-6 h-6 rounded-full border-2 brut-border flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{ backgroundColor: `${color}33` }}
              >
                {initialsOf(certificate.issuer)}
              </span>
              <span className="font-semibold">{certificate.issuer}</span>
              <span aria-hidden="true">•</span>
              <span>{dateLabel}</span>
            </div>

            {featured && (
              <p className="font-terminal text-xs opacity-60 tracking-wide">
                ID: {certificate.credentialId}
              </p>
            )}

            <div className="flex items-center gap-2 mt-1">
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-utility text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-[8px] border-2 brut-border brut-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform bg-[color:var(--surface)]"
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                Verify
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </BrutalistCard>
      </motion.div>
    </motion.div>
  );
}