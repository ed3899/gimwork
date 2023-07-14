import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";

export async function GET_User(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const requestedUser = await request.server.app.prisma.user.findUnique({
      where: {
        userId: request.params.userId,
      },
    });
    if (!requestedUser) {
      GimWorkResponse = {
        status: 404,
        message: "User not found",
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    const { password, ...userDataToBeSent } = requestedUser;
    GimWorkResponse = {
      status: 201,
      message: "User found",
      data: userDataToBeSent,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;
    GimWorkResponse = {
      status: 500,
      message: "Failed to get user",
      error: err.message,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  }
}
