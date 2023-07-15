import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import joi from "joi";
import { Offer } from "@prisma/client";
import R from "ramda";

interface WishlistedItems {
  wishlistedIds?: Offer["offerId"][];
  unwishlistedIds?: Offer["offerId"][];
}

export const addToWishlistSchema = joi.object<WishlistedItems>({
  wishlistedIds: joi.array().items(joi.string()),
  unwishlistedIds: joi.array().items(joi.string()),
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

    const { wishlistedIds, unwishlistedIds } =
      request.payload as WishlistedItems;
    const _wishlistedIds = wishlistedIds ? wishlistedIds : [];
    const _unwishlistedIds = unwishlistedIds ? unwishlistedIds : [];
    const difference = R.difference(_wishlistedIds, _unwishlistedIds);
    let updatedWishlist: Offer[] = [];

    // No items to be added or removed from wishlist
    if (_wishlistedIds.length === 0 && _unwishlistedIds.length === 0) {
      GimWorkResponse = {
        status: 400,
        message: "No items to be added or removed from wishlist",
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    // Only one action can be performed at a time
    if (_wishlistedIds.length > 0 && _unwishlistedIds.length > 0) {
      GimWorkResponse = {
        status: 400,
        message: "Cannot add and remove items from wishlist at the same time",
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    // Add items to wishlist
    if (_wishlistedIds.length > 0) {
      updatedWishlist = await request.server.app.prisma.user
        .update({
          where: {
            userId: request.params.userId,
          },
          data: {
            wishlist: {
              connect: _wishlistedIds.map((value) => ({ offerId: value })),
            },
          },
        })
        .wishlist();

      GimWorkResponse = {
        status: 201,
        message: "Items added to wishlist",
        data: updatedWishlist,
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }

    // Remove items from wishlist
    if (_unwishlistedIds.length > 0) {
      // Get current wishlist
      const currentWishlist = await request.server.app.prisma.user
        .findUnique({
          where: {
            userId: request.params.userId,
          },
        })
        .wishlist();
      // If current wishlist is empty stop
      if (!currentWishlist) {
        GimWorkResponse = {
          status: 400,
          message: "Current wishlist is empty",
          timestamp: new Date().toISOString(),
        };
        return h.response(GimWorkResponse).type("application/json");
      }
      // Calculate difference of ids between current wishlist and items to be removed
      const currentWishlistIds = currentWishlist.map((value) =>  value.offerId);
      const difference = R.difference(currentWishlistIds, _unwishlistedIds);
      await request.server.app.prisma.user.updateMany({
        where: {
          offerId: {
            in: _unwishlistedIds,
          },
          WishlistedBy: {
            userId: request.params.userId,
          },
        },
        data: {

        },
      });

      GimWorkResponse = {
        status: 200,
        message: "Items removed from wishlist",
        data: updatedWishlist,
        timestamp: new Date().toISOString(),
      };
      return h.response(GimWorkResponse).type("application/json");
    }
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
