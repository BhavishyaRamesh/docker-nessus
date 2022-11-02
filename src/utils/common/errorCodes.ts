export const errorCodes = {
    SUCCESS: {
        Text: 'Success',
        Value: 200,
    },
    BAD_REQUEST: {
        Text: 'Bad Request',
        Value: 400,
    },
    NO_DATA_FOUND: {
        TEXT: 'No Data Found',
        Value: 400,
    },
    UNAUTHORIZED: {
        Text: 'Unauthorized',
        Value: 401,
    },
    INTERNAL_SERVER_ERROR: {
        Text: 'Internal Server Error',
        Value: 500,
    },
    PAGE_NOT_FOUND: {
        Text: 'Page not found',
        Value: 404,
    },
    UNKNOWN_ERR: {
        TEXT: 'Somthing went Wrong',
        Value: 400,
    },
};
export const commonCodes = {
    SUCCESS: {
        status: '200',
        message: 'Success',
    },
    NORECORDS: {
        status: '97',
        message: 'No Records to Send',
    },
    PARAM_ERR: {
        status: '400',
        message: 'Parameter error',
    },
    SERVER_ERR: {
        status: '99',
        message: 'Internal Server error',
    },
    PAGE_NOT_FOUND: {
        status: '404',
        message: 'Page not found',
    },
    APP_TRANSACTION_ERROR: {
        status: '402',
        message: 'App Transaction Error',
    },
    
    APP_FUNCTION_ERROR: {
        status: '500',
        message: 'App Function Error',
    },
    CREDENTIAL: {
        message: 'Unauthorized',
        status: '401',
    },
    AUTH_ERR: {
        message: 'Invalid Credentials',
        status: '401',
    },
    EMAIL_ERR: {
        status: 400,
        message: 'Email Already Registerd',
    },
    EMAIL_PHONE_ERR: {
        status: 400,
        message: 'Please select e-mail/phone',
    },
};
export const API_RESP_CODES = {
    HTTP_SUCCESS: {
        message: 'Success',
        status: 200,
    },
    HTTP_BAD_REQUEST: {
        message: 'Bad Request',
        status: 400,
    },
    HTTP_UNAUTHORIZED: {
        message: 'Unauthorized',
        status: 401,
    },
    HTTP_SERVER_ERR: {
        message: 'Internal Server Error',
        status: 500,
    },
    PAGE_NOT_FOUND: {
        message: 'Page not found',
        status: 404,
    },
    APP_PARAM_ERROR: {
        status: '400',
        message: 'Parameter error',
    },
};
