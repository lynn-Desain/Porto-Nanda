import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCounter } from "../ui/StatCounter";
import { CertificateCard } from "../ui/CertificateCard";
import { CertificateModal } from "../ui/CertificateModal";
import {
  certificateCategories,
  certificateStats,
  certificateTimeline,
  certificates,
  type CertificateCategory,
} from "../../data/certificates";

export function Certificates() {
  const [filter, setFilter] = useState<CertificateCategory | "All">("All");
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const featured = certificates.find((c) => c.featured) ?? certificates[0];

  const filtered = useMemo(() => {
    const base = certificates.filter((c) => c.id !== featured.id);
    return filter === "All" ? base : base.filter((c) => c.category === filter);
  }, [filter, featured.id]);

  const yearCounts = useMemo(() => {
    const map = new Map<number, number>();
    certificates.forEach((c) => {
      const y = new Date(c.issueDate).getFullYear();
      map.set(y, (map.get(y) ?? 0) + 1);
    });
    return map;
  }, []);

  const yearCertificates = activeYear
    ? certificates.filter(
        (c) => new Date(c.issueDate).getFullYear() === activeYear
      )
    : [];

  return (
    <section
      id="certificates"
      aria-label="Sertifikat & Pencapaian"
      className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 05_pencapaian"
        title="Sertifikat & Pencapaian"
        highlight="Pencapaian"
        markColor="#FACC15"
        description="Kumpulan sertifikasi profesional, riset, dan kompetisi yang menandai perjalanan belajar saya."
      />

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 border-[3px] brut-border rounded-[16px] brut-surface brut-shadow-md p-6 md:p-8">
        {certificateStats.map((stat) =>
          stat.display ? (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-extrabold text-display-md text-[#7C3AED]">
                {stat.display}
              </span>
              <span className="font-utility text-caption uppercase tracking-wide opacity-70 mt-1">
                {stat.label}
              </span>
            </div>
          ) : (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          )
        )}
      </div>

      {/* Featured */}
      <div className="mb-14">
        <CertificateCard
          certificate={featured}
          index={0}
          featured
          onOpen={() => setActiveIndex(certificates.findIndex((c) => c.id === featured.id))}
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Filter kategori sertifikat">
        {certificateCategories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(cat)}
              className="relative font-utility text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-[8px] border-2 brut-border transition-colors"
              style={{
                backgroundColor: active ? "#111827" : "var(--surface)",
                color: active ? "#FFFDF8" : "var(--ink)",
              }}
            >
              {cat}
              {active && (
                <motion.span
                  layoutId="cert-filter-underline"
                  className="absolute left-2 right-2 -bottom-1.5 h-1 rounded-full bg-[#FACC15]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={i}
              onOpen={() =>
                setActiveIndex(certificates.findIndex((c) => c.id === cert.id))
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center font-utility text-sm opacity-60 py-10">
          Belum ada sertifikat pada kategori ini.
        </p>
      )}

      {/* Timeline */}
      <div className="mt-20">
        <h3 className="font-display font-extrabold text-xl mb-6">
          Perjalanan Sertifikasi
        </h3>
        <div className="flex flex-wrap gap-4">
          {certificateTimeline.map((year) => {
            const count = yearCounts.get(year) ?? 0;
            const isOpen = activeYear === year;
            return (
              <div key={year} className="flex-1 min-w-[140px]">
                <button
                  type="button"
                  onClick={() => setActiveYear(isOpen ? null : year)}
                  aria-expanded={isOpen}
                  disabled={count === 0}
                  className="w-full flex items-center justify-between gap-2 font-terminal font-bold px-4 py-3 rounded-[10px] border-2 brut-border brut-surface disabled:opacity-30 hover:bg-[#FACC15]/20 transition-colors"
                >
                  <span>{year}</span>
                  <span className="flex items-center gap-1.5 text-xs opacity-70">
                    {count} cert
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeYear && (
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 flex flex-col gap-2 border-l-[3px] brut-border pl-5">
                {yearCertificates.map((c) => (
                  <li
                    key={c.id}
                    className="font-body text-sm opacity-90 cursor-pointer hover:text-[#2563EB]"
                    onClick={() =>
                      setActiveIndex(certificates.findIndex((x) => x.id === c.id))
                    }
                  >
                    {c.title}{" "}
                    <span className="opacity-50 font-terminal text-xs">
                      — {c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CertificateModal
        certificates={certificates}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}