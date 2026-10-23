
const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "관리자 로그인이 필요합니다.",
    });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "crane-homepage",
      audience: "crane-admin",
    });

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "관리자 권한이 필요합니다.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "인증이 만료되었거나 유효하지 않습니다.",
    });
  }
}

module.exports = { requireAdmin };
