import {
  CheckCircledIcon,
  Cross1Icon,
  CrossCircledIcon,
  IdCardIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { convertPaymentMethod } from '.';

export const webPrimaryColor = '#2663E9';
export const companyName = 'Tabungan Wisata';
export const companyContact = '+6281234567890';

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
