import { useEffect, useState } from 'react';
import { fireConfetti } from '../lib/confetti';
import { subscribeCelebration, celebrate } from '../lib/celebration';
import './CelebrationButton.css';

// 캘린더 섹션 안 인라인 버튼 (카운트 표시)
export default function CelebrationButton() {
  const [count, setCount] = useState(0);
  const [pop, setPop] = useState(false);

  useEffect(() => subscribeCelebration(setCount), []);

  const handleClick = () => {
    fireConfetti(0.5, 0.45);
    setPop(true);
    setTimeout(() => setPop(false), 300);
    celebrate();
  };

  return (
    <button
      className={`celebration-button ${pop ? 'pop' : ''}`}
      onClick={handleClick}
      aria-label="축하 폭죽 터뜨리기"
    >
      <span className="celebration-icon">🎉</span>
      <span className="celebration-count">{count.toLocaleString()}</span>
    </button>
  );
}
