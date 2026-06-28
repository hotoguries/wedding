import { useEffect, useState } from 'react';
import type { AccountInfo } from '../../types/wedding';
import './Account.css';

interface AccountProps {
  accounts: AccountInfo[];
}

// 실제 계좌번호는 git/소스에 남기지 않고 Firebase에서 런타임에 불러온다.
const DB = 'https://wedding-guestbook-6c9e3-default-rtdb.asia-southeast1.firebasedatabase.app';
const ACCOUNTS_URL = `${DB}/accounts.json`;

export default function Account({ accounts }: AccountProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [remote, setRemote] = useState<AccountInfo[] | null>(null);
  const [tab, setTab] = useState<'groom' | 'bride'>('groom');

  useEffect(() => {
    fetch(ACCOUNTS_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setRemote(data.filter(Boolean));
        else if (data && typeof data === 'object') setRemote(Object.values(data));
      })
      .catch(() => {
        /* 서버 접근 불가 시 fallback(accounts) 사용 */
      });
  }, []);

  // Firebase에 값이 있으면 그것을, 없으면 코드의 fallback(보통 빈 배열) 사용
  const list = remote && remote.length > 0 ? remote : accounts;

  const groomAccounts = list.filter((a) => a.relation.includes('신랑'));
  const brideAccounts = list.filter((a) => a.relation.includes('신부'));

  const handleCopy = async (account: AccountInfo, index: number) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const current = tab === 'groom' ? groomAccounts : brideAccounts;
  const offset = tab === 'groom' ? 0 : groomAccounts.length;

  return (
    <section className="section account">
      <p className="section-title">account</p>
      <p className="account-message">축하의 마음을 전해주세요</p>

      {list.length === 0 ? (
        <p className="account-pending">
          마음 전하실 곳은 예식이 가까워지면 안내해 드리겠습니다.
        </p>
      ) : (
        <>
          <div className="account-tabs">
            <button
              type="button"
              className={`account-tab ${tab === 'groom' ? 'active' : ''}`}
              onClick={() => setTab('groom')}
            >
              신랑측에게
            </button>
            <button
              type="button"
              className={`account-tab ${tab === 'bride' ? 'active' : ''}`}
              onClick={() => setTab('bride')}
            >
              신부측에게
            </button>
          </div>

          <div className="account-list">
            {current.length === 0 ? (
              <p className="account-pending">등록된 계좌가 없습니다.</p>
            ) : (
              current.map((account, i) => {
                const index = offset + i;
                return (
                  <div key={index} className="account-card">
                    <div className="account-card-top">
                      <div className="account-card-name">
                        <span className="account-card-relation">{account.relation}</span>
                        <span className="account-card-holder">{account.holder}</span>
                      </div>
                      <span className="account-card-number">
                        {account.bank} {account.accountNumber}
                      </span>
                    </div>
                    <button
                      className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                      onClick={() => handleCopy(account, index)}
                    >
                      <span>{copiedIndex === index ? '복사되었습니다' : '계좌번호 복사하기'}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </section>
  );
}
