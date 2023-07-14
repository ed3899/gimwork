import Hapi from "@hapi/hapi";
import { hashPassword } from "../../../utils/passwordVerification";
import { GimWorkResponse } from "../../types";
import { User } from "./types";
import CognitoSignUp from "../../utils/cognitoSignUp";

async function POST_User(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as User;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const { email, password: userPasswd } = payload;
    const hashedPassword = await hashPassword(userPasswd);
    await CognitoSignUp(email, hashedPassword);

    const newUser = await request.server.app.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      },
    });

    const { password, ...userDataToBeSent } = newUser;

    GimWorkResponse = {
      status: 201,
      message: "User created successfully",
      data: userDataToBeSent,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;

    GimWorkResponse = {
      status: 500,
      message: "User creation failed",
      error: err.message,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  }
}

export default POST_User;
