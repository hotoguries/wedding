import type { PersonInfo } from '../../types/wedding';
import './Contact.css';

interface ContactProps {
  groom: PersonInfo;
  bride: PersonInfo;
}

export default function Contact({ groom, bride }: ContactProps) {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSms = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <section className="section contact">
      <p className="section-title">contact</p>
      <div className="contact-list">
        <div className="contact-item">
          <span className="contact-role">신랑</span>
          <span className="contact-name">{groom.name}</span>
          <div className="contact-buttons">
            <button onClick={() => handleCall(groom.phone)} className="contact-button">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </button>
            <button onClick={() => handleSms(groom.phone)} className="contact-button">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-role">신부</span>
          <span className="contact-name">{bride.name}</span>
          <div className="contact-buttons">
            <button onClick={() => handleCall(bride.phone)} className="contact-button">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </button>
            <button onClick={() => handleSms(bride.phone)} className="contact-button">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
