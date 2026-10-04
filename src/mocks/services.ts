import {
  mockMerchant,
  mockTransactions,
  mockSettlements,
  mockPaymentLinks,
  mockStaff,
  mockDevices,
  mockNotifications,
  mockAnalytics,
} from './data';
import { sleep } from '@/utils/format';

const respond = async <T,>(value: T): Promise<T> => {
  await sleep(400);
  return value;
};

export const mockAuthService = {
  async requestOtp(mobile: string) {
    if (!/^\d{10}$/.test(mobile)) throw new Error('Enter a valid 10-digit mobile number');
    return respond({ success: true });
  },
  async verifyOtp(otp: string) {
    if (otp.length !== 4) throw new Error('Enter a valid 4-digit OTP');
    return respond({ token: 'mock-jwt-token' });
  },
  async verifyMpin(mpin: string) {
    if (mpin.length !== 4) throw new Error('MPIN must be 4 digits');
    return respond({ success: true });
  },
};

export const mockMerchantService = {
  getProfile: () => respond(mockMerchant),
};

export const mockQRService = {
  getStaticQR: () => respond({ upiId: mockMerchant.upiId, business: mockMerchant.name }),
  generateDynamicQR: (amount: number, note?: string) =>
    respond({ amount, note, expiresAt: Date.now() + 5 * 60 * 1000, status: 'Waiting' as const }),
};

const refundKeys = new Map<string, { status: string; id: string }>();
const refundedTxns = new Set<string>();

export const mockTransactionService = {
  list: () => respond(mockTransactions),
  getById: (id: string) => respond(mockTransactions.find(t => t.id === id)!),
  refund: (id: string, amount: number, reason: string, idempotencyKey?: string) => {
    if (idempotencyKey && refundKeys.has(idempotencyKey)) {
      return respond(refundKeys.get(idempotencyKey)!);
    }
    if (refundedTxns.has(id)) {
      return respond({ status: 'FAILED', id, error: 'Refund already processed for this transaction' });
    }
    refundedTxns.add(id);
    const result = { status: 'PROCESSING', id, amount, reason };
    if (idempotencyKey) refundKeys.set(idempotencyKey, result as any);
    return respond(result);
  },
};

export const mockSettlementService = {
  list: () => respond(mockSettlements),
  upcoming: () => respond({ amount: 12480, date: 'Tomorrow, 20 Sep 2026', bank: 'XXXX XXXX 4321' }),
};

export const mockPaymentLinkService = {
  list: () => respond(mockPaymentLinks),
  create: (amount: number, purpose: string) =>
    respond({
      id: 'PL' + Date.now(),
      amount,
      purpose,
      url: 'https://paydiya.link/' + Math.random().toString(36).slice(2, 8),
      status: 'Active' as const,
      createdAt: 'Just now',
      expiry: '7 Days',
    }),
};

export const mockAnalyticsService = {
  get: () => respond(mockAnalytics),
};

export const mockStaffService = {
  list: () => respond(mockStaff),
};

export const mockDeviceService = {
  list: () => respond(mockDevices),
  setStatus: (id: string, status: 'Active' | 'Blocked') =>
    respond({ id, status }),
};

export const mockReportService = {
  list: () =>
    respond([
      'Transaction Report',
      'Settlement Report',
      'Sales Report',
      'Refund Report',
      'Payment Method Report',
      'GST Report',
      'Daily Report',
      'Monthly Report',
    ]),
  export: (report: string, format: 'PDF' | 'CSV' | 'Excel') =>
    respond({ url: `file:///reports/${report.replace(/\s/g, '_')}.${format.toLowerCase()}`, format }),
};

export const mockNotificationService = {
  list: () => respond(mockNotifications),
};
