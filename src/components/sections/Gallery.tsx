import { useEffect, useRef, useState } from 'react';
import './Gallery.css';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const goPrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  const goNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );

  // 모달 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedIndex]);

  // 키보드 화살표 / ESC 지원 (PC)
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  // Pointer 이벤트: 마우스 드래그(PC)와 손가락 스와이프(모바일) 모두 처리
  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (startX.current === null || startY.current === null) {
      setDragX(0);
      return;
    }
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    // 가로 이동이 세로 이동보다 클 때만 사진 전환
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
    startX.current = null;
    startY.current = null;
    setDragX(0);
  };

  if (images.length === 0) {
    return (
      <section className="section gallery">
        <p className="section-title">gallery</p>
        <div className="gallery-placeholder">
          <span>갤러리 이미지를 추가해주세요</span>
          <p>src/assets/images 폴더에 이미지를 추가하세요</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section gallery">
      <p className="section-title">gallery</p>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedIndex(index)}
          >
            <img src={src} alt={`갤러리 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="gallery-modal" onClick={() => setSelectedIndex(null)}>
          <button className="modal-close" aria-label="닫기">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <img
            src={images[selectedIndex]}
            alt="확대 이미지"
            className="modal-image"
            style={{ transform: `translateX(${dragX}px)` }}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          />
          <span className="modal-counter">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
