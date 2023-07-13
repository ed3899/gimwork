import R from "ramda";
import Hapi from "@hapi/hapi";

import userRoutes from "./user";
import offerRoutes from "./offers";

interface Route {
  method: string;
  path: string;
  handler: (
    request: Hapi.Request<Hapi.ReqRefDefaults>,
    h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
  ) => string;
}

const root = async () => {

  const server = new Hapi.Server({
    port: 3000,
    host: "127.0.0.1",
  });


  R.forEach<Route>((route) => {
    server.route(route);
  }, [...userRoutes, ...offerRoutes]);


  await server.start();
  console.log("Server running on", server.info.uri);
};

export default root;
