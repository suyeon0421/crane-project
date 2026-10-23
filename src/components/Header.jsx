
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand">
          <span className="header__name">NALA CRANE</span>
          <span className="header__caption">
            CRANE & LIFTING SERVICE
          </span>
        </Link>

        <nav className="header__nav">
          <a href="/#services">서비스</a>
          <a href="/#works">작업 실적</a>
          <a href="/#contact" className="header__contact">
            전화 문의
          </a>
        </nav>
      </div>
    </header>
  );
}
