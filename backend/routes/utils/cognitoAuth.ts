import { CognitoIdentityServiceProvider } from "aws-sdk";

export default async function cognitoAuth(token: string) {
  const cognito = new CognitoIdentityServiceProvider({
    apiVersion: process.env.COGNITO_API_VERSION!,
  });
  const res = await cognito
    .getUser({
      AccessToken: token!,
    })
    .promise();

  return res;
}
