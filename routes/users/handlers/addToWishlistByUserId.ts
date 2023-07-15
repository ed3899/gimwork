import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import joi from "joi";
import { Offer } from "@prisma/client";
import R from "ramda";

interface WishlistedItems {
  wishlistedIds: Offer["offerId"][];
}

export const addToWishlistSchema = joi.object<WishlistedItems>({
  wishlistedIds: joi.array().items(joi.string()).required(),
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

    const { wishlistedIds } = request.payload as WishlistedItems;
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

    const toBeWishlistedItems = R.map(
      (value) => ({ offerId: value }),
      wishlistedIds
    );
    const updatedUserWishlist = await request.server.app.prisma.user
      .update({
        where: { userId: requestedUser.userId },
        data: {
          wishlist: {
            connect: toBeWishlistedItems,
          },
        },
      })
      .wishlist();

    GimWorkResponse = {
      status: 201,
      message: "Items added to wishlist",
      data: updatedUserWishlist,
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
