import { Transaction, Settlement, PaymentLink, StaffMember, Device, NotificationItem } from '@/types';

export const mockMerchant = {
  name: 'Sri Venkateswara Stores',
  mid: 'PYM123456',
  upiId: 'venkateswara@paydiya',
  totalReceived: 248320,
  transactions: 328,
  averageTransaction: 756,
  growth: 12,
};

export const mockTransactions: Transaction[] = [
  { id: 'TXN1001', utr: '425610982134', customer: 'Ramesh Kumar', amount: 500, method: 'UPI', status: 'SUCCESS', date: 'Today', time: '10:34 AM', fees: 0, tax: 0, netAmount: 500, settlementStatus: 'Settled', refundable: true },
  { id: 'TXN1002', utr: '425610982155', customer: 'Priya Sharma', amount: 1200, method: 'UPI', status: 'SUCCESS', date: 'Today', time: '11:20 AM', fees: 0, tax: 0, netAmount: 1200, settlementStatus: 'Settled', refundable: true },
  { id: 'TXN1003', utr: '425610982178', customer: 'Arjun Reddy', amount: 2480, method: 'Card', status: 'SUCCESS', date: 'Today', time: '09:41 AM', fees: 29.6, tax: 5.33, netAmount: 2450.4, settlementStatus: 'Pending', refundable: true },
  { id: 'TXN1004', utr: '425610982190', customer: 'Suresh Traders', amount: 750, method: 'UPI', status: 'PENDING', date: 'Yesterday', time: '08:15 PM', fees: 0, tax: 0, netAmount: 750, settlementStatus: 'Pending', refundable: false },
  { id: 'TXN1005', utr: '425610982201', customer: 'Meena Enterprises', amount: 1990, method: 'UPI', status: 'SUCCESS', date: 'Yesterday', time: '06:02 PM', fees: 0, tax: 0, netAmount: 1990, settlementStatus: 'Settled', refundable: true },
  { id: 'TXN1006', utr: '425610982233', customer: 'Karthik', amount: 500, method: 'UPI', status: 'REFUNDED', date: '12 Sep 2026', time: '04:40 PM', fees: 0, tax: 0, netAmount: -500, settlementStatus: 'Settled', refundable: false },
];

export const mockSettlements: Settlement[] = [
  { id: 'SET1', amount: 48320, status: 'Settled', date: '18 Sep 2026', utr: 'UTR982134561', gross: 50100, refunds: 800, charges: 600, tax: 280, adjustments: 100, net: 48320, bank: 'HDFC **** 4321' },
  { id: 'SET2', amount: 32580, status: 'Settled', date: '17 Sep 2026', utr: 'UTR982134400', gross: 34000, refunds: 700, charges: 430, tax: 290, adjustments: 0, net: 32580, bank: 'HDFC **** 4321' },
  { id: 'SET3', amount: 28410, status: 'Settled', date: '16 Sep 2026', utr: 'UTR982134298', gross: 29200, refunds: 0, charges: 500, tax: 290, adjustments: 0, net: 28410, bank: 'HDFC **** 4321' },
  { id: 'SET4', amount: 41220, status: 'Settled', date: '15 Sep 2026', utr: 'UTR982134177', gross: 42800, refunds: 1000, charges: 380, tax: 200, adjustments: 0, net: 41220, bank: 'HDFC **** 4321' },
];

export const mockPaymentLinks: PaymentLink[] = [
  { id: 'PL1', amount: 500, purpose: 'Order #1234', url: 'https://paydiya.link/xyz123', status: 'Paid', createdAt: 'Today, 09:12 AM', expiry: '7 Days', customer: 'Ramesh Kumar', paidAt: 'Today, 09:40 AM' },
  { id: 'PL2', amount: 1250, purpose: 'Invoice #88', url: 'https://paydiya.link/inv88', status: 'Active', createdAt: 'Yesterday', expiry: '7 Days' },
  { id: 'PL3', amount: 300, purpose: 'Table 4', url: 'https://paydiya.link/tbl4', status: 'Expired', createdAt: '12 Sep 2026', expiry: '1 Day' },
];

export const mockStaff: StaffMember[] = [
  { id: 'S1', name: 'Venkat Rao', mobile: '+91 98XXX XX101', email: 'venkat@store.com', role: 'Owner', permissions: ['View Dashboard','View Transactions','View Settlements','View Analytics','Process Refund','Manage Store','Manage Staff','Manage Devices','Access POS'] },
  { id: 'S2', name: 'Lakshmi Devi', mobile: '+91 90XXX XX204', email: 'lakshmi@store.com', role: 'Manager', permissions: ['View Dashboard','View Transactions','View Settlements','View Analytics','Process Refund','Manage Store'] },
  { id: 'S3', name: 'Suresh Babu', mobile: '+91 91XXX XX308', email: 'suresh@store.com', role: 'Cashier', permissions: ['View Dashboard','Access POS','Create Payment Link'] },
];

export const mockDevices: Device[] = [
  { id: 'D1', name: 'Counter POS', type: 'POS', lastActive: 'Today, 10:30 AM', status: 'Active', location: 'Main Counter' },
  { id: 'D2', name: 'Soundbox Pro', type: 'Soundbox', lastActive: 'Today, 10:34 AM', status: 'Active', location: 'Main Counter' },
  { id: 'D3', name: 'Owner Phone', type: 'Mobile', lastActive: 'Today, 09:00 AM', status: 'Active', location: 'Store' },
  { id: 'D4', name: 'Barcode Scanner', type: 'Scanner', lastActive: 'Yesterday', status: 'Blocked', location: 'Billing' },
];

export const mockNotifications: NotificationItem[] = [
  { id: 'N1', type: 'Payment', title: '₹2,480 received', subtitle: 'Arjun Reddy • UPI Payment', time: 'Today, 09:41 AM' },
  { id: 'N2', type: 'Settlement', title: '₹12,480 settlement scheduled', subtitle: 'Tomorrow, 20 Sep 2026', time: 'Today, 08:00 AM' },
  { id: 'N3', type: 'Refund', title: 'Refund processed', subtitle: 'Karthik • ₹500', time: '12 Sep 2026' },
];

export const mockAnalytics = {
  totalReceived: 124890,
  growth: 18,
  revenue: [12000, 18000, 9000, 15000, 22000, 16000, 24480],
  paymentMethods: [
    { label: 'UPI', value: 68, color: '#2E7D5B' },
    { label: 'Cards', value: 18, color: '#F08C2E' },
    { label: 'Wallets', value: 8, color: '#E8A33D' },
    { label: 'Net Banking', value: 6, color: '#C9C9C9' },
  ],
};
