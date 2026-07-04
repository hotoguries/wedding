import { useEffect, useState } from 'react';
import { fireConfetti } from '../lib/confetti';
import { celebrate } from '../lib/celebration';
import './CelebrationFloat.css';

// 음악 버튼 위에 뜨는 플로팅 폭죽 버튼.
// 첫 화면(Hero)을 지나 스크롤한 뒤에만 나타나 첫인상을 해치지 않는다.
// 카운트 숫자는 캘린더 안 인라인 버튼에서만 보여준다.
export default function CelebrationFloat() {
  const [visible, setVisible] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    // Hero 섹션은 항상 렌더된다. 화면에서 벗어난 뒤에만 플로팅 버튼 표시.
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const handleClick = () => {
    // 버튼 근처(우하단)에서 터지도록
    fireConfetti(0.78, 0.68);
    setPop(true);
    setTimeout(() => setPop(false), 300);
    celebrate();
  };

  return (
    <button
      className={`celebration-float ${visible ? 'visible' : ''} ${pop ? 'pop' : ''}`}
      onClick={handleClick}
      aria-label="축하 폭죽 터뜨리기"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      🎉
    </button>
  );
}
