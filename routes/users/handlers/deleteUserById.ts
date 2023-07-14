import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import extractEmailFromCognito from "../../utils/getEmailFromCognitoResponse";

async function deleteUserById(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;
  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const res = await cognitoAuth(token!);
    const authEmail = extractEmailFromCognito(res.UserAttributes);

    const deletedUser = await request.server.app.prisma.user.delete({
      where: {
        email: authEmail,
      },
    });
    const { password, ...userDataToBeSent } = deletedUser;
    GimWorkResponse = {
      status: 200,
      message: "User deleted",
      data: userDataToBeSent,
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

export default deleteUserById;
