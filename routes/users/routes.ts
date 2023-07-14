import Hapi from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

const userRoutes = [
  {
    //! User
    method: "POST",
    path: "/users",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      // request.server.app.prisma.user.create({
      //   data: {
      //     email: request.payload.email,
      //     password: request.payload.password,
      //     firstName: request.payload.firstName,
      //     lastName: request.payload.lastName,
      //   },
      // });

      return "Hello World!";
    },
  },
  {
    method: "GET",
    path: "/users/{usersId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "PATCH",
    path: "/users/{userId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "DELETE",
    path: "/users/{userId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  //! User wishlist
  {
    method: "POST",
    path: "/users/{userId}/wishlist",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "GET",
    path: "/users/{userId}/wishlist",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "PUT",
    path: "/users/{userId}/wishlist",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
  {
    method: "DELETE",
    path: "/users/{userId}/wishlist/{wishlistItemId}",
    handler: (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      return "Hello World!";
    },
  },
];

export default userRoutes;
