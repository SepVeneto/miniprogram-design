import { describe, it, expect } from 'vitest';
import { mockWithV1, mockWithV11, mockWithNoVersion } from './mock';
import { upgrade } from 'src/upgrade';

describe('version', () => {
  it('not string', () => {
    expect(() => upgrade({ version: 1 })).toThrowError(/must be string/);
  });
  it('invalid', () => {
    expect(() => upgrade({ version: '1.0.1' })).toThrowError(/is invalid/);
    expect(() => upgrade({ version: '1.0.' })).toThrowError(/is invalid/);
  });
});

describe('upgrade', () => {
  it('from init to 1.1', () => {
    expect(upgrade(mockWithNoVersion)).toStrictEqual(mockWithV11);
  });
  it('from 1.0 to 1.1', () => {
    expect(upgrade(mockWithV1)).toStrictEqual(mockWithV11);
  });
});
