import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";

export default async function getWishlistByUserId(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;
  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    await cognitoAuth(token!);

    const w = await request.server.app.prisma.wishlist
      .findFirst({
        where: {
          OwnerId: request.params.userId,
        },
      }).Items();

    if (!w) {
      GimWorkResponse = {
        status: 200,
        message: "User wishlist",
        data: [],
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    GimWorkResponse = {
      status: 200,
      message: "User wishlist",
      data: w,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;
    GimWorkResponse = {
      status: 500,
      message: "Failed to fetch wishlist",
      error: err.message,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  }
}
