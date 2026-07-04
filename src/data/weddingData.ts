import type { WeddingInfo } from '../types/wedding';

export const weddingData: WeddingInfo = {
  mainImage: '/wedding/images/main.jpg', // 메인 이미지 경로
  groom: {
    name: '오승환',
    father: '오덕석',
    mother: '양정숙',
  },
  bride: {
    name: '송병연',
    father: '故 송창윤',
    mother: '박찬선',
  },
  date: '2026-10-17',
  time: '오후 4시 20분',
  venue: {
    name: '월드컵 컨벤션',
    hall: '임페리얼 볼룸홀',
    address: '서울특별시 마포구 월드컵로 240 월드컵경기장 서측 2층',
    mapImage: '/wedding/images/map.jpg', // 네이버 지도 스크린샷
    lat: 37.5683,
    lng: 126.8974,
    transport: {
      subway: '6호선 월드컵경기장역 1번 출구 도보 5분',
      bus: '간선 271, 571 / 지선 7011, 7013A\n월드컵경기장 정류장 하차',
      car: '내비게이션 "월드컵 컨벤션" 검색\n주차장 2시간 무료',
    },
  },
  gallery: [
    '/wedding/images/gallery/g01.jpg',
    '/wedding/images/gallery/g02.jpg',
    '/wedding/images/gallery/g03.jpg',
    '/wedding/images/gallery/g04.jpg',
    '/wedding/images/gallery/g05.jpg',
    '/wedding/images/gallery/g06.jpg',
    '/wedding/images/gallery/g07.jpg',
    '/wedding/images/gallery/g08.jpg',
    '/wedding/images/gallery/g09.jpg',
    '/wedding/images/gallery/g10.jpg',
    '/wedding/images/gallery/g11.jpg',
    '/wedding/images/gallery/g12.jpg',
    '/wedding/images/gallery/g13.jpg',
    '/wedding/images/gallery/g14.jpg',
    '/wedding/images/gallery/g15.jpg',
    '/wedding/images/gallery/g16.jpg',
    '/wedding/images/gallery/g17.jpg',
    '/wedding/images/gallery/g18.jpg',
    '/wedding/images/gallery/g19.jpg',
    '/wedding/images/gallery/g20.jpg',
    '/wedding/images/gallery/g21.jpg',
    '/wedding/images/gallery/g22.jpg',
    '/wedding/images/gallery/g23.jpg',
    '/wedding/images/gallery/g24.jpg',
    '/wedding/images/gallery/g25.jpg',
    '/wedding/images/gallery/g26.jpg',
    '/wedding/images/gallery/g27.jpg',
    '/wedding/images/gallery/g28.jpg',
    '/wedding/images/gallery/g29.jpg',
    '/wedding/images/gallery/g30.jpg',
  ],
  // 실제 계좌번호는 git 히스토리에 남기지 않기 위해 비워둔다.
  // Firebase Realtime DB의 /accounts 경로에 입력하면 런타임에 표시되고,
  // 예식 후 콘솔에서 삭제하면 사이트에서도 사라진다. (Account.tsx 참고)
  // 각 항목에 kakaopayUrl을 넣으면 '카카오페이로 송금하기' 버튼이 함께 표시된다.
  accounts: [],
  // 기본은 꺼짐. 띄우고 싶을 때만 Firebase /notice 에 { "enabled": true, "title": "...", "message": "..." } 입력.
  notice: {
    enabled: false,
    title: '안내 말씀',
    message: '',
    image: '',
  },
  music: {
    enabled: true,
    src: '/wedding/music/bgm.mp3', // 음악 파일 경로
    title: '배경음악',
  },
};
