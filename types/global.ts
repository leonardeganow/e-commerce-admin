export interface Category {
  _id: string | undefined;
  name: string;
  productsCount?: number;
  productsStock?: number;
}

export interface Product {
  _id: string | undefined;
  name: string;
  colors?: [string],
  sizes?: [string],
  price: number,
  currency: string;
  stock: number;
  featured: boolean;
  category: string;
  description?: string;
  image: string;
  categoryName: string;
}