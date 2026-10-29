import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Custom  SVG icons 
const SproutIcon = () => (
  <svg 
    viewBox="0 0 48 48" 
    className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M14 40C14 26 25 18 36 14C36 28 26 34 14 40Z" 
      fill="#10B981" 
      fillOpacity="0.9"
    />
    <path 
      d="M14 40C17 31 23 25 36 14" 
      stroke="#047857" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M23 28C27 22 34 20 40 19C39 26 34 30 28 31" 
      fill="#34D399" 
      fillOpacity="0.85"
    />
    <path 
      d="M10 42C12 40 14 36 14 32" 
      stroke="#059669" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
  </svg>
);

const BookIcon = () => (
  <svg 
    viewBox="0 0 48 48" 
    className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Page */}
    <path 
      d="M24 14C19 11 12 11 6 13V35C12 33 19 33 24 36V14Z" 
      fill="#2563EB" 
      fillOpacity="0.95"
    />
    {/* Right Page */}
    <path 
      d="M24 14C29 11 36 11 42 13V35C36 33 29 33 24 36V14Z" 
      fill="#3B82F6" 
      fillOpacity="0.95"
    />
    {/* Inner spine lines */}
    <path 
      d="M24 14V36" 
      stroke="#1D4ED8" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M10 20C14 19 18 19 21 21" 
      stroke="#BFDBFE" 
      strokeWidth="1.75" 
      strokeLinecap="round"
    />
    <path 
      d="M10 25C14 24 18 24 21 26" 
      stroke="#BFDBFE" 
      strokeWidth="1.75" 
      strokeLinecap="round"
    />
    <path 
      d="M27 21C30 19 34 19 38 20" 
      stroke="#BFDBFE" 
      strokeWidth="1.75" 
      strokeLinecap="round"
    />
    <path 
      d="M27 26C30 24 34 24 38 25" 
      stroke="#BFDBFE" 
      strokeWidth="1.75" 
      strokeLinecap="round"
    />
  </svg>
);

const RepeatIcon = () => (
  <svg 
    viewBox="0 0 48 48" 
    className="w-10 h-10 transition-transform duration-300 group-hover:rotate-45" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Circular arrows */}
    <path 
      d="M38 24C38 31.732 31.732 38 24 38C17.5 38 12.05 33.58 10.45 27.5" 
      stroke="#2563EB" 
      strokeWidth="4" 
      strokeLinecap="round"
    />
    <path 
      d="M10 24C10 16.268 16.268 10 24 10C29.8 10 34.8 13.5 36.9 18.5" 
      stroke="#3B82F6" 
      strokeWidth="4" 
      strokeLinecap="round"
    />
    {/* Top arrow head */}
    <path 
      d="M32 19H38.5V12.5" 
      stroke="#3B82F6" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Bottom arrow head */}
    <path 
      d="M16 29H9.5V35.5" 
      stroke="#2563EB" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg 
    viewBox="0 0 48 48" 
    className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Handle */}
    <path 
      d="M18 16V13C18 11.3431 19.3431 10 21 10H27C28.6569 10 30 11.3431 30 13V16" 
      stroke="#0D9488" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    {/* Briefcase main body */}
    <rect 
      x="8" 
      y="16" 
      width="32" 
      height="22" 
      rx="5" 
      fill="#0F766E" 
    />
    <path 
      d="M8 24C14 27 34 27 40 24" 
      stroke="#14B8A6" 
      strokeWidth="2" 
    />
    {/* Center buckle */}
    <rect 
      x="21" 
      y="22" 
      width="6" 
      height="6" 
      rx="1.5" 
      fill="#FCD34D" 
    />
  </svg>
);

const stageOptions = [
  {
    id: 'starting-out',
    title: 'Starting Out',
    description: 'Need a roadmap and expert guidance',
    tag: 'Beginner Friendly',
    icon: <SproutIcon />,
    details: 'Get diagnostic foundation assessments, a step-by-step syllabus breakdown, and 1-on-1 mentor onboarding.'
  },
  {
    id: 'preparing-now',
    title: 'Preparing Now',
    description: 'Need structure and regular practice',
    tag: 'High Velocity',
    icon: <BookIcon />,
    details: 'Structured daily revision targets, curated question banks, and timed mock series with deep analytics.'
  },
  {
    id: 'repeat-aspirant',
    title: 'Repeat Aspirant',
    description: 'Need to improve strategy and consistency',
    tag: 'Score Booster',
    icon: <RepeatIcon />,
    details: 'Pinpoint weak sub-topics from previous attempts, refine exam-hall time management, and eliminate negative marks.'
  },
  {
    id: 'working-professional',
    title: 'Working Professional',
    description: 'Need a flexible and manageable plan',
    tag: 'Flexible Pace',
    icon: <BriefcaseIcon />,
    details: 'Bite-sized modules (30–45 mins), weekend deep-dive sessions, and offline mobile audio/flashcard notes.'
  }
];

