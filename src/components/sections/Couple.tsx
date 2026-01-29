import type { PersonInfo } from '../../types/wedding';
import './Couple.css';

interface CoupleProps {
  groom: PersonInfo;
  bride: PersonInfo;
}

export default function Couple({ groom, bride }: CoupleProps) {
  return (
    <section className="section couple">
      <p className="section-title">groom & bride</p>
      <div className="couple-info">
        <div className="person">
          <p className="person-parents">
            <span>{groom.father}</span> · <span>{groom.mother}</span>의 아들
          </p>
          <p className="person-name">
            <span className="role">신랑</span> {groom.name}
          </p>
        </div>
        <div className="couple-divider" />
        <div className="person">
          <p className="person-parents">
            <span>{bride.father}</span> · <span>{bride.mother}</span>의 딸
          </p>
          <p className="person-name">
            <span className="role">신부</span> {bride.name}
          </p>
        </div>
      </div>
    </section>
  );
}
