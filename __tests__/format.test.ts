import { formatINR } from '@/utils/format';

describe('formatINR', () => {
  it('formats amounts with rupee symbol', () => {
    expect(formatINR(500)).toContain('500');
    expect(formatINR(500)).toContain('₹');
  });
});
