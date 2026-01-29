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
  phone: string;
}

export interface VenueInfo {
  name: string;
  hall: string;
  address: string;
  mapUrl?: string;
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
