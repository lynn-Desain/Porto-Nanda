import { motion } from "framer-motion";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { skillGroups } from "../../data/site-config";
import { accentMap, type Accent } from "../../lib/utils";

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Keahlian"
      className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 02_keahlian"
        title="Perkakas yang saya percaya"
        highlight="percaya"
        markColor="#22C55E"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {skillGroups.map((group, gi) => {
          const accent = accentMap[group.accent as Accent];
          return (
            <BrutalistCard key={group.label} shadow="md" rounded="md" className="p-6">
              <span
                className={`font-terminal text-[12px] uppercase tracking-widest font-bold mb-5 inline-block px-3 py-1 border-2 brut-border rounded-[8px] ${accent.bg} text-white`}
              >
                {group.label}
              </span>
              <div className="flex flex-col gap-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-body font-semibold text-sm">
                        {skill.name}
                      </span>
                      <span className="font-utility text-xs opacity-60">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-3 w-full border-2 brut-border rounded-[6px] overflow-hidden bg-transparent">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                          duration: 0.8,
                          delay: gi * 0.1 + si * 0.08,
                          ease: "easeOut",
                        }}
                        className={`h-full ${accent.bg}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </BrutalistCard>
          );
        })}
      </div>
    </section>
  );
}