import {
    apiValidResponse,
    internalErrResp,
    logRequestInGCP,
    validateErrResp,
} from '../../utils/common/api-middleware';
import * as userProfileRegServices from '../../services/userProfileReg/userProfileRegService'
import {
    emailValidate, verifyemailValidate,
    initiateOTPValidate, otpValidate
} from '../../utils/common/validation';

export const checkEmailAddressController = async (req: any, res: any) => {
    try {
        let data = req.params;
        let result = await emailValidate(data);
        if (result.error) {
            return validateErrResp(res, result.error.message, 'checkEmailAddressController');
        } else {
            logRequestInGCP(data, 'checkEmailAddress');
            let responseData: any = await userProfileRegServices.checkEmailAddressServices(data);
            apiValidResponse(res, responseData, 'checkEmailAddress');
        }
    } catch (error) {
        internalErrResp(res, error);
    }
};

export const verifyEmailController = async (req: any, res: any) => {
    try {
        let data = req.body;
        let result = await verifyemailValidate(data);
        if (result.error) {
            return validateErrResp(res, result.error.message, 'verifyEmailController');
        } else {
            let responseData: any = await userProfileRegServices.verifyEmailService(data);
            apiValidResponse(res, responseData, 'verifyEmail');
        }
    } catch (error) {
        internalErrResp(res, error);
    }
};

export const initiateOTPController = async (req: any, res: any) => {
    try {
        let data = req.body;
        let result = await initiateOTPValidate(data);
        if (result.error) {
            return validateErrResp(res, result.error.message, 'initiateOTP');
        } else {
            logRequestInGCP(data, 'initiateOTP');
            let responseData: any = await userProfileRegServices.initiateOTPServices(data, req);
            apiValidResponse(res, responseData, 'initiateOTP');
        }
    } catch (error) {
        internalErrResp(res, error);
    }
};

export const validateOTPController = async (req: any, res: any) => {
    try {
        let data = req.body;
        let result = await otpValidate(data);
        if (result.error) {
            return validateErrResp(res, result.error.message, 'validateOTP');
        } else {
            logRequestInGCP(data, 'validateOTP');
            let responseData: any = await userProfileRegServices.validateOTPServices(data);
            apiValidResponse(res, responseData, 'validateOTP');
        }
    } catch (error) {
        internalErrResp(res, error);
    }
};