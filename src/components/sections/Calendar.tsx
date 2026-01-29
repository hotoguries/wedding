import './Calendar.css';

interface CalendarProps {
  date: string;
  time: string;
}

export default function Calendar({ date, time }: CalendarProps) {
  const weddingDate = new Date(date);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const day = weddingDate.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][weddingDate.getDay()];

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

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
    </section>
  );
}
