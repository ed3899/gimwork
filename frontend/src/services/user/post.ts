import axios from "axios";
import {API_URL} from "../../../config";
import generateSHA256 from "../../utils/generateSHA256";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export default async function postUser(user: User) {
  const {password, email, firstName, lastName, phoneNumber} = user
  const hashedPassword = await generateSHA256(password);
  const response = await axios.post(`${API_URL}/users/signup`, {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber
  });
  return response.data;
}