import Hapi from "@hapi/hapi";
import { GimWorkResponse } from "../../types";
import { Offer } from "@prisma/client";
import cognitoAuth from "../../utils/cognitoAuth";
import extractEmailFromCognito from "../../utils/getEmailFromCognitoResponse";
import pickCategory from "../../utils/pickCategory";

async function getOffer(
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) {
  const payload = request.payload as Offer;
  let GimWorkResponse: GimWorkResponse<unknown>;

  try {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    await cognitoAuth(token!);

    const {minPrice, maxPrice, category, minDate, maxDate, userId } = request.params;
    const _minPrice = minPrice ? parseInt(minPrice, 10) : 0;
    const _maxPrice = maxPrice ? parseInt(maxPrice, 10) : 1000000;
    const _minDate = minDate ? new Date(minDate) : new Date("2021-01-01T00:00:00.000Z");
    const _maxDate = maxDate ? new Date(maxDate) : new Date("3000-12-31T00:00:00.000Z");

    const offers = await request.server.app.prisma.offer.findMany({
      where: {
        Category: {
          equals: category ? pickCategory(category) : undefined,
        },
        Price: {
          gte: _minPrice,
          lte: _maxPrice
        },
        PublishedDate: {
          gte: _minDate,
          lte: _maxDate
        },
        CreatedBy: {
          userId: userId ? userId : undefined,
        },
      },
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
