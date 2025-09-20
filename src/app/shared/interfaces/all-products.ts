export interface ApiProduct {
  id?:string
  title: string;
  price: number;
  ratingsAverage: number;
  images: string[];
  category: { name: string };
  description?:string;
  quantity?: number
  brand?: { name:string }
}

export interface ProductView {
  id?:string
  title: string;
  price: number;
  rate: number;
  categoryName: string;
  image?: string;
  desc?:string;
  quantity?: number
  images?:string[]
  brand?:string
}
