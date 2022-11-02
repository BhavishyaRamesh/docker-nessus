import * as userProfileRegModel from '../../models/UserProfileReg/userProfileRegModel';

export const checkEmailAddressServices = async (params: any) => {
  try {
    return await userProfileRegModel.checkemailAddress(params);
  } catch (error) {
    console.error('checkEmailAddressServices-', error);
  }
};

export const verifyEmailService = async (params: any) => {
  try {
    return await userProfileRegModel.verifyEmails(params);
  } catch (error) {
    console.error('verifyEmailService-', error);
  }
};

export const initiateOTPServices = async (params: any, req?: any) => {
  try {
    return await userProfileRegModel.initiateOTP(params, req);
  } catch (error) {
    console.error('initiateOTPServices-', error);
  }
};

export const validateOTPServices = async (params: any) => {
  try {
    return await userProfileRegModel.validateOTP(params);
  } catch (error) {
    console.error('validateOTPServices-', error);
  }
};