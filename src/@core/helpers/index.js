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