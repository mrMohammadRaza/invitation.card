import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isMuted }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio autoplay prevented by browser policy");
          });
        }
      }
    }
  }, [isMuted]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=arabic-oriental-ambient-112678.mp3"
    />
  );
}
