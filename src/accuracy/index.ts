/**
 * Copyright (c) Nghiacangao 2023
 * 
 * Accuracy: Chapter 2, About accuracy
 * Includes: P.15 -> P.22.
 * 
 * See the summary version at:  
 */


/**
 * Find out which internal accuracy a programming language works
 * step: The number of significant bits in the mantissa of a floating number
 * Math.log10(2) * step: The number of significant digits in a decimal number
 **/

export function internalAccuracy() {
    var x = 1, step = 0;
    x *= 2;

    while (x + 1 !== x) {
        step++
        x *= 2;
    }

    return {
        step,
        accDigits: step * Math.log10(2)
    }
}

/**
 * Check the accuracy of trigonometric functions.
 */
export function trigonometricAccuracy() {
    function* generateDigitsOfPi() {
        let q = 1n;
        let r = 180n;
        let t = 60n;
        let i = 2n;
        while (true) {
            let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
            yield Number(digit);
            let u = i * 3n;
            u = (u + 1n) * 3n * (u + 2n);
            r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
            q *= 10n * i * (i++ * 2n - 1n);
            t *= u;
        }
    }

    let iter = generateDigitsOfPi();
    let digits;
    var F_PI = Math.atan(1) * 4;
    digits = iter.next().value;

    let j = -1;
    while (Math.floor(F_PI) === digits) {
        j++;
        F_PI = (F_PI - Math.floor(F_PI)) * 10;
        digits = iter.next().value;
    }

    return j;
}