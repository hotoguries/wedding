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
  // 기본으로 펼쳐진 상태 (버튼으로 접을 수도 있음)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '신랑측 (계좌번호)': true,
    '신부측 (계좌번호)': true,
  });
  const [remote, setRemote] = useState<AccountInfo[] | null>(null);

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

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCopy = async (account: AccountInfo, index: number) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const renderAccounts = (title: string, accounts: AccountInfo[], startIndex: number) => {
    if (accounts.length === 0) return null;
    const isOpen = !!openGroups[title];
    return (
      <div className="account-group">
        <button
          type="button"
          className={`account-group-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => toggleGroup(title)}
          aria-expanded={isOpen}
        >
          <span className="account-group-title">{title}</span>
          <span className="account-group-arrow" aria-hidden="true">▾</span>
        </button>
        {isOpen && (
          <div className="account-group-body">
            {accounts.map((account, i) => {
              const index = startIndex + i;
              return (
                <div key={index} className="account-item">
                  <div className="account-info">
                    <p className="account-relation">{account.relation}</p>
                    <p className="account-holder">{account.holder}</p>
                    <p className="account-number">
                      {account.bank} {account.accountNumber}
                    </p>
                  </div>
                  <button
                    className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                    onClick={() => handleCopy(account, index)}
                  >
                    {copiedIndex === index ? '복사됨' : '복사'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

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
          {renderAccounts('신랑측 (계좌번호)', groomAccounts, 0)}
          {renderAccounts('신부측 (계좌번호)', brideAccounts, groomAccounts.length)}
        </>
      )}
    </section>
  );
}
