import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/70 pt-8 pb-10 w-full relative z-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#E25B38] text-white flex items-center justify-center font-bold text-xs">
            Ni
          </div>
          <span className="font-bold text-sm text-ink">Nitesh Singh</span>
        </div>
        <div className="text-xs text-muted text-center sm:text-right">
          © {new Date().getFullYear()} Nitesh Singh. Data Analytics & Machine Learning.
        </div>
        <Link
          href="#hero"
          className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-ink hover:bg-white transition-all shadow-xs"
          title="Back to top"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </Link>
      </div>
    </footer>
  );
}
