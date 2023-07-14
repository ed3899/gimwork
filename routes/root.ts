import R from "ramda";
import Hapi from "@hapi/hapi";

import prisma from "../db/index";

import userRoutes from "./users/routes";
import offerRoutes from "./offers";

export const server = new Hapi.Server({
  port: 3000,
  host: "127.0.0.1",
  plugins: {
    prisma: prisma,
  },
});

const root = async () => {
  R.forEach<Hapi.ServerRoute>(
    (route) => {
      server.route(route);
    },
    [...userRoutes, ...offerRoutes]
  );

  await server.register([prisma]);
  await server.start();
};

export default root;
