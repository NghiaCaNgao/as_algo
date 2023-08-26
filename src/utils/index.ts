/**
 * Copyright (c) Nghiacangao 2023
 * 
 * Utils: 
 * Includes: 
 * 
 * See the summary version at:  
 */

export interface IDate {
    day: number,
    month: number,
    year: number
}

export type IWeekday<T = string> = [T, T, T, T, T, T, T]; // Just 7 elements corresponds to 7 days in a week

export const WEEKDAY: IWeekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const INT = Math.floor;
export const INVALID_DATE = "Invalid date"
export const AFTER_DATE = "After Modified date"
export const INVALID_JD = "Invalid JD"
export const INVALID_MJD = "Invalid MJD"
export const INVALID_ARGS = "Invalid arguments"

export const NONEXISTENT_DATE_START: IDate = {
    day: 5,
    month: 10,
    year: 1582
}

export const NONEXISTENT_DATE_END: IDate = {
    day: 14,
    month: 10,
    year: 1582
}

export const MODIFIED_DATE: IDate = { // 2400000.5 in JD
    day: 17,
    month: 11,
    year: 1858
}

/**
 * Split into 2 parts: integer part and  fractional part. VD: 29.5 -> [29, 0.5]
 * @param num 
 * @returns [int, fractional]
 */
export function SplitFloat(num: number) {
    return [Math.floor(num), num - Math.floor(num)];
}

/**
 * Check if a date is valid or not.
 * @param date 
 * @returns true if valid and vice versa
 */
export function isValidDate(date: IDate): boolean {
    let { day, month, year } = date;
    day = Math.floor(day);

    const dateObj = new Date(year, month - 1, day);

    // A leap year in Julian calendar just need to be divisible by 4
    if (year < NONEXISTENT_DATE_START.year && month === 2 && day === 29) {
        if (year % 4 === 0) return true;
    }

    // valid date must follows the Calendar date format
    if (
        dateObj.getDate() !== day ||
        dateObj.getMonth() + 1 !== month ||
        dateObj.getFullYear() !== year) {
        return false;
    }

    // valid < 1582-10-05 && valid > 1582-10-14
    if (year === NONEXISTENT_DATE_START.year) {
        if (month === NONEXISTENT_DATE_START.month) {
            if (day <= NONEXISTENT_DATE_END.day && day >= NONEXISTENT_DATE_START.day) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Check if the given date is in Julian calendar or Gregorian calendar
 * @param date 
 * @returns true if the date is in Julian calendar
 */
export function isJulianCalendar(date: IDate): boolean {
    if (!isValidDate(date)) {
        throw new Error("Invalid date.");
    }

    const { day, month, year } = date;

    if (year < NONEXISTENT_DATE_START.year) return true;
    if (year === NONEXISTENT_DATE_START.year) {
        if (month < NONEXISTENT_DATE_START.month) return true;
        if (month === NONEXISTENT_DATE_START.month && day < NONEXISTENT_DATE_START.day) return true;
    }

    return false;
}

/**
 * Check if the given date is after the modified date
 * @param date 
 * @returns true if the date is after the modified date
 */
export function isAfterModifiedDate(date: IDate): boolean {
    if (!isValidDate(date)) {
        throw new Error("Invalid date.");
    }

    const { day, month, year } = date;

    if (year > MODIFIED_DATE.year) return true;
    if (year === MODIFIED_DATE.year) {
        if (month > MODIFIED_DATE.month) return true;
        if (month === MODIFIED_DATE.month && day >= MODIFIED_DATE.day) return true;
    }

    return false;
}