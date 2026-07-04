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

  // 자동재생 시도 → 막히면(모바일 등) 첫 사용자 클릭 때 재생
  useEffect(() => {
    if (!music.enabled) return;

    // 1) 자동재생 시도 — 단, 대문 사진·갤러리 등 초기 로딩과 4MB 오디오가
    //    대역폭을 경쟁하지 않도록 페이지 로드 완료 후에 시작한다.
    const tryAutoplay = () => {
      if (autoStarted.current) return;
      audioRef.current?.play().then(() => {
        autoStarted.current = true;
      }).catch(() => {
        /* 자동재생 차단 → 아래 첫 클릭 폴백 사용 */
      });
    };
    if (document.readyState === 'complete') {
      tryAutoplay();
    } else {
      window.addEventListener('load', tryAutoplay, { once: true });
    }

    // 2) 자동재생이 막힌 경우, 첫 사용자 클릭 때 1회 재생
    const handleFirstInteraction = () => {
      document.removeEventListener('click', handleFirstInteraction);
      if (autoStarted.current || !audioRef.current) return;
      autoStarted.current = true;
      audioRef.current.play().catch(() => {
        /* 자동 재생 실패 시 무시 */
      });
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('load', tryAutoplay);
      document.removeEventListener('click', handleFirstInteraction);
    };
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
        preload="none"
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
