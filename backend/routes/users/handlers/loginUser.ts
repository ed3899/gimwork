import Hapi from "@hapi/hapi";
import sha256Hash from "../../../utils/passwordVerification";
import { GimWorkResponse } from "../../types";
import { User } from "./types";
import joi from "joi";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

export const loginUserSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().min(8).alphanum().required(),
});

async function loginUser(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as User;
  let GimWorkResponse: GimWorkResponse<string>;

  try {
    const { email, password: userPasswd } = payload;
    const hashedPassword = await sha256Hash(userPasswd);
    const poolData = {
      UserPoolId: process.env.GIMWORK_COGNITO_POOL_ID!,
      ClientId: process.env.GIMWORK_COGNITO_POOL_CLIENT_ID!,
    };
    const userPool = new CognitoUserPool(poolData);
    const authData = {
      Username: email,
      Password: hashedPassword,
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticateUser = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (res) => {
            resolve(res.getAccessToken().getJwtToken());
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
    };

    const jwt = await authenticateUser();

    GimWorkResponse = {
      status: 200,
      message: "User authenticated",
      data: jwt,
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

export default loginUser;
