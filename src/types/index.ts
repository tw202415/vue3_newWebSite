export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

export interface EnhancedProduct extends Product {
  originalPrice?: number;
  vipPrice?: number;
  rating: number;
  reviewCount: number;
  purchaseCount: number;
  stock: number;
  isHot: boolean;
  is24HShipping: boolean;
  isVipOnly: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVip: boolean;
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'zh-TW' | 'en-US';

export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}