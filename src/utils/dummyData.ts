import { Category, Salon, Booking, Promotion } from '../types';

export const dummyCategories: Category[] = [
  { id: '1', name: 'Hair salon', icon: '💇' },
  { id: '2', name: 'Barbershop', icon: '✂️' },
  { id: '3', name: 'Makeup', icon: '💄' },
  { id: '4', name: 'Nail tech', icon: '💅' },
];

export const dummySalons: Salon[] = [
  {
    id: '1',
    name: 'Bestman Barbershop',
    image: 'https://via.placeholder.com/100',
    location: 'City campus, Accra',
    distance: '2.1km',
    rating: 4.2,
    reviewCount: 200,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Premium Beauty Salon',
    image: 'https://via.placeholder.com/100',
    location: 'Mobibin, Accra',
    distance: '3.5km',
    rating: 3.2,
    reviewCount: 120,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Noble Makeup Parlour',
    image: 'https://via.placeholder.com/100',
    location: 'Mobibin, Accra',
    distance: '3.5km',
    rating: 3.2,
    reviewCount: 120,
    isFavorite: false,
  },
];

export const dummyBookings: Booking[] = [
  {
    id: '1',
    date: 'Dec 22',
    time: '10:30am',
    salonName: 'Bestman Barbershop',
    salonImage: 'https://via.placeholder.com/100',
    location: 'City campus, Accra',
    service: 'Shaving and dying',
    status: 'pending',
  },
  {
    id: '2',
    date: 'Dec 20',
    time: '2:00pm',
    salonName: 'Premium Beauty Salon',
    salonImage: 'https://via.placeholder.com/100',
    location: 'Mobibin, Accra',
    service: 'Hair styling',
    status: 'completed',
  },
  {
    id: '3',
    date: 'Dec 18',
    time: '11:00am',
    salonName: 'Noble Makeup Parlour',
    salonImage: 'https://via.placeholder.com/100',
    location: 'Osu, Accra',
    service: 'Makeup session',
    status: 'cancelled',
  },
];

export const dummyPromotions: Promotion[] = [
  {
    id: '1',
    image: 'https://via.placeholder.com/400x200',
    title: 'Beauty Salon Promo',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/400x200',
    title: 'Spa Treatment',
  },
];
