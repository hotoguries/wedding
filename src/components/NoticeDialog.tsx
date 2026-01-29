import { useState, useEffect } from 'react';
import type { NoticeInfo } from '../types/wedding';
import './NoticeDialog.css';

interface NoticeDialogProps {
  notice: NoticeInfo;
}

const STORAGE_KEY = 'wedding-notice-seen';

export default function NoticeDialog({ notice }: NoticeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!notice.enabled) return;

    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, [notice.enabled]);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="notice-overlay" onClick={handleClose}>
      <div className="notice-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-message">
          {notice.message.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < notice.message.split('\n').length - 1 && <br />}
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
