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
    lat: 37.5683,
    lng: 126.8974,
    transport: {
      subway: '6호선 월드컵경기장역 1번 출구 도보 5분',
      bus: '간선 271, 571 / 지선 7011, 7013A\n월드컵경기장 정류장 하차',
      car: '내비게이션 "월드컵 컨벤션" 검색\n주차장 2시간 무료',
    },
  },
  gallery: [
    '/wedding/images/gallery/mm_01.jpg',
    '/wedding/images/gallery/mm_02.jpg',
    '/wedding/images/gallery/mm_03.jpg',
    '/wedding/images/gallery/mm_04.jpg',
    '/wedding/images/gallery/mm_05.jpg',
    '/wedding/images/gallery/mm_06.jpg',
    '/wedding/images/gallery/mm_07.jpg',
    '/wedding/images/gallery/mm_08.jpg',
    '/wedding/images/gallery/mm_09.jpg',
    '/wedding/images/gallery/mm_10.jpg',
    '/wedding/images/gallery/mm_11.jpg',
    '/wedding/images/gallery/mm_12.jpg',
    '/wedding/images/gallery/mm_13.jpg',
    '/wedding/images/gallery/mm_14.jpg',
    '/wedding/images/gallery/mm_15.jpg',
    '/wedding/images/gallery/mm_16.jpg',
    '/wedding/images/gallery/mm_17.jpg',
    '/wedding/images/gallery/mm_18.jpg',
    '/wedding/images/gallery/mm_19.jpg',
    '/wedding/images/gallery/mm_20.jpg',
    '/wedding/images/gallery/mm_21.jpg',
    '/wedding/images/gallery/mm_22.jpg',
    '/wedding/images/gallery/mm_23.jpg',
    '/wedding/images/gallery/mm_24.jpg',
    '/wedding/images/gallery/mm_25.jpg',
    '/wedding/images/gallery/mm_26.jpg',
    '/wedding/images/gallery/mm_27.jpg',
    '/wedding/images/gallery/mm_s.jpg',
  ],
  accounts: [
    {
      bank: '신한은행',
      accountNumber: '110-431-783910',
      holder: '오승환',
      relation: '신랑',
    },
    {
      bank: '국민은행',
      accountNumber: '123-45-6789012',
      holder: '오덕석',
      relation: '신랑 아버지',
    },
    {
      bank: '우리은행',
      accountNumber: '1002-123-456789',
      holder: '양정숙',
      relation: '신랑 어머니',
    },
    {
      bank: '국민은행',
      accountNumber: '224-601-04-050442',
      holder: '송병연',
      relation: '신부',
    },
    {
      bank: '농협은행',
      accountNumber: '123-4567-8901-23',
      holder: '송창윤',
      relation: '신부 아버지',
    },
    {
      bank: '카카오뱅크',
      accountNumber: '3333-12-3456789',
      holder: '박찬선',
      relation: '신부 어머니',
    },
  ],
  notice: {
    enabled: true,
    title: '안내 말씀',
    message: '결혼식 당일 축구 경기가 예정되어 있어\n예식장 주변 교통이 혼잡할 수 있습니다.\n여유있게 출발해 주시기 바랍니다.',
    image: '', // 약도 이미지 경로 (예: '/images/map.jpg')
  },
  music: {
    enabled: false, // TODO: public/music/bgm.mp3 파일 추가 후 true 로 변경
    src: '/wedding/music/bgm.mp3', // 음악 파일 경로
    title: '배경음악',
  },
};
