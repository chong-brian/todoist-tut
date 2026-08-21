import { describe, it, expect } from 'vitest';
import { collatedTasksExist, generatePushId } from './src/helpers';

describe('helpers', () => {
  it('collatedTasksExist finds a known collated task', () => {
    expect(collatedTasksExist('INBOX')).toBeTruthy();
    expect(collatedTasksExist('NOPE')).toBeFalsy();
  });

  it('generatePushId returns a 20-char id', () => {
    expect(generatePushId()).toHaveLength(20);
  });
});
