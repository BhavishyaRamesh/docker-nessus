import {
    logRequestInGCP,
    modelsServicesError,
} from '../../utils/common/api-middleware';
import {
    getUserDataEmail,
    getUserDataSecondaryEmail,
    updateUserData,
    updateisChangeEmail,
    getAppointmentsDataEmail,
    getAppointmentsDataPhone,
    getEmailOTPData,
    getNewEmail,
    getPhoneOTPData,
    getUserDataPhone,
    insertOtpData,
    updateIsActive,
    getOtpData,
    validateUserId,
    updateOtpIsActive,
} from '../../utils/mySql/select';
import { generateRandomNumber } from '../../utils/common/reusableFunctions';
import { errorCodes, commonCodes } from '../../utils/common/errorCodes';
import { errorMessage } from '../../utils/common/dictionaries';
import twilio from '../../utils/common/twilio';
// import sendgrid from '../../utils/common/sendgrid';
import moment from 'moment';
import Bottleneck from 'bottleneck';
import { initiateOTPNotification } from '../../utils/notificationService';
let TinyURL = require('tinyurl');
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 333,
});

export const checkemailAddress = async (params: any) => {
    try {
        logRequestInGCP(params, 'params-checkemailAddress');
        const response: any = await getUserDataEmail(params);
        const secondaryResponse: any = await getUserDataSecondaryEmail(params);
        if (
            !response?.message[0]?.length &&
            !secondaryResponse?.message[0]?.length
        ) {
            return {
                status: errorCodes.SUCCESS.Value,
                message: `${params.email} is available for registration`,
            };
        } else {
            return {
                status: commonCodes.EMAIL_ERR.status,
                message: commonCodes.EMAIL_ERR.message,
            };
        }
    } catch (error) {
        modelsServicesError('checkEmailAddress', error);
    }
};

export const verifyEmails = async (params: any) => {
    try {
        logRequestInGCP(params, 'params-verifyEmails');
        const validateUser: any = await validateUserId({ userId: params.userId });
        if (validateUser.message[0].length) {
            let response = await updateUserData({ id: params.userId });
            if (params.isChangeEmail === true) {
                await updateisChangeEmail({ id: params.userId });
            }
            return response;
        } else {
            return {
                status: errorCodes.NO_DATA_FOUND.Value,
                message: errorCodes.NO_DATA_FOUND.TEXT,
            };
        }
    } catch (error) {
        modelsServicesError('verifyEmails', error);
    }
};

