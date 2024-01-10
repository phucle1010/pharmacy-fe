import { DevTo } from "mdi-material-ui"

export const GENDER = {
    MALE: {
        value: 'MALE',
        name: 'Nam'
    },
    FEMALE: {
        value: 'FEMALE',
        name: 'Nữ'
    },
    OTHER:  {
        value: 'OTHER',
        name: 'Khác'
    },
}

export const TYPE_OF_USER = {
    ADMIN:  {
        value: 'ADMIN',
        name: 'Quản trị viên'
    },
    EMPLOYEE:  {
        value: 'EMPLOYEE',
        name: 'Nhân viên'
    },
}

export const PRODUCT_UNIT = {
    BOX: { 
        value: 'BOX',
        name: 'Hộp'
    },
    EACH: { 
        value: 'EACH',
        name: 'Cái'
    },
    PACKAGE: { 
        value: 'PACKAGE',
        name: 'Gói'
    },
    KILOGRAM: { 
        value: 'KILOGRAM',
        name: 'kg'
    },
    GRAM: { 
        value: 'GRAM',
        name: 'g'
    },
}

export const TYPE_ORDER = {
    BUY: {
        value: 'BUY',
        name: 'Mua'
    },
    SELL: {
        value: 'SELL',
        name: 'Bán'
    }
}

export const ORDER_STATUS = {
    NOT_PAID: { 
        value: "NOT_PAID",
        name: 'Chưa trả',
    },
    PAIDING: { 
        value: "PAIDING",
        name: 'Đang trả',
    },
    PAID: { 
        value: "PAID",
        name: 'Đã trả',
    }
}

export const getGender = (value) => {
    const findedKey = Object.keys(GENDER).filter((key) => GENDER[key].value === value)[0];
    return GENDER[findedKey].name;
}

export const getTypeOfUser = (value) => {
    const findedKey = Object.keys(TYPE_OF_USER).filter((key) => TYPE_OF_USER[key].value === value)[0];
    return TYPE_OF_USER[findedKey].name;
}

export const getProductUnit = (value) => {
    const findedKey = Object.keys(PRODUCT_UNIT).filter((key) => PRODUCT_UNIT[key].value === value)[0];
    return PRODUCT_UNIT[findedKey].name;
}

export const getOrderStatus = (value) => {
    const findedKey = Object.keys(ORDER_STATUS).filter((key) => ORDER_STATUS[key].value === value)[0];
    return ORDER_STATUS[findedKey].name;
}

export const formattedDate = (value) => {
    const newDate = new Date(Date.parse(value));
    const month = newDate.getMonth() + 1;
    const year = newDate.getUTCFullYear();
    const date = newDate.getDate();
    return `${date}-${month}-${year}`;
}