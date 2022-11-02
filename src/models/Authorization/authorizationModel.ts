import { modelsServicesError } from '../../utils/common/api-middleware';
import { login_Data, getAuthCode, getToken, updateToken } from '../../utils/mySql/select';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAuthCodeService = async (data: any) => {
    try {
        return await getAuthCode(data);
    } catch (error) {
        modelsServicesError('getPlaceDataService', error);
        return;
    }
};

export const getTokenService = async (clientId: any, authCode: any) => {
    try { 
        return await getToken(clientId, authCode);
    } catch (error) {
        modelsServicesError('getPlaceDataService', error);
    }
};

export const selectLoginService = async (data: any) => {
    try {
        return await login_Data(data);
    } catch (error) {
        modelsServicesError('selectLoginService', error);
    }
};

export const storeTokenService = async (data: any) => {
    try {
        return await updateToken(data);
    } catch (error) {
        modelsServicesError('storeTokenService', error);
    }
};