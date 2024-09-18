import { Types } from "mongoose";

interface ILocation {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface IRates {
  weekly: number;
  monthly?: number;
  nightly?: number;
}

interface ISellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IProperty {
  owner: Types.ObjectId;
  amenities: string[];
  baths: number;
  beds: number;
  createdAt: string;
  description: string;
  images: string[];
  is_featured: boolean;
  location: ILocation;
  name: string;
  rates: IRates;
  seller_info: ISellerInfo;
  square_feet: number;
  type: string;
  updatedAt: string;
  _id: string;
}

export interface IUserSchema {
  email: string;
  username: string;
  image: string;
  bookmarks: string;
}

export interface IPropertySchema {
  owner: Types.ObjectId;
  name: string;
  type: string;
  description: string;
  location: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IRates;
  seller_info: ISellerInfo;
  images: string[];
  is_featured: boolean;
}
