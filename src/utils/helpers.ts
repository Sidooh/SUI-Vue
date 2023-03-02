import { Frequency, Period, Telco } from "./enums";
import Swal, { SweetAlertOptions } from 'sweetalert2';
import moment from "moment";
import { Account, Invite } from "./types";
import plural from 'pluralize';

export const JWT = {
    decode: (token: string) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
};

export const groupBy = (array: any[], property: string) => {
    let hash: any = {}, props = property.split('.');

    for (let i = 0; i < array.length; i++) {
        let key = props.reduce((acc, prop) => acc && acc[prop], array[i]);

        if (!hash[key]) hash[key] = [];

        hash[key].push(array[i]);
    }

    return hash;
}

export const getTelcoFromPhone = (phone: string | number) => {
    phone = String(phone);

    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return Telco.SAFARICOM;
    } else if (phone.match(airtelRegEx)) {
        return Telco.AIRTEL;
    } else if (phone.match(telkomRegEx)) {
        return Telco.TELKOM;
    } else if (phone.match(equitelRegEx)) {
        return Telco.EQUITEL;
    } else if (phone.match(faibaRegEx)) {
        return Telco.FAIBA;
    } else {
        return null;
    }
};

export const toast = async (data: SweetAlertOptions) => {
    const options = {
        ...data,
        icon: data.icon ?? 'success',
        timer: (data.timer ?? 7) * 1000, // 7 secs,
        position: data.position ?? 'bottom-right',
        toast: data.toast ?? true,
        title: data.title,
        showConfirmButton: data.showConfirmButton ?? false,
    };

    await Swal.fire(options);
};

export const currencyFormat = (number?: number, currency = 'KES', decimals = 0) => number && (new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: decimals
})).format(number);

export const accountAccessor = (a: Account | Invite) => {
    return `${a.phone}${a.user?.name ? ` - ${a.user?.name}` : ''}`
}

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");
export const getRelativeDateAndTime = (date: string | Date) => {
    let relativeDate: string, time = moment(date).format("hh:mm A");

    if (moment(date).isSame(TODAY, "d")) {
        relativeDate = "Today";
    } else if (moment(date).isSame(YESTERDAY, "d")) {
        relativeDate = "Yesterday";
    } else {
        relativeDate = moment(date).format("D.M.y");
    }

    const toString = () => `${relativeDate} @${time}`

    return { date: relativeDate, time, toString }
}
export const hexToRgb = function hexToRgb(hexValue: string): string | null {
    let hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    }));

    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(', ') : null;
};
export const rgbaColor = function rgbaColor(hex: string = '#fff', alpha: number = .5) {
    return "rgba(".concat(hexToRgb(hex) ?? '0,0,0', ", ").concat(String(alpha), ")");
};

export const chartGradient = (rgbColor: number[]) => {
    let rgb = rgbColor.join()
    let gradient = document.createElement('canvas').getContext('2d')?.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, `rgba(${rgb}, 1)`);
    gradient?.addColorStop(.7, `rgba(${rgb}, .2)`);
    gradient?.addColorStop(1, `rgba(${rgb}, 0)`);

    return gradient;
}

export const pluralize = (word: string, count?: number, inclusive?: boolean) => plural(word, count, inclusive)

export const Str = {
    headline: (str: string) => {
        if (!str) return "";

        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    },
    ucFirst: (str: string) => {
        str = str.toLowerCase();

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

export const chartSelectOptions = {
    [Period.TODAY]: [Frequency.HOURLY],
    [Period.LAST_SEVEN_DAYS]: [Frequency.DAILY],
    [Period.LAST_THIRTY_DAYS]: [Frequency.DAILY, Frequency.WEEKLY],
    [Period.LAST_THREE_MONTHS]: [Frequency.WEEKLY, Frequency.MONTHLY],
    [Period.LAST_SIX_MONTHS]: [Frequency.MONTHLY],
    [Period.YTD]: [Frequency.MONTHLY, Frequency.QUARTERLY]
}