import Hapi from "@hapi/hapi";
import POST_User from "./handlers/POST_user";

const userRoutes = [
  {
    //! User
    method: "POST",
    path: "/users",
    handler: POST_User
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
