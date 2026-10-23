
const services = [
  {
    number: "01",
    title: "크레인 작업",
    description: "현장 상황과 작업 조건에 맞는 장비 상담",
  },
  {
    number: "02",
    title: "건설 현장 작업",
    description: "건설 및 자재 운반 현장 작업 상담",
  },
  {
    number: "03",
    title: "장비 및 작업 상담",
    description: "필요한 장비와 작업 일정 확인",
  },
  {
    number: "04",
    title: "작업 지역 문의",
    description: "이천 안성 성남 광주 수원 오산 화성 평택 등 경기 남부 지역 작업 문의",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <p className="section-label">OUR SERVICES</p>

        <div className="services__heading">
          <h2>어떤 작업이 필요하신가요?</h2>
          <p>
            현장 조건에 맞춰 작업 내용과 장비를 상담해 드립니다.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-card__number">
                {service.number}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-card__arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
