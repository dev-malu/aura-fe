export type Product = {
  _id: string;
  title: string;
  imageFiles: string[];
  description: string;
  category: Category;
  subcategory: SubCategory;
  video: string;
  price: number;
  stock: number;
  colors: string[];
  sizes: string[];
  tags: string[];
};

export type Category = {
  _id: string;
  name: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  parent: Category;
  sizes: [string];
};
