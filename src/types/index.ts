export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Salon {
  id: string;
  name: string;
  image: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
  isVerified?: boolean;
  isOpen?: boolean;
  opensAt?: string;
  closesAt?: string;
  openingHours?: string;
  description?: string;
  workingHours?: WorkingHours;
  contacts?: SalonContacts;
  gallery?: string[];
}

export interface WorkingHours {
  weekdays: string;
  saturdays: string;
  sundays: string;
  holidays: string;
}

export interface SalonContacts {
  address: string;
  phone: string[];
  website?: string;
  snapchat?: string;
  tiktok?: string;
  instagram?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  category?: 'all' | 'female' | 'male';
  isPopular?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  date: string;
  time: string;
  salonName: string;
  salonImage: string;
  location: string;
  service: string;
  status: 'pending' | 'cancelled' | 'completed';
}

export interface Promotion {
  id: string;
  image: string;
  title: string;
}

export interface BookingForm {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  date: string;
  time: string;
  contact: string;
  note?: string;
}