import { useEffect, useState } from 'react';
import CelebrationButton from '../CelebrationButton';
import './Calendar.css';

interface CalendarProps {
  date: string;
  time: string;
}

// '오후 4시 20분' 같은 한글 시간 문자열을 24시간제 시/분으로 파싱
function parseKoreanTime(time: string): { hour: number; minute: number } {
  const isPM = time.includes('오후');
  const hourMatch = time.match(/(\d+)\s*시/);
  const minMatch = time.match(/(\d+)\s*분/);
  let hour = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minute = minMatch ? parseInt(minMatch[1], 10) : 0;
  if (isPM && hour < 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  return { hour, minute };
}

export default function Calendar({ date, time }: CalendarProps) {
  const weddingDate = new Date(date);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const day = weddingDate.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][weddingDate.getDay()];

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 예식 정확 시각 (날짜 + 시:분)
  const { hour, minute } = parseKoreanTime(time);
  const targetTime = new Date(year, month, day, hour, minute, 0).getTime();

  // 1초마다 갱신되는 라이브 카운트다운
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = targetTime - now;
  const past = diff <= 0;
  const totalSec = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  const weeks = [];
  let week = new Array(firstDay).fill(null);

  for (let d = 1; d <= lastDate; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <section className="section calendar">
      <p className="section-title">calendar</p>
      <p className="calendar-date-text">
        {year}년 {month + 1}월 {day}일 {dayOfWeek}요일 {time}
      </p>

      <div className="countdown">
        {past ? (
          <p className="countdown-headline">
            오승환 <span className="dday-heart">♥</span> 송병연, 행복하게 잘 살겠습니다
          </p>
        ) : (
          <>
            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="countdown-num">{days}</span>
                <span className="countdown-label">일</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(hours)}</span>
                <span className="countdown-label">시</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(minutes)}</span>
                <span className="countdown-label">분</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(seconds)}</span>
                <span className="countdown-label">초</span>
              </div>
            </div>
            <p className="countdown-headline">
              오승환 <span className="dday-heart">♥</span> 송병연의 결혼식이{' '}
              <span className="dday-count">D-{days}</span> 남았습니다
            </p>
          </>
        )}
      </div>

      <div className="calendar-grid">
        <div className="calendar-month">{month + 1}월</div>
        <div className="calendar-header">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <span key={d} className={d === '일' ? 'sunday' : ''}>
              {d}
            </span>
          ))}
        </div>
        <div className="calendar-body">
          {weeks.map((week, i) => (
            <div key={i} className="calendar-week">
              {week.map((d, j) => (
                <span
                  key={j}
                  className={`calendar-day ${d === day ? 'wedding-day' : ''} ${j === 0 ? 'sunday' : ''}`}
                >
                  {d === day ? <span>{d}</span> : (d || '')}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="celebration-area">
        <p className="celebration-caption">🎉 버튼을 눌러 축하해 주세요!</p>
        <CelebrationButton />
      </div>
    </section>
  );
}
