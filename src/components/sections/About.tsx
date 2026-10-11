import { motion } from "framer-motion";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { stats, educationChips, siteConfig } from "../../data/site-config";
import { StatCounter } from "../ui/StatCounter";

export function About() {
  return (
    <section
      id="about"
      aria-label="Tentang Saya"
      className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 01_tentang-saya"
        title="Saya suka membuat detail kecil terasa besar"
        highlight="detail kecil"
        markColor="#7C3AED"
      />

      <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-body-lg leading-relaxed mb-5">
            Saya {siteConfig.fullName}, biasa dipanggil {siteConfig.name} — {siteConfig.role.toLowerCase()}.
            Berbasis di {siteConfig.location} ({siteConfig.timezone}), saya menghabiskan sebagian besar
            waktu di persimpangan antara riset pendidikan matematika dan rekayasa antarmuka untuk produk edtech.
          </p>
          <p className="font-body text-body leading-relaxed opacity-80 mb-8">
            Bagi saya, satu transisi hover yang tepat waktu bisa mengubah cara siswa memahami sebuah materi.
            Itu sebabnya saya selalu membangun sistem desain dulu sebelum menulis satu pun halaman — supaya
            setiap keputusan visual bisa dijelaskan, bukan sekadar ditiru dari referensi.
          </p>

          <div className="flex flex-wrap gap-3">
            {educationChips.map((chip) => (
              <BrutalistCard
                key={chip}
                shadow="sm"
                rounded="sm"
                className="px-4 py-2 bg-[#FACC15]"
              >
                <span className="font-utility text-sm font-bold">{chip}</span>
              </BrutalistCard>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <BrutalistCard
            shadow="lg"
            rounded="lg"
            hover={false}
            className="p-8 grid grid-cols-2 gap-8"
          >
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </BrutalistCard>
        </motion.div>
      </div>
    </section>
  );
}
