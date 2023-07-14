import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import { User } from "./types";
import joi from "joi";
import cognitoAuth from "../../utils/cognitoAuth";
import getEmailValue from "../../utils/getEmailFromCognitoResponse";
import extractEmailFromCognito from "../../utils/getEmailFromCognitoResponse";

export const patchUserSchema = joi.object<User>({
  firstName: joi.string(),
  lastName: joi.string(),
  phoneNumber: joi.string(),
});

async function patchUserById(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as User;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const res = await cognitoAuth(token!);
    const email = extractEmailFromCognito(res.UserAttributes)

    const patchedUser = await request.server.app.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      },
    });

    GimWorkResponse = {
      status: 200,
      message: "User patched",
      data: patchedUser,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;

    GimWorkResponse = {
      status: 500,
      message: "Unsuccessful patch",
      error: err.message,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  }
}

export default patchUserById;
