import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 3;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  storedPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const passwordsMatch = await bcrypt.compare(storedPassword, hashedPassword);
  return passwordsMatch;
}
