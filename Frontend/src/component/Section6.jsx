import { motion } from "framer-motion";

/* ---------- animation helpers ---------- */
const stagger = (gap = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ---------- Small inline icons (no extra dependencies) ---------- */
// the tick draws itself when it scrolls into view
const Check = ({ className = "" }) => (
  <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} fill="none" aria-hidden="true">
    <motion.path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
    <path d="M4 10h12m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icon = (d) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const icons = {
  faculty: icon(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" /></>),
  material: icon(<><path d="M4 5h16v11H4z" /><path d="M12 5v11M8 20h8" /></>),
  test: icon(<><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>),
  mentor: icon(<><circle cx="8" cy="9" r="2.5" /><circle cx="16" cy="9" r="2.5" /><circle cx="12" cy="6" r="2.5" /><path d="M3 19c0-3 2.5-4.5 5-4.5M21 19c0-3-2.5-4.5-5-4.5M7 20c0-3 2-5 5-5s5 2 5 5" /></>),
  library: icon(<><path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z" /><path d="M12 6v14" /></>),
  batches: icon(<><rect x="3" y="7" width="18" height="12" rx="2" /><circle cx="12" cy="13" r="3" /><path d="M9 7l1.5-2h3L15 7" /></>),
};

/* ---------- Data ---------- */
const programs = [
  {
    id: "upsc",
    title: "UPSC Civil Services",
    description: "For aspirants targeting the Civil Services Examination conducted by UPSC.",
    features: [
      "Foundation / Integrated Program",
      "Prelims + Mains + Interview Guidance",
      "Classroom & Online Options",
      "Test Series & Answer Writing Practice",
    ],
    cta: "Explore UPSC Courses",
    href: "/courses/upsc",// here when link
    cardBg: "bg-sky-50",
    checkColor: "text-slate-800",
    // Replace   emblem/logo
    image: "",
    imageAlt: "Dhyeyar emblem",
  },
  {
    id: "uppcs",
    title: "UPPCS",
    description: "For aspirants targeting Uttar Pradesh Provincial Civil Services.",
    features: [
      "State-specific focused curriculum",
      "Prelims + Mains Preparation",
      "Current Affairs for UP",
      "Test Series & Mentorship",
    ],
    cta: "Explore UPPCS Courses",
    href: "/courses/uppcs",
    cardBg: "bg-amber-50",
    checkColor: "text-amber-700",
    
    // Replace with your own Uttar Pradesh map image
    image: "",
    imageAlt: "Map of Uttar Pradesh",
  },
];

const highlights = [
  { label: "Experienced Faculty Team", icon: icons.faculty, tint: "bg-pink-100 text-pink-600" },
  { label: "Updated Study Material", icon: icons.material, tint: "bg-emerald-100 text-emerald-600" },
  { label: "Regular Test Series", icon: icons.test, tint: "bg-sky-100 text-sky-600" },
  { label: "Personal Mentorship & Doubt Support", icon: icons.mentor, tint: "bg-indigo-100 text-indigo-600" },
  { label: "Library & Study Facilities", icon: icons.library, tint: "bg-amber-100 text-amber-600" },
  { label: "Flexible Batches (Classroom & Online)", icon: icons.batches, tint: "bg-violet-100 text-violet-600" },
];

/* ---------- Components ---------- */
function ProgramCard({ p }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: "0 18px 40px -16px rgba(15,23,42,0.25)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:p-8 ${p.cardBg}`}
    >
      <div className="flex h-32 w-32 shrink-0 items-center justify-center self-center sm:h-40 sm:w-40 sm:self-start">
        <img src={p.image} alt={p.imageAlt} className="anim-float max-h-full max-w-full object-contain" />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-2xl font-bold text-slate-900">{p.title}</h3>
        <p className="mt-2 max-w-sm text-slate-600">{p.description}</p>

        <motion.ul
          variants={stagger(0.1, 0.25)}
          className="mt-5 space-y-2.5"
        >
          {p.features.map((f) => (
            <motion.li
              key={f}
              variants={slideIn}
              className="flex items-center gap-3 text-slate-700"
            >
              <Check className={p.checkColor} />
              <span>{f}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          href={p.href}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="btn-sheen group mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          {p.cta}
          <Arrow />
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Section6() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Choose the Right Program for Your Goal
          </h2>
          <p className="mt-2 text-slate-600">
            Comprehensive courses, updated content and continuous evaluation.
          </p>
        </motion.header>

        <motion.div
          variants={stagger(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 lg:grid-cols-2"
        >
          {programs.map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-0"
        >
          {highlights.map((h, i) => (
            <motion.li
              key={h.label}
              variants={fadeUp}
              className={`group flex items-center gap-3 lg:px-4 ${
                i !== 0 ? "lg:border-l lg:border-slate-200" : ""
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${h.tint}`}
              >
                {h.icon}
              </motion.span>
              <span className="text-sm leading-snug text-slate-600 transition-colors group-hover:text-slate-900">{h.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}