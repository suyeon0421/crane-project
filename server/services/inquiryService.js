
const bcrypt = require("bcryptjs");
const inquiryRepository = require("../repositories/inquiryRepository");

// 공개 문의 목록 조회
async function getPublicInquiries() {
  return inquiryRepository.findAllPublic();
}

// 문의 작성
async function createInquiry({ title, authorName, phone, password, body }) {
  if (
    typeof title !== "string" ||
    typeof authorName !== "string" ||
    typeof phone !== "string" ||
    typeof password !== "string" ||
    typeof body !== "string"
  ) {
    throw new Error("모든 항목을 올바르게 입력해 주세요.");
  }

  const cleanTitle = title.trim();
  const cleanPhone = phone.trim();
  const cleanAuthorName = authorName.trim();
  const cleanBody = body.trim();

  if (!cleanTitle || !cleanAuthorName || !password.trim() || !cleanBody) {
    throw new Error("모든 항목을 입력해 주세요.");
  }

  if (cleanTitle.length > 200) {
    throw new Error("제목은 200자 이하로 입력해 주세요.");
  }

  if (cleanAuthorName.length > 50) {
    throw new Error("작성자 이름은 50자 이하로 입력해 주세요.");
  }

  if (cleanPhone.length > 20) {
    throw new Error("전화번호는 20자 이하로 입력해 주세요.");
    }

  if (password.length < 4 || password.length > 72) {
    throw new Error("비밀번호는 4~72자로 입력해 주세요.");
  }

  if (cleanBody.length > 10000) {
    throw new Error("문의 내용은 10,000자 이하로 입력해 주세요.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const id = await inquiryRepository.create({
    title: cleanTitle,
    authorName: cleanAuthorName,
    phone: cleanPhone,
    passwordHash,
    body: cleanBody,
  });

  return { id };
}

// 비밀번호 확인 후 문의 상세 조회
async function getInquiryDetail(id, password) {
  const inquiryId = Number(id);

  if (!Number.isSafeInteger(inquiryId) || inquiryId < 1) {
    throw new Error("올바르지 않은 문의 번호입니다.");
  }

  if (typeof password !== "string" || !password) {
    throw new Error("비밀번호를 입력해 주세요.");
  }

  const inquiry = await inquiryRepository.findById(inquiryId);

  if (!inquiry) {
    throw new Error("문의가 존재하지 않거나 비밀번호가 올바르지 않습니다.");
  }

  const isMatch = await bcrypt.compare(password, inquiry.passwordHash);

  if (!isMatch) {
    throw new Error("문의가 존재하지 않거나 비밀번호가 올바르지 않습니다.");
  }

  // 비밀번호 해시는 클라이언트에 반환하지 않음
  const { passwordHash, ...safeInquiry } = inquiry;

  return safeInquiry;
}

// 관리자용 문의 목록
async function getAdminInquiries() {
  return inquiryRepository.findAllForAdmin();
}

// 관리자용 문의 상세
async function getAdminInquiryDetail(id) {
  const inquiryId = Number(id);

  if (!Number.isSafeInteger(inquiryId) || inquiryId < 1) {
    throw new Error("올바르지 않은 문의 번호입니다.");
  }

  const inquiry = await inquiryRepository.findById(inquiryId);

  if (!inquiry) {
    throw new Error("문의를 찾을 수 없습니다.");
  }

  const { passwordHash, ...safeInquiry } = inquiry;

  return safeInquiry;
}

// 관리자 답변 작성
async function answerInquiry(id, answer) {
  const inquiryId = Number(id);

  if (!Number.isSafeInteger(inquiryId) || inquiryId < 1) {
    throw new Error("올바르지 않은 문의 번호입니다.");
  }

  if (typeof answer !== "string" || !answer.trim()) {
    throw new Error("답변 내용을 입력해 주세요.");
  }

  if (answer.trim().length > 10000) {
    throw new Error("답변은 10,000자 이하로 입력해 주세요.");
  }

  const inquiry = await inquiryRepository.findById(inquiryId);

  if (!inquiry) {
    throw new Error("문의를 찾을 수 없습니다.");
  }

  await inquiryRepository.saveAnswer(inquiryId, answer.trim());

  return { id: inquiryId, answer: answer.trim() };
}

module.exports = {
  getPublicInquiries,
  createInquiry,
  getInquiryDetail,
  getAdminInquiries,
  getAdminInquiryDetail,
  answerInquiry,
};
