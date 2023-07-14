import Hapi from "@hapi/hapi";
import POST_User, { User } from "./handlers/POST_user";
import joi from "joi";

const userSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().min(8).alphanum().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string(),
  offers: joi.array(),
  wishlist: joi.array(),
});

const userRoutes = [
  {
    //! User
    method: "POST",
    path: "/users",
    options: {
      validate: {
        payload: userSchema,
      },
    },
    handler: POST_User,
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
