import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import joi from "joi";
import { Offer } from "@prisma/client";
import cognitoAuth from "../../utils/cognitoAuth";
import extractEmailFromCognito from "../../utils/getEmailFromCognitoResponse";
import pickCategory from "../../utils/pickCategory";

export const patchOfferSchema = joi.object<Offer>({
  Description: joi.string(),
  Category: joi.string(),
  Price: joi.number(),
  PromotionalPicture: joi.string(),
});

async function patchOffer(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as Offer;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const { Description, Category, Price, PromotionalPicture } = payload;
    const {offerId} = request.params
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const res = await cognitoAuth(token!);
    const email = extractEmailFromCognito(res.UserAttributes);
    const pickedCategory = Category ? pickCategory(Category) : undefined;

    const newOffer = await request.server.app.prisma.offer.update({
      where: {
        offerId: offerId,
      },
      data: {
        Description: Description,
        Category: pickedCategory,
        Price: Price,
        PromotionalPicture: PromotionalPicture,
        CreatedBy: {
          connect: {
            email: email,
          },
        },
      },
    });

    GimWorkResponse = {
      status: 200,
      message: "Offer patched successfully",
      data: newOffer,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;

    GimWorkResponse = {
      status: 500,
      message: "Offer patched failed",
      error: err.message,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  }
}

export default patchOffer;
