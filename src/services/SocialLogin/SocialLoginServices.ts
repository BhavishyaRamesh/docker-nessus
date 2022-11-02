import { socialloginSigninDetailsModel, socialloginSignupDetailsModel } from "../../models/SocialLogin/SocialLoginModel";


export const socialLoginSignupService = async (param:any) => {
    try {
      return await socialloginSignupDetailsModel(param)
    } catch (error) {
      console.error('socialLoginService -', error);
    }
  };
export const socialLoginSigninService = async (param:any) => {
    try {
      return await socialloginSigninDetailsModel(param)
    } catch (error) {
      console.error('socialLoginService -', error);
    }
  };
  