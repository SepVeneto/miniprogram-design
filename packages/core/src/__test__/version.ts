import { describe, it, expect } from 'vitest';
import { upgrade } from 'src/upgrade';

describe('version', () => {
  it('match', () => {
    upgrade.VERSION = '2.0';
    const res = upgrade({ version: '1.0' });
    expect(res).toBe(upgrade.VERSION);
  });
});
