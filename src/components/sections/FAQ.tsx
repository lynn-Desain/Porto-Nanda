import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { faqs } from "../../data/site-config";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Pertanyaan Umum"
      className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 06_faq"
        title="Pertanyaan yang sering muncul"
        highlight="sering muncul"
        markColor="#2563EB"
        align="center"
      />

      <div className="flex flex-col gap-4">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <BrutalistCard
              key={item.q}
              shadow={isOpen ? "md" : "sm"}
              rounded="md"
              hover={false}
              className="overflow-hidden transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <span className="font-display font-bold text-base md:text-lg">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-8 h-8 rounded-[6px] border-2 brut-border flex items-center justify-center"
                >
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                    style={{ overflow: "hidden" }}
                  >
                    <p className="font-body text-sm md:text-base opacity-80 leading-relaxed px-5 pb-5 border-t-[3px] brut-border pt-4">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </BrutalistCard>
          );
        })}
      </div>
    </section>
  );
}