
const express = require("express");
const helmet = require("helmet");

const inquiryRoutes = require("./routes/inquiryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "20kb" }));

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "요청한 API를 찾을 수 없습니다.",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
});

module.exports = app;
