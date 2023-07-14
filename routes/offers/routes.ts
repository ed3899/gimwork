import Hapi from "@hapi/hapi";
import createOffer from "./handlers/createOffer";
import patchOfferById from "./handlers/patchOfferById";
import deleteOfferById from "./handlers/deleteOfferById";

const offerRoutes = [
  {
    method: "GET",
    path: "/offers",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      // Only display 10 at a time, max 10
      // Queries available: ?price=int ?category={CategoryType} ?date={date} ?ascending={true/false} ?range{min, max} ?dates{start, end} ?user={userId}
      return "Hello World!";
    },
  },
  {
    method: "POST",
    path: "/offers",
    handler: createOffer,
  },
  {
    method: "PATCH",
    path: "/offers/{offerId}",
    handler: patchOfferById,
  },
  {
    method: "DELETE",
    path: "/offers/{offerId}",
    handler: deleteOfferById,
  },
];

export default offerRoutes;
