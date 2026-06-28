import { useEffect, useState } from 'react';
import { fireConfetti } from '../lib/confetti';
import './CelebrationButton.css';

// 방명록에 쓰던 Firebase Realtime DB를 SDK 없이 REST로만 재사용 (공유 카운트)
const DB = 'https://wedding-guestbook-6c9e3-default-rtdb.asia-southeast1.firebasedatabase.app';
const COUNT_URL = `${DB}/celebrations/count.json`;
const LOCAL_KEY = 'celebration-count';

export default function CelebrationButton() {
  const [count, setCount] = useState(0);
  const [pop, setPop] = useState(false);

  const fetchCount = async () => {
    try {
      const res = await fetch(COUNT_URL);
      if (!res.ok) throw new Error('fetch failed');
      const val = await res.json();
      if (typeof val === 'number') {
        setCount((c) => Math.max(c, val));
        return;
      }
    } catch {
      // 서버 접근 불가 → 로컬 값으로 폴백
    }
    const local = Number(localStorage.getItem(LOCAL_KEY) || '0');
    setCount((c) => Math.max(c, local));
  };

  useEffect(() => {
    fetchCount();
    const id = setInterval(fetchCount, 5000); // 다른 사람이 누른 것도 반영
    return () => clearInterval(id);
  }, []);

  const handleClick = async () => {
    fireConfetti(0.5, 0.45);
    setPop(true);
    setTimeout(() => setPop(false), 300);
    setCount((c) => c + 1); // 낙관적 업데이트

    try {
      const res = await fetch(COUNT_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ '.sv': { increment: 1 } }), // 서버 원자적 증가
      });
      if (!res.ok) throw new Error('write failed');
      fetchCount();
    } catch {
      const local = Number(localStorage.getItem(LOCAL_KEY) || '0') + 1;
      localStorage.setItem(LOCAL_KEY, String(local));
    }
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
