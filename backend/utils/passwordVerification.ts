import crypto from "crypto";

export default function sha256Hash(input: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("base64");
}
