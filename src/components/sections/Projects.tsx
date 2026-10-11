import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { BrutalistCard } from "../ui/BrutalistCard";
import { SectionHeading } from "../ui/SectionHeading";
import { MagneticButton } from "../ui/MagneticButton";
import { projects } from "../../data/site-config";

type Project = (typeof projects)[number];

const featured = projects.find((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  const githubUrl = project.github ?? null;
  const demoUrl = project.demo ?? null;
  const imageUrl = project.image ?? null;
  const projectId = project.id.slice(0, 2).toUpperCase();
  const projectTitle = project.title;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="h-full"
      >
        <BrutalistCard
          shadow="md"
          rounded="md"
          className="group h-full flex flex-col overflow-hidden p-0"
        >
          {/* Thumbnail - Fixed Aspect Ratio */}
          <div className="relative w-full aspect-video overflow-hidden border-b-[3px] brut-border bg-[#F4F0E8]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={projectTitle}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display font-extrabold text-5xl opacity-10">
                  {projectId}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub ${projectTitle}`}
                  className="w-9 h-9 rounded-[8px] border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={15} />
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Demo ${projectTitle}`}
                  className="w-9 h-9 rounded-[8px] border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            {/* Badge */}
            <span className="absolute top-3 left-3 font-terminal text-[10px] uppercase tracking-wide px-2 py-0.5 bg-[#FACC15] border-2 border-black rounded-[5px] font-bold">
              PROJECT_{projectId}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-display font-bold text-lg mb-2 text-black">
              {projectTitle}
            </h3>
            <p className="font-body text-sm leading-relaxed mb-4 flex-1 text-gray-700">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-utility text-[11px] font-semibold px-2.5 py-1 border-2 brut-border rounded-[6px] text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </BrutalistCard>
      </motion.div>
    </motion.div>
  );
}

function FeaturedProject() {
  if (!featured) return null;

  const featuredGithub = featured.github ?? null;
  const featuredDemo = featured.demo ?? null;
  const featuredImage = featured.image ?? null;
  const featuredTitle = featured.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <BrutalistCard
        shadow="lg"
        rounded="lg"
        className="overflow-hidden p-0 grid md:grid-cols-2 items-stretch"
      >
        {/* Left — Image (Full & Not Cropped) */}
        <div className="relative border-r-[3px] border-black overflow-hidden bg-[#F4F0E8] flex items-center justify-center min-h-[340px]">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={featuredTitle}
              className="w-full h-full object-contain p-6"
              draggable={false}
            />
          ) : (
            <div className="flex items-center justify-center">
              <span className="font-display font-extrabold text-6xl opacity-15">
                {featured.id.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Right — Text & CTA (Clean Layout) */}
        <div className="bg-white p-8 md:p-10 flex flex-col justify-between">
          {/* Header */}
          <div>
            <span className="font-terminal text-[11px] uppercase tracking-widest px-3 py-1 border-2 border-black rounded-[6px] inline-block mb-6 font-bold bg-[#FACC15]">
              Featured Project
            </span>

            <h3 className="font-display font-extrabold text-3xl mb-4 text-black leading-tight">
              {featuredTitle}
            </h3>

            <p className="font-body text-base leading-relaxed mb-6 text-gray-700">
              {featured.description}
            </p>
          </div>

          {/* Stack */}
          <div className="mb-6">
            <p className="font-terminal text-xs uppercase tracking-wide text-gray-600 mb-3 font-bold">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-utility text-[11px] font-semibold px-2.5 py-1 border-2 border-black rounded-[6px] text-gray-800 bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-black my-6"></div>

          {/* Impact */}
          <div className="mb-8">
            <p className="font-terminal text-xs uppercase tracking-wide text-gray-600 mb-2 font-bold">
              Impact
            </p>
            <p className="font-display font-extrabold text-2xl text-[#FACC15]">
              {featured.impact}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            {featuredDemo && (
              <MagneticButton
                variant="primary"
                className="!bg-black !text-white flex-1"
                onClick={() => window.open(featuredDemo, "_blank")}
              >
                Live Demo
              </MagneticButton>
            )}
            {featuredGithub && (
              <MagneticButton
                variant="outline"
                className="!border-black !text-black flex-1"
                onClick={() => window.open(featuredGithub, "_blank")}
              >
                GitHub
              </MagneticButton>
            )}
          </div>
        </div>
      </BrutalistCard>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Proyek"
      className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="> 04_karya"
        title="Karya yang saya paling banggakan"
        highlight="paling banggakan"
        markColor="#FACC15"
      />

      <FeaturedProject />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {rest.map((project) => (
          <TiltCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}