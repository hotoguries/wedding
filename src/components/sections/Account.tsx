import { useState } from 'react';
import type { AccountInfo } from '../../types/wedding';
import './Account.css';

interface AccountProps {
  accounts: AccountInfo[];
}

export default function Account({ accounts }: AccountProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const groomAccounts = accounts.filter((a) => a.relation.includes('신랑'));
  const brideAccounts = accounts.filter((a) => a.relation.includes('신부'));

  const handleCopy = async (account: AccountInfo, index: number) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const renderAccounts = (title: string, accounts: AccountInfo[], startIndex: number) => (
    <div className="account-group">
      <h4 className="account-group-title">{title}</h4>
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
  );

  return (
    <section className="section account">
      <p className="section-title">account</p>
      <p className="account-message">축하의 마음을 전해주세요</p>
      {renderAccounts('신랑측', groomAccounts, 0)}
      {renderAccounts('신부측', brideAccounts, groomAccounts.length)}
    </section>
  );
}
