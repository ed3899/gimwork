import Hapi from "@hapi/hapi";
import sha256Hash from "../../../utils/passwordVerification";
import { GimWorkResponse } from "../../types";
import joi from "joi";
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

interface Confirmation {
  email: string;
  password: string;
  token: string;
}

export const confirmUserSchema = joi.object<Confirmation>({
  email: joi.string().email().required(),
  password: joi.string().min(8).alphanum().required(),
  token: joi.string().required(),
});

export default async function confirmUser(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as Confirmation;
  let GimWorkResponse: GimWorkResponse<string>;
  try {
    const { token , email, password } = payload;
    const poolData = {
      UserPoolId: process.env.GIMWORK_COGNITO_POOL_ID!,
      ClientId: process.env.GIMWORK_COGNITO_POOL_CLIENT_ID!,
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(token, true, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    GimWorkResponse = {
      status: 200,
      message: "User confirmed",
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;
    GimWorkResponse = {
      status: 500,
      message: "Unauthorized",
      error: err.message,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  }
}
