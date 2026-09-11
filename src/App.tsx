import { useEffect } from 'react';
import './App.css';
import Hero from './components/sections/Hero';
import Greeting from './components/sections/Greeting';
import Couple from './components/sections/Couple';
import Calendar from './components/sections/Calendar';
import Location from './components/sections/Location';
import Gallery from './components/sections/Gallery';
import Account from './components/sections/Account';
import Share from './components/sections/Share';
import MusicPlayer from './components/MusicPlayer';
import CelebrationFloat from './components/CelebrationFloat';
import { weddingData } from './data/weddingData';

function App() {
  const { mainImage, groom, bride, date, time, venue, gallery, accounts, music } = weddingData;

  // 스크롤 진입 시 섹션 페이드인 (한 번 나타나면 유지)
  useEffect(() => {
    const sections = document.querySelectorAll('.wedding-app .section');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="wedding-app">
      <CelebrationFloat />
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
      <Share />
      <footer className="section" style={{ padding: '40px 24px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          오승환 ♥ 송병연
        </p>
      </footer>
    </div>
  );
}

export default App;
