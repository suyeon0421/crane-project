
export default function Contact() {
  const phoneNumber = "01037889221";

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <p className="section-label">CONTACT US</p>

        <h2>
          크레인 작업이 필요하신가요?
          <br />
          지금 상담해 보세요.
        </h2>

        <p className="contact__description">
          현장 위치와 작업 내용을 알려주시면
          <br />
          작업 가능 여부와 일정을 상담해 드립니다.
        </p>

        <a
          className="button button--primary contact__button"
          href={`tel:${phoneNumber}`}
        >
          <span>전화 상담하기</span>
          <span aria-hidden="true">→</span>
        </a>

        <p className="contact__note">
          용인 · 경기 지역 크레인 작업 상담
        </p>
      </div>
    </section>
  );
}
