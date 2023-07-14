import { createHmac } from "crypto";

export default function calculateSecretHash(email: string) {
  const message = email + process.env.GIMWORK_COGNITO_POOL_CLIENT_ID!;
  const hmac = createHmac("sha256", process.env.GIMWORK_COGNITO_SECRET_HASH!);
  hmac.update(message);
  const secretHash = hmac.digest("base64");
  return secretHash;
}
