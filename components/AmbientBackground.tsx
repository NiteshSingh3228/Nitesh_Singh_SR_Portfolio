"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="ambient-blob w-[620px] h-[620px] bg-[#D7C9F5] top-[-8%] right-[5%]"></div>
      <div className="ambient-blob w-[540px] h-[540px] bg-[#BED3F4] top-[22%] left-[-4%]"></div>
      <div className="ambient-blob w-[680px] h-[680px] bg-[#E3D9F8] top-[48%] right-[-6%]"></div>
      <div className="ambient-blob w-[580px] h-[580px] bg-[#CFE0FB] top-[74%] left-[10%]"></div>
    </div>
  );
}
