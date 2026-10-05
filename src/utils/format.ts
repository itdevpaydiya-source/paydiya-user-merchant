/**
 * Formats an amount as Indian Rupee (INR) currency.
 * e.g. 248320 -> "₹2,48,320" or "₹ 2,48,320"
 */
export const formatINR = (amount: number, withSpace = false): string => {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
  return withSpace ? `₹ ${formatted}` : `₹${formatted}`;
};

/**
 * Formats transaction date strings into merchant-friendly relative or exact formats.
 * e.g. "Today, 10:24 AM" or "18 Sep 2026, 08:12 AM"
 */
export const formatTransactionDate = (dateStr: string, timeStr?: string): string => {
  if (dateStr.toLowerCase() === 'today' || dateStr.toLowerCase() === 'yesterday') {
    return timeStr ? `${dateStr}, ${timeStr}` : dateStr;
  }
  return timeStr ? `${dateStr}, ${timeStr}` : dateStr;
};

/**
 * Masks a bank account or card number.
 * e.g. "987654321098" -> "•••• 1098"
 */
export const maskAccountNumber = (accountNo: string): string => {
  if (!accountNo || accountNo.length < 4) return '••••';
  const lastFour = accountNo.slice(-4);
  return `•••• ${lastFour}`;
};

/**
 * Masks a mobile number.
 * e.g. "9876543210" -> "+91 98••• ••210"
 */
export const maskMobileNumber = (mobile: string): string => {
  const clean = mobile.replace(/\D/g, '');
  if (clean.length < 10) return mobile;
  const start = clean.slice(-10, -8);
  const end = clean.slice(-3);
  return `+91 ${start}••• ••${end}`;
};

/**
 * Format growth percentage string with arrow.
 * e.g. 12 -> "↑ 12%", -5 -> "↓ 5%"
 */
export const formatGrowth = (percentage: number): { text: string; isPositive: boolean } => {
  const isPositive = percentage >= 0;
  const arrow = isPositive ? '↑' : '↓';
  return {
    text: `${arrow} ${Math.abs(percentage)}%`,
    isPositive,
  };
};

/**
 * Async delay helper.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
