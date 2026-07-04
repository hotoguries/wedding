import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Gallery.css';

interface GalleryProps {
  images: string[];
}

const INITIAL_VISIBLE = 9; // 처음 보여줄 사진 수 (6으로 바꾸면 2줄)
const SWIPE_THRESHOLD = 50; // 사진 전환으로 인정하는 최소 가로 이동(px)
const SLIDE_MS = 220;

// 그리드에는 저용량 썸네일(public/images/gallery/thumbs/), 모달에서만 원본 사용
const thumbOf = (src: string) => src.replace('/gallery/', '/gallery/thumbs/');

let swipeHintShown = false; // 세션당 1회만 스와이프 힌트 노출

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const sliding = useRef(false); // 슬라이드 아웃 애니메이션 진행 중
  const skipTransition = useRef(false); // 인덱스 교체 직후 프레임은 transition 억제
  const collapsing = useRef(false);

  const open = selectedIndex !== null;

  const goPrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  const goNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );

  // 모달 열려 있는 동안 배경 스크롤 잠금 (iOS에서도 확실한 position:fixed 방식)
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      position: style.position,
      top: style.top,
      width: style.width,
      overflow: style.overflow,
    };
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';
    style.overflow = 'hidden';
    return () => {
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // 키보드 화살표 / ESC 지원 (PC)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // 앞뒤 원본 이미지 프리로드 → 스와이프 시 대기 없이 표시
  useEffect(() => {
    if (selectedIndex === null || images.length < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = images[(selectedIndex + d + images.length) % images.length];
    });
  }, [selectedIndex, images]);

  // 인덱스 교체 렌더가 끝나면 transition 억제 해제
  useLayoutEffect(() => {
    skipTransition.current = false;
  }, [selectedIndex]);

  // 접을 때 갤러리 상단으로 복귀 → 페이지 높이 급감으로 인한 스크롤 점프 방지
  useLayoutEffect(() => {
    if (!expanded && collapsing.current) {
      collapsing.current = false;
      sectionRef.current?.scrollIntoView({ block: 'start' });
    }
  }, [expanded]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    if (!swipeHintShown && images.length > 1) {
      swipeHintShown = true;
      setShowHint(true);
      window.setTimeout(() => setShowHint(false), 1800);
    }
  };

  const toggleExpanded = () => {
    if (expanded) collapsing.current = true;
    setExpanded(!expanded);
  };

  // Pointer 이벤트: 마우스 드래그(PC)와 손가락 스와이프(모바일) 모두 처리
  const handlePointerDown = (e: React.PointerEvent) => {
    if (sliding.current) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX.current === null || sliding.current) return;
    setDragX((e.clientX - startX.current) * 0.9);
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (startX.current === null || startY.current === null) {
      setDragging(false);
      setDragX(0);
      return;
    }
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    startX.current = null;
    startY.current = null;
    setDragging(false);
    // 가로 이동이 세로 이동보다 클 때만 사진 전환
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) && images.length > 1) {
      const dir = dx < 0 ? 1 : -1; // 1 = 다음, -1 = 이전
      sliding.current = true;
      setDragX(-dir * window.innerWidth); // 화면 밖으로 밀어내기
      window.setTimeout(() => {
        sliding.current = false;
        skipTransition.current = true; // 새 사진은 애니메이션 없이 중앙에서 시작
        if (dir === 1) goNext();
        else goPrev();
        setDragX(0);
      }, SLIDE_MS);
    } else {
      setDragX(0); // 임계값 미달 → 부드럽게 스냅백
    }
  };

  const handlePointerCancel = () => {
    startX.current = null;
    startY.current = null;
    setDragging(false);
    setDragX(0);
  };

  if (images.length === 0) {
    return (
      <section className="section gallery">
        <p className="section-title">gallery</p>
        <div className="gallery-placeholder">
          <span>갤러리 이미지를 추가해주세요</span>
          <p>public/images/gallery 폴더에 이미지를 추가하세요</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section gallery">
      <p className="section-title">gallery</p>
      <div className="gallery-grid">
        {(expanded ? images : images.slice(0, INITIAL_VISIBLE)).map((src, index) => (
          <button
            type="button"
            key={index}
            className="gallery-item"
            onClick={() => openImage(index)}
            aria-label={`갤러리 사진 ${index + 1} 크게 보기`}
          >
            <img src={thumbOf(src)} alt={`갤러리 사진 ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {images.length > INITIAL_VISIBLE && (
        <button className="gallery-more" onClick={toggleExpanded}>
          {expanded ? '접기' : `사진 더보기 (+${images.length - INITIAL_VISIBLE})`}
        </button>
      )}

      {selectedIndex !== null && (
        <div className="gallery-modal" onClick={() => setSelectedIndex(null)}>
          <button
            className="modal-close"
            aria-label="닫기"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <img
            src={images[selectedIndex]}
            alt={`갤러리 사진 ${selectedIndex + 1} / ${images.length}`}
            className="modal-image"
            style={{
              transform: `translateX(${dragX}px)`,
              transition:
                dragging || skipTransition.current
                  ? 'none'
                  : `transform ${SLIDE_MS}ms ease`,
            }}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerCancel}
          />
          {showHint && <span className="modal-hint">옆으로 밀어서 넘겨보세요</span>}
          <span className="modal-counter">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
