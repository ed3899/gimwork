import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import cognitoAuth from "../../utils/cognitoAuth";
import pickCategory from "../../utils/pickCategory";

async function getOffer(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    await cognitoAuth(token!);

    const {
      minPrice,
      maxPrice,
      category,
      minDate,
      maxDate,
      userId,
      limit,
      skip,
    } = request.query;
    const _minPrice = minPrice ? parseInt(minPrice, 10) : 0;
    const _maxPrice = maxPrice ? parseInt(maxPrice, 10) : 1000000;
    const _minDate = minDate
      ? new Date(minDate)
      : new Date("2021-01-01T00:00:00.000Z");
    const _maxDate = maxDate
      ? new Date(maxDate)
      : new Date("3000-12-31T00:00:00.000Z");
    const _limit = limit ? parseInt(limit, 10) : 10;
    if (_limit > 100) {
      throw new Error("Limit cannot be greater than 100");
    }
    let _skip = 0;
    if (skip) {
      const totalOffers = await request.server.app.prisma.offer.count();
      const parsedSkip = parseInt(skip, 10);
      if (parsedSkip > totalOffers) {
        throw new Error("Skip cannot be greater than total offers");
      }
      _skip = parsedSkip;
    }

    const offers = await request.server.app.prisma.offer.findMany({
      where: {
        Category: {
          equals: category ? pickCategory(category) : undefined,
        },
        Price: {
          gte: _minPrice,
          lte: _maxPrice,
        },
        PublishedDate: {
          gte: _minDate,
          lte: _maxDate,
        },
        CreatedBy: {
          userId: userId ? userId : undefined,
        },
      },
      take: _limit,
      skip: _skip,
    });

    GimWorkResponse = {
      status: 200,
      message: "Offer(s) found",
      data: offers,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  } catch (error) {
    const err = error as Error;

    GimWorkResponse = {
      status: 500,
      message: "Offer(s) not found",
      error: err.message,
      timestamp: new Date().toISOString(),
    };

    return h.response(GimWorkResponse).type("application/json");
  }
}

export default getOffer;
