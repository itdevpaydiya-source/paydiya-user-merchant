export interface AppConfig {
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  isMockEnabled: boolean;
  timeoutMs: number;
  appName: string;
  tagline: string;
}

export const ENV: AppConfig = {
  apiBaseUrl: 'https://api-dev.paydiya.com/v1',
  environment: 'development',
  isMockEnabled: true,
  timeoutMs: 15000,
  appName: 'Paydiya Merchant',
  tagline: 'Business Growth in Every Payment',
};
