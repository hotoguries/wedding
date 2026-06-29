import { useEffect, useState } from 'react';
import './Share.css';

const SITE_URL = 'https://hotoguries.github.io/wedding/';
const LOCATION_URL = 'https://hotoguries.github.io/wedding/#location';
const OG_IMAGE = 'https://hotoguries.github.io/wedding/images/og.jpg';
const SHARE_TITLE = '승환♥병연 결혼식에 초대합니다';
const SHARE_TEXT = '소중한 분들을 결혼식에 초대합니다.';
const CARD_DESC = '2026-10-17 토요일\n오후 16시 10분';
const KAKAO_KEY = 'd4cefe88b4bd9ac7fdbd6b656cf5428b'; // 카카오 JavaScript 키 (도메인 제한됨)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKakao = (): any => (window as { Kakao?: any }).Kakao;

export default function Share() {
  const [copied, setCopied] = useState(false);

  // 카카오 SDK 초기화 (1회)
  useEffect(() => {
    const kakao = getKakao();
    if (kakao && !kakao.isInitialized()) {
      kakao.init(KAKAO_KEY);
    }
  }, []);

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

  // 기기 공유 시트 / 주소 복사 폴백
  const webShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SITE_URL });
      } catch {
        /* 사용자가 공유를 취소했거나 실패 → 무시 */
      }
    } else {
      const ok = await copyUrl();
      if (ok) alert('이 브라우저는 공유 기능을 지원하지 않아 청첩장 주소를 복사했어요.');
    }
  };

  const handleKakaoShare = () => {
    const kakao = getKakao();
    if (!kakao || !kakao.Share) {
      // SDK 로드 실패 시 기존 공유 시트로 폴백
      webShare();
      return;
    }
    if (!kakao.isInitialized()) kakao.init(KAKAO_KEY);

    const link = { mobileWebUrl: SITE_URL, webUrl: SITE_URL };
    const locationLink = { mobileWebUrl: LOCATION_URL, webUrl: LOCATION_URL };
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: SHARE_TITLE,
        description: CARD_DESC,
        imageUrl: OG_IMAGE,
        link,
      },
      buttons: [
        { title: '자세히 보기', link },
        { title: '위치 보기', link: locationLink },
      ],
    });
  };

  return (
    <section className="section share">
      <p className="section-title">share</p>
      <p className="share-message">소중한 분들에게 청첩장을 전해보세요</p>
      <div className="share-buttons">
        <button type="button" className="share-button primary" onClick={handleKakaoShare}>
          <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.66 6.74-.2.73-.74 2.66-.85 3.07-.13.51.19.5.4.37.16-.11 2.62-1.78 3.7-2.5.69.1 1.39.15 2.09.15 5.52 0 10-3.58 10-8S17.52 3 12 3z" />
          </svg>
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
