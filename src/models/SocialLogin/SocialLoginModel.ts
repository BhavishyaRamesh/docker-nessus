import {
    modelsServicesError,
    logRequestInGCP,
} from '../../utils/common/api-middleware';
import {errorCodes} from '../../utils/common/errorCodes';
import {errorMessage} from '../../utils/common/dictionaries';
import {getAccessToken} from '../../utils/common/reusableFunctions';
import {
    getUserDataEmail,
    postSocialLogin,
    postSLUserdetails,
    getSocialLoginDetails,
} from '../../utils/mySql/select';

export const socialloginSignupDetailsModel = async (params: any) => {
    try {
            logRequestInGCP(params, 'socialloginDetailsModel');
            let paramsEmail = params?.Email ? params?.Email : null;
            const Email: string = params.socialLoginDetails.email
                ? params.socialLoginDetails.email
                : paramsEmail;
            if (Email) {
                let checkEmail: any = await getUserDataEmail({email: Email});
                if (
                    checkEmail?.message &&
                    checkEmail?.message[0].length &&
                    checkEmail?.message[0]
                ) {
                    let socialDetailsCheck: any = await getSocialLoginDetails({
                        email: Email,
                    });

                    if (
                        socialDetailsCheck &&
                        socialDetailsCheck.data &&
                        socialDetailsCheck.data[0] &&
                        !socialDetailsCheck.data[0].length
                    ) {
                        params.socialLoginDetails['userid'] =
                            checkEmail?.message[0][0]?.User_Id;
                        let splittedName =
                            params?.socialLoginDetails?.name?.split(' ');
                        params.socialLoginDetails['firstName'] =
                            splittedName[0];
                        params.socialLoginDetails['lastName'] =
                            splittedName[splittedName.length - 1];
                        let socialLoginDetails: any = params.socialLoginDetails;
                        await postSocialLogin({
                            userid: socialLoginDetails.userid
                                ? socialLoginDetails.userid
                                : 0,
                            firstName: socialLoginDetails.firstName
                                ? socialLoginDetails.firstName
                                : '',
                            lastName: socialLoginDetails.lastName
                                ? socialLoginDetails.lastName
                                : '',
                            signupType: socialLoginDetails.signupType
                                ? socialLoginDetails.signupType
                                : '',
                            id: socialLoginDetails.id
                                ? socialLoginDetails.id
                                : '',
                            email: socialLoginDetails.email
                                ? socialLoginDetails.email
                                : '',
                            image: socialLoginDetails.image
                                ? socialLoginDetails.image
                                : '',
                            authorizeUrl: socialLoginDetails?.authorizeUrl
                                ? socialLoginDetails?.authorizeUrl
                                : '',
                        });
                    }

                    const token = await getAccessToken(
                        checkEmail.message[0][0]
                    );

                    if (token) {
                        return { token: token }
                    } else {
                        return {
                            status: errorCodes.BAD_REQUEST.Value,
                            message: errorMessage.tokenNotGenerated,
                        };
                    }
                } else {
                        let response: any = await postSLUserdetails(params);

                        if (
                            response.status === true &&
                            response?.message &&
                            response?.message[0] &&
                            response?.message[0]?.UserId
                        ) {
                            params.socialLoginDetails['userid'] =
                                response?.message[0]?.UserId;
                            let splittedName =
                                params?.socialLoginDetails?.name?.split(' ');
                            params.socialLoginDetails['firstName'] =
                                splittedName[0];
                            params.socialLoginDetails['lastName'] =
                                splittedName[splittedName.length - 1];
                            let socialLoginDetails: any =
                                params.socialLoginDetails;
                            let socialResponse: any = await postSocialLogin({
                                userid: socialLoginDetails.userid
                                    ? socialLoginDetails.userid
                                    : 0,
                                firstName: socialLoginDetails.firstName
                                    ? socialLoginDetails.firstName
                                    : '',
                                lastName: socialLoginDetails.lastName
                                    ? socialLoginDetails.lastName
                                    : '',
                                signupType: socialLoginDetails.signupType
                                    ? socialLoginDetails.signupType
                                    : '',
                                id: socialLoginDetails.id
                                    ? socialLoginDetails.id
                                    : '',
                                email: socialLoginDetails.email
                                    ? socialLoginDetails.email
                                    : '',
                                image: socialLoginDetails.image
                                    ? socialLoginDetails.image
                                    : '',
                                authorizeUrl: socialLoginDetails?.authorizeUrl
                                    ? socialLoginDetails?.authorizeUrl
                                    : '',
                            });

                            if (socialResponse.status === true) {
                                let checksEmail: any = await getUserDataEmail({
                                    email: params.Email,
                                });

                                if (
                                    checksEmail.message[0] &&
                                    checksEmail.message[0].length
                                ) {
                                    const token = await getAccessToken(
                                        checksEmail.message[0][0]
                                    );

                                    if (token) {
                                        return { token: token };
                                    } else {
                                        return {
                                            status: errorCodes.BAD_REQUEST
                                                .Value,
                                            message:
                                                errorMessage.tokenNotGenerated,
                                        };
                                    }
                                } else {
                                    return {
                                        status: errorCodes.BAD_REQUEST.Value,
                                        message: errorMessage.unableAdding,
                                    };
                                }
                            } else {
                                return {
                                    status: errorCodes.BAD_REQUEST.Value,
                                    message: errorMessage.unableAdding,
                                };
                            }
                        } else {
                            return {
                                status: errorCodes.BAD_REQUEST.Value,
                                message: errorMessage.unableAdding,
                            };
                        }
                }
            } else {
                return {
                    status: errorCodes.BAD_REQUEST.Value,
                    message: errorMessage.NotAllRequiredParams,
                };
            }
    } catch (error) {
        modelsServicesError('socialloginDetailsModel', error);
    }
};

