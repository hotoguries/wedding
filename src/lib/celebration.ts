import { DB_URL } from './firebase';

// 축하 폭죽 카운트 공유 스토어.
// 버튼이 여러 개(캘린더 인라인 + 플로팅)여도 카운트·폴링을 하나로 공유한다.
const COUNT_URL = `${DB_URL}/celebrations/count.json`;
const LOCAL_KEY = 'celebration-count';
const POLL_MS = 5000;

let count = 0;
const listeners = new Set<(n: number) => void>();
let pollId: number | null = null;

function emit() {
  listeners.forEach((l) => l(count));
}

async function fetchCount() {
  try {
    const res = await fetch(COUNT_URL);
    if (res.ok) {
      const val = await res.json();
      if (typeof val === 'number') {
        if (val > count) {
          count = val;
          emit();
        }
        return;
      }
    }
  } catch {
    /* 서버 접근 불가 → 로컬 값으로 폴백 */
  }
  const local = Number(localStorage.getItem(LOCAL_KEY) || '0');
  if (local > count) {
    count = local;
    emit();
  }
}

/** 카운트 변경 구독. 첫 구독자가 생기면 폴링 시작, 마지막 구독자가 떠나면 중단. */
export function subscribeCelebration(listener: (n: number) => void): () => void {
  listeners.add(listener);
  listener(count);
  if (listeners.size === 1) {
    fetchCount();
    pollId = window.setInterval(fetchCount, POLL_MS);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && pollId !== null) {
      clearInterval(pollId);
      pollId = null;
    }
  };
}

/** 축하 +1. 낙관적으로 즉시 반영하고 서버에 원자적 증가를 기록한다. */
export async function celebrate() {
  count += 1;
  emit();
  try {
    const res = await fetch(COUNT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ '.sv': { increment: 1 } }),
    });
    if (!res.ok) throw new Error('write failed');
    fetchCount();
  } catch {
    const local = Number(localStorage.getItem(LOCAL_KEY) || '0') + 1;
    localStorage.setItem(LOCAL_KEY, String(local));
  }
}
