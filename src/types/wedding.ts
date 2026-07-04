export interface WeddingInfo {
  mainImage?: string;
  groom: PersonInfo;
  bride: PersonInfo;
  date: string;
  time: string;
  venue: VenueInfo;
  gallery: string[];
  accounts: AccountInfo[];
  notice?: NoticeInfo;
  music?: MusicInfo;
}

export interface PersonInfo {
  name: string;
  father: string;
  mother: string;
}

export interface VenueInfo {
  name: string;
  hall: string;
  address: string;
  mapUrl?: string;
  mapImage?: string;
  lat?: number;
  lng?: number;
  transport?: {
    subway?: string;
    bus?: string;
    car?: string;
  };
}

export interface AccountInfo {
  bank: string;
  accountNumber: string;
  holder: string;
  relation: string;
  kakaopayUrl?: string; // 카카오페이 송금 링크 (있을 때만 버튼 표시)
}

export interface NoticeInfo {
  enabled: boolean;
  title: string;
  message: string;
  image?: string;
}

export interface MusicInfo {
  enabled: boolean;
  src: string;
  title?: string;
}
