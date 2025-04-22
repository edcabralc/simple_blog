import jwt from "jsonwebtoken";

const createJWT = (payload: any) =>
  jwt.sign(payload, process.env.JWT_KEY as string);

const readJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY as string);
  } catch (error) {
    return false;
  }
};

export { createJWT, readJWT };
