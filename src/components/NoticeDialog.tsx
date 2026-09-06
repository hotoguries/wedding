import { useState, useEffect } from 'react';
import type { NoticeInfo } from '../types/wedding';
import './NoticeDialog.css';

interface NoticeDialogProps {
  notice: NoticeInfo;
  onClose?: () => void;
}

// 내용이 바뀌면 키도 바뀌어, 이전에 본 사람에게도 새 안내가 다시 뜬다.
function storageKeyFor(notice: NoticeInfo): string {
  const s = `${notice.title || ''}|${notice.message || ''}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return `wedding-notice-seen-${(h >>> 0).toString(36)}`;
}

export default function NoticeDialog({ notice, onClose }: NoticeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = storageKeyFor(notice);
  // Firebase 콘솔에서 "\\n"이 문자 그대로 저장된 경우도 줄바꿈으로 표시한다.
  const messageLines = notice.message.replace(/\\n/g, '\n').split(/\r?\n/);

  useEffect(() => {
    if (!notice.enabled) {
      onClose?.();
      return;
    }

    const hasSeen = localStorage.getItem(storageKey);
    if (!hasSeen) {
      setIsOpen(true);
    } else {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, notice.enabled]);

  const handleClose = () => {
    localStorage.setItem(storageKey, 'true');
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="notice-overlay" onClick={handleClose}>
      <div className="notice-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-message">
          {messageLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < messageLines.length - 1 && <br />}
            </span>
          ))}
        </p>
        {notice.image && (
          <div className="notice-image">
            <img src={notice.image} alt="안내 이미지" />
          </div>
        )}
        <button className="notice-button" onClick={handleClose}>
          확인
        </button>
      </div>
    </div>
  );
}
