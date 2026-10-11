import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "../../data/site-config";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    // Cleanup: remove the event listener when emblaApi changes or component unmounts
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      aria-label="Testimoni"
      className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 05_testimoni"
        title="Kata mereka yang pernah kerja bareng"
        highlight="kerja bareng"
        markColor="#22C55E"
        align="center"
      />

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] px-3"
              >
                <BrutalistCard
                  shadow="sm"
                  rounded="md"
                  className="p-6 relative h-full flex flex-col"
                >
                  <p className="font-body italic leading-relaxed mb-5 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-[3px] brut-border bg-[#FACC15] flex items-center justify-center font-display font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">
                        {t.name}
                      </p>
                      <p className="font-utility text-xs opacity-60">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  {/* speech tail */}
                  <div
                    className="absolute -bottom-3 left-8 w-6 h-6 border-r-[3px] border-b-[3px] brut-border brut-surface rotate-45"
                    aria-hidden="true"
                  />
                </BrutalistCard>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            aria-label="Testimoni sebelumnya"
            className="w-10 h-10 rounded-[8px] border-[3px] brut-border brut-surface brut-hover flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => scrollTo(i)}
                aria-label={`Ke testimoni ${i + 1}`}
                className={`w-3 h-3 border-2 brut-border rounded-[2px] transition-colors ${
                  selected === i ? "bg-[#2563EB]" : "bg-transparent"
                }`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            aria-label="Testimoni berikutnya"
            className="w-10 h-10 rounded-[8px] border-[3px] brut-border brut-surface brut-hover flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}