import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, BadgeCheck } from "lucide-react";
import { categoryColors, type Certificate } from "../../data/certificates";

interface CertificateModalProps {
  certificates: Certificate[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function CertificateModal({
  certificates,
  activeIndex,
  onClose,
  onNavigate,
}: CertificateModalProps) {
  const certificate = activeIndex !== null ? certificates[activeIndex] : null;
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((activeIndex + 1) % certificates.length);
      if (e.key === "ArrowLeft")
        onNavigate((activeIndex - 1 + certificates.length) % certificates.length);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, certificates.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {certificate && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Sertifikat: ${certificate.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl brut-surface border-[3px] brut-border rounded-[16px] brut-shadow-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-[8px] border-2 brut-border bg-white flex items-center justify-center hover:bg-[#FACC15] transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            <div className="relative w-full aspect-video bg-[#F4F0E8] border-b-[3px] brut-border overflow-hidden">
              {!imgFailed ? (
                <motion.img
                  key={certificate.id}
                  src={certificate.thumbnail}
                  alt={certificate.title}
                  onError={() => setImgFailed(true)}
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="font-display font-extrabold text-7xl opacity-80"
                    style={{ color: categoryColors[certificate.category] }}
                  >
                    {certificate.issuer
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  onNavigate((activeIndex - 1 + certificates.length) % certificates.length)
                }
                aria-label="Sertifikat sebelumnya"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[8px] border-2 brut-border bg-white/90 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % certificates.length)}
                aria-label="Sertifikat berikutnya"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[8px] border-2 brut-border bg-white/90 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-3">
              <span
                className="self-start font-terminal text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-[6px] border-2 brut-border text-white"
                style={{ backgroundColor: categoryColors[certificate.category] }}
              >
                {certificate.category}
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl">
                {certificate.title}
              </h3>
              <p className="font-utility text-sm opacity-80">
                {certificate.issuer} •{" "}
                {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="font-terminal text-xs opacity-60">
                Credential ID: {certificate.credentialId}
              </p>
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 self-start inline-flex items-center gap-2 font-utility text-sm font-bold uppercase tracking-wide px-4 py-2.5 rounded-[8px] border-[3px] brut-border brut-shadow-sm bg-[#2563EB] text-white hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
              >
                <BadgeCheck className="w-4 h-4" />
                Verify Credential
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}