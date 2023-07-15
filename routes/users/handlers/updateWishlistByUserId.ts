import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import joi from "joi";
import { Offer } from "@prisma/client";
import R, { inc } from "ramda";

interface WishlistedItems {
  wishlistedIds?: Offer["offerId"][];
}

export const addToWishlistSchema = joi.object<WishlistedItems>({
  wishlistedIds: joi.array().items(joi.string()),
});

export default async function addToWishlistByUserId(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;
  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    await cognitoAuth(token!);

    const { wishlistedIds } =
      request.payload as WishlistedItems;
    const _wishlistedIds = wishlistedIds ? wishlistedIds : [];

    if (_wishlistedIds.length === 0) {
      GimWorkResponse = {
        status: 200,
        message: "Items added to wishlist",
        data: [],
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    const wishlist = await request.server.app.prisma.wishlist.update({
      where: {
        OwnerId: request.params.userId,
      },
      data: {
        Items: {
          create: _wishlistedIds.map((id) => ({
            OfferId: id,
          })),
        }
      },
    }).Items();

    GimWorkResponse = {
      status: 200,
      message: "Items added to wishlist",
      data: wishlist,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;
    GimWorkResponse = {
      status: 500,
      message: "Failed to add items to wishlist",
      error: err.message,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  }
}
