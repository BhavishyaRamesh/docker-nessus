import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
import * as authorizationServices from '../../services/Authorization/authorizationServices';
import {
    apiInvalidResponse,
    apiValidResponse,
    internalErrResp,

} from '../../utils/common/api-middleware';
import { errorMessage } from '../../utils/common/dictionaries';
import {errorCodes,commonCodes} from '../../utils/common/errorCodes'
import { authenticate, authenticateApplication, authenticateUser } from '../../utils/common/validation'


export const getAuthCodeController = async (req: any, res: any) => {
    try {
        const data = await req.headers['x-client-id'];

        const result = authenticateApplication(data);

        if (result.error) {
            apiInvalidResponse(res,errorCodes.UNAUTHORIZED.Value, errorCodes.UNAUTHORIZED.Text, null);
        } else{
            if (data) {

                const responseData: any = await authorizationServices.getAuthCodeService(data);
    
                if (responseData.status) {
                    apiValidResponse(res, responseData, 'getAuthCodeController');
                } else if (!responseData.status && !responseData.authCode){
                    apiInvalidResponse(res, 401, 'You are not authenticated', null);
                } else {
                    internalErrResp(res, errorMessage.dataBaseResponse);
                }
    
            } else {
                apiInvalidResponse(res,errorCodes.UNAUTHORIZED.Value, errorCodes.UNAUTHORIZED.Text, null);
            }
        }

        
    } catch (error) {
        internalErrResp(res, error);
    }
};

export const getTokenController = async (req: any, res: any) => {
    try {
        let clientId = await req.headers['x-client-id'];
        let authCode = await req.headers['x-auth-code'];

        const result = authenticate(clientId,authCode);

        if (result.error) {
            apiInvalidResponse(res,errorCodes.UNAUTHORIZED.Value, errorCodes.UNAUTHORIZED.Text, null);
        } 

        if ( clientId && authCode ) {

            const responseData: any = await authorizationServices.getTokenService(clientId, authCode);

            if (responseData.status) {
                apiValidResponse(res, responseData, 'getTokenController');
            } else if (!responseData.status && !responseData.token){
                apiInvalidResponse(res, 401, 'You are not authenticated', null);
            } else {
                internalErrResp(res, errorMessage.dataBaseResponse);
            }

        } else {
            apiInvalidResponse(res, errorCodes.UNAUTHORIZED.Value, errorCodes.UNAUTHORIZED.Text, null);
        }

    } catch (error) {
        internalErrResp(res, error);
    }
};

export const selectLoginController = async (req: any, res: any) => {
    try {
        let accessToken = await req.headers['x-access-token'];
        let data = req.body;

        const result = authenticateUser(accessToken,data);
        if (result.error) {
            apiInvalidResponse(res,errorCodes.UNAUTHORIZED.Value, errorCodes.UNAUTHORIZED.Text, null);
            return;
        } else {
           
                let responseData: any = await authorizationServices.selectLoginService(data);
                if (responseData && !responseData?.status) {
                    apiInvalidResponse(res, commonCodes.AUTH_ERR.status, responseData.message, null);
                } else if (responseData && responseData?.status && responseData?.data?.Email) {
                    if(!responseData?.status && !responseData?.data?.Email){
                        apiInvalidResponse(res, commonCodes.AUTH_ERR.status, responseData.message, null);
                    }else if (responseData && responseData?.status && responseData?.data?.Email){
                        const passwordIsValid = bcrypt.compareSync(data.password, responseData?.data?.Password);
                        if(!passwordIsValid){
                            apiInvalidResponse(res, commonCodes.AUTH_ERR.status, "Invalid Email or Password", null);
                        }else{
                            const token = jwt.sign(
                                { 
                                    id: responseData.data.User_ID,
                                    email: responseData.data.Email
                                },
                                accessToken,
                                { expiresIn : '1h'}
            
                            )
                            // let storeToken: any = await authorizationServices.storeTokenService({
                            //     id: responseData.data.User_ID,
                            //     email: responseData.data.Email,
                            //     accessToken: token
                            // });
                            if(true){
                                responseData = [
                                    {
                                        message: responseData.message,
                                        userId: responseData.data.User_ID,
                                        email: responseData.data.Email,
                                        accessToken: token,
                                    },
                                ];
                                
                                apiValidResponse(res, responseData[0], 'selectLoginController');
                            }
                        }
                    }
                    
                  
                    
                } else {
                    internalErrResp(res, errorMessage.dataBaseResponse);
                }
          
        }

        
    } catch (error: any) {
        console.log(error.message)
        internalErrResp(res, error);
    }
};

