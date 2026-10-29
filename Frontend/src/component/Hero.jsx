import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Users,
  ArrowRight,
  Lock,
  User,
  Smartphone,
  Target,
  Layers,
  Monitor,
  MapPin,
  ChevronDown,
  Crown,
  Trophy,
  Landmark,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { useCounsellingModal } from "../context/useCounsellingModal";


const BG_IMAGE = "/gettyimages-1220344137-170667a.jpg";

const features = [
  { icon: GraduationCap, label: "Expert Faculty & Guidance" },
  { icon: BookOpen, label: "Structured Study Plan" },
  { icon: FileText, label: "Prelims & Mains Test Series" },
  { icon: Users, label: "Personalised Mentorship" },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Students Guided" },
  { icon: Trophy, value: "500+", label: "Selections" },
  { icon: Landmark, value: "3", label: "Centres in UP" },
  { icon: Settings, value: "15+", label: "Years of Excellence" },
];

/* ---------- animation helpers ---------- */
const stagger = (delay = 0, gap = 0.1) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: gap } },
});
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// counts "10,000+" up from 0 when it scrolls into view (text stays the same)
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = String(value).match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const hasComma = match ? match[1].includes(",") : false;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {hasComma ? n.toLocaleString("en-US") : n}
      {suffix}
    </span>
  );
}

function Field({ icon: Icon, children }) {
  return (
    <motion.div variants={fadeUp} className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      {children}
    </motion.div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200";

export default function Hero() {
  const [goal, setGoal] = useState("UPSC");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState("Just starting");
  const [mode, setMode] = useState("Offline");
  const [centre, setCentre] = useState("Lucknow");
  const [isSuccess, setIsSuccess] = useState(false);
  const { openModal } = useCounsellingModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const payload = {
      id: "HERO-" + Date.now(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      goal,
      stage,
      mode,
      centre,
      submittedAt: new Date().toISOString(),
      source: "hero_card_form",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("dhyeya_counselling_leads") || "[]");
      existing.unshift(payload);
      localStorage.setItem("dhyeya_counselling_leads", JSON.stringify(existing.slice(0, 100)));
    } catch {
      // ignore
    }

    setIsSuccess(true);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a1b44] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* dark blue overlay so left text stays readable (fades out toward the girl) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b44] via-[#0a1b44]/80 to-transparent lg:via-[#0a1b44]/50" />
      {/* bottom fade for the stats bar */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a1b44] to-transparent" />
      {/* slow drifting golden glow */}
      <div
        aria-hidden="true"
        className="anim-drift pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col gap-10 px-5 pb-6 pt-10 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        {/* LEFT CONTENT */}
        <motion.div
          variants={stagger(0.1, 0.12)}
          initial="hidden"
          animate="show"
          className="flex max-w-xl flex-col lg:pt-4"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-yellow-400"
          >
            <span className="anim-float flex">
              <Crown className="h-4 w-4" />
            </span>
            Your Civil Services Journey Starts Here
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl"
          >
            Turn Your <span className="text-yellow-400">IAS Dream</span>
            <br />
            Into a Clear <span className="text-yellow-400">Plan</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base"
          >
            Prepare for UPSC CSE &amp; UPPCS with expert faculty, structured
            learning, test practice and personalised academic guidance.
          </motion.p>

          <motion.div
            variants={stagger(0, 0.1)}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {features.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-yellow-400/70 bg-white/5"
                >
                  <Icon className="h-5 w-5 text-yellow-400" />
                </motion.span>
                <span className="text-xs font-medium leading-tight">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => openModal({ goal })}
            className="btn-sheen group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 text-base font-bold text-[#0a1b44] shadow-lg transition-colors hover:bg-yellow-300 sm:w-[370px] cursor-pointer"
          >
            Get Personalised Guidance
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* RIGHT FORM CARD */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-full rounded-2xl bg-white p-5 text-slate-800 shadow-2xl lg:w-[330px] lg:shrink-0"
        >
          {isSuccess ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Request Received!</h3>
              <p className="mt-1 text-xs text-slate-600">
                Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. Our academic mentor will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFullName("");
                  setPhone("");
                }}
                className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-extrabold leading-tight text-slate-900">
                Get Your
                <span className="block text-blue-700">Personalised Counselling</span>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Share a few details and our academic team will help you with the
                right preparation plan.
              </p>

              <motion.div
                variants={stagger(0.7, 0.07)}
                initial="hidden"
                animate="show"
                className="mt-4 space-y-3"
              >
                <Field icon={User}>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name*"
                    className={inputCls}
                  />
                </Field>

                <Field icon={Smartphone}>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Mobile Number*"
                    className={inputCls}
                  />
                </Field>

                <Field icon={Target}>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className={`${inputCls} appearance-none pr-9 cursor-pointer`}
                  >
                    <option value="UPSC">UPSC</option>
                    <option value="UPPCS">UPPCS</option>
                    <option value="Both">Both</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </Field>

                <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
                  {["UPSC", "UPPCS", "Both"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`relative rounded-lg py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        goal === g
                          ? "text-blue-700"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {goal === g && (
                        <motion.span
                          layoutId="goal-pill"
                          className="absolute inset-0 rounded-lg bg-blue-100"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative">{g}</span>
                    </button>
                  ))}
                </motion.div>

                <Field icon={Layers}>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className={`${inputCls} appearance-none pr-9 cursor-pointer`}
                  >
                    {["Just starting", "Prelims", "Mains", "Interview"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </Field>

                <Field icon={Monitor}>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={`${inputCls} appearance-none pr-9 cursor-pointer`}
                  >
                    {["Online", "Offline", "Hybrid"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </Field>

                <Field icon={MapPin}>
                  <select
                    value={centre}
                    onChange={(e) => setCentre(e.target.value)}
                    className={`${inputCls} appearance-none pr-9 cursor-pointer`}
                  >
                    {["Lucknow", "Prayagraj", "Varanasi"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </Field>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-sheen group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 text-sm font-bold text-[#0a1b44] transition-colors hover:bg-yellow-300 cursor-pointer"
              >
                Book My Free Counselling
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <Lock className="h-3 w-3" />
                Your details are safe with us
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* STATS BAR */}
      <motion.div
        variants={stagger(1, 0.12)}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 pb-6 sm:grid-cols-4 lg:max-w-[60%] lg:px-10 lg:absolute lg:bottom-0 lg:left-0 lg:right-auto lg:ml-[calc((100%-80rem)/2)]"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="flex items-center gap-2"
          >
            <Icon className="h-6 w-6 text-yellow-400" />
            <div className="leading-tight">
              <p className="text-base font-bold">
                <CountUp value={value} />
              </p>
              <p className="text-[11px] text-slate-300">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}