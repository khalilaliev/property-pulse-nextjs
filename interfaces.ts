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
  amenities: string[];
  baths: number;
  beds: number;
  createdAt: string;
  description: string;
  images: string[];
  is_featured: boolean;
  location: ILocation;
  name: string;
  owner: string;
  rates: IRates;
  seller_info: ISellerInfo;
  square_feet: number;
  type: string;
  updatedAt: string;
  _id: string;
}
