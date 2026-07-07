'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CosmicScene = dynamic(() => import('./cosmic-scene'), {
  ssr: false,
})

export function CosmicBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* CSS fallback / base glow shown while WebGL loads */}
      <div className="absolute inset-0 bg-[#fff7ed]">
        <div className="absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(234,88,12,0.08),_transparent_65%)] blur-3xl" />
        <div className="absolute right-0 top-2/3 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,_rgba(251,146,60,0.06),_transparent_60%)] blur-3xl" />
      </div>

      <Suspense fallback={null}>
        <CosmicScene />
      </Suspense>

      {/* Vignette + top/bottom fades to keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(255,247,237,0.85)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
