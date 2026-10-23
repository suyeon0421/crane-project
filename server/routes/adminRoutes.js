
const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middlewares/authMiddleware");

// 로그인 시도 제한
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.",
  },
});

// 관리자 로그인
router.post("/login", loginLimiter, adminController.login);

// 아래 API는 관리자 로그인 필요
router.get(
  "/inquiries",
  requireAdmin,
  adminController.getInquiries
);

router.get(
  "/inquiries/:id",
  requireAdmin,
  adminController.getInquiryDetail
);

router.patch(
  "/inquiries/:id/answer",
  requireAdmin,
  adminController.answerInquiry
);

module.exports = router;
