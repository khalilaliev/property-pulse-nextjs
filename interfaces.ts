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
  owner: Types.ObjectId | string;
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

export interface IPropertyData {
  owner: string;
  type: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  location: {
    street: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    state: FormDataEntryValue | null;
    zipcode: FormDataEntryValue | null;
  };
  beds: FormDataEntryValue | null;
  baths: FormDataEntryValue | null;
  square_feet: FormDataEntryValue | null;
  amenities: FormDataEntryValue[];
  rates: {
    nightly: FormDataEntryValue | null;
    weekly: FormDataEntryValue | null;
    monthly: FormDataEntryValue | null;
  };
  seller_info: {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
  };
  images?: string[];
}

export interface IImageProp {
  image: string;
}

export interface IParams {
  params: {
    id: string;
  };
}
