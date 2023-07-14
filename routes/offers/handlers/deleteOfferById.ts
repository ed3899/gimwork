import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import { Offer } from "@prisma/client";
import cognitoAuth from "../../utils/cognitoAuth";
import extractEmailFromCognito from "../../utils/getEmailFromCognitoResponse";

async function deleteOfferById(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as Offer;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const { offerId } = request.params;
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const res = await cognitoAuth(token!);
    const email = extractEmailFromCognito(res.UserAttributes);

    const deleteOffer = await request.server.app.prisma.offer.delete({
      where: {
        offerId: offerId,
        CreatedBy: {
          email: email,
        },
      },
    });

    GimWorkResponse = {
      status: 200,
      message: "Offer deleted successfully",
      data: deleteOffer,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;

    GimWorkResponse = {
      status: 500,
      message: "Offer deletion failed",
      error: err.message,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  }
}

export default deleteOfferById;
