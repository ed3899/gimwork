import * as Crypto from 'expo-crypto';

export default async function generateSHA256(input: string) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    input
  );
  return digest
}
