import { motion } from "framer-motion";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { journey } from "../../data/site-config";
import { cn } from "../../lib/utils";

export function Journey() {
  return (
    <section
      id="journey"
      aria-label="Perjalanan"
      className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 03_journey"
        title="Bukan CV, ini perjalanan"
        highlight="perjalanan"
        markColor="#2563EB"
        align="center"
      />

      <div className="relative">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[var(--line)] hidden md:block"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-10 md:gap-4">
          {journey.map((item, i) => {
            const leftSide = i % 2 === 0;
            return (
              <div
                key={item.year}
                className="relative md:grid md:grid-cols-2 md:gap-10 items-center"
              >
                {/* stamp badge marker */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-[3px] brut-border bg-[#FACC15] items-center justify-center z-10"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 10%, 75% 6%, 80% 19%, 94% 20%, 93% 34%, 100% 45%, 91% 55%, 95% 68%, 82% 72%, 79% 85%, 65% 82%, 55% 93%, 45% 82%, 31% 87%, 25% 74%, 11% 72%, 15% 58%, 5% 47%, 14% 36%, 10% 22%, 24% 19%, 28% 6%, 42% 11%)",
                  }}
                  aria-hidden="true"
                >
                  <span className="font-terminal text-[10px] font-bold">
                    {item.year}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: leftSide ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    leftSide ? "md:col-start-1" : "md:col-start-2",
                    "md:my-6"
                  )}
                >
                  <BrutalistCard shadow="sm" rounded="md" className="p-5">
                    <span className="font-terminal text-xs font-bold text-[#2563EB] uppercase tracking-wide md:hidden">
                      {item.year}
                    </span>
                    <p className="font-utility text-[11px] uppercase tracking-wide opacity-60 mt-1">
                      {item.context}
                    </p>
                    <h3 className="font-display font-bold text-lg mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm opacity-80 leading-relaxed">
                      {item.description}
                    </p>
                  </BrutalistCard>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
