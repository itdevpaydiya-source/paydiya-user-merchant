// Hardware adapters. UI screens must never contain hardware logic.

export interface PrinterAdapter {
  print(data: string): Promise<void>;
}

export interface ScannerAdapter {
  scan(): Promise<string>;
}

export interface SoundboxAdapter {
  playPaymentSound(amount: number): Promise<void>;
}

export interface POSAdapter {
  initiatePayment(amount: number): Promise<void>;
}

export const printerAdapter: PrinterAdapter = {
  async print() {
    // TODO: integrate Bluetooth/USB/Network printer drivers
  },
};

export const scannerAdapter: ScannerAdapter = {
  async scan() {
    return '';
  },
};

export const soundboxAdapter: SoundboxAdapter = {
  async playPaymentSound() {
    // TODO: trigger soundbox chime
  },
};

export const posAdapter: POSAdapter = {
  async initiatePayment() {
    // TODO: integrate POS terminal SDK
  },
};
