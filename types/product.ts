export type ImageAsset = {
  url?: string;
  _ref?: string;
};

export type ImageValue = {
  _key?: string;
  url?: string;
  asset?: ImageAsset;
  [key: string]: unknown;
};

export type ImageSource = string | ImageValue | null | undefined;

export interface Product {
  _id: string;
  name: string;
  slug?: {
    current?: string;
  };
  description?: string;
  price: number;
  discount?: number;
  images?: ImageSource[];
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

