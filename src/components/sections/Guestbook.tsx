import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue, query, orderByChild, remove } from 'firebase/database';
import './Guestbook.css';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt: number;
}

// 간단한 해시 함수
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');

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
    if (!name.trim() || !message.trim() || !password.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const hashedPassword = await hashPassword(password);
      const messagesRef = ref(database, 'guestbook');
      await push(messagesRef, {
        name: name.trim(),
        message: message.trim(),
        password: hashedPassword,
        createdAt: Date.now(),
      });
      setName('');
      setMessage('');
      setPassword('');
    } catch (error) {
      console.error('메시지 저장 실패:', error);
      alert('메시지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (msg: GuestMessage) => {
    if (!deletePassword.trim()) return;

    const hashedInput = await hashPassword(deletePassword);
    if (hashedInput !== msg.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const messageRef = ref(database, `guestbook/${msg.id}`);
      await remove(messageRef);
      setDeleteTarget(null);
      setDeletePassword('');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
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
        <input
          type="password"
          placeholder="비밀번호 (삭제 시 필요)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
          className="guestbook-input"
        />
        <button
          type="submit"
          className="guestbook-submit"
          disabled={isSubmitting || !name.trim() || !message.trim() || !password.trim()}
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
                <div className="message-header-right">
                  <span className="message-date">{formatDate(msg.createdAt)}</span>
                  <button
                    className="message-delete-btn"
                    onClick={() => setDeleteTarget(deleteTarget === msg.id ? null : msg.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="message-content">{msg.message}</p>
              {deleteTarget === msg.id && (
                <div className="delete-confirm">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="delete-password-input"
                  />
                  <button
                    className="delete-confirm-btn"
                    onClick={() => handleDelete(msg)}
                  >
                    확인
                  </button>
                  <button
                    className="delete-cancel-btn"
                    onClick={() => {
                      setDeleteTarget(null);
                      setDeletePassword('');
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
