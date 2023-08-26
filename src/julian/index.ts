/**
 * Copyright (c) Nghiacangao 2023
 * 
 * Julian: Chapter 7, Julian day 
 * Includes: P.59 -> P.66. F-7.1, 
 * 
 * See the summary version at: https://github.com/NghiaCaNgao/as_algo/wiki/Julian_Day
 */


import { AFTER_DATE, IDate, INT, INVALID_ARGS, INVALID_DATE, INVALID_JD, INVALID_MJD, IWeekday, NONEXISTENT_DATE_START, SplitFloat, isAfterModifiedDate, isJulianCalendar, isValidDate } from "@src/utils";

/**
 * Convert from Calendar date to Julian day. F-7.1. P-61
 * @param date Calendar date
 * @returns JD
 */
export function CalendarToJD(date: IDate): number {
    if (!isValidDate(date)) {
        throw new Error(INVALID_DATE);
    }

    let { year, month, day } = date;

    if (month <= 2) {
        year--;
        month += 12
    }

    const A = INT(year / 100);
    const B = (!isJulianCalendar(date)) ? 2 - A + INT(A / 4) : 0

    return INT(365.25 * (year + 4716)) + INT(30.6001 * (month + 1)) + day + B - 1524.5;
}

/**
 * Convert from Calendar date to Julian day. P.63
 * @param date Calendar date
 * @returns MJD
 */
export function CalendarToMJD(date: IDate): number {
    if (!isAfterModifiedDate(date)) {
        throw new Error(AFTER_DATE);
    }

    return CalendarToJD(date) - 2400000.5;
}

/**
 * Get Julian Day JD0 corresponding to year-Jan-0.0 or (year-1) Dec 31. P.62
 * @param year 
 * @returns JD0
 */
export function GetJD0Of(year: number) {
    year = year - 1

    const A = INT(year / 100);
    const B = (NONEXISTENT_DATE_START.year <= year) ? 2 - A + INT(A / 4) : 0

    return INT(365.25 * year) + B + 1721422.5
}

/**
 * Convert from JD to Calendar date.
 * @param JD 
 * @returns Calendar date
 */
export function JDToCalendar(JD: number): IDate {
    if (JD < 0) {
        throw new Error(INVALID_JD);
    }

    const [Z, F] = SplitFloat(JD + 0.5);
    const alpha = INT((Z - 1867216.25) / 36524.25);
    const A = (Z < 2299161)
        ? Z
        : Z + 1 + alpha - INT(alpha / 4);

    const B = A + 1524;
    const C = INT((B - 122.1) / 365.25);
    const D = INT(365.25 * C);
    const E = INT((B - D) / 30.6001);

    const day = B - D - INT(30.6001 * E) + F;
    const month = (E < 14) ? E - 1 : E - 13;
    const year = (month > 2) ? C - 4716 : C - 4715;

    return { day: Number(day.toFixed(2)), month, year }
}

/**
 * Convert from MJD to Calendar date.
 * @param MJD 
 * @returns Calendar date
 */
export function MJDToCalendar(MJD: number): IDate {
    if (MJD < 0) {
        throw new Error(INVALID_MJD);
    }

    return JDToCalendar(MJD + 2400000.5);
}

/**
 * Check if a given year is a leap or not. P.62
 * @param year 
 * @returns true if the year is a leap
 */
export function IsLeapYear(year: number) {
    if (NONEXISTENT_DATE_START.year < year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    } else {
        return year % 4 === 0;
    }
}

export function CalendarToWeekDay<T = string>(date: IDate, dayName?: IWeekday<T>): number | T {
    const code = INT(CalendarToJD(date) + 1.5) % 7; // Check valid date in CalendarToJD

    return (dayName)
        ? dayName[INT(CalendarToJD(date) + 1.5) % 7]
        : code
}

export function CalendarToYearDay(date: IDate): number {
    if (!isValidDate(date)) {
        throw new Error(INVALID_DATE);
    }

    const { year, month, day } = date;
    const K = IsLeapYear(year) ? 1 : 2;
    const N = INT((275 * month) / 9) - K * INT((month + 9) / 12) + day - 30;

    return N;
}

export function YearDayToCalendar(yearDay: number, year: number): IDate {
    const K = IsLeapYear(year) ? 1 : 2;

    if (yearDay <= 0 || (yearDay >= 366 && K == 1) || (yearDay >= 365 && K == 2)) {
        throw new Error(INVALID_ARGS);
    }

    const month = yearDay < 32
        ? 1
        : INT(((9 * (K + yearDay)) / 275) + 0.98)

    const day = yearDay - INT((275 * month) / 9) + K * INT((month + 9) / 12) + 30;

    return { day, month, year };
}