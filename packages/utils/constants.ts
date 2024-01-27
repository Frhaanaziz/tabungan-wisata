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

// credit_card
// echannel
// bank_transfer
// gopay
// qris
// cstore
// bca_klikpay
// bca_klikbca
// bri_epay

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
