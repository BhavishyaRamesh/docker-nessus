import * as authorizationModel from '../../models/Authorization/authorizationModel';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAuthCodeService = async (data: any) => {
    try {
        return await authorizationModel.getAuthCodeService(data);
    } catch (error) {
        console.error('getAuthCodeServiceService-', error);
    }
};

export const getTokenService = async (clientId: any, authCode: any) => {
    try {
        return await authorizationModel.getTokenService(clientId, authCode);
    } catch (error) {
        console.error('getTokenServiceService-', error);
    }
};

export const selectLoginService = async (data: any) => {
    try {
        return await authorizationModel.selectLoginService(data);
    } catch (error) {
        console.error('selectLoginService-', error);
    }
};

export const storeTokenService = async (data: any) => {
    try {
        return await authorizationModel.storeTokenService(data);
    } catch (error) {
        console.error('storeTokenService-', error);
    }
};