/**
 * Copyright (c) Nghiacangao 2023
 * 
 * Julian: Chapter 7, Julian day 
 * Includes: P.59 -> P.66. F-7.1, 
 * 
 * See the summary version at:  
 */


import { IDate, INT, NONEXISTENT_DATE_START, isAfterModifiedDate, isJulianCalendar, isValidDate } from "@src/utils";

/**
 * Convert from Calendar date to Julian day. F-7.1. P-61
 * @param date Calendar date
 * @returns JD
 */
export function CalendarToJD(date: IDate): number {
    if (!isValidDate(date)) {
        throw new Error("Invalid date.");
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
        throw new Error("Invalid date.");
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