import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    authorName: "",
    phone: "",
    password: "",
    body: "",
  });

  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [viewPassword, setViewPassword] = useState("");
  const [detailError, setDetailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadInquiries() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquiries");
      if (!response.ok) throw new Error("문의 목록을 불러오지 못했습니다.");

      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      setError(err.message || "서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password.length < 4) {
      setError("비밀번호는 4자 이상 입력해 주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const responseText = await response.text();

    let data = {};

    if (responseText) {
    try {
        data = JSON.parse(responseText);
    } catch {
        throw new Error(
        `서버가 JSON이 아닌 응답을 보냈습니다. (HTTP ${response.status})`
        );
    }
    }

    if (!response.ok) {
    throw new Error(
        data.message || `문의 등록에 실패했습니다. (HTTP ${response.status})`
    );
    }

    if (!data.id) {
    throw new Error("서버 응답에 문의 번호가 없습니다. 백엔드 응답을 확인해 주세요.");
    }

      alert(`문의가 등록되었습니다. 문의 번호: ${data.id}`);

      setForm({
        title: "",
        authorName: "",
        phone: "",
        password: "",
        body: "",
        });
      setShowForm(false);
      setSelectedId(null);
      setDetail(null);
      await loadInquiries();
    } catch (err) {
      setError(err.message || "문의 등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleViewInquiry(event) {
    event.preventDefault();
    setDetailError("");
    setDetail(null);

    try {
        const response = await fetch(
        `${API_URL}/api/inquiries/${selectedId}/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: viewPassword }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "비밀번호를 확인해 주세요.");
      }

      setDetail(data);
    } catch (err) {
      setDetailError(err.message || "문의를 불러오지 못했습니다.");
    }
  }

  function openInquiry(inquiry) {
    setSelectedId(inquiry.id);
    setViewPassword("");
    setDetail(null);
    setDetailError("");
    setShowForm(false);
  }

  function closeDetail() {
    setSelectedId(null);
    setDetail(null);
    setDetailError("");
    setViewPassword("");
  }

  return (
    <main className="inquiries">
      <div className="container">
        <section className="inquiries__heading">
          <p className="inquiries__label">NALA CRANE · CUSTOMER CENTER</p>
          <h1>문의 게시판</h1>
          <p>
            크레인 장비 및 작업 관련 문의를 남겨 주세요.
            <br />
            확인 후 답변드리겠습니다.
          </p>
        </section>

        <section className="inquiries__panel">
          <div className="inquiries__top">
            <div>
              <h2>문의 내역</h2>
              <p className="inquiries__muted">
                등록한 문의의 답변 상태를 확인할 수 있습니다.
              </p>
            </div>

            <button
              type="button"
              className="inquiries__write-button"
              onClick={() => {
                setShowForm((previous) => !previous);
                closeDetail();
                setError("");
              }}
            >
              {showForm ? "작성 취소" : "+ 문의 작성하기"}
            </button>
          </div>

          {loading && (
            <p className="inquiries__empty">문의 목록을 불러오는 중입니다...</p>
          )}

          {error && <p className="inquiries__error">{error}</p>}

          {!loading && !error && inquiries.length === 0 && (
            <p className="inquiries__empty">
              아직 등록된 문의가 없습니다.
              <br />
              궁금한 점이 있다면 문의를 남겨 주세요.
            </p>
          )}

          {!loading && inquiries.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table className="inquiries__table">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>등록일</th>
                    <th>답변 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>
                        <button
                          type="button"
                          className="inquiries__title-button"
                          onClick={() => openInquiry(inquiry)}
                        >
                          🔒 {inquiry.title}
                        </button>
                      </td>
                      <td>
                        {inquiry.createdAt
                          ? new Date(inquiry.createdAt).toLocaleDateString("ko-KR")
                          : "-"}
                      </td>
                      <td>
                        <span
                          className={`inquiries__status ${
                            Number(inquiry.answered)
                              ? "inquiries__status--answered"
                              : ""
                          }`}
                        >
                          {Number(inquiry.answered) ? "답변 완료" : "답변 대기"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {showForm && (
          <section className="inquiries__panel" style={{ marginTop: 24 }}>
            <div className="inquiries__top">
              <div>
                <h2>문의 작성</h2>
                <p className="inquiries__muted">
                  임시 비밀번호는 문의 내용을 확인할 때 필요합니다.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="inquiries__form">
              <div className="inquiries__field">
                <label htmlFor="title">문의 제목</label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={200}
                  required
                  placeholder="문의 제목을 입력해 주세요."
                />
              </div>

              <div className="inquiries__field">
                <label htmlFor="authorName">작성자 또는 업체명</label>
                <input
                  id="authorName"
                  name="authorName"
                  value={form.authorName}
                  onChange={handleChange}
                  maxLength={50}
                  required
                  placeholder="성함 또는 업체명을 입력해 주세요."
                />
              </div>

              <div className="inquiries__field">
                <label htmlFor="phone">연락처</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={20}
                    autoComplete="tel"
                    required
                    placeholder="연락 가능한 전화번호를 입력해 주세요."
                />
                </div>

              <div className="inquiries__field">
                <label htmlFor="password">임시 비밀번호</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={4}
                  maxLength={72}
                  required
                  autoComplete="new-password"
                  placeholder="4자 이상 입력해 주세요."
                />
              </div>

              <div className="inquiries__field">
                <label htmlFor="body">문의 내용</label>
                <textarea
                  id="body"
                  name="body"
                  value={form.body}
                  onChange={handleChange}
                  maxLength={10000}
                  rows={6}
                  required
                  placeholder="문의하실 내용을 자세히 입력해 주세요."
                />
              </div>

              {error && <p className="inquiries__error">{error}</p>}

              <div className="inquiries__actions">
                <button
                  type="button"
                  className="inquiries__button"
                  onClick={() => setShowForm(false)}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="inquiries__button inquiries__button--primary"
                  disabled={submitting}
                >
                  {submitting ? "등록 중..." : "문의 등록하기"}
                </button>
              </div>
            </form>
          </section>
        )}

        {selectedId !== null && (
          <section className="inquiries__panel" style={{ marginTop: 24 }}>
            <div className="inquiries__top">
              <div>
                <h2>문의 내용 확인</h2>
                <p className="inquiries__muted">
                  문의 작성 시 입력한 임시 비밀번호를 입력해 주세요.
                </p>
              </div>
              <button
                type="button"
                className="inquiries__button"
                onClick={closeDetail}
              >
                닫기
              </button>
            </div>

            {!detail && (
              <form onSubmit={handleViewInquiry} className="inquiries__form">
                <div className="inquiries__field">
                  <label htmlFor="viewPassword">임시 비밀번호</label>
                  <input
                    id="viewPassword"
                    type="password"
                    value={viewPassword}
                    onChange={(event) => setViewPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="문의 등록 때 사용한 비밀번호"
                  />
                </div>

                {detailError && (
                  <p className="inquiries__error">{detailError}</p>
                )}

                <div className="inquiries__actions">
                  <button
                    type="submit"
                    className="inquiries__button inquiries__button--primary"
                  >
                    문의 확인하기
                  </button>
                </div>
              </form>
            )}

            {detail && (
              <article className="inquiries__detail">
                <h3>{detail.title}</h3>
                <p className="inquiries__muted">
                  작성자: {detail.authorName} ·{" "}
                  {detail.createdAt
                    ? new Date(detail.createdAt).toLocaleDateString("ko-KR")
                    : ""}
                </p>

                <div className="inquiries__detail-body">{detail.body}</div>

                <div className="inquiries__answer">
                  <h3>관리자 답변</h3>
                  {detail.answer ? (
                    <>
                      <p>{detail.answer}</p>
                      {detail.answeredAt && (
                        <small>
                          답변일:{" "}
                          {new Date(detail.answeredAt).toLocaleDateString("ko-KR")}
                        </small>
                      )}
                    </>
                  ) : (
                    <p>아직 답변이 등록되지 않았습니다.</p>
                  )}
                </div>
              </article>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