export const socialloginSigninDetailsModel = async (params: any) => {
    try {
        logRequestInGCP(params, 'socialloginDetailsModel');
        const Email: string = params.socialLoginDetails.email;
        let checkEmail: any = await getUserDataEmail({
            email: Email,
        });

        if (
            checkEmail?.message &&
            checkEmail?.message[0].length &&
            checkEmail?.message[0]
        ) {
            let socialDetailsCheck: any = await getSocialLoginDetails({
                email: Email,
            });

            if (
                socialDetailsCheck &&
                socialDetailsCheck.data &&
                socialDetailsCheck.data[0] &&
                !socialDetailsCheck.data[0].length
            ) {
                params.socialLoginDetails['userid'] =
                    checkEmail?.message[0][0]?.User_Id;
                let splittedName = params?.socialLoginDetails?.name?.split(' ');
                params.socialLoginDetails['firstName'] = splittedName[0];
                params.socialLoginDetails['lastName'] =
                    splittedName[splittedName.length - 1];
                let socialLoginDetails: any = params.socialLoginDetails;

                await postSocialLogin({
                    userid: socialLoginDetails.userid
                        ? socialLoginDetails.userid
                        : 0,
                    firstName: socialLoginDetails.firstName
                        ? socialLoginDetails.firstName
                        : '',
                    lastName: socialLoginDetails.lastName
                        ? socialLoginDetails.lastName
                        : '',
                    signupType: socialLoginDetails.signupType
                        ? socialLoginDetails.signupType
                        : '',
                    id: socialLoginDetails.id ? socialLoginDetails.id : '',
                    email: socialLoginDetails.email
                        ? socialLoginDetails.email
                        : '',
                    image: socialLoginDetails.image
                        ? socialLoginDetails.image
                        : '',
                    authorizeUrl: socialLoginDetails?.authorizeUrl
                        ? socialLoginDetails?.authorizeUrl
                        : '',
                });
            }

            const token = await getAccessToken(checkEmail.message[0][0]);

            if (token) {
                return { token: token };
            } else {
                return {
                    status: errorCodes.BAD_REQUEST.Value,
                    message: errorMessage.tokenNotGenerated,
                };
            }
        } else {
            return {
                status: errorCodes.BAD_REQUEST.Value,
                message: errorMessage.noAccountFount,
            };
        }
    } catch (error) {
        modelsServicesError('socialloginDetailsModel', error);
    }
};
