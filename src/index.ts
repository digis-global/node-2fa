import crypto from "crypto";
import b32 from "thirty-two";
import { Options } from "./interfaces";
import { totp } from "otplib";

export function generateSecret(options?: Options) {
  const config = {
    name: encodeURIComponent(options?.name ?? "App"),
    account: encodeURIComponent(options?.account ? `:${options.account}` : ""),
  } as const;

  const bin = crypto.randomBytes(20);
  const base32 = b32.encode(bin).toString("utf8").replace(/=/g, "");

  const secret = base32
    .toLowerCase()
    .replace(/(\w{4})/g, "$1 ")
    .trim()
    .split(" ")
    .join("")
    .toUpperCase();

  const query = `?secret=${secret}&issuer=${config.name}`;
  const encodedQuery = query.replace("?", "%3F").replace("&", "%26");
  const uri = `otpauth://totp/${config.name}${config.account}`;

  return {
    secret,
    uri: `${uri}${query}`,
    qr: `https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${uri}${encodedQuery}`,
  };
}

export function generateToken(secret: string) {
  if (!secret || !secret.length) return null;
  const unformatted = secret.replace(/\W+/g, "").toUpperCase();
  const bin = b32.decode(unformatted);
  // @ts-ignore
  return { token: totp.generate(bin) };
}

export function verifyToken(secret: string, token?: string) {
  if (!token || !token.length) return null;
  const unformatted = secret.replace(/\W+/g, "").toUpperCase();
  const bin = b32.decode(unformatted).toString();
  // @ts-ignore
  return totp.verify({ token: token, secret: bin });
}
