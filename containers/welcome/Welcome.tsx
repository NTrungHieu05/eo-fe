import { ROUTES } from '@constants';
import Link from 'next/link';
import { WelcomePageWrapper } from './Welcome.style';

const Welcome = () => {
  return (
    <WelcomePageWrapper>
      <div className="welcome-shell">
        <div className="brand">
          <span className="brand-mark">EO</span>
          Exam Online
        </div>
        <h1>Luyện TOEIC Listening & Reading</h1>
        <p>
          Đề 7 phần, 200 câu, 120 phút. Luyện từng Part hoặc thi thử full, nhận điểm quy đổi 10–990.
        </p>
        <div className="actions">
          <Link href={ROUTES.SIGNIN}>
            <a className="btn primary">Đăng nhập</a>
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <a className="btn ghost">Tạo tài khoản</a>
          </Link>
        </div>
      </div>
    </WelcomePageWrapper>
  );
};

export default Welcome;
