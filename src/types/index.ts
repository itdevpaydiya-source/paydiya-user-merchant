export type TransactionStatus =
  | 'INITIATED'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'PENDING'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentMethod =
  | 'UPI'
  | 'Card'
  | 'Wallet'
  | 'Net Banking'
  | 'Cash'
  | 'Other';

export interface Transaction {
  id: string;
  utr: string;
  customer: string;
  customerMobile?: string;
  amount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  date: string;
  time: string;
  timestamp?: number;
  fees: number;
  tax: number;
  netAmount: number;
  settlementStatus: 'Pending' | 'Settled';
  refundable: boolean;
  refundId?: string;
  refundReason?: string;
  orderId?: string;
  note?: string;
}

export type SettlementStatus = 'Settled' | 'Processing' | 'Upcoming';

export interface Settlement {
  id: string;
  amount: number;
  status: SettlementStatus;
  date: string;
  settlementDate?: string;
  utr: string;
  gross: number;
  refunds: number;
  charges: number;
  tax: number;
  adjustments: number;
  net: number;
  bank: string;
  accountNumberMasked?: string;
  transactionCount?: number;
}

export type PaymentLinkStatus = 'Active' | 'Paid' | 'Expired' | 'Cancelled';

export interface PaymentLink {
  id: string;
  amount: number;
  purpose: string;
  url: string;
  status: PaymentLinkStatus;
  createdAt: string;
  expiry: string;
  customerName?: string;
  customer?: string;
  customerMobile?: string;
  paidAt?: string;
  transactionId?: string;
}

export type StaffRole = 'Owner' | 'Manager' | 'Cashier' | 'Accountant' | 'Staff';

export type StaffPermission =
  | 'Dashboard'
  | 'Transactions'
  | 'Payment Links'
  | 'Settlements'
  | 'Analytics'
  | 'Refund'
  | 'Reports'
  | 'Store'
  | 'Staff'
  | 'Devices'
  | 'POS'
  | string;

export interface StaffMember {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: StaffRole;
  permissions: (StaffPermission | string)[];
  status?: 'Active' | 'Inactive';
  joinedDate?: string;
}

export type DeviceType =
  | 'Mobile'
  | 'Tablet'
  | 'POS'
  | 'Soundbox'
  | 'Desktop'
  | 'Scanner'
  | 'Printer';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  lastActive: string;
  status: 'Active' | 'Blocked';
  location: string;
  model?: string;
  serialNumber?: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
  read?: boolean;
  metadata?: Record<string, string | number>;
}

export type KYCStatus = 'Verified' | 'Pending' | 'Rejected' | 'Action Required';

export interface MerchantProfile {
  id: string;
  mid: string;
  businessName: string;
  ownerName: string;
  businessType: string;
  category: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  gstin?: string;
  pan: string;
  upiId: string;
  logoUrl?: string;
  workingHours: string;
  kycStatus: KYCStatus;
  bankDetails: {
    bankName: string;
    accountNumberMasked: string;
    ifsc: string;
    accountHolderName: string;
    status: KYCStatus;
  };
  rating?: number;
  joinedDate: string;
}

export interface BusinessSummary {
  period: 'Today' | 'Yesterday' | 'This Week' | 'This Month' | 'Custom';
  totalReceived: number;
  growthPercentage: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface AnalyticsData {
  period: string;
  totalReceived: number;
  growthPercentage: number;
  transactionVolume: number;
  averageTransaction: number;
  successRate: number;
  refundRate: number;
  customerGrowth: number;
  dailyRevenue: { day: string; date: string; amount: number }[];
  byPaymentMode: { mode: string; percentage: number; amount: number; color: string }[];
  byChannel: { channel: string; percentage: number; amount: number }[];
}

export interface QRData {
  type: 'STATIC' | 'DYNAMIC';
  merchantName: string;
  mid: string;
  upiId: string;
  amount?: number;
  note?: string;
  qrPayload: string;
  expirySeconds?: number;
  status?: TransactionStatus;
}

export interface HardwarePrinterConfig {
  type: 'Bluetooth' | 'USB' | 'Network';
  deviceName: string;
  macAddress?: string;
  ipAddress?: string;
  port?: number;
  paperWidth: 58 | 80;
}

export interface HardwareSoundboxConfig {
  deviceId: string;
  status: 'Online' | 'Offline';
  batteryLevel: number;
  volume: number;
  language: 'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Kannada';
}
