import { useState } from "react";
import { motion } from "framer-motion";
import { useCounsellingModal } from "../context/useCounsellingModal";

const FAQS = [
  {
    q: "Which course is right for a beginner?",
    a: "Start with the Foundation batch. It covers the full syllabus from scratch and includes weekly tests, so you build the basics before moving to advanced topics.",
  },
  {
    q: "Are UPSC and UPPCS courses different?",
    a: "Yes. UPSC is the national Civil Services exam and UPPCS is the Uttar Pradesh state exam. They share a lot of General Studies content, but the state paper adds UP-specific topics and a different exam pattern.",
  },
  {
    q: "What is the duration and fee structure?",
    a: "Duration and fees depend on the course you pick. Talk to a counsellor for the current batch schedule and instalment options.",
  },
  {
    q: "Which centres are available?",
    a: "We have centres in Gomti Nagar and Aliganj in Lucknow, and in Civil Lines, Prayagraj. See the list on the right for full addresses.",
  },
  {
    q: "How can I speak to an academic counsellor?",
    a: "Use the Talk to a Counsellor button, or visit any centre during working hours. A counsellor will help you choose a course and batch.",
  },
];

const CENTRES = [
  {
    name: "Gomti Nagar, Lucknow",
    address: "2/125, Vibhuti Khand, Gomti Nagar, Lucknow",
    image: "", // add an image URL, 
  },
  {
    name: "Aliganj, Lucknow",
    address: "A-12, Aliganj, Lucknow",
    image: "",// add an image URL, 
  },
  {
    name: "Prayagraj",
    address: "Civil Lines, Prayagraj",
    image: "",// add an image URL, 
  },
];

/* ---------- animation helpers ---------- */
const stagger = (gap = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function PlusIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 text-slate-800 transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        className={`origin-center transition-transform duration-200 ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
        style={{ transformBox: "fill-box" }}
      />
    </svg>
  );
}

function FaqItem({ item, open, onToggle, id }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-xl border bg-white transition-[border-color,box-shadow] duration-300 ${
        open
          ? "border-blue-300 shadow-md shadow-blue-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-4 text-left text-[15px] text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className={`transition-colors ${open ? "text-slate-900" : ""}`}>{item.q}</span>
        <PlusIcon open={open} />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-6 pb-4 text-sm leading-relaxed text-slate-500 transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PinIcon() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-7 w-7 text-blue-600"
      aria-hidden="true"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        fill="currentColor"
        d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </motion.svg>
  );
}

function CentreThumb({ src, alt }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-[60px] w-[84px] shrink-0 rounded-lg object-cover shadow-sm"
      />
    );
  }
  return (
    <div
      className="h-[60px] w-[84px] shrink-0 rounded-lg bg-gradient-to-br from-slate-300 to-slate-500 shadow-sm"
      role="img"
      aria-label={alt}
    />
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { openModal } = useCounsellingModal();

  return (
    <section className="bg-white px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)_minmax(0,1.1fr)] lg:items-start">
        {/* Left: heading + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Frequently
            <br />
            Asked Questions
          </h2>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-slate-500">
            Here are some common questions from aspirants. Still have questions?
            Talk to our counsellor.
          </p>
          <motion.button
            type="button"
            onClick={() => openModal()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-sheen group mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
          >
            Talk to a Counsellor
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Middle: accordion */}
        <motion.div
          variants={stagger(0.09, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-2"
        >
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              id={`faq-${i}`}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Right: centres */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="rounded-3xl bg-blue-50/70 p-6"
        >
          <div className="flex items-center gap-3">
            <PinIcon />
            <h3 className="text-xl font-bold text-slate-900">Our Centres</h3>
          </div>

          <motion.ul
            variants={stagger(0.18, 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mt-4 ml-[13px] space-y-4 border-l-2 border-blue-300 pl-6"
          >
            {CENTRES.map((c, i) => (
              <motion.li
                key={c.name}
                variants={slideLeft}
                whileHover={{ x: 5 }}
                className="relative flex items-center gap-4"
              >
                {/* pulsing dot on the timeline */}
                <span
                  aria-hidden="true"
                  className="anim-ring-blue absolute -left-[30px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue-500"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                <CentreThumb src={c.image} alt={c.name} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">{c.name}</p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-500">
                    {c.address}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.aside>
      </div>
    </section>
  );
}