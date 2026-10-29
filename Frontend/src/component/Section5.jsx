import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const students = [
  {
    name: "Shruti Sharma",
    exam: "UPSC CSE 2023",
    rank: "AIR 16",
    image: "https://i.pravatar.cc/300?img=47",
    quote:
      "Dhyeya IAS gave me the right direction and constant support throughout.",
  },
  {
    name: "Aman Verma",
    exam: "UPSC CSE 2022",
    rank: "AIR 45",
    image: "https://i.pravatar.cc/300?img=12",
    quote:
      "The test series and mentorship helped me improve my answer writing.",
  },
  {
    name: "Neha Singh",
    exam: "UPPCS 2023",
    rank: "UPPCS Rank 1",
    image: "https://i.pravatar.cc/300?img=44",
    quote:
      "Faculty support and personal guidance made the difference.",
  },
  {
    name: "Rahul Kumar",
    exam: "UPSC CSE 2024",
    rank: "AIR 28",
    image: "https://i.pravatar.cc/300?img=13",
    quote:
      "Regular practice and expert feedback helped me achieve my goal.",
  },
  {
    name: "Priya Sharma",
    exam: "UPSC CSE 2024",
    rank: "AIR 52",
    image: "https://i.pravatar.cc/300?img=49",
    quote:
      "The guidance and consistent preparation made my journey easier.",
  },
];

/* ---------- animation helpers ---------- */
// cards slide in from the direction you are moving, and out the other way
const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: (dir) => ({ opacity: 0, x: dir * -70, transition: { duration: 0.2 } }),
};

export default function Section5() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const nextSlide = () => {
    setDir(1);
    setActiveIndex((prev) => (prev + 1) % students.length);
  };

  const prevSlide = () => {
    setDir(-1);
    setActiveIndex(
      (prev) => (prev - 1 + students.length) % students.length
    );
  };

  const goTo = (index) => {
    setDir(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const visibleStudents = [0, 1, 2].map(
    (offset) => students[(activeIndex + offset) % students.length]
  );

  return (
    <section className="relative overflow-hidden bg-[#062c50] px-5 py-12 text-white sm:px-8 lg:px-16 lg:py-16">
      {/* Background decoration (slowly drifting) */}
      <div className="anim-drift pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="anim-drift pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl [animation-delay:-6s]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_2fr] lg:gap-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="mb-4 text-sm font-extrabold uppercase tracking-wide text-[#ffcc36] sm:text-base">
            Our Results
          </p>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
            Real Aspirants. Real Success.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/90 sm:text-lg">
            Our students have secured top ranks in UPSC CSE and UPPCS.
            Be the next success story.
          </p>

          <motion.a 
            href="#more-results"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="btn-sheen group mt-7 inline-flex items-center gap-3 rounded-xl border-2 border-[#e9b821] bg-[#ffcc36] px-7 py-4 font-bold text-slate-950 shadow-lg transition-colors hover:bg-[#ffda61] focus:outline-none focus:ring-4 focus:ring-yellow-300/40"
          >
            View More Results
            <span
              aria-hidden="true"
              className="text-xl transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </motion.a>
        </motion.div>

        {/* Right carousel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative min-w-0"
        >
          {/* Previous button: desktop */}
          <motion.button
            type="button"
            onClick={prevSlide}
            aria-label="Previous student results"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            style={{ y: "-50%" }}
            className="absolute -left-5 top-1/2 z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-bold text-slate-900 shadow-lg transition-colors hover:bg-yellow-300 lg:flex"
          >
            ‹
          </motion.button>

          {/* Cards */}
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={activeIndex}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleStudents.map((student, index) => (
                <motion.article
                  key={`${student.name}-${activeIndex}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl ${
                    index === 2 ? "hidden lg:block" : ""
                  }`}
                >
                  {/* Photo and rank */}
                  <div className="mb-4 flex h-36 items-start gap-3">
                      <img
                          src={student.image}
                          alt={student.name}
                          loading="lazy"
                          className="h-34 w-[65%] shrink-0 rounded-xl object-cover object-center"
                      />
                      {/* rank badge pops in with a little spin */}
                      <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 14,
                          delay: 0.25 + index * 0.1,
                        }}
                        className="flex h-[88px] w-[88px] -ml-3 shrink-0 items-center justify-center rounded-full bg-[#ffcc36] p-2 text-center text-sm font-extrabold leading-tight text-slate-900"
                      >
                          {student.rank}
                      </motion.div>
                  </div>

                  {/* Student information */}
                  <h3 className="text-lg font-extrabold sm:text-xl">
                    {student.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[#9a7131] sm:text-base">
                    {student.exam}
                  </p>

                  <blockquote className="mt-4 text-sm italic leading-6 text-slate-600 sm:text-base">
                    “{student.quote}”
                  </blockquote>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile navigation */}
          <div className="mt-6 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous student results"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-slate-900 shadow transition active:scale-90 hover:bg-yellow-300"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {students.map((student, index) => (
                <button
                  key={student.name}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show results starting with ${student.name}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-9 bg-[#ffcc36]"
                      : "w-2.5 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next student results"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-slate-900 shadow transition active:scale-90 hover:bg-yellow-300"
            >
              ›
            </button>
          </div>

          {/* Desktop pagination */}
          <div className="mt-6 hidden items-center justify-center gap-2 lg:flex">
            {students.map((student, index) => (
              <button
                key={student.name}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show results starting with ${student.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-9 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Next button: desktop */}
          <motion.button
            type="button"
            onClick={nextSlide}
            aria-label="Next student results"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            style={{ y: "-50%" }}
            className="absolute -right-5 top-1/2 z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-bold text-slate-900 shadow-lg transition-colors hover:bg-yellow-300 lg:flex"
          >
            ›
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}