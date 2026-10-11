export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Condo';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  image: string;
  isFeatured?: boolean;
}
