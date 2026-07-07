'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Where_the_Water_Rests.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 1.0;
    }

    const startAudio = () => {
      if (!interactedRef.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            interactedRef.current = true;
            document.removeEventListener('click', startAudio, true);
            document.removeEventListener('click', startAudio);
            document.removeEventListener('keydown', startAudio);
            document.removeEventListener('scroll', startAudio);
          })
          .catch((err) => {
            console.log('Autoplay blocked, waiting for interaction');
          });
      }
    };

    startAudio();

    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('scroll', startAudio, { once: true });

    const handleAudioDucking = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.volume = 0.2;
        setTimeout(() => {
          if (audioRef.current) audioRef.current.volume = 1.0;
        }, 2000);
      }
    };

    window.addEventListener('playSuccessChime', handleAudioDucking);

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
      document.removeEventListener('scroll', startAudio);
      window.removeEventListener('playSuccessChime', handleAudioDucking);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent global click listener from firing simultaneously
    if (!audioRef.current) return;

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          interactedRef.current = true;
        })
        .catch(console.error);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 text-primary drop-shadow-[0_0_8px_var(--cyan)]" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-white" />
      )}
      
      {/* Tooltip */}
      <span className="absolute -top-10 right-0 w-max rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm pointer-events-none">
        {isPlaying ? "Music Playing (Click to Pause)" : "Music Paused (Click to Play)"}
      </span>
    </button>
  );
}
