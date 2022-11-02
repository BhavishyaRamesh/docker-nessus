import { connection } from '../database/mySqlConnection';
import {
    Authorization,
    socialLogin,
    userProfileReg,
} from './storedProcedures';
import { errorMessage } from '../common/dictionaries';
// import { cryptoText } from '../common/sharedlib';


export const updateUserData = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.updateUserData,
            [data.id],
            (error: any, _response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: errorMessage.updatedMessage,
                    });
                }
            }
        );
    });
};
export const updateisChangeEmail = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.updateisChangeEmail,
            [data.id],
            (error: any, _response: any) => {
                if (error) {
                    resolve({ status: false, errorMessage: error });
                } else {
                    resolve({
                        status: true,
                        Update: errorMessage.updatedMessage,
                    });
                }
            }
        );
    });
};
export const getUserDataEmail = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getUserDataEmail,
            [data.email],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: response,
                    });
                }
            }
        );
    });
};
export const getSocialLoginDetails = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            socialLogin.getSocialLoginDetails,
            [data.email],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        data: response,
                    });
                }
            }
        );
    });
};
export const getUserDataSecondaryEmail = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getUserDataSecondaryEmail,
            [data.email],
            (error: any, res: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: res,
                    });
                }
            }
        );
    });
};
//initiateOTP
export const getEmailOTPData = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getEmailOtpData,
            [data.email],
            (err: any, response: any) => {
                if (err) {
                    resolve({ status: false, message: err });
                } else {
                    resolve({
                        status: true,
                        message: response,
                    });
                }
            }
        );
    });
};
export const getPhoneOTPData = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getPhoneOtpData,
            [data.phone],
            (err: any, res: any) => {
                if (err) {
                    resolve({ status: false, message: err });
                } else {
                    resolve({
                        status: true,
                        message: res,
                    });
                }
            }
        );
    });
};
export const getNewEmail = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getNewEmail,
            [data.email],
            (error: any, value: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: value,
                    });
                }
            }
        );
    });
};
export const getUserDataPhone = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getUserDataPhone,
            [data.phone],
            (error: any, returnData: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: returnData,
                    });
                }
            }
        );
    });
};

export const getAppointmentsDataEmail = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getAppointmentsDataEmail,
            [data.email],
            (error: any, returns: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: returns,
                    });
                }
            }
        );
    });
};
export const getAppointmentsDataPhone = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getAppointmentsDataPhone,
            [data.phone],
            (error: any, result: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: result,
                    });
                }
            }
        );
    });
};
export const updateIsActive = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.updateIsActive,
            [data.id],
            (error: any, resData: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: resData,
                    });
                }
            }
        );
    });
};
export const insertOtpData = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.insertOtpData,
            [data.email, data.phone, data.otp, data.expiresIn, data.isActive],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, errorMessage: error });
                } else {
                    resolve({
                        status: true,
                        message: response,
                    });
                }
            }
        );
    });
};


export const getOtpData = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getOtpData,
            [data.otp],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, errormessage: error });
                } else {
                    resolve({
                        status: true,
                        message: response,
                    });
                }
            }
        );
    });
};
export const validateUserId = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.getValidateData,
            [data.userId],
            (error: any, responses: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: responses,
                    });
                }
            }
        );
    });
};
export const updateOtpIsActive = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            userProfileReg.updateOtpIsActive,
            [data.userId],
            (error: any, results: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: results,
                    });
                }
            }
        );
    });
};

export const login_Data = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.login,
            [data.email],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    let result = response[0][0];
                    resolve({
                        status: response[0][0] ? true : false,
                        message: response[0][0] ? 'Logged In Successfully' : 'Invalid Email or Password',
                        data: result,
                    });
                }
            }
        );
    });
};

export const updateToken = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.updateToken,
            [data.email, data.id, data.accessToken],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    let result = response[0][0];
                    resolve({
                        status: result.status === 1 ? true : false,
                        message: result.message,
                        data: result,
                    });
                }
            }
        );
    });
};

export const getAuthCode = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.getAuthCode,
            [data],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    const result = response[0][0];
                    resolve({
                        status: result && result.Auth_code ? true : false,
                        authCode:
                            result && result.Auth_code
                                ? result.Auth_code
                                : null,
                    });
                }
            }
        );
    });
};

export const getToken = (clientId: any, authCode: any) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.getToken,
            [clientId, authCode],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    const result = response[0][0];
                    resolve({
                        status: result && result.Token ? true : false,
                        token: result && result.Token ? result.Token : null,
                    });
                }
            }
        );
    });
};

export const checkToken = (token: any) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.checkToken,
            [token],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    const result = response[0][0];
                    resolve({
                        status: result && result.id ? true : false,
                    });
                }
            }
        );
    });
};

export const postSLUserdetails = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            socialLogin.postSocialLoginUserdetails,
            [
                data.Email,
                data.Address1,
                data.Address2,
                data.City,
                data.County,
                data.State,
                data.Country,
                data.Zipcode,
                data.BirthDate,
                data.Ethnicity,
                data.FirstName,
                data.MiddleName,
                data.LastName,
                data.HasMinors,
                data.IsINTNameFormat,
                data.IsNotHavePermanentAddress,
                data.IsVerified,
                data.PassportCountry,
                data.PassportNo,
                data.Phone,
                data.Race,
                data.Sex,
                data.socialLoginDetails.signupType,
            ],
            (error: any, response: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: response[0],
                    });
                }
            }
        );
    });
};
export const postSocialLogin = (data: any) => {
    return new Promise((resolve) => {
        connection.query(
            socialLogin.postSocialLogin,
            [
                data.userid,
                data.firstName,
                data.lastName,
                data.signupType,
                data.id,
                data.email,
                data.image,
                data.authorizeUrl,
            ],
            (error: any, responsesData: any) => {
                if (error) {
                    resolve({ status: false, message: error });
                } else {
                    resolve({
                        status: true,
                        message: responsesData,
                    });
                }
            }
        );
    });
};