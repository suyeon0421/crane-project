export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">
          YONGIN · GYEONGGI
        </p>

        <h1>
          현장을 움직이는 힘,
          <br />
          믿을 수 있는 크레인 파트너.
        </h1>

        <p className="hero__description">
          용인 및 경기 지역 크레인 작업 상담
          <br />
          현장 상황에 맞는 장비와 작업을 안내합니다.
        </p>

        <div className="hero__actions">
          <a href="#contact" className="button button--primary">
            작업 문의하기 →
          </a>

          <a href="#works" className="button button--outline">
            작업 실적 보기
          </a>

          <a href="/inquiries" className="button button--outline">
            문의 게시판
          </a>
        </div>

        <div className="hero__image">
          <img
            src="/images/crane-main.jpg"
            alt="크레인 작업 장비"
          />
        </div>
      </div>
    </section>
  );
}