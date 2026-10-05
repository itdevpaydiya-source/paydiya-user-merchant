import * as Keychain from 'react-native-keychain';
import { storage } from './mmkv';

const TOKEN_SERVICE = 'com.paydiya.merchant.tokens';
const MPIN_SERVICE = 'com.paydiya.merchant.mpin';

export const secureStorage = {
  // Authentication Tokens (Secure Enclave / Keychain / Keystore)
  async saveAuthTokens(accessToken: string, refreshToken?: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword('auth_token', accessToken, {
        service: TOKEN_SERVICE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      if (refreshToken) {
        storage.set('refresh_token', refreshToken);
      }
      return true;
    } catch {
      // Fallback to MMKV if keychain is unavailable in dev/emulator
      storage.set('auth_token_fallback', accessToken);
      return false;
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });
      if (credentials) {
        return credentials.password;
      }
      return storage.getString('auth_token_fallback') || null;
    } catch {
      return storage.getString('auth_token_fallback') || null;
    }
  },

  async clearAuthTokens(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
    } catch {
      // Ignore
    }
    storage.delete('auth_token_fallback');
    storage.delete('refresh_token');
  },

  // MPIN & Biometrics
  async saveMpinHash(mpinHash: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword('merchant_mpin', mpinHash, {
        service: MPIN_SERVICE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      return true;
    } catch {
      storage.set('merchant_mpin_fallback', mpinHash);
      return false;
    }
  },

  async verifyMpinHash(enteredHash: string): Promise<boolean> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: MPIN_SERVICE,
      });
      if (credentials) {
        return credentials.password === enteredHash;
      }
      const fallback = storage.getString('merchant_mpin_fallback');
      return fallback === enteredHash;
    } catch {
      const fallback = storage.getString('merchant_mpin_fallback');
      return fallback === enteredHash;
    }
  },

  // Preferences (Fast MMKV)
  setBiometricsEnabled(enabled: boolean): void {
    storage.set('pref_biometrics_enabled', enabled);
  },

  isBiometricsEnabled(): boolean {
    return storage.getBoolean('pref_biometrics_enabled') ?? false;
  },

  setThemeMode(mode: 'light' | 'dark'): void {
    storage.set('pref_theme_mode', mode);
  },

  getThemeMode(): 'light' | 'dark' {
    return (storage.getString('pref_theme_mode') as 'light' | 'dark') || 'light';
  },
};
