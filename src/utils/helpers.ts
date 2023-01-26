import { Telco } from "./enums";
import Swal, { SweetAlertOptions } from 'sweetalert2';

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