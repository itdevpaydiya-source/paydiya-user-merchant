import axios from 'axios';
import { tokenStorage } from '@/services/storage/mmkv';

// Base URL is environment-driven; screens use mock services until backend is live.
const BASE_URL = process.env.PAYDIYA_API_BASE_URL ?? 'https://api.paydiya.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  requestOtp: (mobile: string) => apiClient.post('/auth/otp/request', { mobile }),
  verifyOtp: (mobile: string, otp: string) => apiClient.post('/auth/otp/verify', { mobile, otp }),
};

export const merchantApi = { getProfile: () => apiClient.get('/merchant/profile') };
export const transactionApi = { list: () => apiClient.get('/merchant/transactions') };
export const settlementApi = { list: () => apiClient.get('/merchant/settlements') };
export const qrApi = { getStatic: () => apiClient.get('/merchant/qr') };
export const paymentLinkApi = { list: () => apiClient.get('/merchant/payment-links') };
export const analyticsApi = { get: () => apiClient.get('/merchant/analytics') };
export const staffApi = { list: () => apiClient.get('/merchant/staff') };
export const deviceApi = { list: () => apiClient.get('/merchant/devices') };
export const reportApi = { list: () => apiClient.get('/merchant/reports') };
export const notificationApi = { list: () => apiClient.get('/merchant/notifications') };
export const settingsApi = { get: () => apiClient.get('/merchant/settings') };
