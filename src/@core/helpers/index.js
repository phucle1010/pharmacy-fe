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

export const getGender = (value) => {
    const findedKey = Object.keys(GENDER).filter((key) => GENDER[key].value === value)[0];
    return GENDER[findedKey].name;
}

export const getTypeOfUser = (value) => {
    const findedKey = Object.keys(TYPE_OF_USER).filter((key) => TYPE_OF_USER[key].value === value)[0];
    return TYPE_OF_USER[findedKey].name;
}