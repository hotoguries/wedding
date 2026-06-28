import { useState, useRef, useEffect } from 'react';
import type { MusicInfo } from '../types/wedding';
import './MusicPlayer.css';

interface MusicPlayerProps {
  music: MusicInfo;
}

export default function MusicPlayer({ music }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoStarted = useRef(false);

  // 첫 사용자 클릭 때 1회만 자동 재생 (이후엔 재등록하지 않음)
  useEffect(() => {
    if (!music.enabled) return;

    const handleFirstInteraction = () => {
      document.removeEventListener('click', handleFirstInteraction);
      if (autoStarted.current || !audioRef.current) return;
      autoStarted.current = true;
      audioRef.current.play().catch(() => {
        /* 자동 재생 실패 시 무시 */
      });
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [music.enabled]);

  if (!music.enabled) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    autoStarted.current = true; // 사용자가 직접 제어 시작 → 자동재생 로직 무력화
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        className={`music-button ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? '음악 일시정지' : '음악 재생'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  );
}