export const initiateOTP = async (data: any, req?: any) => {
    try {
        logRequestInGCP(data, 'params-initiateOTP');
        const { email, phone, isUserOTP, validationMethod, isChangeEmail } = data;
        let error: any = '';
        let otps: any = [];
        let isChangeEmailVerify =
            isChangeEmail === true ? isChangeEmail : false;
        if (email !== '' && email !== null && validationMethod == 'email') {
            let secondaryEmail: any = [email];
            try {
                const queryNewSecondaryEmailSnapshot: any =
                    await getUserDataSecondaryEmail(data);

                if (queryNewSecondaryEmailSnapshot?.message[0]?.length) {
                    let newSecondaryEmailData: any =
                        queryNewSecondaryEmailSnapshot?.message[0];
                    secondaryEmail = newSecondaryEmailData[0]
                        ?.SecondaryEmail || [email];
                    secondaryEmail = secondaryEmail.split(',');
                }
            } catch (err) {
                modelsServicesError('initiateOTP-email', err);
            }
            otps = await Promise.all(
                secondaryEmail.map(async (secEmail: any) => {
                    let res: any = await getEmailOTPData({ email: secEmail });
                    return res?.message[0];
                })
            );
        } else if (
            phone !== '' &&
            phone !== null &&
            validationMethod == 'phone'
        ) {
            otps = await getPhoneOTPData({ phone: phone });
            otps = otps.message;
        }
        let appointments: any = [];
        if (
            isUserOTP !== undefined &&
            (isUserOTP === true || isUserOTP === 'true')
        ) {
            if (email !== '' && email !== null && validationMethod == 'email') {
                appointments = await getUserDataEmail({
                    email: email.replace(/\s/g, ''),
                });
                appointments = appointments?.message[0];
                if (appointments.length === 0) {
                    const querySnapshot: any = await getNewEmail({
                        email: email,
                    });
                    if (!!querySnapshot.message[0].length) {
                        appointments = querySnapshot.message[0];
                        isChangeEmailVerify = appointments[0].IsChangeEmail;
                    }
                }
            } else if (
                phone !== '' &&
                phone !== null &&
                validationMethod == 'phone'
            ) {
                appointments = await getUserDataPhone({
                    phone: phone?.replace(/\s/g, ''),
                });
                appointments = appointments?.message[0];
            }
        } else {
            if (email !== '' && email !== null && validationMethod == 'email') {
                appointments = await getAppointmentsDataEmail({ email: email });
                appointments = appointments?.message[0];
            } else if (
                phone !== '' &&
                phone !== null &&
                validationMethod == 'phone'
            ) {
                appointments = await getAppointmentsDataPhone({ phone: phone });
                appointments = appointments?.message[0];
            }
        }
        if (appointments.length) {
            let randomNumber: any;
            if (otps[0].length) {
                otps[0].forEach(async (doc: any) => {
                    await updateIsActive({ id: doc?.User_Id });
                });
            }
            randomNumber = generateRandomNumber();
            let expires: any = new Date();
            expires.setMinutes(expires.getMinutes() + 5);
            await insertOtpData({
                email: email,
                phone: phone,
                otp: randomNumber,
                expiresIn: new Date(expires),
                isActive: 1,
            });
            if (email && validationMethod == 'email') {
                initiateOTPNotification(
                    email,
                    randomNumber,
                    appointments?.[0]?.FirstName,
                    appointments?.[0]?.User_Id,
                    isChangeEmailVerify,
                    req.token
                )
                // await sendgrid
                //     .sendOneTimePasswordNotificationMail(
                //         email,
                //         randomNumber,
                //         appointments?.[0]?.FirstName,
                //         appointments?.[0]?.User_Id,
                //         isChangeEmailVerify,
                //         req.token
                //     )
                //     .catch(() => {
                //         error = errorMessage.otpMessage;
                //     });
            } else {
                const url = async () => {
                    let link =
                        isChangeEmailVerify === true
                            ? `https://wsl-multitenancy-dev-ac13b.web.app/verifymail/${email}-${appointments?.[0]?.id}-true`
                            : `https://wsl-multitenancy-dev-ac13b.web.app/verifymail/${email}-${appointments?.[0]?.id}`;
                    const res: any = await TinyURL.shorten(link).then(
                        (response: any) => {
                            return response;
                        }
                    );
                    if (res !== null && res !== undefined) {
                        await limiter.schedule(() => {
                            return twilio
                                .sendTextMessage(
                                    phone,
                                    `${randomNumber} is your Worksite Labs verification code.\n\nYou can also verify by clicking this link \n${res}`
                                )
                                .catch(() => {
                                    error = errorMessage.otpMessage;
                                });
                        });
                    }
                };
                url();
            }
        } else {
            return {
                status: errorCodes.NO_DATA_FOUND.Value,
                message: errorCodes.NO_DATA_FOUND.TEXT,
            };
        }
        if (error === '') {
            return {
                appointments: appointments.length
            };
        } else {
            return {
                status: errorCodes.BAD_REQUEST.Value,
                appointments: appointments.length,
                msg: error,
            };
        }
    } catch (err) {
        modelsServicesError('initiateOTP', err);
    }
};

export const validateOTP = async (param: any) => {
    try {
        logRequestInGCP(param, 'params-validateOTP');
        const collectionQuery: any = await getOtpData({ otp: param.otp });
        // check collection documents
        if (!collectionQuery?.message[0]?.length) {
            return {
                status: errorCodes.NO_DATA_FOUND.Value,
                message: errorCodes.NO_DATA_FOUND.TEXT,
            };
        }

        let onetimepassword: any = [];

        const otpData: any = collectionQuery?.message[0];

        otpData.forEach((loc: any) => {
            if (
                moment(loc?.ExpiresIn?.toString()).format(
                    'MMMM Do YYYY, h:mm:ss a'
                ) > moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            ) {
                onetimepassword.push({
                    ...loc,
                });
            }
        });
        // update false for active
        collectionQuery?.message[0]?.forEach(async function (doc: any) {
            await updateOtpIsActive({ userId: doc.User_Id });
        });

        // send success/failure verification
        if (onetimepassword.length) {
            return
        } else {
            return {
                status: errorCodes.NO_DATA_FOUND.Value,
                message: errorCodes.NO_DATA_FOUND.TEXT,
            };
        }

    } catch (error) {
        modelsServicesError('validateOTP', error);
    }
};
