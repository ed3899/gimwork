import { CognitoIdentityServiceProvider } from "aws-sdk";
import CalculateSecretHash from "./calculateSecretHash";

export default async function CognitoSignUp(
  email: string,
  hashedPassword: string
) {
  const cognitoClient = new CognitoIdentityServiceProvider({
    apiVersion: process.env.COGNITO_API_VERSION,
    region: process.env.AWS_REGION,
  });

  const cognitoSecretHash = CalculateSecretHash(email);

  const cognitoResponse = await cognitoClient
    .signUp({
      ClientId: process.env.GIMWORK_COGNITO_POOL_CLIENT_ID!,
      Username: email,
      Password: hashedPassword,
      SecretHash: cognitoSecretHash,
    })
    .promise();

  return cognitoResponse;
}
