import Hapi from "@hapi/hapi";
import signUpUser from "./handlers/signUpUser";
import { getUserById } from "./handlers/getUserById";
import { signUpUserSchema } from "./handlers/signUpUser";
import loginUser, { loginUserSchema } from "./handlers/loginUser";
import confirmUser, { confirmUserSchema } from "./handlers/confirmUser";
import patchUserById from "./handlers/patchUserById";

const userRoutes = [
  {
    //! User
    method: "POST",
    path: "/users/signup",
    options: {
      validate: {
        payload: signUpUserSchema,
      },
    },
    handler: signUpUser,
  },
  {
    method: "POST",
    path: "/users/confirm",
    options: {
      validate: {
        payload: confirmUserSchema,
      },
    },
    handler: confirmUser,
  },
  {
    method: "POST",
    path: "/users/login",
    options: {
      validate: {
        payload: loginUserSchema,
      },
    },
    handler: loginUser,
  },
  {
    method: "GET",
    path: "/users/{userId}",
    handler: getUserById,
  },
  {
    method: "PATCH",
    path: "/users/{userId}",
    handler: patchUserById,
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
