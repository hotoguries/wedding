import type { WeddingInfo } from '../types/wedding';

export const weddingData: WeddingInfo = {
  mainImage: '/wedding/images/main.jpg', // 메인 이미지 경로
  groom: {
    name: '오승환',
    father: '오덕석',
    mother: '양정숙',
    phone: '010-1234-5678',
  },
  bride: {
    name: '송병연',
    father: '故 송창윤',
    mother: '박찬선',
    phone: '010-8765-4321',
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
  // 예식 1주일 전 Firebase Realtime DB의 /accounts 경로에 입력하면 런타임에 표시되고,
  // 예식 후 콘솔에서 삭제하면 사이트에서도 사라진다. (Account.tsx 참고)
  accounts: [],
  notice: {
    enabled: true,
    title: '안내 말씀',
    message: '결혼식 당일 축구 경기가 예정되어 있어\n예식장 주변 교통이 혼잡할 수 있습니다.\n여유있게 출발해 주시기 바랍니다.',
    image: '', // 약도 이미지 경로 (예: '/images/map.jpg')
  },
  music: {
    enabled: true,
    src: '/wedding/music/bgm.mp3', // 음악 파일 경로
    title: '배경음악',
  },
};
