import './Greeting.css';

interface GreetingProps {
  message?: string;
}

const defaultMessage = `있는 그대로 사랑하고
서로의 존재에 감사하며
변함없이 서로를 아끼며 살아가겠습니다.

서로를 향한 사랑과 믿음으로
하나가 되는 자리에 함께해 주세요.`;

export default function Greeting({ message = defaultMessage }: GreetingProps) {
  return (
    <section className="section greeting">
      <p className="section-title">invitation</p>
      <div className="greeting-message">
        {message.split('\n').map((line, index) => (
          <p key={index}>{line || <br />}</p>
        ))}
      </div>
    </section>
  );
}
