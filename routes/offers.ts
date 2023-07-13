import Hapi from "@hapi/hapi";

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
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "PATCH",
    path: "/offers/{offerId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      // Queries available:  ?sort={price}?category={CategoryType}
      return "Hello World!";
    },
  },
  {
    method: "DELETE",
    path: "/offers/{offerId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      // Queries available:  ?sort={price}?category={CategoryType}
      return "Hello World!";
    },
  },
];

export default offerRoutes;
