import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");                 // go to landing page
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${
        scroll
          ? "bg-gray-900/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* LOGO + NAME */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/new.png"
            className="w-11 h-11 object-contain"
            alt="PrepVision AI"
          />
          <span className="text-2xl font-bold text-white">
            PrepVision AI
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <a href="#about" className="hover:text-white transition">
            About Us
          </a>
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>

          {/* NEW CAREERS PAGE */}
          <Link
            to="/careers"
            className="hover:text-white transition"
          >
            Careers
          </Link>
        </div>

        {/* SIGN IN */}
        <div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
            hover:bg-white/20 transition text-sm font-medium"
          >
            Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}
