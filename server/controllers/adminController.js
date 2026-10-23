
const jwt = require("jsonwebtoken");
const inquiryService = require("../services/inquiryService");

// 관리자 로그인
function login(req, res) {
  const { password } = req.body;

  if (
    typeof password !== "string" ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.JWT_SECRET
  ) {
    return res.status(400).json({
      message: "로그인 정보를 확인해 주세요.",
    });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "비밀번호가 올바르지 않습니다.",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "2h",
      issuer: "crane-homepage",
      audience: "crane-admin",
    }
  );

  return res.status(200).json({
    message: "관리자 로그인 성공",
    token,
  });
}

// 관리자 문의 목록
async function getInquiries(req, res, next) {
  try {
    const inquiries = await inquiryService.getAdminInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
}

// 관리자 문의 상세
async function getInquiryDetail(req, res, next) {
  try {
    const inquiry = await inquiryService.getAdminInquiryDetail(
      req.params.id
    );

    res.status(200).json(inquiry);
  } catch (error) {
    next(error);
  }
}

// 관리자 답변 등록
async function answerInquiry(req, res, next) {
  try {
    const result = await inquiryService.answerInquiry(
      req.params.id,
      req.body.answer
    );

    res.status(200).json({
      message: "답변이 등록되었습니다.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  getInquiries,
  getInquiryDetail,
  answerInquiry,
};
