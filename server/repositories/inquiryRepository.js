
const pool = require("../config/db");

// 전체 문의 목록 조회 (공개용)
async function findAllPublic() {
  const [rows] = await pool.execute(`
    SELECT
      id,
      title,
      created_at AS createdAt,
      CASE
        WHEN answer IS NOT NULL AND answer != '' THEN 1
        ELSE 0
      END AS answered
    FROM inquiries
    ORDER BY id DESC
    LIMIT 100
  `);

  return rows;
}

// 문의 상세 조회 (비밀번호 검증을 위해 해시도 조회)
async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT
       id,
       title,
       author_name AS authorName,
       phone,
       password_hash AS passwordHash,
       body,
       answer,
       created_at AS createdAt,
       answered_at AS answeredAt
     FROM inquiries
     WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
}

// 문의 작성
async function create({ title, authorName, phone, passwordHash, body }) {
  const [result] = await pool.execute(
    `INSERT INTO inquiries
       (title, author_name, phone, password_hash, body)
     VALUES (?, ?, ?, ?, ?)`,
    [title, authorName, phone, passwordHash, body]
  );

  return result.insertId;
}

// 관리자용 전체 문의 목록
async function findAllForAdmin() {
  const [rows] = await pool.execute(`
    SELECT
      id,
      title,
      author_name AS authorName,
      phone,
      created_at AS createdAt,
      CASE
        WHEN answer IS NOT NULL AND answer != '' THEN 1
        ELSE 0
      END AS answered
    FROM inquiries
    ORDER BY id DESC
    LIMIT 200
  `);

  return rows;
}

// 관리자 답변 저장
async function saveAnswer(id, answer) {
  const [result] = await pool.execute(
    `UPDATE inquiries
     SET answer = ?, answered_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [answer, id]
  );

  return result.affectedRows;
}

module.exports = {
  findAllPublic,
  findById,
  create,
  findAllForAdmin,
  saveAnswer,
};
