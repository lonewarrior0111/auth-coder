import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // IF TOKENS ARE KEPT IN AUTH HEADERS //
  //   const headers = req.headers["authorization"];
  //   const token = headers.split(" ")[1];

  // SINCE WE HAVE KEPT TOKEN IN COOKIES WHICH ARE THERE IN HEADERS //
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  //   console.log(token);
  if (!token) {
    return res.status(404).send({
      success: false,
      message: `token not found!`,
    });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).send({
        success: false,
        message: `unauthorized user!`,
      });
    }
    req.id = user.id;
  });
  next();
};
