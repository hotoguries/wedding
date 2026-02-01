import './App.css';
import Hero from './components/sections/Hero';
import Greeting from './components/sections/Greeting';
import Couple from './components/sections/Couple';
import Calendar from './components/sections/Calendar';
import Location from './components/sections/Location';
import Gallery from './components/sections/Gallery';
import Account from './components/sections/Account';
import Contact from './components/sections/Contact';
import Guestbook from './components/sections/Guestbook';
import NoticeDialog from './components/NoticeDialog';
import MusicPlayer from './components/MusicPlayer';
import { weddingData } from './data/weddingData';

function App() {
  const { mainImage, groom, bride, date, time, venue, gallery, accounts, notice, music } = weddingData;

  return (
    <div className="wedding-app">
      {notice && <NoticeDialog notice={notice} />}
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
      <Contact groom={groom} bride={bride} />
      <Guestbook />
      <footer className="section" style={{ padding: '40px 24px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          Made with love
        </p>
      </footer>
    </div>
  );
}

export default App;
