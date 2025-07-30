import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWTsecret = process.env.JWT_SECRET;

const checkedToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error(
      "Você não está logado! Por favor, faça o login para ter acesso."
    );
    error.statusCode = 401;
    error.status = "fail";
    return next(error);
  }

  try {
    jwt.verify(token, JWTsecret);

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      const error = new Error(
        "Token inválido. Por favor, faça login novamente!"
      );
      error.statusCode = 401;
      error.status = "fail";
      return next(error);
    }
    if (err.name === "TokenExpiredError") {
      const error = new Error(
        "Seu token expirou! Por favor, faça login novamente."
      );
      error.statusCode = 401;
      error.status = "fail";
      return next(error);
    }
    return next(err);
  }
};

export default checkedToken;
