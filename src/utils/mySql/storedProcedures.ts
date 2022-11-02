export const Authorization = {
    login: 'CALL sp_get_login(?)',
    getAuthCode: 'CALL sp_get_authcode(?)',
    getToken: 'CALL sp_get_token(?,?)',
    checkToken: 'CALL sp_check_token(?)',
    updateToken: 'CALL sp_update_token(?,?,?)',
    verifyToken: 'CALL sp_verify_token(?,?,?)',
};


export const userProfileReg = {
    updateUserData: 'CALL sp_update_userData(?)',
    updateisChangeEmail: 'CALL sp_update_isChangeEmail(?)',
    getUserDataEmail: 'CALL sp_get_userDataEmail(?)',
    getUserDataSecondaryEmail: 'CALL sp_get_userDataSecondaryEmail(?)',
    getEmailOtpData: 'CALL sp_get_emailOtpData(?)',
    getPhoneOtpData: 'CALL sp_get_phoneOtpData(?)',
    getNewEmail: 'CALL sp_get_userDataNewEmail(?)',
    getUserDataPhone: 'CALL sp_get_userDataPhone(?)',
    getAppointmentsDataEmail: 'CALL sp_get_appointmentsDataEmail(?)',
    getAppointmentsDataPhone: 'CALL sp_get_appointmentsDataPhone(?)',
    updateIsActive: 'CALL sp_put_updateIsActive(?)',
    insertOtpData: 'CALL sp_post_insertOtpData(?,?,?,?,?)',
    getOtpData: 'CALL sp_get_otpData(?)',
    getValidateData: 'CALL sp_get_validateData(?)',
    updateOtpIsActive: 'CALL sp_get_updateOtpIsActive(?)',
};

export const socialLogin = {
    postSocialLogin: 'CALL sp_post_socialLogin(?,?,?,?,?,?,?,?)',
    postSocialLoginUserdetails:
        'CALL sp_post_SLUserDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    getSocialLoginDetails : 'Call sp_get_SLUserDetails(?)'
};