import { Category } from "@prisma/client";

export default function pickCategory(c: Category) {
  switch (c) {
    case "Home":
      return Category.Home;
    case "HealthAndPersonalCare":
      return Category.HealthAndPersonalCare;
    case "Clothes":
      return Category.Clothes;
    case "Electronic":
      return Category.Electronic;
    default:
      throw new Error("Invalid category");
  }
}
