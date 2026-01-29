import './Hero.css';

interface HeroProps {
  groomName: string;
  brideName: string;
  date: string;
  mainImage?: string;
}

export default function Hero({ groomName, brideName, date, mainImage }: HeroProps) {
  return (
    <section className="hero">
      {mainImage ? (
        <div className="hero-image">
          <img src={mainImage} alt="웨딩 사진" />
        </div>
      ) : (
        <div className="hero-placeholder">
          <span>메인 이미지</span>
        </div>
      )}
      <div className="hero-content">
        <p className="hero-date">{date}</p>
        <h1 className="hero-names">
          <span>{groomName}</span>
          <span className="hero-ampersand">&</span>
          <span>{brideName}</span>
        </h1>
      </div>
    </section>
  );
}
