import { describe, expect, test } from '@jest/globals';
import { internalAccuracy, trigonometricAccuracy } from '@src/accuracy';

describe("Accuracy pack", () => {
    describe("internalAccuracy", () => {
        test("Test internal accuracy", () => {
            const acc = internalAccuracy();

            expect(acc.step).toBeGreaterThanOrEqual(52);
            expect(acc.accDigits).toBeGreaterThanOrEqual(15);
        })
    })

    describe("trigonometricAccuracy", () => {
        test("Test trigonometric accuracy", () => {
            const acc = trigonometricAccuracy();

            expect(acc).toBeGreaterThanOrEqual(15);
        })
    })
})
