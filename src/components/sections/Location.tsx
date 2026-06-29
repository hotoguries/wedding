import type { VenueInfo } from '../../types/wedding';
import './Location.css';

interface LocationProps {
  venue: VenueInfo;
}

export default function Location({ venue }: LocationProps) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 모바일: 지도 앱 우선 실행, 설치돼 있지 않으면 웹으로 폴백. PC: 웹으로 열기.
  const openMap = (appUrl: string, webUrl: string) => {
    if (!isMobile) {
      window.open(webUrl, '_blank');
      return;
    }
    let switched = false;
    const onHide = () => {
      switched = true;
    };
    document.addEventListener('visibilitychange', onHide);
    window.location.href = appUrl;
    setTimeout(() => {
      document.removeEventListener('visibilitychange', onHide);
      if (!switched && !document.hidden) {
        window.location.href = webUrl;
      }
    }, 1200);
  };

  const handleNaverMap = () => {
    const name = encodeURIComponent(venue.name);
    openMap(
      `nmap://search?query=${name}&appname=hotoguries.github.io`,
      `https://map.naver.com/v5/search/${name}`
    );
  };

  return (
    <section id="location" className="section location">
      <p className="section-title">location</p>
      <h3 className="venue-name">{venue.name}</h3>
      <p className="venue-hall">{venue.hall}</p>
      <p className="venue-address">{venue.address}</p>

      <button type="button" className="map-image" onClick={handleNaverMap}>
        {venue.mapImage ? (
          <>
            <img src={venue.mapImage} alt={`${venue.name} 위치 지도`} loading="lazy" />
            <span className="map-image-overlay">
              <span className="map-image-overlay-text">📍 네이버 지도에서 보기</span>
            </span>
          </>
        ) : (
          <span className="map-image-empty">📍 네이버 지도에서 위치 보기</span>
        )}
      </button>

      {venue.transport && (
        <div className="transport-info">
          {venue.transport.subway && (
            <div className="transport-item">
              <div className="transport-icon subway">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 2 4 2.5 4 6v9.5c0 1.93 1.57 3.5 3.5 3.5L6 21v1h2l2-2h4l2 2h2v-1l-1.5-2c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <div className="transport-content">
                <span className="transport-label">지하철</span>
                <p className="transport-text">
                  {venue.transport.subway.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < venue.transport!.subway!.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          )}
          {venue.transport.bus && (
            <div className="transport-item">
              <div className="transport-icon bus">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                </svg>
              </div>
              <div className="transport-content">
                <span className="transport-label">버스</span>
                <p className="transport-text">
                  {venue.transport.bus.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < venue.transport!.bus!.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          )}
          {venue.transport.car && (
            <div className="transport-item">
              <div className="transport-icon car">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div className="transport-content">
                <span className="transport-label">자가용</span>
                <p className="transport-text">
                  {venue.transport.car.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < venue.transport!.car!.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
