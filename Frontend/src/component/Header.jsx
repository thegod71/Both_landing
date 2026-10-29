import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { useCounsellingModal } from "../context/useCounsellingModal";

const navLinks = [
  { name: "UPSC", href: "#upsc" },
  { name: "UPPCS", href: "#uppcs" },
  { name: "Courses", href: "#courses" },
  { name: "Faculty", href: "#faculty" },
  { name: "Results", href: "#results" },
  { name: "Centres", href: "#centres" },
  { name: "Student Life", href: "#student-life" },
  { name: "FAQs", href: "#faqs" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useCounsellingModal();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex min-h-[90px] max-w-[1600px] items-center justify-between gap-5 px-5 py-3 lg:px-8">

        {/* Logo */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Dhyeya IAS home"
        >
          <div className="flex h-14 w-10 items-center justify-center text-[#18365f]">
            <GraduationCap size={38} strokeWidth={1.8} />
          </div>

          <div className="leading-tight">
            <h1 className="whitespace-nowrap text-[25px] font-extrabold tracking-wide text-[#172e59] sm:text-[29px]">
              DHYEYA IAS
            </h1>
            <p className="whitespace-nowrap text-[8px] font-semibold tracking-wide text-gray-600 sm:text-[10px]">
              CONNECTING ASPIRATIONS TO SUCCESS
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-[14px] font-medium text-slate-700 transition-colors hover:text-[#f2a900]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right-side Actions */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href="tel:+919956789123"
            className="flex items-center gap-3 whitespace-nowrap rounded-full border-2 border-slate-300 px-5 py-4 text-[15px] font-bold text-[#172e59] transition hover:border-[#172e59]"
          >
            <Phone size={19} fill="currentColor" />
            <span>+91 9956 789 123</span>
          </a>

          <button
            type="button"
            onClick={() => openModal()}
            className="flex items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-[#ffca28] px-6 py-[19px] text-[14px] font-bold text-gray-900 shadow-sm transition hover:bg-[#f5b800] cursor-pointer"
          >
            Get Personalised Guidance
            <ArrowRight size={19} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-[#172e59] hover:bg-gray-50 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-slate-700 transition hover:text-amber-600"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href="tel:+919956789123"
              className="flex items-center justify-center gap-3 rounded-full border border-slate-300 px-4 py-3 font-semibold text-[#172e59]"
            >
              <Phone size={18} />
              +91 9956 789 123
            </a>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openModal();
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ffca28] px-4 py-3 font-bold text-gray-900 hover:bg-[#f5b800] cursor-pointer"
            >
              Get Personalised Guidance
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
