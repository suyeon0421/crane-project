
const inquiryService = require("../services/inquiryService");

// 공개 문의 목록 조회
async function getPublicInquiries(req, res, next) {
  try {
    const inquiries = await inquiryService.getPublicInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
}

// 문의 작성
async function createInquiry(req, res, next) {
  try {
    const { title, authorName, phone, password, body } = req.body;

    const inquiry = await inquiryService.createInquiry({
      title,
      phone,
      authorName,
      password,
      body,
    });

    res.status(201).json({
      message: "문의가 등록되었습니다.",
      id: inquiry.id,
    });
  } catch (error) {
    next(error);
  }
}

// 비밀번호 확인 후 문의 상세 조회
async function getInquiryDetail(req, res, next) {
  try {
    const { password } = req.body;

    const inquiry = await inquiryService.getInquiryDetail(
      req.params.id,
      password
    );

    res.status(200).json(inquiry);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPublicInquiries,
  createInquiry,
  getInquiryDetail,
};
