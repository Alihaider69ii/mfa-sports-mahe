export interface ProductImagePaths {
  w360: string;
  w640: string;
  w800: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  category: string;
  categorySlug: string;
  categories: string[];
  club: string | null;
  images: ProductImagePaths[];
  sizes: string[];
  description: string;
  isDealOfTheDay: boolean;
  isNewArrival: boolean;
  liveUrl: string;
}

export interface Category {
  name: string;
  slug: string;
  path: string;
}

export interface Club {
  name: string;
  slug: string;
  href: string;
  productCount: number;
}

export interface PolicyData {
  title: string;
  content: string;
  points: string[];
}

export interface Policies {
  returnPolicy: PolicyData;
  shippingPolicy: PolicyData;
}

export interface EnquirySubmission {
  id: string;
  name: string;
  phone: string;
  city: string;
  teamOrDesign: string;
  quantity: number;
  message: string;
  submittedAt: string;
}
