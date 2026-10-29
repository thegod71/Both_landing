import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Smartphone,
  Mail,
  Layers,
  Monitor,
  MapPin,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronDown,
  Loader2,
  Calendar,
} from "lucide-react";
import { useCounsellingModal } from "../context/useCounsellingModal";

const EXAM_GOALS = ["UPSC CSE", "UPPCS", "Both (UPSC + UPPCS)"];

const STAGE_OPTIONS = [
  "Beginner / Just Starting",
  "Foundation (NCERTs & Core)",
  "Prelims 2025/2026 Focused",
  "Mains & Answer Writing",
  "Interview & Personality Guidance",
];

const MODE_OPTIONS = [
  "Offline Classroom Batches",
  "Live Online Interactive",
  "Hybrid (Online + Mentorship)",
];

const CENTRE_OPTIONS = [
  "Lucknow - Gomti Nagar Centre",
  "Lucknow - Aliganj Centre",
  "Prayagraj - Civil Lines Centre",
  "Online / Digital Campus",
];

function ModalFormContent({ initialData, onClose }) {
  // Form State initialized from optional initialData
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState(
    initialData?.goal && EXAM_GOALS.includes(initialData.goal)
      ? initialData.goal
      : "UPSC CSE"
  );
  const [stage, setStage] = useState(
    initialData?.stage && STAGE_OPTIONS.includes(initialData.stage)
      ? initialData.stage
      : STAGE_OPTIONS[0]
  );
  const [mode, setMode] = useState(
    initialData?.mode && MODE_OPTIONS.includes(initialData.mode)
      ? initialData.mode
      : MODE_OPTIONS[0]
  );
  const [centre, setCentre] = useState(
    initialData?.centre && CENTRE_OPTIONS.includes(initialData.centre)
      ? initialData.centre
      : CENTRE_OPTIONS[0]
  );
  const [query, setQuery] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  // Validation helper
  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long";
    }

    const cleanPhone = phone.replace(/\s+/g, "").replace(/^(\+91)/, "");
    if (!cleanPhone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, phone: true, email: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      id: "LEAD-" + Date.now(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      goal,
      stage,
      mode,
      centre,
      query: query.trim() || null,
      submittedAt: new Date().toISOString(),
      source: "website_popup_form",
    };

    try {
      // 1. Store to localStorage as resilient offline lead storage
      try {
        const existingLeads = JSON.parse(
          localStorage.getItem("dhyeya_counselling_leads") || "[]"
        );
        existingLeads.unshift(submissionPayload);
        localStorage.setItem(
          "dhyeya_counselling_leads",
          JSON.stringify(existingLeads.slice(0, 100))
        );
      } catch (storageErr) {
        console.warn("Could not save to localStorage:", storageErr);
      }

      // 2. Dispatch event for analytics / webhooks
      window.dispatchEvent(
        new CustomEvent("dhyeya_lead_submitted", { detail: submissionPayload })
      );

      // 3. Optional backend API sync
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        await fetch(`${apiUrl}/api/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionPayload),
        }).catch((apiErr) => {
          console.warn("Backend lead sync error:", apiErr);
        });
      } else {
        await new Promise((res) => setTimeout(res, 850));
      }

      setLastSubmission(submissionPayload);
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setErrors({ form: "Something went wrong. Please try calling us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center py-6 text-center"
      >
        <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
          <span className="anim-ring absolute inset-0 rounded-full" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          Slot Booked Successfully!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          Thank you, <span className="font-semibold text-slate-900">{lastSubmission?.fullName}</span>.
          Our senior academic counsellor will call you on{" "}
          <span className="font-semibold text-slate-900">{lastSubmission?.phone}</span> within 24 hours.
        </p>

        <div className="mt-5 w-full rounded-xl bg-slate-50 p-4 text-left border border-slate-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-500 font-medium">Target Exam:</span>
            <span className="font-bold text-[#0a1b44]">{lastSubmission?.goal}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-500 font-medium">Stage:</span>
            <span className="font-semibold">{lastSubmission?.stage}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-500 font-medium">Preferred Mode:</span>
            <span className="font-semibold">{lastSubmission?.mode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Centre:</span>
            <span className="font-semibold">{lastSubmission?.centre}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-sheen mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffca28] py-3.5 text-sm font-bold text-[#0a1b44] transition-all hover:bg-yellow-400 active:scale-98 shadow-md cursor-pointer"
        >
          Done &amp; Explore Website
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.form && (
        <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          {errors.form}
        </div>
      )}

      {/* Exam Goal Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Select Target Goal <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {EXAM_GOALS.map((g) => {
            const isSelected = goal === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`relative flex items-center justify-center rounded-xl py-2.5 px-2 text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0a1b44] text-yellow-300 shadow-md ring-2 ring-yellow-400/50"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{g}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Name & Phone Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) {
                  setErrors((prev) => ({ ...prev, fullName: null }));
                }
              }}
              onBlur={() => handleBlur("fullName")}
              placeholder="e.g. Rahul Sharma"
              className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 ${
                touched.fullName && errors.fullName
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
          </div>
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-[11px] font-medium text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative flex">
            <div className="pointer-events-none absolute left-3 top-1/2 flex items-center gap-1 -translate-y-1/2 text-slate-500 text-xs font-bold">
              <Smartphone className="h-4 w-4 text-slate-400" />
              <span>+91</span>
            </div>
            <input
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val);
                if (errors.phone) {
                  setErrors((prev) => ({ ...prev, phone: null }));
                }
              }}
              onBlur={() => handleBlur("phone")}
              placeholder="98765 43210"
              className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-16 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 ${
                touched.phone && errors.phone
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1 text-[11px] font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Email (Optional) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: null }));
              }
            }}
            onBlur={() => handleBlur("email")}
            placeholder="you@example.com"
            className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 ${
              touched.email && errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
        </div>
        {touched.email && errors.email && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Stage & Learning Mode Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Preparation Stage */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preparation Stage
          </label>
          <div className="relative">
            <Layers className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              {STAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Preferred Mode */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Mode
          </label>
          <div className="relative">
            <Monitor className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              {MODE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Preferred Centre */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Preferred Centre
        </label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            {CENTRE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Optional Message / Query */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Any questions for the mentor? <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Inquire about GS Foundation or Optional batch schedule"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Submit CTA Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-sheen group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-[#ffca28] to-yellow-400 py-3.5 text-sm font-bold text-[#0a1b44] shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-500/30 active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#0a1b44]" />
              <span>Reserving Your Mentorship Slot...</span>
            </>
          ) : (
            <>
              <span>Book Free Counselling Slot</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {/* Trust Footer */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <Lock className="h-3 w-3 text-slate-400" />
          100% Confidential
        </span>
        <span>•</span>
        <span>No Spam Call Guarantee</span>
        <span>•</span>
        <span className="text-blue-800 font-semibold">10,000+ Students Guided</span>
      </div>
    </form>
  );
}

export default function PopupFormModal() {
  const { isOpen, closeModal, initialData, modalKey } = useCounsellingModal();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="counselling-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#061536]/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 my-auto flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl border border-slate-100"
          >
            {/* Header Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0a1b44] via-[#122c66] to-[#0a1b44] p-5 sm:p-6 text-white shrink-0">
              {/* Subtle ambient light aura */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-yellow-400/20 blur-2xl"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close counselling modal"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-all hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/35 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow-300">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                  Free 1-on-1 Guidance Session
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-yellow-400" />
                  Upcoming Batch 2025–26
                </span>
              </div>

              {/* Title & Tagline */}
              <h2
                id="counselling-modal-title"
                className="mt-2.5 text-xl font-extrabold leading-snug sm:text-2xl text-white"
              >
                Book Your <span className="text-yellow-400">Personalised Mentorship</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                Get a customized preparation strategy, syllabus breakdown &amp; study plan from expert IAS/UPPCS faculty.
              </p>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 text-slate-800">
              <ModalFormContent
                key={modalKey}
                initialData={initialData}
                onClose={closeModal}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
