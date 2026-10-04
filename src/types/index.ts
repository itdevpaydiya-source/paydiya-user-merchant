export type TransactionStatus =
  | 'INITIATED'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'PENDING'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export type Transaction = {
  id: string;
  utr: string;
  customer: string;
  mobile?: string;
  amount: number;
  method: 'UPI' | 'Card' | 'Wallet' | 'Net Banking' | 'Other';
  status: TransactionStatus;
  date: string;
  time: string;
  fees: number;
  tax: number;
  netAmount: number;
  settlementStatus: 'Pending' | 'Settled';
  refundable: boolean;
};

export type Settlement = {
  id: string;
  amount: number;
  status: 'Settled' | 'Processing' | 'Upcoming';
  date: string;
  utr: string;
  gross: number;
  refunds: number;
  charges: number;
  tax: number;
  adjustments: number;
  net: number;
  bank: string;
};

export type PaymentLink = {
  id: string;
  amount: number;
  purpose: string;
  url: string;
  status: 'Active' | 'Paid' | 'Expired' | 'Cancelled';
  createdAt: string;
  expiry: string;
  customer?: string;
  paidAt?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Cashier' | 'Accountant' | 'Staff';
  permissions: string[];
};

export type Device = {
  id: string;
  name: string;
  type: 'Mobile' | 'Tablet' | 'POS' | 'Soundbox' | 'Desktop' | 'Scanner' | 'Printer';
  lastActive: string;
  status: 'Active' | 'Blocked';
  location: string;
};

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
};