/* ---------- animation helpers ---------- */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Section3() {
  const [selectedStage, setSelectedStage] = useState('starting-out');

  const handleSelect = (id) => {
    setSelectedStage(id);
    
  };

  return (
    <main className="h-[500px] relative overflow-hidden bg-gradient-to-b from-[#f2f7ff] via-[#f8faff] to-[#ffffff] text-slate-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      
      {/* Ambient background decorative glows (now slowly drifting) */}
      <div 
        aria-hidden="true" 
        className="anim-drift pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" 
      />
      <div 
        aria-hidden="true" 
        className="anim-drift pointer-events-none absolute top-1/3 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl [animation-delay:-5s]" 
      />
      <div 
        aria-hidden="true" 
        className="anim-drift pointer-events-none absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] bg-amber-100/30 rounded-full blur-3xl [animation-delay:-9s]" 
      />

     
      {/* Main Core Selector Section */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 my-auto">
        
        {/* Curvy decorative arrow positioned at top-left pointing towards the cards */}
        <div className="relative">
          <div 
            className="hidden lg:block absolute -top-7 -left-12 xl:-left-16 pointer-events-none select-none text-slate-400"
            title="Choose your stage"
          >
            <svg 
              width="85" 
              height="80" 
              viewBox="0 0 85 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xs stroke-slate-400"
            >
              {/* Elegant curved swoop line — draws itself */}
              <motion.path 
                d="M12 72C6 44 26 12 70 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3, ease: 'easeInOut' }}
              />
              {/* Arrow Head */}
              <motion.path 
                d="M62 6L72 14L62 22" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.3 }}
              />
            </svg>
          </div>

          {/* Heading + Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Which Stage of Preparation Are You In?
            </h1>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
              Select the option that best describes you so we can guide you better.
            </p>
          </motion.div>
        </div>

        {/* 4 Responsive Cards */}
        <motion.div 
          role="radiogroup" 
          aria-label="Preparation stages"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5"
        >
          {stageOptions.map((stage) => {
            const isSelected = selectedStage === stage.id;

            return (
              // outer wrapper = entrance animation, inner card = select / hover animation
              <motion.div key={stage.id} variants={cardVariants} className="h-full">
              <motion.div
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => handleSelect(stage.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleSelect(stage.id);
                  }
                }}
                animate={{ y: isSelected ? -4 : 0 }}
                whileHover={{ y: isSelected ? -4 : -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className={`group relative flex h-full flex-col items-center justify-between p-6 sm:p-7 rounded-2xl cursor-pointer select-none transition-[background-color,box-shadow,border-color] duration-200 outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 ${
                  isSelected
                    ? 'bg-white border-2 border-amber-400 shadow-[0_12px_30px_-8px_rgba(251,191,36,0.25)] ring-4 ring-amber-400/15'
                    : 'bg-white/95 hover:bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Active Selection Checkmark Badge (pops in) */}
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-900 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.span>
                )}

                {/* Card Icon (gently bobs when selected) */}
                <div className="pt-2 pb-4 flex items-center justify-center">
                  <motion.div
                    animate={isSelected ? { y: [0, -5, 0] } : { y: 0 }}
                    transition={
                      isSelected
                        ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.2 }
                    }
                    className={`p-3 rounded-2xl transition-colors duration-200 ${isSelected ? 'bg-amber-50/70' : 'bg-slate-50 group-hover:bg-slate-100/70'}`}
                  >
                    {stage.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center flex-grow justify-center">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-2 transition-colors ${
                    isSelected ? 'text-slate-950 font-extrabold' : 'text-slate-900'
                  }`}>
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-[200px] min-h-[38px] flex items-center justify-center">
                    {stage.description}
                  </p>
                </div>

                {/* Subtle bottom indicator status pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center">
                  <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full transition-colors ${
                    isSelected 
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    {stage.tag}
                  </span>
                </div>
              </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        

      </section>

      

    </main>
  );
}