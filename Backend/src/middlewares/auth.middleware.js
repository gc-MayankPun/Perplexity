import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid token",
    });
  }
}
