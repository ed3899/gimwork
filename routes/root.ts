import R from "ramda";
import Hapi from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

import prisma from "../db/index";

import userRoutes from "./users/routes";
import offerRoutes from "./offers";

interface Route {
  method: string;
  path: string;
  handler: (
    request: Hapi.Request<Hapi.ReqRefDefaults>,
    h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>,
    p: InstanceType<typeof PrismaClient>
  ) => string;
}

export const server = new Hapi.Server({
  port: 3000,
  host: "127.0.0.1",
  plugins: {
    prisma: prisma,
  },
});

const root = async () => {
  R.forEach<Route>(
    (route) => {
      server.route(route);
    },
    [...userRoutes, ...offerRoutes]
  );

  await server.register([prisma]);
  await server.start();
};

export default root;
