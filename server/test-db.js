
const path = require("path");
const dotenv = require("dotenv");

// .env 파일을 명시적으로 불러오기
const envPath = path.join(__dirname, ".env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(".env 파일을 읽지 못했습니다:", result.error.message);
  process.exit(1);
}

console.log(".env 파일 경로:", envPath);
console.log("DB_USER 설정 여부:", Boolean(process.env.DB_USER));
console.log("DB_PASSWORD 설정 여부:", Boolean(process.env.DB_PASSWORD));
console.log("DB_NAME 설정 여부:", Boolean(process.env.DB_NAME));

const pool = require("./config/db");

async function testConnection() {
  try {
    const [rows] = await pool.query(
      "SELECT DATABASE() AS databaseName"
    );

    console.log("MySQL 연결 성공!");
    console.log("연결된 데이터베이스:", rows[0].databaseName);
  } catch (error) {
    console.error("MySQL 연결 실패:", error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
