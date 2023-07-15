import Hapi from "@hapi/hapi";
import signUpUser from "./handlers/signUpUser";
import { getUserById } from "./handlers/getUserById";
import { signUpUserSchema } from "./handlers/signUpUser";
import loginUser, { loginUserSchema } from "./handlers/loginUser";
import confirmUser, { confirmUserSchema } from "./handlers/confirmUser";
import patchUserById from "./handlers/patchUserById";
import deleteUserById from "./handlers/deleteUserById";
import addToWishlistByUserId, {
  addToWishlistSchema,
} from "./handlers/updateWishlistByUserId";
import getWishlistByUserId from "./handlers/getWishlistByUserId";

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
    handler: deleteUserById,
  },
  //! User wishlist
  {
    method: "PUT",
    path: "/users/{userId}/wishlist",
    options: {
      validate: {
        payload: addToWishlistSchema,
      },
    },
    handler: addToWishlistByUserId,
  },
  {
    method: "GET",
    path: "/users/{userId}/wishlist",
    handler: getWishlistByUserId,
  },
];

export default userRoutes;
