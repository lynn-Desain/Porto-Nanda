import { motion } from "framer-motion";
import { SignatureMark } from "./SignatureMark";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  markColor?: string;
  align?: "left" | "center";
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  markColor = "#FACC15",
  align = "left",
  description,
}: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center flex flex-col items-center"
      )}
    >
      <span className="font-terminal text-caption uppercase tracking-widest text-[13px] inline-block px-3 py-1 border-2 brut-border rounded-[8px] mb-4">
        {eyebrow}
      </span>
      <h2 className="font-display font-extrabold text-display-lg leading-[1.05]">
        {highlight ? (
          <>
            {parts[0]}
            <SignatureMark color={markColor}>{highlight}</SignatureMark>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="font-body text-body-lg mt-4 max-w-2xl opacity-80">
          {description}
        </p>
      )}
    </motion.div>
  );
}
