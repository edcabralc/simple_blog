import jwt from "jsonwebtoken";

const createJwt = (payload: any) =>
  jwt.sign(payload, process.env.JWT_KEY as string);

export { createJwt };
