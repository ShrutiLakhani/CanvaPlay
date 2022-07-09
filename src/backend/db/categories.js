import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "All",
  },
  {
    _id: uuid(),
    categoryName: "Interview",
  },
  {
    _id: uuid(),
    categoryName: "Fashion",
  },
  {
    _id: uuid(),
    categoryName: "Travel",
  },
  {
    _id: uuid(),
    categoryName: "DIY",
  },
];
