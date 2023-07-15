enum Category {
  Home,
  Electronic,
  HealthAndPersonalCare,
  Clothes,
}

interface Offer<U> {
  description: string;
  price: number;
  category: Category;
  promotionalPicture: string;
  publishedDate: Date;
  createdBy: U;
  wishlistedBy: U[];
}
