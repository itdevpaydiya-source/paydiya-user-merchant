import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'paydiya-merchant' });

export const tokenStorage = {
  get: () => storage.getString('auth_token'),
  set: (token: string) => storage.set('auth_token', token),
  clear: () => storage.delete('auth_token'),
};
