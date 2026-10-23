
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">NALA CRANE</p>
          <p className="footer__caption">
            CRANE & LIFTING SERVICE
          </p>
        </div>

        <div className="footer__info">
          <p>나라크레인 | 경기도 용인시 처인구 백옥대로 1044</p>
          <p>대표 | 김영국 TEL : 010-3788-9221 </p>
        </div>

        <p className="footer__copyright">
          © {new Date().getFullYear()} NALA CRANE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
