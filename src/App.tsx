import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/sections/Hero';
import Greeting from './components/sections/Greeting';
import Couple from './components/sections/Couple';
import Calendar from './components/sections/Calendar';
import Location from './components/sections/Location';
import Gallery from './components/sections/Gallery';
import Account from './components/sections/Account';
import NoticeDialog from './components/NoticeDialog';
import MusicPlayer from './components/MusicPlayer';
import { fireConfetti } from './lib/confetti';
import { weddingData } from './data/weddingData';

// 안내 팝업도 git/소스에 고정하지 않고 Firebase에서 런타임에 불러온다(1주일 전 콘솔에서 결정).
const NOTICE_URL =
  'https://wedding-guestbook-6c9e3-default-rtdb.asia-southeast1.firebasedatabase.app/notice.json';

function App() {
  const { mainImage, groom, bride, date, time, venue, gallery, accounts, notice: initialNotice, music } = weddingData;
  const [celebrate, setCelebrate] = useState(false);
  const [notice, setNotice] = useState(initialNotice);
  const [noticeLoaded, setNoticeLoaded] = useState(false);

  // Firebase에 /notice 값이 있으면 그것으로 덮어쓴다(없거나 실패하면 코드 기본값 사용).
  useEffect(() => {
    fetch(NOTICE_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          setNotice({ ...initialNotice, ...data } as typeof initialNotice);
        }
      })
      .catch(() => {})
      .finally(() => setNoticeLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 첫 진입(안내창 닫은 직후) 폭죽 연출
  useEffect(() => {
    if (!celebrate) return;
    fireConfetti(0.5, 0.35);
    const t1 = setTimeout(() => fireConfetti(0.28, 0.3), 300);
    const t2 = setTimeout(() => fireConfetti(0.72, 0.32), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [celebrate]);

  return (
    <div className="wedding-app">
      {noticeLoaded && notice && (
        <NoticeDialog notice={notice} onClose={() => setCelebrate(true)} />
      )}
      {music && <MusicPlayer music={music} />}
      <Hero
        groomName={groom.name}
        brideName={bride.name}
        date={`${date.replace(/-/g, '.')} ${time}`}
        mainImage={mainImage}
      />
      <Greeting />
      <Couple groom={groom} bride={bride} />
      <Calendar date={date} time={time} />
      <Location venue={venue} />
      <Gallery images={gallery} />
      <Account accounts={accounts} />
      <footer className="section" style={{ padding: '40px 24px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          Made with love
        </p>
      </footer>
    </div>
  );
}

export default App;
