import { Link } from "react-router";
import {
  Phone,
  ArrowRight,
  MessageCircle,
  Users,
} from "lucide-react";
import { useCounsellingModal } from "../context/useCounsellingModal";
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
const footerLinks = [
  { label: "UPSC", path: "/upsc" },
  { label: "UPPCS", path: "/uppcs" },
  { label: "About Us", path: "/about-us" },
  { label: "Faculty", path: "/faculty" },
  { label: "Results", path: "/results" },
  { label: "Centres", path: "/centres" },
  { label: "Blog", path: "/blog" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms" },
];


const socialLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com/@yourchannel",
    Icon: FaYoutube,
    color: "text-red-500",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yourprofile",
    Icon: FaInstagram,
    color: "text-pink-500",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/yourpage",
    Icon: FaFacebookF,
    color: "text-blue-600",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/yourcompany",
    Icon: FaLinkedinIn,
    color: "text-sky-600",
  },
];


export default function Footer() {
  const { openModal } = useCounsellingModal();
  return (
    <footer className="w-full font-sans">
      {/* Main footer */}
      <div className="bg-gradient-to-r from-[#07345a] via-[#062b4c] to-[#001d38] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-6 md:flex-row md:px-8">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Dhyeya IAS home"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-11 w-8 items-center justify-center rounded-t-full bg-gradient-to-b from-amber-300 to-amber-600 text-xl font-black text-[#07345a]">
              D
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-wide">
                DHYEYA IAS
              </h2>
              <p className="text-[9px] tracking-wider text-blue-100">
                CONNECTING ASPIRATIONS TO SUCCESS
              </p>
            </div>
          </Link>



          {/* Navigation */}
          <div>
                <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs text-blue-100 md:gap-x-4"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="transition-colors hover:text-amber-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
                <p className="text-center text-[11px] text-blue-100">
                     © 2024 Dhyeya IAS. All Rights Reserved.
                </p>

          </div>
          

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-white p-2 transition hover:-translate-y-1 hover:bg-amber-100"
              >
                <Icon size={17} className={color} />
              </a>
            ))}

            <a
            // put number 
              href="https://wa.me/919956789123"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="rounded-full bg-green-500 p-2 text-white transition hover:bg-green-600"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

       
      </div>

      {/* Bottom counselling bar */}
      <div className="sticky bottom-0 z-50 border-t border-slate-200 bg-white shadow-[0_-3px_15px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row md:px-8">
          {/* Counsellor message */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-orange-100">
                <Users size={19} className="text-orange-700" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-100">
                <Users size={19} className="text-blue-700" />
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-700">
              Have questions? Talk to our Academic Counsellor Now!
            </p>
          </div>

          {/* Phone */}
          <a
          // put number 
            href="tel:+919956789123"
            className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-[#082c50] hover:text-blue-700"
          >
            <Phone size={17} />
            +91 9956 789 123
          </a>

          {/* CTA */}
          <button
            type="button"
            onClick={() => openModal()}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-300 to-yellow-400 px-5 py-2.5 text-xs font-bold text-black shadow-sm transition hover:from-yellow-400 hover:to-amber-500 sm:w-auto cursor-pointer"
          >
            Get Personalised Guidance
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
