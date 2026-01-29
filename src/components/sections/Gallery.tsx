import { useState } from 'react';
import './Gallery.css';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
          <button className="modal-close">&times;</button>
          <img src={images[selectedIndex]} alt="확대 이미지" />
          <div className="modal-nav">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev !== null ? (prev - 1 + images.length) % images.length : null
                );
              }}
            >
              &lt;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev !== null ? (prev + 1) % images.length : null
                );
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
