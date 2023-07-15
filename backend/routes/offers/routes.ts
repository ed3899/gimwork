import createOffer from "./handlers/createOffer";
import patchOfferById from "./handlers/patchOfferById";
import deleteOfferById from "./handlers/deleteOfferById";
import getOffer from "./handlers/getOffer";

const offerRoutes = [
  {
    method: "GET",
    path: "/offers",
    handler: getOffer,
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
