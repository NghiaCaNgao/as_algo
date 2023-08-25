import { describe, expect, test } from '@jest/globals';
import { CalendarToJD, GetJD0Of, IsLeapYear } from '@src/julian';

describe("Test julian pack", () => {
    describe("CalendarToJD", () => {
        test("Test valid Calendar date format", () => {
            expect(() => CalendarToJD({ day: 29, month: 2, year: 2023 })).toThrowError("Invalid date.");
        })

        test("Test convert from Calendar to JD", () => {
            expect(CalendarToJD({ day: 4.81, month: 10, year: 1957 })).toBe(2436116.31)
            expect(CalendarToJD({ day: 27.5, month: 1, year: 333 })).toBe(1842713)

            expect(CalendarToJD({ day: 1.5, month: 1, year: 2000 })).toBe(2451545)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1999 })).toBe(2451179.5)
            expect(CalendarToJD({ day: 27.0, month: 1, year: 1987 })).toBe(2446822.5)
            expect(CalendarToJD({ day: 19.5, month: 6, year: 1987 })).toBe(2446966)
            expect(CalendarToJD({ day: 27.0, month: 1, year: 1988 })).toBe(2447187.5)
            expect(CalendarToJD({ day: 19.5, month: 6, year: 1988 })).toBe(2447332)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1900 })).toBe(2415020.5)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1600 })).toBe(2305447.5)

            expect(CalendarToJD({ day: 31.0, month: 12, year: 1600 })).toBe(2305812.5)
            expect(CalendarToJD({ day: 10.3, month: 4, year: 837 })).toBe(2026871.8)
            expect(CalendarToJD({ day: 31.0, month: 12, year: -123 })).toBe(1676496.5)
            expect(CalendarToJD({ day: 1.0, month: 1, year: -122 })).toBe(1676497.5)
            expect(CalendarToJD({ day: 12.5, month: 7, year: -1000 })).toBe(1356001)
            expect(CalendarToJD({ day: 17.9, month: 8, year: -1001 })).toBe(1355671.4)
            expect(CalendarToJD({ day: 1.5, month: 1, year: -4712 })).toBe(0)
            expect(CalendarToJD({ day: 1, month: 1, year: -4712 })).toBe(-0.5)

            expect(CalendarToJD({ day: 30, month: 1, year: -1000 })).toBe(1355836.5)
            expect(CalendarToJD({ day: 28, month: 2, year: -1000 })).toBe(1355865.5)
            expect(CalendarToJD({ day: 1, month: 3, year: -1000 })).toBe(1355867.5)

            expect(CalendarToJD({ day: 28.5, month: 2, year: 2023 })).toBe(2460004)
            expect(CalendarToJD({ day: 1.5, month: 3, year: 2023 })).toBe(2460005)

            expect(CalendarToJD({ day: 29, month: 2, year: -1000 })).toBe(1355866.5)
        })
    })

    describe("GetJD0Of", () => {
        test("Test get JD0 of the given year", () => {
            expect(GetJD0Of(2023)).toBe(2459944.5);
            expect(GetJD0Of(2021)).toBe(2459214.5);
            expect(GetJD0Of(2001)).toBe(2451909.5);
            expect(GetJD0Of(1583)).toBe(2299237.5);
            expect(GetJD0Of(300)).toBe(1830631.5);
        })
    })

    describe("IsLeapYear", () => {
        test("Test whether a given year is leap or not", () => {
            expect(IsLeapYear(2023)).toBe(false);
            expect(IsLeapYear(1985)).toBe(false);
            expect(IsLeapYear(2020)).toBe(true);
            expect(IsLeapYear(2000)).toBe(true);
            expect(IsLeapYear(1900)).toBe(false);
            expect(IsLeapYear(1582)).toBe(false);
            expect(IsLeapYear(300)).toBe(true);
            expect(IsLeapYear(-1000)).toBe(true);
        })
    })
})