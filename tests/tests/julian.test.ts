import { describe, expect, test } from '@jest/globals';
import { CalendarToJD, CalendarToMJD, GetJD0Of, CalendarToWeekDay, IsLeapYear, JDToCalendar, MJDToCalendar, CalendarToYearDay, YearDayToCalendar } from '@src/julian';
import { AFTER_DATE, INVALID_ARGS, INVALID_DATE, INVALID_JD, INVALID_MJD, IWeekday, WEEKDAY } from '@src/utils';

describe("Test julian pack", () => {
    describe("CalendarToJD", () => {
        test("Test valid Calendar date format", () => {
            expect(() => CalendarToJD({ day: 29, month: 2, year: 2023 })).toThrowError(INVALID_DATE);
        })

        test("Test converting from Calendar to JD", () => {
            expect(CalendarToJD({ day: 4.81, month: 10, year: 1957 })).toEqual(2436116.31)
            expect(CalendarToJD({ day: 27.5, month: 1, year: 333 })).toEqual(1842713)

            expect(CalendarToJD({ day: 1.5, month: 1, year: 2000 })).toEqual(2451545)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1999 })).toEqual(2451179.5)
            expect(CalendarToJD({ day: 27.0, month: 1, year: 1987 })).toEqual(2446822.5)
            expect(CalendarToJD({ day: 19.5, month: 6, year: 1987 })).toEqual(2446966)
            expect(CalendarToJD({ day: 27.0, month: 1, year: 1988 })).toEqual(2447187.5)
            expect(CalendarToJD({ day: 19.5, month: 6, year: 1988 })).toEqual(2447332)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1900 })).toEqual(2415020.5)
            expect(CalendarToJD({ day: 1.0, month: 1, year: 1600 })).toEqual(2305447.5)

            expect(CalendarToJD({ day: 31.0, month: 12, year: 1600 })).toEqual(2305812.5)
            expect(CalendarToJD({ day: 10.3, month: 4, year: 837 })).toEqual(2026871.8)
            expect(CalendarToJD({ day: 31.0, month: 12, year: -123 })).toEqual(1676496.5)
            expect(CalendarToJD({ day: 1.0, month: 1, year: -122 })).toEqual(1676497.5)
            expect(CalendarToJD({ day: 12.5, month: 7, year: -1000 })).toEqual(1356001)
            expect(CalendarToJD({ day: 17.9, month: 8, year: -1001 })).toEqual(1355671.4)
            expect(CalendarToJD({ day: 1.5, month: 1, year: -4712 })).toEqual(0)
            expect(CalendarToJD({ day: 1, month: 1, year: -4712 })).toEqual(-0.5)

            expect(CalendarToJD({ day: 30, month: 1, year: -1000 })).toEqual(1355836.5)
            expect(CalendarToJD({ day: 28, month: 2, year: -1000 })).toEqual(1355865.5)
            expect(CalendarToJD({ day: 1, month: 3, year: -1000 })).toEqual(1355867.5)

            expect(CalendarToJD({ day: 28.5, month: 2, year: 2023 })).toEqual(2460004)
            expect(CalendarToJD({ day: 1.5, month: 3, year: 2023 })).toEqual(2460005)

            expect(CalendarToJD({ day: 29, month: 2, year: -1000 })).toEqual(1355866.5)
        })
    })

    describe("JDToCalendar", () => {
        test("Test valid JD format", () => {
            expect(() => JDToCalendar(-1)).toThrowError(INVALID_JD);
        })

        test("Test converting from JD to Calendar", () => {
            expect(JDToCalendar(2436116.31)).toEqual({ day: 4.81, month: 10, year: 1957 })
            expect(JDToCalendar(1842713)).toEqual({ day: 27.5, month: 1, year: 333 })

            expect(JDToCalendar(2451545)).toEqual({ day: 1.5, month: 1, year: 2000 })
            expect(JDToCalendar(2451179.5)).toEqual({ day: 1.0, month: 1, year: 1999 })
            expect(JDToCalendar(2446822.5)).toEqual({ day: 27.0, month: 1, year: 1987 })
            expect(JDToCalendar(2446966)).toEqual({ day: 19.5, month: 6, year: 1987 })
            expect(JDToCalendar(2447187.5)).toEqual({ day: 27.0, month: 1, year: 1988 })
            expect(JDToCalendar(2447332)).toEqual({ day: 19.5, month: 6, year: 1988 })
            expect(JDToCalendar(2415020.5)).toEqual({ day: 1.0, month: 1, year: 1900 })
            expect(JDToCalendar(2305447.5)).toEqual({ day: 1.0, month: 1, year: 1600 })

            expect(JDToCalendar(2305812.5)).toEqual({ day: 31.0, month: 12, year: 1600 })
            expect(JDToCalendar(2026871.8)).toEqual({ day: 10.3, month: 4, year: 837 })
            expect(JDToCalendar(1676496.5)).toEqual({ day: 31.0, month: 12, year: -123 })
            expect(JDToCalendar(1676497.5)).toEqual({ day: 1.0, month: 1, year: -122 })
            expect(JDToCalendar(1356001)).toEqual({ day: 12.5, month: 7, year: -1000 })
            expect(JDToCalendar(1355671.4)).toEqual({ day: 17.9, month: 8, year: -1001 })
            expect(JDToCalendar(0)).toEqual({ day: 1.5, month: 1, year: -4712 })

            expect(JDToCalendar(1355836.5)).toEqual({ day: 30, month: 1, year: -1000 })
            expect(JDToCalendar(1355865.5)).toEqual({ day: 28, month: 2, year: -1000 })
            expect(JDToCalendar(1355867.5)).toEqual({ day: 1, month: 3, year: -1000 })

            expect(JDToCalendar(2460004)).toEqual({ day: 28.5, month: 2, year: 2023 })
            expect(JDToCalendar(2460005)).toEqual({ day: 1.5, month: 3, year: 2023 })

            expect(JDToCalendar(1355866.5)).toEqual({ day: 29, month: 2, year: -1000 })
        })
    })

    describe("CalendarToMJD", () => {
        test("Test invalid date", () => {
            expect(() => CalendarToMJD({ day: 17, month: 10, year: 1582 })).toThrowError(AFTER_DATE)
            expect(() => CalendarToMJD({ day: 34, month: 1, year: 1582 })).toThrowError(INVALID_DATE)
        })

        test("Test converting date to MJD", () => {
            expect(CalendarToMJD({ day: 1, month: 1, year: 2004 })).toBe(53005);
            expect(CalendarToMJD({ day: 1, month: 1, year: 2000 })).toBe(51544);
            expect(CalendarToMJD({ day: 26, month: 8, year: 2023 })).toBe(60182);
            expect(CalendarToMJD({ day: 17, month: 10, year: 1900 })).toBe(15309);
            expect(CalendarToMJD({ day: 17, month: 11, year: 1858 })).toBe(0);
            expect(CalendarToMJD({ day: 1, month: 1, year: 1859 })).toBe(45);
            expect(CalendarToMJD({ day: 1, month: 1, year: 1860 })).toBe(410);
            expect(CalendarToMJD({ day: 1, month: 1, year: 1890 })).toBe(11368);
        })
    })

    describe("MJDToCalendar", () => {
        test("Test invalid date", () => {
            expect(() => MJDToCalendar(-0.5)).toThrowError(INVALID_MJD)
        })

        test("Test converting date to MJD", () => {
            expect(MJDToCalendar(53005)).toEqual({ day: 1, month: 1, year: 2004 });
            expect(MJDToCalendar(51544)).toEqual({ day: 1, month: 1, year: 2000 });
            expect(MJDToCalendar(60182)).toEqual({ day: 26, month: 8, year: 2023 });
            expect(MJDToCalendar(15309)).toEqual({ day: 17, month: 10, year: 1900 });
            expect(MJDToCalendar(0)).toEqual({ day: 17, month: 11, year: 1858 });
            expect(MJDToCalendar(45)).toEqual({ day: 1, month: 1, year: 1859 });
            expect(MJDToCalendar(410)).toEqual({ day: 1, month: 1, year: 1860 });
            expect(MJDToCalendar(11368)).toEqual({ day: 1, month: 1, year: 1890 });
        })
    })

    describe("GetJD0Of", () => {
        test("Test getting JD0 of the given year", () => {
            expect(GetJD0Of(2023)).toEqual(2459944.5);
            expect(GetJD0Of(2021)).toEqual(2459214.5);
            expect(GetJD0Of(2001)).toEqual(2451909.5);
            expect(GetJD0Of(1583)).toEqual(2299237.5);
            expect(GetJD0Of(300)).toEqual(1830631.5);
        })
    })

    describe("IsLeapYear", () => {
        test("Test whether a given year is leap or not", () => {
            expect(IsLeapYear(2023)).toEqual(false);
            expect(IsLeapYear(1985)).toEqual(false);
            expect(IsLeapYear(2020)).toEqual(true);
            expect(IsLeapYear(2000)).toEqual(true);
            expect(IsLeapYear(1900)).toEqual(false);
            expect(IsLeapYear(1582)).toEqual(false);
            expect(IsLeapYear(300)).toEqual(true);
            expect(IsLeapYear(-1000)).toEqual(true);
        })
    })

    describe("CalendarToWeekDay", () => {
        test("Test without day name", () => {
            expect(CalendarToWeekDay({ day: 30, month: 6, year: 1954 })).toBe(3);
            expect(CalendarToWeekDay({ day: 4, month: 10, year: 1582 })).toBe(4);
            expect(CalendarToWeekDay({ day: 15, month: 10, year: 1582 })).toBe(5);
        })

        test("Test with default day name", () => {
            expect(CalendarToWeekDay({ day: 30, month: 6, year: 1954 }, WEEKDAY)).toBe(WEEKDAY[3]);
            expect(CalendarToWeekDay({ day: 4, month: 10, year: 1582 }, WEEKDAY)).toBe(WEEKDAY[4]);
            expect(CalendarToWeekDay({ day: 15, month: 10, year: 1582 }, WEEKDAY)).toBe(WEEKDAY[5]);
        })

        test("Test with custom day name", () => {
            const MyWeekDay: IWeekday<number> = [10, 11, 12, 13, 14, 15, 16]

            expect(CalendarToWeekDay({ day: 30, month: 6, year: 1954 }, MyWeekDay)).toBe(MyWeekDay[3]);
            expect(CalendarToWeekDay({ day: 4, month: 10, year: 1582 }, MyWeekDay)).toBe(MyWeekDay[4]);
            expect(CalendarToWeekDay({ day: 15, month: 10, year: 1582 }, MyWeekDay)).toBe(MyWeekDay[5]);
        })
    })

    describe("CalendarToYearDay", () => {
        test("Test invalid date format", () => {
            expect(() => CalendarToYearDay({ day: 34, month: 1, year: 2023 })).toThrowError(INVALID_DATE);
        })

        test("Test getting the number of days from year-01-01", () => {
            expect(CalendarToYearDay({ day: 14, month: 11, year: 1978 })).toBe(318);
            expect(CalendarToYearDay({ day: 22, month: 4, year: 1988 })).toBe(113);
        })
    })

    describe("YearDayToCalendar", () => {
        test("Test invalid date format", () => {
            expect(() => YearDayToCalendar(-10, 2023)).toThrowError(INVALID_ARGS);
            expect(() => YearDayToCalendar(366, 2023)).toThrowError(INVALID_ARGS);
            expect(() => YearDayToCalendar(367, 2020)).toThrowError(INVALID_ARGS);
            expect(() => YearDayToCalendar(0, 2020)).toThrowError(INVALID_ARGS);
        })

        test("Test getting the number of days from year-01-01", () => {
            expect(YearDayToCalendar(318, 1978)).toEqual({ day: 14, month: 11, year: 1978 });
            expect(YearDayToCalendar(113, 1988)).toEqual({ day: 22, month: 4, year: 1988 });
        })
    })
})