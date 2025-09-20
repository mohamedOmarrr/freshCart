export interface CartProduct {
  count: number;
  _id: string;
  product: string;   // الـ id بتاع المنتج
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartInfo {
  _id: string;  
  title?: string;
  quantity: number;
  imageCover?: string;
  price: number;
}

export interface CartItem {
  _id:string
  count: number;
  product: CartInfo;
}

export interface CartApiResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string; 
    products: Array<{
      _id: string; 
      count: number;
      product: CartInfo;
      price: number;
    }>
  };
}