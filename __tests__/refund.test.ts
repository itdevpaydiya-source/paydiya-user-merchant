import { mockTransactionService } from '@/mocks/services';

describe('refund idempotency', () => {
  it('does not double-process the same transaction', async () => {
    const first = await mockTransactionService.refund('TXN1001', 100, 'Test', 'key-1');
    expect(first.status).toBe('PROCESSING');
    const second = await mockTransactionService.refund('TXN1001', 100, 'Test', 'key-1');
    expect(second.status).toBe('PROCESSING');
    const third = await mockTransactionService.refund('TXN1001', 100, 'Test', 'key-2');
    expect(third.status).toBe('FAILED');
  });
});
