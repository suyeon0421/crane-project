import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("로그인 중...");

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      const receivedToken = data.token || data.accessToken;
      if (!receivedToken) {
        throw new Error("로그인 토큰을 찾을 수 없습니다.");
      }

      setToken(receivedToken);
      setMessage("로그인 성공!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    if (!token) return;

    async function loadInquiries() {
      try {
        const response = await fetch(`${API_URL}/api/admin/inquiries`, {
            headers: { Authorization: `Bearer ${token}` },
            });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "문의 목록을 불러오지 못했습니다.");
        }

        setInquiries(Array.isArray(data) ? data : data.inquiries || []);
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadInquiries();
  }, [token]);

  async function handleAnswer(id) {
    const answer = answers[id]?.trim();

    if (!answer) {
      setMessage("답변 내용을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/inquiries/${id}/answer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "답변 등록에 실패했습니다.");
      }

      setInquiries((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, answer } : item
        )
      );

      setAnswers((previous) => ({ ...previous, [id]: "" }));
      setMessage("답변이 등록되었습니다!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="container" style={{ padding: "60px 0 80px" }}>
      <h1>관리자 페이지</h1>

      {!token ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-password">관리자 비밀번호</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
      ) : (
        <section>
          <h2>문의 목록</h2>

          {inquiries.length === 0 ? (
            <p>등록된 문의가 없습니다.</p>
          ) : (
            inquiries.map((inquiry) => (
              <article
                key={inquiry.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <h3>{inquiry.title || inquiry.subject || "문의"}</h3>
                <p>작성자: {inquiry.name || inquiry.writer || "미표시"}</p>
                <p>연락처: {inquiry.phone || "전화번호 없음"}</p>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {inquiry.content || inquiry.message || ""}
                </p>

                <label htmlFor={`answer-${inquiry.id}`}>답변 작성</label>
                <textarea
                  id={`answer-${inquiry.id}`}
                  value={answers[inquiry.id] ?? inquiry.answer ?? ""}
                  onChange={(e) =>
                    setAnswers((previous) => ({
                      ...previous,
                      [inquiry.id]: e.target.value,
                    }))
                  }
                  rows={4}
                  style={{ display: "block", width: "100%", margin: "8px 0" }}
                />
                <button onClick={() => handleAnswer(inquiry.id)}>
                  답변 등록
                </button>
              </article>
            ))
          )}
        </section>
      )}

      <p role="status">{message}</p>
    </main>
  );
}