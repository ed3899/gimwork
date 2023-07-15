import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import joi from "joi";
import { Offer } from "@prisma/client";
import R from "ramda";

interface ItemsToBeRemoved {
  wishlistedIds: Offer["offerId"][];
}

export const addToWishlistSchema = joi.object<ItemsToBeRemoved>({
  wishlistedIds: joi.array().items(joi.string()).required(),
});

export default async function removeItemFromWishlistByUserId(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;
  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    await cognitoAuth(token!);

    const { wishlistedIds } = request.payload as ItemsToBeRemoved;
    const updatedWishlist = await request.server.app.prisma.user
      .update({
        where: {
          userId: request.params.userId,
        },
        data: {
          wishlist: {
            disconnect: wishlistedIds.map((value) => ({ offerId: value })),
          },
        },
      })
      .wishlist();

    GimWorkResponse = {
      status: 200,
      message: "Updated wishlist",
      data: updatedWishlist,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;
    GimWorkResponse = {
      status: 500,
      message: "Failed to update wishlist",
      error: err.message,
      timestamp: new Date().toISOString(),
    };
    return h.response(GimWorkResponse).type("application/json");
  }
}
