import { describe, expect, test } from '@jest/globals';
import { INT, isValidDate, isJulianCalendar, SplitFloat, isAfterModifiedDate, INVALID_DATE } from '@src/utils';

describe("Test utils", () => {
    describe("INT", () => {
        test("Test rounding ability", () => {
            expect(INT(7 / 4)).toBe(1);
            expect(INT(8 / 4)).toBe(2);
            expect(INT(5.02)).toBe(5);
            expect(INT(5.9999)).toBe(5);
            expect(INT(-7.83)).toBe(-8);
        })
    })

    describe("splitFloat", () => {
        test("Test splitting a float into 2 parts.", () => {
            expect(SplitFloat(2)).toEqual([2, 0])
            expect(SplitFloat(2.5)).toEqual([2, 0.5])
            expect(SplitFloat(2.81)).toEqual([2, 0.81])
        })
    })

    describe("isValidDate", () => {
        test("Test valid Calendar date format", () => {
            expect(isValidDate({ day: 1, month: 1, year: 2023 })).toBe(true);
            expect(isValidDate({ day: 1.5, month: 1, year: 2023 })).toBe(true);
            expect(isValidDate({ day: 1, month: 1, year: 333 })).toBe(true);
            expect(isValidDate({ day: 1, month: 1, year: -1000 })).toBe(true);
            expect(isValidDate({ day: 1, month: 13, year: 2023 })).toBe(false);
            expect(isValidDate({ day: 29, month: 2, year: 2023 })).toBe(false);
            expect(isValidDate({ day: undefined, month: 2, year: 2023 })).toBe(false);
        })

        test("Test nonexistent date", () => {
            expect(isValidDate({ day: 5, month: 10, year: 1582 })).toBe(false);
            expect(isValidDate({ day: 14, month: 10, year: 1582 })).toBe(false);
            expect(isValidDate({ day: 10, month: 10, year: 1582 })).toBe(false);
            expect(isValidDate({ day: 15, month: 10, year: 1582 })).toBe(true);
            expect(isValidDate({ day: 4, month: 10, year: 1582 })).toBe(true);
            expect(isValidDate({ day: 1, month: 1, year: 1582 })).toBe(true);
            expect(isValidDate({ day: 10, month: 10, year: 2023 })).toBe(true);
        })
    })

    describe("isJulianCalendar", () => {
        test("Test valid Calendar date format", () => {
            expect(() => isJulianCalendar({ day: 1, month: 13, year: 2000 })).toThrowError(INVALID_DATE)
        });

        test("Test ability to determine a date is in Julian calendar", () => {
            expect(isJulianCalendar({ day: 1, month: 1, year: 2023 })).toBe(false);
            expect(isJulianCalendar({ day: 4, month: 10, year: 1582 })).toBe(true);
            expect(isJulianCalendar({ day: 10, month: 10, year: 1581 })).toBe(true);
            expect(isJulianCalendar({ day: 10, month: 5, year: 1582 })).toBe(true);
            expect(isJulianCalendar({ day: 10, month: 11, year: 1582 })).toBe(false);
            expect(isJulianCalendar({ day: 1, month: 10, year: 1582 })).toBe(true);
            expect(isJulianCalendar({ day: 15, month: 10, year: 1582 })).toBe(false);
        })
    })

    describe("isAfterModifiedDate", () => {
        test("Test valid Calendar date format", () => {
            expect(() => isAfterModifiedDate({ day: 1, month: 13, year: 2000 })).toThrowError(INVALID_DATE)
        });

        test("Test ability to determine a date is in Julian calendar", () => {
            expect(isAfterModifiedDate({ day: 1, month: 1, year: 2023 })).toBe(true);
            expect(isAfterModifiedDate({ day: 4, month: 11, year: 1582 })).toBe(false);
            expect(isAfterModifiedDate({ day: 4, month: 12, year: 1858 })).toBe(true);
            expect(isAfterModifiedDate({ day: 4, month: 9, year: 1858 })).toBe(false);
            expect(isAfterModifiedDate({ day: 18, month: 11, year: 1858 })).toBe(true);
            expect(isAfterModifiedDate({ day: 17, month: 11, year: 1858 })).toBe(true);
            expect(isAfterModifiedDate({ day: 16, month: 11, year: 1858 })).toBe(false);
        })
    })

})