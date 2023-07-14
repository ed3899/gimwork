import Hapi from "@hapi/hapi";
import { hashPassword } from "../../../utils/passwordVerification";
import { GimWorkResponse } from "../../types";

export interface User {
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  offers: unknown[];
  wishlist: unknown[];
}

async function POST_User(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as User;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const newUser = await request.server.app.prisma.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: await hashPassword(payload.password),
        phoneNumber: payload.phoneNumber,
      },
    });

    const {password, ...userDataToBeSent} = newUser;

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
