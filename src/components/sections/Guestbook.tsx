import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue, query, orderByChild } from 'firebase/database';
import './Guestbook.css';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const messagesRef = ref(database, 'guestbook');
    const messagesQuery = query(messagesRef, orderByChild('createdAt'));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList: GuestMessage[] = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...(value as Omit<GuestMessage, 'id'>),
          })
        );
        // 최신순 정렬
        messageList.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const messagesRef = ref(database, 'guestbook');
      await push(messagesRef, {
        name: name.trim(),
        message: message.trim(),
        createdAt: Date.now(),
      });
      setName('');
      setMessage('');
    } catch (error) {
      console.error('메시지 저장 실패:', error);
      alert('메시지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}.${date.getDate()}`;
  };

  return (
    <section className="section guestbook">
      <p className="section-title">guestbook</p>
      <p className="guestbook-subtitle">축하 메시지를 남겨주세요</p>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="guestbook-input"
        />
        <textarea
          placeholder="축하 메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          className="guestbook-textarea"
          rows={3}
        />
        <button
          type="submit"
          className="guestbook-submit"
          disabled={isSubmitting || !name.trim() || !message.trim()}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </form>

      <div className="guestbook-messages">
        {messages.length === 0 ? (
          <p className="guestbook-empty">첫 번째 축하 메시지를 남겨주세요!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="guestbook-message">
              <div className="message-header">
                <span className="message-name">{msg.name}</span>
                <span className="message-date">{formatDate(msg.createdAt)}</span>
              </div>
              <p className="message-content">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
