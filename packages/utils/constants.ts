import {
  CheckCircledIcon,
  CrossCircledIcon,
  IdCardIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { convertPaymentMethod } from '.';

export const webPrimaryColor = '#2663E9';
export const companyName = 'Tabungan Wisata';
export const companyShortName = 'TW';
export const companyContact = '6281234567890';
export const companyEmail = 'support@aththariq.com';
export const companyVideoUrl = 'https://www.youtube.com/watch?v=6v2L2UGZJAM';
export const companyDescription = `Discover your dream vacation with ${companyName} - your trusted travel experts. Browse affordable packages, customize your trip with flexible booking options, and get personalized advice from our travel specialists. Whether it's a beach getaway, city break, or exotic adventure, we have the perfect vacation waiting for you. Book online today and start exploring.`;

export const teamMembers = [
  {
    name: 'simon',
    position: 'Owner',
    image: '/images/team-1.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Sofie',
    position: 'General Manager',
    image: '/images/team-2.webp',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Chloe',
    position: 'General Manager',
    image: '/images/team-3.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Jack',
    position: 'Videographer',
    image: '/images/team-4.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Fiona',
    position: 'Tour Coordinator',
    image: '/images/team-5.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Oratai',
    position: 'Thailand Operations',
    image: '/images/team-6.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Thuy',
    position: 'Vietnam Operations',
    image: '/images/team-7.png',
    socialMedia: 'https://instagram.com',
  },
  {
    name: 'Ima',
    position: 'Bali Operations',
    image: '/images/team-8.png',
    socialMedia: 'https://instagram.com',
  },
];

export const socialMedia = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: '/images/facebook-icon.png',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: '/images/instagram-icon.png',
  },
  {
    name: 'X',
    url: 'https://x.com',
    icon: '/images/x-icon.png',
  },
];

export const paymentStatus = [
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: StopwatchIcon,
  },
  {
    value: 'failed',
    label: 'Failed',
    icon: CrossCircledIcon,
  },
];

export const paymentMethods = [
  {
    value: convertPaymentMethod('credit_card'),
    label: 'Credit Card',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('echannel'),
    label: 'Mandiri E-Cash',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('bank_transfer'),
    label: 'Bank Transfer',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('gopay'),
    label: 'Gopay',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('qris'),
    label: 'QRIS',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('cstore'),
    label: 'Cstore',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('bca_klikpay'),
    label: 'BCA Klikpay',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('bca_klikbca'),
    label: 'BCA Klikbca',
    icon: IdCardIcon,
  },
  {
    value: convertPaymentMethod('bri_epay'),
    label: 'BRI E-Pay',
    icon: IdCardIcon,
  },
];
