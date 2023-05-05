import crypto from "crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { EventHeaders } from "./types";
import { parse } from "cookie";

const SALT_ROUNDS = 10;

export const hashUsername = (username: string): string =>
  crypto.createHash("sha256").update(username).digest("hex");

export const genSalt = () => bcrypt.genSalt(SALT_ROUNDS);

export const hashPassword = async (
  salt: string,
  password: string,
  pepper: string
) => bcrypt.hash(password + pepper, salt);

export const compare = async (
  plainTextPassword: string,
  password: string,
  pepper: string
) => bcrypt.compare(plainTextPassword + pepper, password);

export const genCookieString = (token?: string) =>
  `${
    token ? `token=${token};` : ""
  } HttpOnly; Path=/; SameSite=None; Max-Age=31536000; Secure;`;

export const genTokenCookie = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env["JWT_SECRET"]!);
  return genCookieString(token);
};

export const verifyToken = (headers: EventHeaders) => {
  const cookieStr = headers["cookie"];
  if (!cookieStr) return "";
  const { token: tokenStr } = parse(cookieStr);
  if (!tokenStr) return "";
  const token = jwt.verify(tokenStr, process.env["JWT_SECRET"]!) as JwtPayload;
  return token["id"] as string;
};

// const genJWT_SECRET = () => crypto.randomBytes(64).toString("hex");
// const genPepper = () => crypto.randomBytes(32).toString("hex");
