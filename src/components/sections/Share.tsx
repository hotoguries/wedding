import { useState } from 'react';
import './Share.css';

const SITE_URL = 'https://hotoguries.github.io/wedding/';
const SHARE_TITLE = '결혼식에 초대합니다';
const SHARE_TEXT = '소중한 분들을 결혼식에 초대합니다.';

export default function Share() {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      alert('복사에 실패했습니다.');
      return false;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SITE_URL });
      } catch {
        /* 사용자가 공유를 취소했거나 실패 → 무시 */
      }
    } else {
      // 공유 시트 미지원(PC 브라우저 등) → 주소 복사로 폴백
      const ok = await copyUrl();
      if (ok) alert('이 브라우저는 공유 기능을 지원하지 않아 청첩장 주소를 복사했어요.');
    }
  };

  return (
    <section className="section share">
      <p className="section-title">share</p>
      <p className="share-message">소중한 분들에게 청첩장을 전해보세요</p>
      <div className="share-buttons">
        <button type="button" className="share-button primary" onClick={handleShare}>
          카카오톡으로 청첩장 전하기
        </button>
        <button
          type="button"
          className={`share-button ${copied ? 'copied' : ''}`}
          onClick={copyUrl}
        >
          {copied ? '주소가 복사되었습니다' : '청첩장 주소 복사하기'}
        </button>
      </div>
    </section>
  );
}
