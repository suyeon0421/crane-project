
const express = require("express");
const router = express.Router();

const inquiryController = require("../controllers/inquiryController");

// 공개 문의 목록
router.get("/", inquiryController.getPublicInquiries);

// 문의 작성
router.post("/", inquiryController.createInquiry);

// 비밀번호 확인 후 문의 상세 조회
router.post("/:id/verify", inquiryController.getInquiryDetail);

module.exports = router;
