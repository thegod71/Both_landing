import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { useCounsellingModal } from "../context/useCounsellingModal";

export default function FloatingEnquiryBtn() {
  const { isOpen, openModal } = useCounsellingModal();

  // If the modal is already open, hide the floating button to prevent clutter
  if (isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
    >
      <motion.button
        type="button"
        onClick={() => openModal()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-sheen group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0a1b44] to-[#163674] px-4 py-3 text-white shadow-xl shadow-blue-950/30 ring-2 ring-yellow-400 transition-all hover:shadow-2xl"
        aria-label="Open free counselling form"
      >
        {/* Pulsing indicator dot */}
        <span className="relative flex h-3 w-3">
          <span className="anim-ring absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-400" />
        </span>

        <GraduationCap className="h-5 w-5 text-yellow-400" />

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Free Counselling
          </span>
          <span className="hidden text-xs font-semibold text-slate-200 sm:inline">
            Talk to IAS Mentor
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}
