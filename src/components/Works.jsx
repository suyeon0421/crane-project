
const works = [
  {
    number: "WORK 01",
    title: "건설 현장 작업",
    description: "현장 및 작업 조건에 맞춘 장비 운용",
    image: "/images/crane-serve1.jpg",
  },
  {
    number: "WORK 02",
    title: "크레인 장비 작업",
    description: "작업 환경에 맞춘 현장 상담",
    image: "/images/crane-serve2.jpg",
  },
    {
    number: "WORK 03",
    title: "건설 현장 작업",
    description: "현장 및 작업 조건에 맞춘 장비 운용",
    image: "/images/crane-serve3.jpg",
  },
  {
    number: "WORK 04",
    title: "크레인 장비 작업",
    description: "작업 환경에 맞춘 현장 상담",
    image: "/images/crane-serve4.jpg",
  },
];

export default function Works() {
  return (
    <section className="works" id="works">
      <div className="container">
        <p className="section-label">OUR WORK</p>

        <div className="works__heading">
          <h2>현장에서 쌓아 온 경험</h2>
          <p>실제 작업 사진과 사례를 소개합니다.</p>
        </div>

        <div className="works__grid">
          {works.map((work) => (
            <article className="work-card" key={work.number}>
              <div className="work-card__image">
                <img src={work.image} alt={work.title} />
              </div>

              <div className="work-card__content">
                <span>{work.number}</span>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
