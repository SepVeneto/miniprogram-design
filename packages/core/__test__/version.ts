import { describe, expect, it } from 'vitest'
import {
  mockWithNoVersion,
  mockWithV1,
  mockWithV11,
  mockWithV11NoTabbars,
  mockWithV1NoTabbars,
} from './mock'
import { upgrade } from 'src/upgrade'

describe('version', () => {
  it('not string', () => {
    expect(() => upgrade({ version: 1 })).toThrowError(/must be string/)
  })
  it('invalid', () => {
    expect(() => upgrade({ version: '1.0.1' })).toThrowError(/is invalid/)
    expect(() => upgrade({ version: '1.0.' })).toThrowError(/is invalid/)
  })
})

// describe('upgrade', () => {
//   it('from init to 1.1', () => {
//     expect(upgrade(mockWithNoVersion)).toStrictEqual(mockWithV11);
//   });
//   it('from 1.0 to 1.1', () => {
//     expect(upgrade(mockWithV1)).toStrictEqual(mockWithV11);
//   });
// });

// describe('with no tabbars', () => {
//   it('from 1.0 to 1.1', () => {
//     expect(upgrade(mockWithV1NoTabbars)).toStrictEqual(mockWithV11NoTabbars);
//   });
// });
