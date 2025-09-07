import "@testing-library/react";
const { canJump, canJumpDP } = require('./JumpGame');

describe('Jump Game Tests', () => {

    const implementations = [
        { name: 'Greedy', func: canJump },
        { name: 'DP', func: canJumpDP }
    ];

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {
            test('Example 1: [2,3,1,1,4] should return true', () => {
                expect(func([2, 3, 1, 1, 4])).toBe(true);
            });

            test('Example 2: [3,2,1,0,4] should return false', () => {
                expect(func([3, 2, 1, 0, 4])).toBe(false);
            });

            test('Single element array should return true', () => {
                expect(func([0])).toBe(true);
                expect(func([1])).toBe(true);
                expect(func([5])).toBe(true);
            });

            test('Array with zero at start (length > 1) should return false', () => {
                expect(func([0, 1])).toBe(false);
                expect(func([0, 2, 3])).toBe(false);
            });

            test('Array where we can jump over zeros', () => {
                expect(func([2, 0, 0])).toBe(true);
                expect(func([3, 0, 0, 0])).toBe(true);
                expect(func([1, 0, 1, 0])).toBe(false);
            });

            test('Large jumps', () => {
                expect(func([5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0])).toBe(true);
                expect(func([1, 1, 1, 1, 1])).toBe(true);
            });

            test('Edge case: can reach exactly the last index', () => {
                expect(func([1, 1, 1, 1])).toBe(true);
                expect(func([3, 0, 0, 1])).toBe(true);
            });

            test('Stuck before the end', () => {
                expect(func([1, 0, 0, 0])).toBe(false);
                expect(func([2, 1, 0, 0])).toBe(false);
            });

            test('Maximum constraints', () => {

                const largeArray = new Array(1000).fill(1);
                expect(func(largeArray)).toBe(true);

                expect(func([100000, 0, 0, 0])).toBe(true);
            });
        });
    });

    describe('Additional Edge Cases', () => {
        test('Empty array edge cases', () => {
            expect(canJump([])).toBe(true); 
        });

        test('Two element arrays', () => {
            expect(canJump([1, 0])).toBe(true);
            expect(canJump([2, 1])).toBe(true);
            expect(canJump([0, 1])).toBe(false);
        });

        test('Arrays with large values', () => {
            expect(canJump([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
            expect(canJump([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(true);
        });

        test('Alternating patterns', () => {
            expect(canJump([1, 0, 1, 0, 1])).toBe(false);
            expect(canJump([2, 0, 2, 0, 1])).toBe(true);
        });
    });
});