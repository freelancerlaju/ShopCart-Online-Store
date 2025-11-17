export interface Product {
  _id: string;
  name: string;
  slug?: {
    current?: string;
  };
  description?: string;
  price: number;
  discount?: number;
  images?: any[];
  variant?: string;
  status?: string;
  stock?: number;
  category?: string;
  brand?: string;
}

export interface Address {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  default?: boolean;
}

