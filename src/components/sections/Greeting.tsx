import './Greeting.css';

interface GreetingProps {
  message?: string;
}

const defaultMessage = `서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.

귀한 걸음 하시어
축복해 주시면 감사하겠습니다.`;

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
