import { socialLoginSigninService, socialLoginSignupService } from "../../services/SocialLogin/SocialLoginServices";
import {
    apiValidResponse,
  internalErrResp,
    validateErrResp
} from '../../utils/common/api-middleware';
import {socialLoginSignInValidate} from "../../utils/common/validation"
export const socialLoginsignupController = async (req: any, res: any) => {
  try {
    let data = req.body;
    let result = await socialLoginSignInValidate(data, 1)
    if (result.error) {
       return validateErrResp( res, result.error.message,'socialLoginsignupController');
    } else {
          const responseData = await socialLoginSignupService(data);
          if (responseData) {
              apiValidResponse(res, responseData, 'socialLoginController');
          }
    }
      
    } catch (error) {
      internalErrResp(res, error);
    }
};

export const socialLoginsigninController = async (req: any, res: any) => {
  try {
    let data = req.body;
    let result = await socialLoginSignInValidate(data.socialLoginDetails,0); 
    if (result.error) {
        return validateErrResp(
            res,
            result.error.message,
            'socialLoginsigninController'
        );
    } else {
      const responseData = await socialLoginSigninService(data);
      if (responseData) {
          apiValidResponse(res, responseData, 'socialLoginController');
      }
    }  
  } catch (error) {
    internalErrResp(res, error);
  }
};