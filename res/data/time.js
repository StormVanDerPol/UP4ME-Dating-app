import moment from "moment";

const now = new Date();

export const getYearIndex = (year) => {
    return year - 1950;
}

export const today = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    yearIndex: getYearIndex(now.getFullYear()),
}

export function toRetardDate({ year, month, day }) {

    let tempDate = {
        year: year + '',
        month: month + '',
        day: day + '',
    };

    tempDate = {
        year: tempDate.year,
        month: (tempDate.month.length == 1) ? '0' + tempDate.month : tempDate.month,
        day: (tempDate.day.length == 1) ? '0' + tempDate.day : tempDate.day,
    };

    return tempDate.year + tempDate.month + tempDate.day;

}

export function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    var day = 1;

    while (date.getMonth() === month) {
        days.push(day++ + '');
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export function getYears() {
    var years = [];
    var year = 1950;

    var currentYear = new Date().getFullYear();

    while (year != currentYear) {
        years.push(++year + '')
    }

    return years;
}

export const writtenMonths = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
];

export const toNonRetardDate = (bdateApi) => {

    let bdateApiStr = bdateApi + '';

    let bdate = {
        year: bdateApiStr.substring(0, 4),
        month: Math.min(bdateApiStr.substring(4, 6), 12) + '',
        day: Math.min(bdateApiStr.substring(6), 31) + '',
    }

    if (bdate.month.length == 1) {
        bdate.month = '0' + bdate.month;
    }


    if (bdate.day.length == 1) {
        bdate.day = '0' + bdate.day;
    }

    return bdate;

}

export function toNonRetardTime(retardTime) {

    let nonRetardTime;

    retardTime = retardTime + '';

    if (retardTime < 1000) {
        nonRetardTime = '0' + retardTime.substring(0, 1) + ':' + retardTime.substring(1, 3);
    }

    else {
        nonRetardTime = retardTime.substring(0, 2) + ':' + retardTime.substring(2, 4);
    }

    return nonRetardTime;
}

export const hrToMS = (hr) => {
    return hr * 60 * 60 * 1000;
}

export const calcAgeHet = (bdateApi) => {

    let now = moment();

    let bdateApiStr = bdateApi + '';

    let bdate = {
        year: parseInt(bdateApiStr.substring(0, 4), 10),
        month: Math.min(bdateApiStr.substring(4, 6), 12),
        day: Math.min(bdateApiStr.substring(6), 31)
    }

    let bdateMoment = moment(`${bdate.day}/${bdate.month}/${bdate.year}`, 'D/M/YYYY');

    let dateDiff = now.diff(bdateMoment, 'years');

    return dateDiff;
}
